// tasks
$('#taskForm').addEventListener('submit',async e=>{e.preventDefault();const t=$('#taskT').value.trim();if(!t)return;
  try{await createTask({texto:t,fecha:$('#taskD').value||'',hora:$('#taskH').value||'',repetir:$('#taskR').value});$('#taskT').value='';$('#taskD').value='';$('#taskH').value='';$('#taskR').value='';}catch(err){showNote(dbMsg(err));}});
$('#tasks').addEventListener('change',async e=>{const id=e.target.dataset.tk;if(!id)return;await completeTask(id,e.target.checked);});
async function completeTask(id,done){const t=TASKS.find(x=>x.id===id);try{await db.collection('tareas').doc(id).update({hecho:done});
  if(done&&t&&t.repetir&&!t.siguiente){const d=parseDay(t.fecha)||new Date();if(t.repetir==='semanal')d.setDate(d.getDate()+7);else d.setMonth(d.getMonth()+1);
    const nid=await createTask({texto:t.texto,fecha:isoDay(d),hora:t.hora||'',repetir:t.repetir,leadId:t.leadId||''});await db.collection('tareas').doc(id).update({siguiente:nid});}}
  catch(err){showNote(dbMsg(err));}}
$('#tasks').addEventListener('click',async e=>{const id=e.target.dataset?.tdel;if(!id)return;try{await db.collection('tareas').doc(id).delete();}catch(err){showNote(dbMsg(err));}});
$('#showDone').addEventListener('click',()=>{showDone=!showDone;$('#showDone').textContent=showDone?'Ocultar hechos':'Ver hechos';render();});
$('#clearEx').addEventListener('click',async()=>{const b=$('#clearEx');b.disabled=true;
  for(const l of LEADS.filter(x=>x.ejemplo)){try{await db.collection('leads').doc(l.id).delete();}catch(_){}}
  for(const t of TASKS.filter(x=>x.ejemplo)){try{await db.collection('tareas').doc(t.id).delete();}catch(_){}}
  for(const [k,o] of Object.entries(OBJ)){if(o&&o.ejemplo){try{await db.doc('objetivos/'+k).delete();}catch(_){}}}
  b.disabled=false;});

/* ---------- data ---------- */
