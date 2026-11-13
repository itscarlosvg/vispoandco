const REP={'':'',semanal:'Cada semana',mensual:'Cada mes'};
function agenda(S){
  $('#meetN').textContent=S.meets.length?S.meets.length+' próximas':'';
  $('#meetings').innerHTML=S.meets.length?S.meets.map(l=>`<li class="row" data-lead="${esc(l.id)}">${dateBox(l.reunion,true)}<div><b>${esc(l.negocio)}</b><small>${esc([l.nombre,l.formato,l.servicios].filter(Boolean).join(' · '))}</small></div><span class="chip">${esc(stName(l.etapa))}</span></li>`).join(''):'<li class="empty">Sin reuniones. Ponles fecha desde la ficha del cliente.</li>';
  const now=TODAY();const ts=TASKS.filter(t=>showDone||!t.hecho).sort((a,b)=>(a.hecho-b.hecho)||((a.fecha||'9')+(a.hora||'')<(b.fecha||'9')+(b.hora||'')?-1:1));
  const grp=t=>t.hecho?'Hechos':!t.fecha?'Sin fecha':t.fecha<now?'Atrasados':t.fecha===now?'Hoy':'Próximos';
  let last='';
  $('#tasks').innerHTML=ts.length?ts.map(t=>{const g=grp(t);const h=g!==last?`<li class="tgrp">${g}</li>`:'';last=g;
    return h+`<li class="task${t.hecho?' done':''}"><input type="checkbox" data-tk="${esc(t.id)}" ${t.hecho?'checked':''} aria-label="Hecho"><div class="tt"><span>${esc(t.texto)}</span><div class="tm">${t.fecha?`<span class="chip ${!t.hecho&&t.fecha<now?'bad':t.fecha===now?'acc':''}">${t.fecha===now?'Hoy':fmtDay(t.fecha)}${t.hora?' · '+t.hora:''}</span>`:''}${t.repetir?`<span class="chip">↻ ${REP[t.repetir]}</span>`:''}${t.leadNombre?esc(t.leadNombre):''}${t.ejemplo?'<span class="chip ex">Ejemplo</span>':''}</div></div><button class="x" type="button" data-tdel="${esc(t.id)}" aria-label="Borrar recordatorio">✕</button></li>`;}).join(''):'<li class="empty">Sin recordatorios pendientes</li>';
}

/* ---------- interactions ---------- */
document.addEventListener('click',e=>{const r=e.target.closest('[data-lead]');if(r&&!e.target.closest('.lc.drag')&&!TD.justDropped)openLead(r.dataset.lead);
  const tk=e.target.closest('[data-task]');if(tk)location.hash='agenda';});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('.lc'))openLead(e.target.dataset.lead);});
$('#plQ').addEventListener('input',board);$('#plSrc').addEventListener('change',board);
