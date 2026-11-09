// objetivos view
let goKey=monthKey(new Date());
function renderGoalsView(){const [y,m]=goKey.split('-').map(Number);$('#goTitle').textContent=`${MONL[m-1][0].toUpperCase()+MONL[m-1].slice(1)} ${y}`;
  if(!$('#gForm').contains(document.activeElement))$('#gForm').innerHTML=goalRows(goKey,true);
  const keys=[];const d=new Date();for(let i=5;i>=0;i--)keys.push(monthKey(new Date(d.getFullYear(),d.getMonth()-i,1)));
  $('#goHist').innerHTML=`<thead><tr><th>Mes</th>${GOALS.map(g=>`<th class="r">${g[1]}</th>`).join('')}</tr></thead><tbody>${keys.reverse().map(k=>{const o=OBJ[k]||{},a=metrics(monthRange(k),true),[yy,mm]=k.split('-').map(Number);
    return `<tr><td>${MON[mm-1]} ${yy}</td>${GOALS.map(([g,,u])=>{const gv=+o[g]||0,av=a[g]||0,ok=gv&&av>=gv;const f=x=>u.startsWith('€')?eur(x):x;return `<td class="r"><span style="color:${gv?(ok?'var(--ok)':(k<monthKey(new Date())?'var(--bad)':'var(--paper)')):'var(--paper)'}">${f(av)}</span>${gv?`<small style="color:var(--muted)"> / ${f(gv)}</small>`:''}</td>`;}).join('')}</tr>`;}).join('')}</tbody>`;}
$('#goPrev').addEventListener('click',()=>{const [y,m]=goKey.split('-').map(Number);goKey=monthKey(new Date(y,m-2,1));$('#gForm').innerHTML='';renderGoalsView();});
$('#goNext').addEventListener('click',()=>{const [y,m]=goKey.split('-').map(Number);goKey=monthKey(new Date(y,m,1));$('#gForm').innerHTML='';renderGoalsView();});
$('#goCopy').addEventListener('click',()=>{const [y,m]=goKey.split('-').map(Number);const pk=monthKey(new Date(y,m-2,1));const o=OBJ[pk];if(!o){$('#goErr').textContent='El mes anterior no tiene objetivos.';return;}
  $$('#gForm [data-g]').forEach(i=>i.value=+o[i.dataset.g]||'');$('#goErr').textContent='';});
$('#goSave').addEventListener('click',async()=>{const o={};$$('#gForm [data-g]').forEach(i=>o[i.dataset.g]=Math.max(0,Math.round(+i.value||0)));
  try{await db.doc('objetivos/'+goKey).set(Object.assign(o,{actualizado:new Date().toISOString()}));$('#goErr').textContent='';const b=$('#goSave');b.textContent='Guardado';setTimeout(()=>b.textContent='Guardar',1500);$('#gForm').innerHTML='';renderGoalsView();}
  catch(err){$('#goErr').textContent=dbMsg(err);}});
