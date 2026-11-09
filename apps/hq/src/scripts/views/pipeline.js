function dateBox(s,withTime){const d=parseDay(s);if(!d)return '<span class="date"><small>sin</small><b>—</b></span>';const t=isoDay(d)===TODAY();
  return `<span class="date${t?' today':''}"><small>${t?'hoy':DOW[d.getDay()]}</small><b>${d.getDate()}</b><small>${withTime?String(s).slice(11,16):MON[d.getMonth()]}</small></span>`;}
function card(l){const now=TODAY();const od=l.proxima&&l.proxima<now&&OPEN.includes(l.etapa);
  return `<article class="lc" draggable="true" data-lead="${esc(l.id)}" tabindex="0"><div><b>${esc(l.negocio||'Sin nombre')}</b><br><small>${esc([l.nombre,l.ciudad].filter(Boolean).join(' · ')||l.sector||'')}</small></div>
  ${(+l.valor||+l.mensual)?`<span class="val num">${+l.valor?eur(l.valor):''}${+l.mensual?` <em>+${eur(l.mensual)}/mes</em>`:''}</span>`:''}
  <div class="meta"><span class="chip">${esc(l.fuente||'Otro')}</span>${l.reunion&&l.reunion.slice(0,10)>=now?`<span class="chip warn">${fmtDay(l.reunion)} ${l.reunion.slice(11,16)}</span>`:''}${l.proxima&&OPEN.includes(l.etapa)?`<span class="chip ${od?'bad':'acc'}">${od?'Atrasado':fmtDay(l.proxima)}</span>`:''}${l.ejemplo?'<span class="chip ex">Ejemplo</span>':''}</div></article>`;}
function board(){
  const q=$('#plQ').value.trim().toLowerCase(),src=$('#plSrc').value;
  const ls=LEADS.filter(l=>(!src||l.fuente===src)&&(!q||[l.negocio,l.nombre,l.ciudad,l.sector,l.servicios].join(' ').toLowerCase().includes(q)));
  $('#board').innerHTML=STAGES.map(([k,n,c])=>{const c2=ls.filter(l=>l.etapa===k).sort((a,b)=>(a.proxima||'9')<(b.proxima||'9')?-1:1);const v=c2.reduce((s,l)=>s+(+l.valor||0),0);
    return `<div class="col" data-stage="${k}"><div class="col-h"><b><i style="background:${c}"></i>${n}</b><span class="num">${c2.length}${v?' · '+eur(v):''}</span></div>${c2.map(card).join('')||''}</div>`;}).join('');
}
