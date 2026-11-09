// drag and drop
let dragId=null;
$('#board').addEventListener('dragstart',e=>{const c=e.target.closest('.lc');if(!c)return;dragId=c.dataset.lead;c.classList.add('drag');e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',dragId);}catch(_){}});
$('#board').addEventListener('dragend',e=>{$$('.lc.drag').forEach(c=>c.classList.remove('drag'));$$('.col.over').forEach(c=>c.classList.remove('over'));});
$('#board').addEventListener('dragover',e=>{const col=e.target.closest('.col');if(!col||!dragId)return;e.preventDefault();$$('.col.over').forEach(c=>c!==col&&c.classList.remove('over'));col.classList.add('over');});
$('#board').addEventListener('drop',async e=>{const col=e.target.closest('.col');if(!col||!dragId)return;e.preventDefault();col.classList.remove('over');const id=dragId;dragId=null;
  const l=LEADS.find(x=>x.id===id);if(!l||l.etapa===col.dataset.stage)return;await saveLead(id,{etapa:col.dataset.stage});});

