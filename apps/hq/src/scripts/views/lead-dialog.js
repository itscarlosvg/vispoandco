// lead dialog
const dlg=$('#leadDlg');let editing=null;
SECT.forEach(s=>$('#l-sector').add(new Option(s,s)));SRC.forEach(s=>$('#l-fuente').add(new Option(s,s)));STAGES.forEach(([k,n])=>$('#l-etapa').add(new Option(n,k)));
function openLead(id){editing=id||null;const l=id?LEADS.find(x=>x.id===id):{fuente:'Web',etapa:'nuevo',sector:SECT[0]};if(!l)return;
  $('#ldT').textContent=id?(l.negocio||'Cliente'):'Nuevo cliente';
  FIELDS.forEach(f=>{const el=$('#l-'+f);if(el)el.value=l[f]??'';});
  $('#ldDel').hidden=!id;$('#ldDelQ').hidden=true;$('#ldAsk').hidden=!id;$('#ldQuote').hidden=!id;$('#ldErr').textContent='';
  dlg.showModal();setTimeout(()=>$('#l-negocio').focus(),30);}
$('#newLead').addEventListener('click',()=>openLead());
$('#ldClose').addEventListener('click',()=>dlg.close());
$('#leadForm').addEventListener('submit',async e=>{e.preventDefault();const o={};
  FIELDS.forEach(f=>{const v=$('#l-'+f).value;o[f]=(f==='valor'||f==='mensual')?(v===''?0:Math.max(0,Math.round(+v))):v.trim();});
  if(!o.negocio){$('#ldErr').textContent='Escribe el nombre del negocio.';$('#l-negocio').focus();return;}
  $('#ldSave').disabled=true;
  try{if(editing)await saveLead(editing,o);else await createLead(o);dlg.close();}catch(err){$('#ldErr').textContent=dbMsg(err);}
  $('#ldSave').disabled=false;});
$('#ldDel').addEventListener('click',()=>{$('#ldDel').hidden=true;$('#ldDelQ').hidden=false;});
$('#ldDelN').addEventListener('click',()=>{$('#ldDel').hidden=false;$('#ldDelQ').hidden=true;});
$('#ldDelY').addEventListener('click',async()=>{try{await db.collection('leads').doc(editing).delete();dlg.close();}catch(err){$('#ldErr').textContent=dbMsg(err);}});
$('#ldAsk').addEventListener('click',()=>{const l=LEADS.find(x=>x.id===editing);dlg.close();if(!l)return;
  if(matchMedia('(max-width:1280px)').matches)location.hash='harvey';
  ask(`Redacta un email para ${l.negocio} (id ${l.id}) adecuado a su etapa actual. Dame asunto y texto listo para enviar.`);});

$('#ldQuote').addEventListener('click',()=>{const id=editing;dlg.close();openQuote(null,blankQuote(id));});
