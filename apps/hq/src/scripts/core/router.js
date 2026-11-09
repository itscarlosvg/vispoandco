const LOGO_SVG=document.querySelector('.side .logo').outerHTML;
function show(v){if(!VIEWS[v])v='resumen';
  document.body.classList.toggle('hv-view',v==='harvey');
  $$('[data-v]').forEach(s=>s.hidden=s.dataset.v!==v);
  $$('.nav button').forEach(b=>b.dataset.go===v?b.setAttribute('aria-current','page'):b.removeAttribute('aria-current'));
  $('#vTitle').textContent=VIEWS[v][0];$('#vSub').textContent=VIEWS[v][1]||subFor(v);
  if(v==='harvey')setTimeout(()=>$('#hvIn').focus(),50);
  if(v==='objetivos'&&typeof renderGoalsView==='function'){$('#gForm').innerHTML='';renderGoalsView();}}
function subFor(v){const d=new Date();if(v==='resumen')return `${DOW[d.getDay()]} ${d.getDate()} de ${MONL[d.getMonth()]} de ${d.getFullYear()}`;return '';}
$$('.nav button').forEach(b=>b.addEventListener('click',()=>{if(location.hash!=='#'+b.dataset.go)location.hash=b.dataset.go;else show(b.dataset.go);}));
addEventListener('hashchange',()=>show(location.hash.slice(1)));
show(location.hash.slice(1)||'resumen');

/* ---------- render ---------- */
