function renderKpis(){
  const r=range(FIL.per),rp=range(FIL.per,true),c=metrics(r),p=metrics(rp),vs=PER[FIL.per][1];
  const filtered=!!(FIL.src||FIL.sec),G=filtered?{}:goalsInRange(r);
  const open=FL().filter(l=>OPEN.includes(l.etapa)),fore=open.reduce((s,l)=>s+(+l.valor||0)*(WEIGHT[l.etapa]||0),0);
  const mrrAll=sum(FL().filter(l=>l.etapa==='ganado'),'mensual');
  const gb=(v,g,key)=>{if(!g)return '';const st=FIL.per==='mes'?goalStatus(v,g,monthKey(new Date())):(v>=g?['Cumplido','ok']:['',v/g>=.6?'warn':'bad']);
    return `<div class="gbar"><i class="${st[1]}" style="width:${Math.min(100,v/g*100)}%"></i>${FIL.per==='mes'?`<u style="left:${pace(monthKey(new Date()))*100}%"></u>`:''}</div><small>${Math.round(v/g*100)} % del objetivo · ${key==='fact'?eur(g):key==='mrr'?eur(g)+'/mes':g}</small>`;};
  const T=[
    ['Facturado',eur(c.fact),deltaChip(c.fact,p.fact),`${c.clientes} ${c.clientes===1?'cliente ganado':'clientes ganados'}`,gb(c.fact,G.fact,'fact'),'hot'],
    ['Recurrente',eur(mrrAll)+'<small class="u">/mes</small>','',c.mrr?`+${eur(c.mrr)}/mes nuevos en el periodo`:'Sin altas nuevas en el periodo',gb(c.mrr,G.mrr,'mrr')],
    ['Previsión',eur(fore),'',`Ponderada · ${eur(sum(open,'valor'))} en juego en ${open.length} ${open.length===1?'oportunidad':'oportunidades'}`,''],
    ['Conversión',c.conv==null?'—':Math.round(c.conv)+' %',deltaChip(c.conv,p.conv,true),c.conv==null?'Sin cierres en el periodo':`${c.clientes} ganados · ${c.lost} perdidos`,''],
    ['Leads nuevos',String(c.leads),deltaChip(c.leads,p.leads),'',gb(c.leads,G.leads,'leads')],
    ['Presupuestos',`${c.qAcc}<small class="u"> de ${c.presupuestos}</small>`,deltaChip(c.presupuestos,p.presupuestos),'Aceptados de los enviados',gb(c.presupuestos,G.presupuestos,'presupuestos')]];
  $('#kpis').innerHTML=T.map(([l,v,d,s,g,h])=>`<div class="card kpi${h?' '+h:''}"><span class="lbl">${l}</span><div class="kv"><b class="num">${v}</b>${d}</div>${d?`<small class="vs">${vs}</small>`:''}${s?`<small>${s}</small>`:''}${g}</div>`).join('');
}
function trendChart(){
  const W=640,H=240,L=52,B=28,T=22,R=14;const d=new Date();const months=[];
  for(let i=11;i>=0;i--){const x=new Date(d.getFullYear(),d.getMonth()-i,1);months.push([monthKey(x),MON[x.getMonth()]]);}
  const vals=months.map(([k])=>metrics(monthRange(k)).fact),goals=months.map(([k])=>FIL.src||FIL.sec?0:(+(OBJ[k]||{}).fact||0));
  const mx=Math.max(100,...vals,...goals);const step=mx<=500?100:mx<=2000?500:mx<=5000?1000:mx<=20000?5000:10000;const top=Math.ceil(mx/step)*step;
  const x=i=>L+(W-L-R)*i/11,y=v=>T+(H-B-T)*(1-v/top);let s='<defs><linearGradient id="tg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#E8336F" stop-opacity=".32"/><stop offset="1" stop-color="#E8336F" stop-opacity="0"/></linearGradient></defs>';
  const n=Math.min(4,top/step);for(let i=0;i<=n;i++){const v=top/n*i;s+=`<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(245,242,236,.07)"/><text x="${L-8}" y="${y(v)+4}" text-anchor="end">${v>=1000?(v/1000).toLocaleString('es-ES')+'k':v}</text>`;}
  if(goals.some(Boolean)){let gp='';goals.forEach((g,i)=>{if(!g)return;gp+=`M${x(i)-12},${y(g)}H${x(i)+12}`;});s+=`<path d="${gp}" stroke="#9C9BA4" stroke-width="2" stroke-dasharray="4 3" fill="none"/>`;}
  const pts=vals.map((v,i)=>[x(i),y(v)]);
  s+=`<path d="M${pts.map(p=>p.join(',')).join('L')}L${x(11)},${H-B}L${x(0)},${H-B}Z" fill="url(#tg)"/><path d="M${pts.map(p=>p.join(',')).join('L')}" stroke="#E8336F" stroke-width="2.4" fill="none" stroke-linejoin="round"/>`;
  pts.forEach((p,i)=>{if(vals[i]||i===11)s+=`<circle cx="${p[0]}" cy="${p[1]}" r="${i===11?5:3}" fill="${i===11?'#E8336F':'#16161A'}" stroke="#E8336F" stroke-width="2"/>`;});
  if(vals[11])s+=`<text class="vlab" x="${x(11)}" y="${y(vals[11])-12}" text-anchor="end">${eur(vals[11])}</text>`;
  months.forEach((m,i)=>{s+=`<text x="${x(i)}" y="${H-8}" text-anchor="middle">${m[1]}</text><rect class="hit" data-i="${i}" x="${x(i)-(W-L-R)/22}" y="${T}" width="${(W-L-R)/11}" height="${H-B-T}" fill="transparent"/>`;});
  const el=$('#trend');el.innerHTML=s;el._d={months,vals,goals};
}
$('#trend').addEventListener('pointermove',e=>{const r=e.target.closest('.hit');const D=$('#trend')._d;if(!r||!D)return;const i=+r.dataset.i;
  $('#trLbl').textContent=`${MONL[parseDay(D.months[i][0]+'-01').getMonth()]}: ${eur(D.vals[i])}${D.goals[i]?' · objetivo '+eur(D.goals[i]):''}`;});
$('#trend').addEventListener('pointerleave',()=>$('#trLbl').textContent='Últimos 12 meses');
function alerts(){const now=TODAY(),out=[];const days=s=>Math.floor((Date.now()-new Date(s).getTime())/864e5);
  TASKS.filter(t=>!t.hecho&&t.fecha&&t.fecha<now).forEach(t=>out.push([0,'bad',`Recordatorio atrasado: ${t.texto}`,fmtDay(t.fecha)+(t.hora?' · '+t.hora:''),'Atrasado',`data-go2="agenda"`]));
  LEADS.filter(l=>OPEN.includes(l.etapa)&&l.proxima&&l.proxima<now).forEach(l=>out.push([0,'bad',`Seguimiento atrasado · ${l.negocio}`,`${stName(l.etapa)} · tocaba el ${fmtDay(l.proxima)}`,'Atrasado',`data-lead="${esc(l.id)}"`]));
  LEADS.filter(l=>l.reunion&&l.reunion.slice(0,10)===now&&l.etapa!=='perdido').forEach(l=>out.push([1,'acc',`Reunión hoy a las ${l.reunion.slice(11,16)} · ${l.negocio}`,l.formato||'Reunión','Hoy',`data-lead="${esc(l.id)}"`]));
  TASKS.filter(t=>!t.hecho&&t.fecha===now).forEach(t=>out.push([1,'acc',t.texto,`Hoy${t.hora?' a las '+t.hora:''}${t.leadNombre?' · '+t.leadNombre:''}`,'Hoy',`data-go2="agenda"`]));
  QUOTES.filter(q=>q.estado==='enviado'&&days(q.estadoFecha||q.fecha)>=5).forEach(q=>out.push([2,'warn',`Presupuesto ${q.numero} sin respuesta`,`${q.cliente?.negocio||''} · enviado hace ${days(q.estadoFecha||q.fecha)} días`,'Seguir',`data-openq="${esc(q.id)}"`]));
  LEADS.filter(l=>OPEN.includes(l.etapa)&&!l.proxima&&days(l.actualizado||l.creado)>=14).forEach(l=>out.push([2,'warn',`Sin movimiento · ${l.negocio}`,`${stName(l.etapa)} · ${days(l.actualizado||l.creado)} días sin cambios`,'Revisar',`data-lead="${esc(l.id)}"`]));
  const ck=monthKey(new Date()),o=OBJ[ck],a=metrics(monthRange(ck),true);
  if(o&&new Date().getDate()>=7)GOALS.forEach(([k,n,u])=>{const g=+o[k]||0;if(!g)return;const st=goalStatus(a[k]||0,g,ck);if(st[1]==='bad')out.push([1,'bad',`Objetivo en riesgo: ${n}`,`${u.startsWith('€')?eur(a[k]):a[k]} de ${u.startsWith('€')?eur(g):g} a estas alturas del mes`,'En riesgo','data-go2="objetivos"']);
    else if(st[0]==='Cumplido')out.push([3,'ok',`Objetivo cumplido: ${n}`,`${u.startsWith('€')?eur(a[k]):a[k]} de ${u.startsWith('€')?eur(g):g}`,'Cumplido','data-go2="objetivos"']);});
  out.sort((a,b)=>a[0]-b[0]);
  $('#alN').textContent=out.filter(x=>x[1]!=='ok').length?out.filter(x=>x[1]!=='ok').length+' avisos':'';
  $('#alerts').innerHTML=out.length?out.slice(0,9).map(([,c,t,s,ch,attr])=>`<li class="row al ${c}" ${attr}><i class="sev"></i><div><b>${esc(t)}</b><small>${esc(s)}</small></div><span class="chip ${c}">${ch}</span></li>`).join(''):'<li class="empty">Todo al día</li>';
}
function render(){
  const S=stats();
  $('#exBanner').hidden=!LEADS.some(l=>l.ejemplo)&&!TASKS.some(t=>t.ejemplo)&&!Object.values(OBJ).some(o=>o&&o.ejemplo);
  $('#cntOpen').textContent=S.open.length;$('#cntAg').textContent=S.meets.length+S.pend.length;
  if(lastSync)$('#fUpd').textContent='Actualizado '+pad(lastSync.getHours())+':'+pad(lastSync.getMinutes());
  renderKpis();trendChart();alerts();
  const ck=monthKey(new Date());$('#goMon').textContent=MONL[new Date().getMonth()];$('#goals').innerHTML=goalRows(ck,false);
  const L=FL();
  const maxN=Math.max(1,...STAGES.map(s=>L.filter(l=>l.etapa===s[0]).length));
  $('#funnel').innerHTML=STAGES.map(([k,n,c])=>{const ls=L.filter(l=>l.etapa===k);const v=sum(ls,'valor');
    return `<div class="bar"><span>${n}</span><div class="track"><i style="width:${ls.length/maxN*100}%;background:${c}"></i></div><span class="v num">${ls.length} · ${eur(v)}</span></div>`;}).join('');
  const r=range(FIL.per);const srcs=SRC.map(s=>{const ls=L.filter(l=>(l.fuente||'Otro')===s&&inR(l.creado,r));const w=L.filter(l=>(l.fuente||'Otro')===s&&l.etapa==='ganado'&&inR(l.cerrado,r)).length;return [s,ls.length,w];}).filter(x=>x[1]||x[2]).sort((a,b)=>b[1]-a[1]);
  const maxS=Math.max(1,...srcs.map(x=>Math.max(x[1],x[2])));
  $('#sources').innerHTML=srcs.length?`<div class="legend"><span><i style="background:rgba(232,51,111,.45)"></i>Leads</span><span><i style="background:#43D18A"></i>Ganados</span></div><div class="bars">`+srcs.map(([s,n,w])=>`<div class="bar2"><span>${s}</span><div><div class="track"><i style="width:${n/maxS*100}%;background:rgba(232,51,111,.55)"></i></div><div class="track"><i style="width:${w/maxS*100}%;background:#43D18A"></i></div></div><span class="v num">${n} · ${w}${n?' · '+Math.round(w/n*100)+' %':''}</span></div>`).join('')+'</div>':'<div class="empty">Sin leads en este periodo</div>';
  board();agenda(S);if(!$('[data-v="objetivos"]').hidden)renderGoalsView();
  const fill=(sel,arr)=>{if(sel.options.length===1)arr.forEach(s=>sel.add(new Option(s,s)));};
  fill($('#plSrc'),SRC);fill($('#fSrc'),SRC);fill($('#fSec'),SECT);
}
$('#fPer').addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b)return;FIL.per=b.dataset.p;$$('#fPer button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();});
$('#fSrc').addEventListener('change',e=>{FIL.src=e.target.value;render();});
$('#fSec').addEventListener('change',e=>{FIL.sec=e.target.value;render();});
document.addEventListener('click',e=>{const g=e.target.closest('[data-go2]');if(g)location.hash=g.dataset.go2;});
