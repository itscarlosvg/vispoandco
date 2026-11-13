function dateBox(s,withTime){const d=parseDay(s);if(!d)return '<span class="date"><small>sin</small><b>—</b></span>';const t=isoDay(d)===TODAY();
  return `<span class="date${t?' today':''}"><small>${t?'hoy':DOW[d.getDay()]}</small><b>${d.getDate()}</b><small>${withTime?String(s).slice(11,16):MON[d.getMonth()]}</small></span>`;}
function card(l){const now=TODAY();const od=l.proxima&&l.proxima<now&&OPEN.includes(l.etapa);
  return `<article class="lc" draggable="${!matchMedia('(pointer:coarse)').matches}" data-lead="${esc(l.id)}" tabindex="0"><div><b>${esc(l.negocio||'Sin nombre')}</b><br><small>${esc([l.nombre,l.ciudad].filter(Boolean).join(' · ')||l.sector||'')}</small></div>
  ${(+l.valor||+l.mensual)?`<span class="val num">${+l.valor?eur(l.valor):''}${+l.mensual?` <em>+${eur(l.mensual)}/mes</em>`:''}</span>`:''}
  <div class="meta"><span class="chip">${esc(l.fuente||'Otro')}</span>${l.reunion&&l.reunion.slice(0,10)>=now?`<span class="chip warn">${fmtDay(l.reunion)} ${l.reunion.slice(11,16)}</span>`:''}${l.proxima&&OPEN.includes(l.etapa)?`<span class="chip ${od?'bad':'acc'}">${od?'Atrasado':fmtDay(l.proxima)}</span>`:''}${l.ejemplo?'<span class="chip ex">Ejemplo</span>':''}</div></article>`;}
const PL={tab:'nuevo',step:60,lim:{}};
function board(){
  const q=$('#plQ').value.trim().toLowerCase(),src=$('#plSrc').value;
  const ls=LEADS.filter(l=>(!src||l.fuente===src)&&(!q||[l.negocio,l.nombre,l.ciudad,l.sector,l.servicios].join(' ').toLowerCase().includes(q)));
  const by=Object.fromEntries(STAGES.map(([k])=>[k,ls.filter(l=>l.etapa===k).sort((a,b)=>(a.proxima||'9').localeCompare(b.proxima||'9')||(a.creado||'').localeCompare(b.creado||''))]));
  $('#plTabs').innerHTML=STAGES.map(([k,n,c])=>`<button type="button" data-st="${k}" aria-pressed="${k===PL.tab}" style="--c:${c}"><i style="background:${c}"></i>${n}<span class="num">${by[k].length}</span></button>`).join('');
  $('#board').innerHTML=STAGES.map(([k,n,c])=>{const c2=by[k],v=c2.reduce((s,l)=>s+(+l.valor||0),0),lim=PL.lim[k]||PL.step;
    return `<div class="col${k===PL.tab?' on':''}" data-stage="${k}"><div class="col-h"><b><i style="background:${c}"></i>${n}</b><span class="num">${c2.length}${v?' · '+eur(v):''}</span></div>${c2.slice(0,lim).map(card).join('')}${c2.length>lim?`<button type="button" class="col-more" data-more="${k}">Mostrar ${Math.min(PL.step,c2.length-lim)} más · quedan ${c2.length-lim}</button>`:''}</div>`;}).join('');
}

$('#plTabs').addEventListener('click',e=>{const b=e.target.closest('[data-st]');if(!b)return;PL.tab=b.dataset.st;board();});
$('#board').addEventListener('click',e=>{const b=e.target.closest('[data-more]');if(!b)return;e.stopPropagation();const k=b.dataset.more;PL.lim[k]=(PL.lim[k]||PL.step)+PL.step;board();});
