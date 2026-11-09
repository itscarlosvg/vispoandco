// editor
function leadOptions(sel){const s=$('#q-lead');s.innerHTML='';s.add(new Option('Elegir de mis clientes…',''));[...LEADS].sort((a,b)=>String(a.negocio).localeCompare(String(b.negocio))).forEach(l=>s.add(new Option(l.negocio+(l.nombre?' · '+l.nombre:''),l.id)));s.value=sel||'';}
function catOptions(){const s=$('#qCat');if(s.options.length)return;s.add(new Option('Añadir desde tarifas…',''));let g='',og=null;CAT.forEach((c,i)=>{if(c[0]!==g){g=c[0];og=document.createElement('optgroup');og.label=g;s.appendChild(og);}og.appendChild(new Option(`${c[1]} — ${c[4]==='mensual'?eur(c[3])+'/mes':eur(c[3])}`,String(i)));});}
function openQuote(id,preset){
  if(location.hash!=='#presupuestos'){location.hash='presupuestos';}
  const q=id?QUOTES.find(x=>x.id===id):(preset||blankQuote());if(!q)return;
  curQ=JSON.parse(JSON.stringify(q));curQ.id=id||null;qDirty=!id;
  catOptions();leadOptions(curQ.leadId);
  $('#q-num').value=curQ.numero;$('#q-fecha').value=curQ.fecha||TODAY();$('#q-validez').value=curQ.validez??30;$('#q-estado').value=curQ.estado||'borrador';
  ['negocio','nif','nombre','email','telefono','direccion'].forEach(k=>$('#q-c-'+k).value=curQ.cliente?.[k]||'');
  $('#q-desc').value=curQ.descuento||0;$('#q-iva').value=curQ.iva??21;$('#q-irpf').value=curQ.irpf||0;$('#q-notas').value=curQ.notas||'';$('#q-cond').value=curQ.condiciones||'';
  $('#qDel').hidden=!id;$('#qDelQ').hidden=true;$('#qErr').textContent='';
  drawLines();$('#qList').hidden=true;$('#qEd').hidden=false;qPreview();scrollTo({top:0,behavior:RM?'auto':'smooth'});}
function drawLines(){$('#qLines').innerHTML=curQ.lineas.length?curQ.lineas.map((l,i)=>`<div class="ql" data-i="${i}"><input class="ql-c" type="text" value="${esc(l.concepto)}" placeholder="Concepto" aria-label="Concepto"><input class="ql-d" type="text" value="${esc(l.detalle)}" placeholder="Qué incluye" aria-label="Detalle"><input class="ql-q" type="number" min="0" step="1" value="${l.cantidad}" aria-label="Cantidad"><input class="ql-p" type="number" min="0" step="1" value="${l.precio}" aria-label="Precio"><select class="ql-t" aria-label="Tipo"><option value="unico"${l.tipo!=='mensual'?' selected':''}>Pago único</option><option value="mensual"${l.tipo==='mensual'?' selected':''}>Mensual</option></select><button class="x" type="button" aria-label="Quitar línea">✕</button></div>`).join(''):'<div class="empty">Añade conceptos desde tus tarifas o una línea en blanco.</div>';}
function readForm(){curQ.fecha=$('#q-fecha').value;curQ.validez=Math.max(1,+$('#q-validez').value||30);curQ.estado=$('#q-estado').value;
  curQ.cliente=curQ.cliente||{};['negocio','nif','nombre','email','telefono','direccion'].forEach(k=>curQ.cliente[k]=$('#q-c-'+k).value.trim());
  curQ.descuento=Math.min(100,Math.max(0,+$('#q-desc').value||0));curQ.iva=Math.max(0,+$('#q-iva').value||0);curQ.irpf=Math.max(0,+$('#q-irpf').value||0);
  curQ.notas=$('#q-notas').value;curQ.condiciones=$('#q-cond').value;
  $$('#qLines .ql').forEach(r=>{const l=curQ.lineas[+r.dataset.i];if(!l)return;l.concepto=r.querySelector('.ql-c').value;l.detalle=r.querySelector('.ql-d').value;l.cantidad=Math.max(0,+r.querySelector('.ql-q').value||0);l.precio=Math.max(0,+r.querySelector('.ql-p').value||0);l.tipo=r.querySelector('.ql-t').value;});}
$('#qForm').addEventListener('input',()=>{if(!curQ)return;readForm();qDirty=true;qPreview();});
$('#qForm').addEventListener('change',e=>{if(!curQ)return;
  if(e.target.id==='q-lead'){const l=LEADS.find(x=>x.id===e.target.value);curQ.leadId=l?l.id:'';const c=clientFrom(l);['negocio','nif','nombre','email','telefono','direccion'].forEach(k=>$('#q-c-'+k).value=c[k]);}
  if(e.target.id==='qCat'&&e.target.value!==''){readForm();const c=CAT[+e.target.value];curQ.lineas.push({concepto:c[1],detalle:c[2],cantidad:1,precio:c[3],tipo:c[4]});e.target.value='';drawLines();}
  readForm();qDirty=true;qPreview();});
$('#qLines').addEventListener('click',e=>{const b=e.target.closest('.x');if(!b)return;readForm();curQ.lineas.splice(+b.closest('.ql').dataset.i,1);drawLines();qDirty=true;qPreview();});
$('#qAddLine').addEventListener('click',()=>{readForm();curQ.lineas.push({concepto:'',detalle:'',cantidad:1,precio:0,tipo:'unico'});drawLines();const r=$$('#qLines .ql-c');r[r.length-1]?.focus();qPreview();});
$('#qBack').addEventListener('click',closeQuote);
function closeQuote(){curQ=null;$('#qEd').hidden=true;$('#qList').hidden=false;renderQuotes();}
async function saveQuote(){if(!curQ)return null;readForm();$('#qErr').textContent='';
  if(!curQ.cliente.negocio){$('#qErr').textContent='Indica el cliente.';$('#q-c-negocio').focus();return null;}
  if(!curQ.lineas.some(l=>l.concepto.trim())){$('#qErr').textContent='Añade al menos un concepto.';return null;}
  const body={numero:curQ.numero,leadId:curQ.leadId||'',cliente:curQ.cliente,fecha:curQ.fecha,validez:curQ.validez,estado:curQ.estado,estadoFecha:(QUOTES.find(q=>q.id===curQ.id)||{}).estado===curQ.estado?((QUOTES.find(q=>q.id===curQ.id)||{}).estadoFecha||curQ.fecha):TODAY(),lineas:cleanLines(curQ.lineas.filter(l=>l.concepto.trim())),descuento:curQ.descuento,iva:curQ.iva,irpf:curQ.irpf,notas:curQ.notas,condiciones:curQ.condiciones,actualizado:new Date().toISOString()};
  try{if(curQ.id){await db.collection('presupuestos').doc(curQ.id).update(body);}else{body.creado=body.actualizado;const ref=db.collection('presupuestos').doc();await ref.set(body);curQ.id=ref.id;$('#qDel').hidden=false;}
    qDirty=false;$('#qSaved').textContent='Guardado';setTimeout(()=>$('#qSaved').textContent='',1800);return curQ.id;}
  catch(e){$('#qErr').textContent=dbMsg(e);return null;}}
$('#qForm').addEventListener('submit',e=>{e.preventDefault();saveQuote();});
$('#qDel').addEventListener('click',()=>{$('#qDel').hidden=true;$('#qDelQ').hidden=false;});
$('#qDelN').addEventListener('click',()=>{$('#qDel').hidden=false;$('#qDelQ').hidden=true;});
$('#qDelY').addEventListener('click',async()=>{try{await db.collection('presupuestos').doc(curQ.id).delete();closeQuote();}catch(e){$('#qErr').textContent=dbMsg(e);}});

function validUntil(q){const d=parseDay(q.fecha)||new Date();d.setDate(d.getDate()+(+q.validez||30));return isoDay(d);}
const longDate=s=>{const d=parseDay(s);return d?`${d.getDate()} de ${MONL[d.getMonth()]} de ${d.getFullYear()}`:'';};
function qPreview(){if(!curQ)return;const q=curQ,c=qCalc(q),cl=q.cliente||{};
  const uni=q.lineas.filter(l=>l.tipo!=='mensual'&&l.concepto.trim()),men=q.lineas.filter(l=>l.tipo==='mensual'&&l.concepto.trim());
  const row=l=>`<tr><td><b>${esc(l.concepto)}</b>${l.detalle?`<small>${esc(l.detalle)}</small>`:''}</td><td class="r">${+l.cantidad}</td><td class="r">${eur2(l.precio)}</td><td class="r">${eur2((+l.cantidad||0)*(+l.precio||0))}</td></tr>`;
  const coLines=[CO.titular,CO.nif&&'NIF '+CO.nif,CO.direccion,[CO.email,CO.telefono].filter(Boolean).join(' · ')].filter(Boolean);
  const clLines=[cl.nombre,cl.nif&&'NIF '+cl.nif,cl.direccion,[cl.email,cl.telefono].filter(Boolean).join(' · ')].filter(Boolean);
  $('#qDoc').innerHTML=`<div class="dh">${LOGO_SVG}<div class="t"><h3>PRESUPUESTO</h3><small>Nº ${esc(q.numero)}</small><small>Fecha: ${esc(longDate(q.fecha))}</small><small>Válido hasta: ${esc(longDate(validUntil(q)))}</small></div></div>
  <div class="parties"><div><span>DE</span><b>${esc(CO.nombre||'Vispo & Co.')}</b>${coLines.map(x=>`<p>${esc(x)}</p>`).join('')}</div><div><span>PARA</span><b>${esc(cl.negocio||'Cliente')}</b>${clLines.map(x=>`<p>${esc(x)}</p>`).join('')}</div></div>
  <table><thead><tr><th>Concepto</th><th class="r">Cant.</th><th class="r">Precio</th><th class="r">Importe</th></tr></thead><tbody>
  ${uni.length&&men.length?'<tr class="sec"><td colspan="4">Pago único</td></tr>':''}${uni.map(row).join('')}
  ${men.length?'<tr class="sec"><td colspan="4">Cuotas mensuales</td></tr>'+men.map(row).join(''):''}
  ${!uni.length&&!men.length?'<tr><td colspan="4" style="color:#8C8B93">Sin conceptos</td></tr>':''}</tbody></table>
  <div class="tots">${c.uni?`<div><span>Subtotal</span><span>${eur2(c.uni)}</span></div>${c.desc?`<div><span>Descuento (${+q.descuento} %)</span><span>−${eur2(c.desc)}</span></div><div><span>Base imponible</span><span>${eur2(c.base)}</span></div>`:''}<div><span>IVA (${+q.iva} %)</span><span>${eur2(c.iva)}</span></div>${c.irpf?`<div><span>Retención IRPF (${+q.irpf} %)</span><span>−${eur2(c.irpf)}</span></div>`:''}<div class="tt"><span>Total</span><b>${eur2(c.total)}</b></div>`:''}
  ${c.men?`<div class="mo"><span>Cuota mensual: ${eur2(c.men)} + IVA</span><b>${eur2(c.mTotal)}/mes</b></div>`:''}</div>
  <div class="cond">${q.notas?`<div><b>Notas.</b> ${esc(q.notas)}</div>`:''}${q.condiciones?`<div><b>Condiciones.</b> ${esc(q.condiciones)}</div>`:''}${CO.iban?`<div><b>Pago por transferencia:</b> ${esc(CO.iban)}</div>`:''}</div>
  <div class="foot"><span>${esc([CO.nombre||'Vispo & Co.',CO.email,CO.web].filter(Boolean).join(' · '))}</span><span>${esc(q.numero)}</span></div>`;
  const c2=qCalc(q);$('#qTot').innerHTML=`${c2.uni?`<div><span>Base imponible</span><b>${eur2(c2.base)}</b></div><div><span>IVA</span><b>${eur2(c2.iva)}</b></div>${c2.irpf?`<div><span>IRPF</span><b>−${eur2(c2.irpf)}</b></div>`:''}<div class="big"><span>Total</span><b>${eur2(c2.total)}</b></div>`:''}${c2.men?`<div><span>Cuota con IVA</span><b>${eur2(c2.mTotal)}/mes</b></div>`:''}`;}

