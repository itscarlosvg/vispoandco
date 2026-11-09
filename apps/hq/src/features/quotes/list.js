// list
function renderQuotes(){
  const rows=[...QUOTES].sort((a,b)=>String(b.numero).localeCompare(String(a.numero)));
  $('#qRows').innerHTML=rows.length?rows.map(q=>{const c=qCalc(q);const st=QST[q.estado]||QST.borrador;return `<tr data-q="${esc(q.id)}"><td><b>${esc(q.numero)}</b></td><td>${esc(q.cliente?.negocio||'—')}</td><td>${esc(fmtDay(q.fecha))}</td><td class="r">${eur2(c.total)}</td><td class="r">${c.men?eur2(c.mTotal)+'/mes':'—'}</td><td><span class="chip ${st[1]}">${st[0]}</span></td></tr>`;}).join(''):`<tr><td colspan="6"><div class="empty">Aún no hay presupuestos. Crea uno o pídeselo a Harvey.</div></td></tr>`;
}
document.addEventListener('click',e=>{const o=e.target.closest('[data-openq]');if(o&&!e.target.closest('#hvMsgs'))openQuote(o.dataset.openq);});
$('#qRows').addEventListener('click',e=>{const r=e.target.closest('[data-q]');if(r)openQuote(r.dataset.q);});
$('#qNew').addEventListener('click',()=>openQuote(null));

