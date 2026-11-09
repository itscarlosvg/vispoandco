async function exportCSV(name,head,rows){const q=v=>{v=String(v??'');return /[;"\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;};
  const csv='\ufeff'+[head,...rows].map(r=>r.map(q).join(';')).join('\r\n');
  const dl=await window.claude?.use?.('downloads');if(!dl){showNote('Las descargas no están disponibles en esta vista.');return;}
  try{await dl.save({filename:name,data:csv});}catch(e){if(e&&e.code!=='declined')showNote('No se pudo descargar el archivo.');}}
$('#expL').addEventListener('click',()=>exportCSV(`clientes-${TODAY()}.csv`,['Negocio','Contacto','Sector','Ciudad','Email','Teléfono','Web','Fuente','Etapa','Valor','Cuota mensual','Servicios','Próxima acción','Reunión','Creado','Cerrado','Notas'],
  LEADS.map(l=>[l.negocio,l.nombre,l.sector,l.ciudad,l.email,l.telefono,l.web,l.fuente,stName(l.etapa),+l.valor||0,+l.mensual||0,l.servicios,l.proxima,l.reunion,(l.creado||'').slice(0,10),l.cerrado||'',l.nota])));
$('#expQ').addEventListener('click',()=>exportCSV(`presupuestos-${TODAY()}.csv`,['Número','Cliente','Fecha','Estado','Base imponible','IVA','Total','Cuota mensual con IVA'],
  QUOTES.map(q=>{const c=qCalc(q);return [q.numero,q.cliente?.negocio,q.fecha,(QST[q.estado]||QST.borrador)[0],c.base.toFixed(2).replace('.',','),c.iva.toFixed(2).replace('.',','),c.total.toFixed(2).replace('.',','),c.mTotal.toFixed(2).replace('.',',')];})));

/* ---------- import ---------- */
$('#impRead').addEventListener('click',async()=>{const txt=$('#impText').value.trim(),er=$('#impErr');er.textContent='';
  if(txt.length<20){er.textContent='Pega el mensaje completo.';return;}
  const sample=await getSample();if(!sample){er.textContent='Harvey no está disponible en esta vista.';return;}
  const b=$('#impRead');b.disabled=true;b.textContent='Leyendo…';
  try{const r=await sample.json(`Extrae los datos de esta solicitud de presupuesto para el CRM de una agencia (webs, apps, vídeo, IA). Devuelve SOLO un objeto JSON con estas claves (cadena vacía o 0 si no aparece): negocio, nombre, sector (uno de: ${SECT.join(' | ')}), ciudad, email, telefono, web, servicios (lista corta separada por comas), valor (número en euros del pago único estimado), mensual (número en euros al mes), reunion (formato YYYY-MM-DDTHH:MM si se pide una reunión con fecha y hora; año actual ${new Date().getFullYear()}), formato (Videollamada | Llamada telefónica | En persona | vacío), nota (una frase con lo más importante).\n\nSolicitud:\n"""${txt.slice(0,8000)}"""`,{modelTier:'quick'});
    const o=Object.assign({fuente:/instagram/i.test(txt)?'Instagram':'Web',etapa:r&&r.reunion?'reunion':'nuevo',proxima:TODAY()},r||{});
    impPreview(o);}
  catch(e){er.textContent=sampleMsg(e);}
  b.disabled=false;b.textContent='Leer con Harvey';});
