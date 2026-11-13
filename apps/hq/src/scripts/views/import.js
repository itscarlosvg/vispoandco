function impPreview(o){const keys=[['negocio','Negocio'],['nombre','Contacto'],['email','Email'],['telefono','Teléfono'],['servicios','Servicios'],['valor','Valor'],['mensual','Cuota'],['reunion','Reunión']];
  $('#impPrev').innerHTML=`<div class="tbl-wrap"><table><tbody>${keys.map(([k,n])=>`<tr><th>${n}</th><td>${esc(k==='valor'?eur(o.valor):k==='mensual'?(+o.mensual?eur(o.mensual)+'/mes':'—'):k==='reunion'?(o.reunion?fmtDay(o.reunion)+' '+String(o.reunion).slice(11,16):'—'):(o[k]||'—'))}</td></tr>`).join('')}</tbody></table></div><div class="acts"><button class="btn" type="button" id="impSave">Guardar cliente</button><button class="btn ghost" type="button" id="impEdit">Revisar antes</button></div>`;
  $('#impSave').onclick=async()=>{try{const id=await createLead(o);$('#impPrev').innerHTML='<p class="note">Guardado en Clientes.</p>';$('#impText').value='';}catch(e){$('#impErr').textContent=dbMsg(e);}};
  $('#impEdit').onclick=()=>{openLead();FIELDS.forEach(f=>{const el=$('#l-'+f);if(el&&o[f]!=null&&o[f]!=='')el.value=o[f];});};}
// CSV
function parseCSV(t){const rows=[];let row=[],cur='',q=false;for(let i=0;i<t.length;i++){const c=t[i];
  if(q){if(c==='"'){if(t[i+1]==='"'){cur+='"';i++;}else q=false;}else cur+=c;}
  else if(c==='"')q=true;else if(c===','||c===';'){row.push(cur);cur='';}else if(c==='\n'||c==='\r'){if(c==='\r'&&t[i+1]==='\n')i++;row.push(cur);rows.push(row);row=[];cur='';}else cur+=c;}
  if(cur!==''||row.length){row.push(cur);rows.push(row);}return rows.filter(r=>r.some(x=>x.trim()!==''));}
const MAP={negocio:/^(company|company_name|business|business_name|empresa|negocio|organization|organisation|name_company)$/i,nombre:/^(contact|contact_name|full_name|name|nombre|person|first_name)$/i,apellido:/^(last_name|surname|apellido)$/i,email:/e-?mail/i,telefono:/phone|tel[eé]fono|mobile/i,web:/website|domain|url|web/i,ciudad:/city|ciudad|town|locality/i,sector:/industry|category|sector|niche/i,nota:/signal|reason|note|notes|nota|summary/i};
let csvRows=[];
function handleCSV(file){if(!file)return;const rd=new FileReader();rd.onload=()=>{const rows=parseCSV(String(rd.result));if(rows.length<2){$('#csvPrev').innerHTML='<p class="err">El archivo no tiene filas.</p>';return;}
  const h=rows[0].map(x=>x.trim());const idx={};Object.entries(MAP).forEach(([k,re])=>{const i=h.findIndex(x=>re.test(x.replace(/\s+/g,'_')));if(i>=0)idx[k]=i;});
  if(idx.negocio==null&&idx.nombre==null&&idx.email==null){$('#csvPrev').innerHTML='<p class="err">No encuentro columnas de empresa, nombre o email en este CSV.</p>';return;}
  const known=new Set([...LEADS.map(l=>(l.email||'').toLowerCase()).filter(Boolean),...LEADS.map(l=>(l.negocio||'').toLowerCase())]);
  const all=rows.slice(1).filter(r=>r.some(c=>String(c||'').trim())).map(r=>{const g=k=>idx[k]!=null?(r[idx[k]]||'').trim():'';const nombre=[g('nombre'),g('apellido')].filter(Boolean).join(' ');
    return {negocio:g('negocio')||nombre||g('email'),nombre:g('negocio')?nombre:'',email:g('email'),telefono:g('telefono'),web:g('web'),ciudad:g('ciudad'),nota:g('nota')||(g('sector')?'Sector: '+g('sector'):''),fuente:'Harvey',etapa:'nuevo',proxima:TODAY()};});
  const seen=new Set();let noName=0,dup=0;const ok=[];
  all.forEach(o=>{if(!o.negocio){noName++;return;}const k=o.negocio.toLowerCase()+'|'+(o.telefono||o.email||'').toLowerCase();
    if(known.has(o.negocio.toLowerCase())&&(!o.email||known.has(o.email.toLowerCase()))||seen.has(k)){dup++;return;}seen.add(k);ok.push(o);});
  const MAXI=500;csvRows=ok.slice(0,MAXI);const over=ok.length-csvRows.length;
  const fmt=n=>n.toLocaleString('es-ES');
  const info=[`${fmt(all.length)} filas`,over>0?`se importan las ${fmt(MAXI)} primeras (límite por importación)`:'',dup?`${fmt(dup)} ya están en Clientes o repetidos`:'',noName?`${fmt(noName)} sin nombre`:''].filter(Boolean).join(' · ');
  $('#csvPrev').innerHTML=csvRows.length?`<div class="tbl-wrap"><table><thead><tr><th>Negocio</th><th>Teléfono</th><th>Ciudad</th><th>Nota</th></tr></thead><tbody>${csvRows.slice(0,6).map(o=>`<tr><td>${esc(o.negocio)}</td><td>${esc(o.telefono||'—')}</td><td>${esc(o.ciudad||'—')}</td><td>${esc(o.nota||'—')}</td></tr>`).join('')}</tbody></table></div><div class="acts" style="align-items:center"><button class="btn" type="button" id="csvGo">Importar ${fmt(csvRows.length)} leads</button><span class="mono" style="color:var(--muted)">${info}</span></div>`:'<p class="note">Todos los leads de este archivo ya están en Clientes.</p>';
  const go=$('#csvGo');if(go)go.onclick=async()=>{go.disabled=true;let n=0;for(const o of csvRows){try{await createLead(o);n++;go.textContent=`Importando ${n}/${csvRows.length}…`;}catch(e){showNote(dbMsg(e));break;}}
    $('#csvPrev').innerHTML=`<p class="note">${n} leads importados en Clientes, etapa Nuevo.</p>`;csvRows=[];};};
  rd.readAsText(file);}
$('#csvIn').addEventListener('change',e=>handleCSV(e.target.files[0]));
const drop=$('#drop');['dragenter','dragover'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.add('over');}));
['dragleave','drop'].forEach(ev=>drop.addEventListener(ev,e=>{e.preventDefault();drop.classList.remove('over');}));
drop.addEventListener('drop',e=>handleCSV(e.dataTransfer.files[0]));

/* ---------- presupuestos ---------- */
