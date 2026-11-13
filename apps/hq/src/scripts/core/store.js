/* ---------- store: misma base de datos (Supabase) desde la web y desde Claude ----------
   Expone la API que usa el panel: db.collection(c).doc(id?).set/update/delete/onSnapshot, db.doc('c/id').
   - Web (/admin): supabase-js con sesión del administrador y cambios en tiempo real.
   - Claude: conector de Supabase (capacidad mcp → execute_sql), con sondeo mientras la página está visible. */
const HQ_BACKEND={{HQ_BACKEND}};
const SB_PROJECT='{{SB_PROJECT}}';
const COL_RE=/^[a-z_]{1,40}$/;
const newId=()=>{const a='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';let s='';const r=crypto.getRandomValues(new Uint8Array(20));r.forEach(n=>s+=a[n%a.length]);return s;};

function makeStore(be){
  const cache=new Map(),subs=new Map(),inflight=new Map();
  const snapCol=c=>{const m=cache.get(c)||new Map();const docs=[...m].map(([id,d])=>({id,exists:true,data:()=>d}));return {docs,size:docs.length,empty:!docs.length,metadata:{fromCache:false}};};
  const snapDoc=(c,id)=>{const d=(cache.get(c)||new Map()).get(id);return {id,exists:!!d,data:()=>d,metadata:{fromCache:false}};};
  function emit(c){(subs.get(c)||new Set()).forEach(s=>{try{s.doc?s.cb(snapDoc(c,s.doc)):s.cb(snapCol(c));}catch(e){console.error(e);}});}
  function refresh(c){if(inflight.has(c))return inflight.get(c);
    const p=be.list(c).then(rows=>{cache.set(c,new Map(rows.map(r=>[r.id,r.data||{}])));emit(c);})
      .catch(e=>{(subs.get(c)||new Set()).forEach(s=>s.err&&s.err(e));throw e;}).finally(()=>inflight.delete(c));
    inflight.set(c,p);return p;}
  function local(c,id,fn){const m=cache.get(c)||new Map();cache.set(c,m);fn(m);emit(c);}
  function subscribe(c,cb,err,doc){if(!COL_RE.test(c))throw {code:'bad_request'};
    const s={cb,err,doc};if(!subs.has(c))subs.set(c,new Set());subs.get(c).add(s);
    if(cache.has(c))setTimeout(()=>doc?cb(snapDoc(c,doc)):cb(snapCol(c)),0);else refresh(c).catch(()=>{});
    return ()=>subs.get(c).delete(s);}
  function docRef(c,id){id=id||newId();return {id,
    async set(data){await be.upsert(c,id,data);local(c,id,m=>m.set(id,JSON.parse(JSON.stringify(data))));},
    async update(patch){await be.merge(c,id,patch);local(c,id,m=>m.set(id,Object.assign({},m.get(id)||{},JSON.parse(JSON.stringify(patch)))));},
    async delete(){await be.remove(c,id);local(c,id,m=>m.delete(id));},
    async get(){await refresh(c);return snapDoc(c,id);},
    onSnapshot(cb,err){return subscribe(c,cb,err,id);}};}
  const db={collection:c=>({doc:id=>docRef(c,id),onSnapshot:(cb,err)=>subscribe(c,cb,err),async get(){await refresh(c);return snapCol(c);}}),
    doc:path=>{const [c,id]=String(path).split('/');return docRef(c,id);},
    refreshAll:()=>Promise.all([...subs.keys()].map(c=>refresh(c).catch(()=>{}))),
    refresh};
  return db;}

/* Web: Supabase con login */
async function supabaseBackend(){
  const sb=window.supabase.createClient(HQ_BACKEND.url,HQ_BACKEND.key,{auth:{persistSession:true,autoRefreshToken:true}});
  const chk=r=>{if(r.error)throw {code:r.error.code||'tool_error',message:r.error.message};return r.data;};
  const be={
    list:async c=>chk(await sb.from('docs').select('id,data').eq('collection',c).limit(5000)),
    upsert:async(c,id,data)=>chk(await sb.from('docs').upsert({collection:c,id,data})),
    merge:async(c,id,patch)=>chk(await sb.rpc('doc_merge',{p_collection:c,p_id:id,p_patch:patch})),
    remove:async(c,id)=>chk(await sb.from('docs').delete().match({collection:c,id}))};
  return {sb,be};}

/* Claude: conector de Supabase vía execute_sql */
async function mcpBackend(){
  let mcp=null;try{mcp=await window.claude?.use?.('mcp');}catch(_){mcp=null;}
  if(!mcp)return null;
  const lit=v=>{const s=typeof v==='string'?v:JSON.stringify(v);let t='q';while(s.includes('$'+t+'$'))t+=Math.random().toString(36).slice(2,5);return '$'+t+'$'+s+'$'+t+'$';};
  const cid=(c,id)=>{if(!COL_RE.test(c))throw {code:'bad_request'};return `collection=${lit(c)} and id=${lit(id)}`;};
  async function sql(query){
    const r=await mcp.callTool('Supabase','execute_sql',{project_id:SB_PROJECT,query},{cache:false});
    let p=r.payload;if(p&&typeof p==='object'&&!Array.isArray(p)&&typeof p.result==='string')p=p.result;
    if(Array.isArray(p))return p;
    const txt=typeof p==='string'?p:(r.content||[]).map(b=>b.text||'').join('\n');
    const m=txt.match(/<untrusted-data-[^>]+>\s*([\s\S]*?)\s*<\/untrusted-data-/);
    try{return JSON.parse(m?m[1]:txt);}catch(_){return [];}}
  const be={
    list:c=>{if(!COL_RE.test(c))throw {code:'bad_request'};return sql(`select id, data from public.docs where collection=${lit(c)}`);},
    upsert:(c,id,data)=>sql(`insert into public.docs (collection,id,data) values (${lit(c)},${lit(id)},${lit(data)}::jsonb) on conflict (collection,id) do update set data=excluded.data`),
    merge:(c,id,patch)=>sql(`update public.docs set data=data||${lit(patch)}::jsonb where ${cid(c,id)}`),
    remove:(c,id)=>sql(`delete from public.docs where ${cid(c,id)}`)};
  return be;}

async function openStore(){
  if(HQ_BACKEND){
    const {sb,be}=await supabaseBackend();
    await hqLogin(sb);
    const db=makeStore(be);
    sb.channel('docs').on('postgres_changes',{event:'*',schema:'public',table:'docs'},p=>{const c=(p.new&&p.new.collection)||(p.old&&p.old.collection);if(c)db.refresh(c).catch(()=>{});else db.refreshAll();}).subscribe();
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)db.refreshAll();});
    $('#logout').hidden=false;$('#logout').addEventListener('click',async()=>{await sb.auth.signOut();location.reload();});
    return db;}
  const be=await mcpBackend();if(!be)return null;
  const db=makeStore(be);
  setInterval(()=>{if(!document.hidden)db.refreshAll();},20000);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)db.refreshAll();});
  return db;}

/* Acceso al panel web */
function hqLogin(sb){return new Promise(async resolve=>{
  const box=$('#login'),f=$('#lgForm'),err=$('#lgErr'),btn=$('#lgGo');
  const ok=async s=>{if(!s)return false;const r=await sb.from('admins').select('user_id').eq('user_id',s.user.id).maybeSingle();
    if(r.data){box.hidden=true;document.body.classList.remove('locked');resolve();return true;}
    err.textContent='Esta cuenta no tiene acceso al panel.';await sb.auth.signOut();return false;};
  const {data:{session}}=await sb.auth.getSession();
  if(session&&await ok(session))return;
  document.body.classList.add('locked');box.hidden=false;setTimeout(()=>$('#lgMail').focus(),50);
  f.addEventListener('submit',async e=>{e.preventDefault();err.textContent='';btn.disabled=true;
    const email=$('#lgMail').value.trim(),password=$('#lgPass').value;
    const r=await sb.auth.signInWithPassword({email,password});
    btn.disabled=false;
    if(r.error){err.textContent=/confirm/i.test(r.error.message)?'Confirma tu email antes de entrar.':'Email o contraseña incorrectos.';return;}
    await ok(r.data.session);});
  $('#lgNew').addEventListener('click',async()=>{err.textContent='';
    const email=$('#lgMail').value.trim(),password=$('#lgPass').value;
    if(!email||password.length<8){err.textContent='Escribe tu email y una contraseña de al menos 8 caracteres.';return;}
    const r=await sb.auth.signUp({email,password});
    err.textContent=r.error?r.error.message:'Cuenta creada. Pide a Claude que la active.';});
});}
