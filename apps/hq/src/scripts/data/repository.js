async function createLead(o){if(!db)throw {code:'unavailable'};const now=new Date().toISOString();
  const b=Object.assign({negocio:'',nombre:'',sector:'',ciudad:'',email:'',telefono:'',web:'',fuente:'Otro',etapa:'nuevo',proxima:'',valor:0,mensual:0,servicios:'',reunion:'',formato:'',nota:''},clean(o),{creado:now,actualizado:now});
  if(!STAGES.some(s=>s[0]===b.etapa))b.etapa='nuevo';if(b.etapa==='ganado'||b.etapa==='perdido')b.cerrado=TODAY();
  const ref=db.collection('leads').doc();await ref.set(b);return ref.id;}
async function saveLead(id,o){if(!db)throw {code:'unavailable'};const prev=LEADS.find(x=>x.id===id)||{};const b=clean(o);
  if(b.etapa&&!STAGES.some(s=>s[0]===b.etapa))delete b.etapa;
  b.actualizado=new Date().toISOString();const fin=k=>k==='ganado'||k==='perdido';
  if(b.etapa&&fin(b.etapa)&&b.etapa!==prev.etapa)b.cerrado=TODAY();
  if(b.etapa&&!fin(b.etapa)&&fin(prev.etapa))b.cerrado='';
  await db.collection('leads').doc(id).update(b);}
async function createTask(o){const lead=o.leadId?LEADS.find(l=>l.id===o.leadId):null;
  const ref=db.collection('tareas').doc();await ref.set({texto:String(o.texto).slice(0,300),fecha:o.fecha||'',hora:/^\d\d:\d\d$/.test(o.hora||'')?o.hora:'',repetir:['semanal','mensual'].includes(o.repetir)?o.repetir:'',hecho:false,leadId:lead?lead.id:'',leadNombre:lead?lead.negocio:'',creado:new Date().toISOString()});return ref.id;}

render();
(async()=>{
  const sync=$('#sync'),syncT=$('#syncT');
  try{db=await openStore();}catch(_){db=null;}
  if(!db){sync.className='sync err';syncT.textContent='Sin conexión a datos';showNote(HQ_BACKEND?'No se ha podido conectar con la base de datos. Recarga la página.':'Conecta Supabase en los conectores de Claude para ver tus datos.');$('#newLead').disabled=true;return;}
  const timer=setTimeout(()=>{if(!loaded.l){syncT.textContent='Tardando en cargar…';}},10000);
  const fail=e=>{sync.className='sync err';syncT.textContent='Sin conexión';showNote(e&&e.code==='revoked'?'Ya no tienes acceso a estos datos.':'Se ha perdido la conexión con los datos. Recarga la página.');};
  db.collection('leads').onSnapshot(s=>{LEADS=s.docs.map(d=>Object.assign({id:d.id},d.data()));if(!s.metadata.fromCache){loaded.l=true;clearTimeout(timer);sync.className='sync on';syncT.textContent='Sincronizado';lastSync=new Date();}render();},fail);
  db.collection('objetivos').onSnapshot(s=>{OBJ={};s.docs.forEach(d=>OBJ[d.id]=d.data());lastSync=new Date();render();},fail);
  db.collection('tareas').onSnapshot(s=>{TASKS=s.docs.map(d=>Object.assign({id:d.id},d.data()));loaded.t=true;render();},fail);
  subscribeQuotes(fail);
})();

/* ---------- export ---------- */
