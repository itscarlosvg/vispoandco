// drag and drop
let dragId=null;
$('#board').addEventListener('dragstart',e=>{const c=e.target.closest('.lc');if(!c)return;dragId=c.dataset.lead;c.classList.add('drag');e.dataTransfer.effectAllowed='move';try{e.dataTransfer.setData('text/plain',dragId);}catch(_){}});
$('#board').addEventListener('dragend',e=>{$$('.lc.drag').forEach(c=>c.classList.remove('drag'));$$('.col.over').forEach(c=>c.classList.remove('over'));});
$('#board').addEventListener('dragover',e=>{const col=e.target.closest('.col');if(!col||!dragId)return;e.preventDefault();$$('.col.over').forEach(c=>c!==col&&c.classList.remove('over'));col.classList.add('over');});
$('#board').addEventListener('drop',async e=>{const col=e.target.closest('.col');if(!col||!dragId)return;e.preventDefault();col.classList.remove('over');const id=dragId;dragId=null;
  const l=LEADS.find(x=>x.id===id);if(!l||l.etapa===col.dataset.stage)return;await saveLead(id,{etapa:col.dataset.stage});});


// arrastre táctil (móvil): mantener pulsado una tarjeta y soltarla en una de las casillas de etapa
const TD={HOLD:380,timer:0,id:null,card:null,ghost:null,dx:0,dy:0,x0:0,y0:0,over:null,on:false,justDropped:false};
const tdMobile=()=>matchMedia('(max-width:760px)').matches;
function tdToast(t){let n=$('#tdToast');if(!n){n=document.createElement('div');n.id='tdToast';n.className='td-toast';n.setAttribute('role','status');document.body.appendChild(n);}
  n.textContent=t;n.classList.add('show');clearTimeout(n._t);n._t=setTimeout(()=>n.classList.remove('show'),1800);}
function tdPos(x,y){const g=TD.ghost,w=g.offsetWidth;g.style.left=Math.max(8,Math.min(innerWidth-w-8,x-TD.dx))+'px';g.style.top=(y-TD.dy)+'px';}
function tdStart(){const c=TD.card,r=c.getBoundingClientRect();TD.on=true;
  const tabs=$('#plTabs');tabs.style.minHeight=tabs.offsetHeight+'px';tabs.classList.add('float');
  const g=c.cloneNode(true);g.className='lc td-ghost';g.style.width=r.width+'px';g.style.left=r.left+'px';g.style.top=r.top+'px';document.body.appendChild(g);
  TD.ghost=g;TD.dx=Math.min(r.width,260)/2;TD.dy=-26;g.style.width=Math.min(r.width,260)+'px';tdPos(TD.x0,TD.y0);c.classList.add('td-src');document.body.classList.add('td-on');}
function tdEnd(drop){clearTimeout(TD.timer);if(!TD.on){TD.card=null;return;}
  const st=TD.over&&TD.over.dataset.st,id=TD.id;
  TD.ghost&&TD.ghost.remove();TD.card&&TD.card.classList.remove('td-src');$$('#plTabs .td-over').forEach(b=>b.classList.remove('td-over'));
  const tabs=$('#plTabs');tabs.classList.remove('float');tabs.style.minHeight='';document.body.classList.remove('td-on');
  Object.assign(TD,{on:false,ghost:null,card:null,over:null});TD.justDropped=true;setTimeout(()=>TD.justDropped=false,350);
  if(!drop||!st)return;const l=LEADS.find(x=>x.id===id);if(!l||l.etapa===st)return;
  const name=(STAGES.find(s=>s[0]===st)||[,st])[1];
  saveLead(id,{etapa:st}).then(()=>tdToast(`Movido a ${name}`)).catch(e=>showNote(dbMsg(e)));}
$('#board').addEventListener('touchstart',e=>{if(!tdMobile()||e.touches.length>1)return;const c=e.target.closest('.lc');if(!c)return;
  const t=e.touches[0];Object.assign(TD,{card:c,id:c.dataset.lead,x0:t.clientX,y0:t.clientY});
  clearTimeout(TD.timer);TD.timer=setTimeout(()=>{if(TD.card===c)tdStart();},TD.HOLD);},{passive:true});
document.addEventListener('touchmove',e=>{if(!TD.card)return;const t=e.touches[0];
  if(!TD.on){if(Math.hypot(t.clientX-TD.x0,t.clientY-TD.y0)>8){clearTimeout(TD.timer);TD.card=null;}return;}
  e.preventDefault();tdPos(t.clientX,t.clientY);
  const el=document.elementFromPoint(t.clientX,t.clientY),b=el&&el.closest('#plTabs [data-st]');
  if(b!==TD.over){TD.over&&TD.over.classList.remove('td-over');TD.over=b;b&&b.classList.add('td-over');}},{passive:false});
document.addEventListener('touchend',()=>tdEnd(true));
document.addEventListener('touchcancel',()=>tdEnd(false));
$('#board').addEventListener('contextmenu',e=>{if(tdMobile()&&e.target.closest('.lc'))e.preventDefault();});
