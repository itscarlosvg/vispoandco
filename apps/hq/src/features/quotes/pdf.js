// PDF
let pdfLibP=null;
function loadPdfLib(){return pdfLibP||(pdfLibP=new Promise((res,rej)=>{if(window.PDFLib)return res(window.PDFLib);const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js';s.onload=()=>window.PDFLib?res(window.PDFLib):rej(new Error('pdf'));s.onerror=()=>{pdfLibP=null;rej(new Error('pdf'));};document.head.appendChild(s);}));}
function logoPng(){return new Promise(res=>{const svg=LOGO_SVG.replace(/var\(--paper\)/g,'#111214').replace(/var\(--acc\)/g,'#E8336F').replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" width="922" height="232" ');
  const img=new Image();img.onload=()=>{try{const cv=document.createElement('canvas');cv.width=922;cv.height=232;cv.getContext('2d').drawImage(img,0,0,922,232);res(cv.toDataURL('image/png'));}catch(_){res(null);}};img.onerror=()=>res(null);
  img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);});}
const WIN=new Set('€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ');
const pdfSafe=t=>String(t??'').replace(/[   ]/g,' ').replace(/−/g,'-').replace(/[^\x00-\xFF]/g,c=>WIN.has(c)?c:'?').replace(/[\x00-\x09\x0B-\x1F]/g,' ');
async function buildPdf(q){const P=await loadPdfLib();const {PDFDocument,StandardFonts,rgb}=P;
  const doc=await PDFDocument.create();doc.setTitle(`Presupuesto ${q.numero}`);doc.setAuthor(CO.nombre||'Vispo & Co.');
  const F=await doc.embedFont(StandardFonts.Helvetica),FB=await doc.embedFont(StandardFonts.HelveticaBold);
  const C={ink:rgb(.067,.071,.078),txt:rgb(.24,.24,.27),mut:rgb(.43,.43,.46),line:rgb(.925,.91,.88),fill:rgb(.957,.945,.925),acc:rgb(.91,.2,.435),accInk:rgb(.70,.086,.31)};
  const W=595.28,H=841.89,M=48,CW=W-2*M;let pg,y;const pages=[];
  const pngUrl=await logoPng();const logo=pngUrl?await doc.embedPng(pngUrl):null;
  const text=(t,x,yy,o={})=>{const f=o.bold?FB:F,s=o.size||9.5;t=pdfSafe(t);let xx=x;if(o.align==='right')xx=x-f.widthOfTextAtSize(t,s);pg.drawText(t,{x:xx,y:yy,size:s,font:f,color:o.color||C.ink});};
  const wrap=(t,f,s,maxW)=>{const out=[];String(pdfSafe(t)).split('\n').forEach(par=>{let line='';par.split(/\s+/).forEach(w=>{const tryL=line?line+' '+w:w;if(f.widthOfTextAtSize(tryL,s)<=maxW)line=tryL;else{if(line)out.push(line);while(f.widthOfTextAtSize(w,s)>maxW&&w.length>1){let k=w.length;while(k>1&&f.widthOfTextAtSize(w.slice(0,k),s)>maxW)k--;out.push(w.slice(0,k));w=w.slice(k);}line=w;}});out.push(line);});return out;};
  const newPage=(first)=>{pg=doc.addPage([W,H]);pages.push(pg);y=H-M;
    if(first){if(logo){const lw=140,lh=lw*232/922;pg.drawImage(logo,{x:M,y:y-lh+4,width:lw,height:lh});}
      text('PRESUPUESTO',W-M,y-12,{bold:true,size:20,align:'right'});
      text('Nº '+q.numero,W-M,y-28,{size:9.5,color:C.txt,align:'right'});text('Fecha: '+longDate(q.fecha),W-M,y-41,{size:9.5,color:C.txt,align:'right'});text('Válido hasta: '+longDate(validUntil(q)),W-M,y-54,{size:9.5,color:C.txt,align:'right'});
      y-=66;pg.drawRectangle({x:M,y,width:CW,height:2,color:C.acc});y-=24;}
    else{text(`Presupuesto ${q.numero} · continuación`,M,y-6,{size:9,color:C.mut});y-=26;}};
  const footer=()=>{pages.forEach((p,i)=>{pg=p;pg.drawLine({start:{x:M,y:M-8},end:{x:W-M,y:M-8},thickness:.6,color:C.line});
    text([CO.nombre||'Vispo & Co.',CO.email,CO.web].filter(Boolean).join(' · '),M,M-22,{size:8,color:C.mut});text(`Página ${i+1} de ${pages.length}`,W-M,M-22,{size:8,color:C.mut,align:'right'});});};
  const need=h=>{if(y-h<M+10)newPage(false);};
  newPage(true);
  // parties
  const cl=q.cliente||{},colW=(CW-24)/2;
  const coL=[CO.titular,CO.nif&&'NIF '+CO.nif,CO.direccion,CO.email,CO.telefono].filter(Boolean),clL=[cl.nombre,cl.nif&&'NIF '+cl.nif,cl.direccion,cl.email,cl.telefono].filter(Boolean);
  const party=(x,lab,name,lines)=>{let yy=y;text(lab,x,yy,{bold:true,size:7.5,color:C.accInk});yy-=14;wrap(name,FB,10.5,colW).forEach(l=>{text(l,x,yy,{bold:true,size:10.5});yy-=13;});lines.forEach(ln=>wrap(ln,F,9,colW).forEach(l=>{text(l,x,yy,{size:9,color:C.txt});yy-=12;}));return yy;};
  y=Math.min(party(M,'DE',CO.nombre||'Vispo & Co.',coL),party(M+colW+24,'PARA',cl.negocio||'Cliente',clL))-18;
  // table
  const cx={q:M+CW-196,p:M+CW-96,i:M+CW-8},concW=CW-230;
  const head=()=>{need(30);pg.drawRectangle({x:M,y:y-8,width:CW,height:20,color:C.fill});text('CONCEPTO',M+8,y-1,{bold:true,size:7.5,color:C.mut});text('CANT.',cx.q,y-1,{bold:true,size:7.5,color:C.mut,align:'right'});text('PRECIO',cx.p,y-1,{bold:true,size:7.5,color:C.mut,align:'right'});text('IMPORTE',cx.i,y-1,{bold:true,size:7.5,color:C.mut,align:'right'});y-=26;};
  const uni=q.lineas.filter(l=>l.tipo!=='mensual'),men=q.lineas.filter(l=>l.tipo==='mensual');
  const rowP=l=>{const cl1=wrap(l.concepto,FB,9.5,concW),dl=l.detalle?wrap(l.detalle,F,8.5,concW):[];const h=cl1.length*12+dl.length*11+10;
    if(y-h<M+10){newPage(false);head();}
    let yy=y;cl1.forEach((t,i)=>{text(t,M+8,yy,{bold:true,size:9.5});yy-=12;});dl.forEach(t=>{text(t,M+8,yy,{size:8.5,color:C.mut});yy-=11;});
    text(String(+l.cantidad),cx.q,y,{size:9.5,align:'right'});text(eur2(l.precio),cx.p,y,{size:9.5,align:'right'});text(eur2((+l.cantidad||0)*(+l.precio||0)),cx.i,y,{size:9.5,align:'right'});
    y=yy-4;pg.drawLine({start:{x:M,y:y+6},end:{x:W-M,y:y+6},thickness:.5,color:C.line});y-=8;};
  const secT=t=>{need(40);text(t.toUpperCase(),M+8,y,{bold:true,size:7.5,color:C.accInk});y-=16;};
  head();
  if(uni.length&&men.length)secT('Pago único');uni.forEach(rowP);
  if(men.length){secT('Cuotas mensuales');men.forEach(rowP);}
  // totals
  const c=qCalc(q),tx=M+CW-230;const tl=(a,b,o={})=>{need(18);text(a,tx,y,{size:o.size||9.5,bold:o.bold,color:o.color||C.txt});text(b,M+CW-8,y,{size:o.size||9.5,bold:o.bold,color:o.vcolor||C.ink,align:'right'});y-=o.gap||15;};
  y-=6;
  if(c.uni){tl('Subtotal',eur2(c.uni));if(c.desc){tl(`Descuento (${+q.descuento} %)`,'-'+eur2(c.desc));tl('Base imponible',eur2(c.base));}
    tl(`IVA (${+q.iva} %)`,eur2(c.iva));if(c.irpf)tl(`Retención IRPF (${+q.irpf} %)`,'-'+eur2(c.irpf));
    need(30);pg.drawLine({start:{x:tx,y:y+8},end:{x:M+CW,y:y+8},thickness:1.2,color:C.ink});y-=6;tl('TOTAL',eur2(c.total),{bold:true,size:13,color:C.ink,vcolor:C.acc,gap:22});}
  if(c.men){tl('Cuota mensual (sin IVA)',eur2(c.men));tl(`IVA (${+q.iva} %)`,eur2(c.mIva));if(c.mIrpf)tl(`Retención IRPF (${+q.irpf} %)`,'-'+eur2(c.mIrpf));tl('TOTAL AL MES',eur2(c.mTotal),{bold:true,size:11,vcolor:C.acc,gap:20});}
  // notes & conditions
  y-=8;const para=(lab,t)=>{if(!t)return;const ls=wrap(t,F,8.8,CW);need(16+ls.length*11.5);text(lab,M,y,{bold:true,size:8.8});y-=13;ls.forEach(l=>{need(12);text(l,M,y,{size:8.8,color:C.txt});y-=11.5;});y-=8;};
  para('Notas',q.notas);para('Condiciones',q.condiciones);if(CO.iban)para('Pago por transferencia',CO.iban);
  // acceptance
  need(70);y-=10;text('Conforme del cliente',M,y,{bold:true,size:8.8});text('Fecha',M+CW/2+12,y,{bold:true,size:8.8});y-=40;
  pg.drawLine({start:{x:M,y},end:{x:M+CW/2-12,y},thickness:.6,color:C.mut});pg.drawLine({start:{x:M+CW/2+12,y},end:{x:W-M,y},thickness:.6,color:C.mut});
  footer();return await doc.save();}
$('#qPdf').addEventListener('click',async()=>{const b=$('#qPdf');const id=await saveQuote();if(!id)return;b.disabled=true;b.textContent='Generando…';
  try{const bytes=await buildPdf(curQ);const dl=await window.claude?.use?.('downloads');
    const name=`Presupuesto ${curQ.numero} ${curQ.cliente.negocio}`.replace(/[\\/:*?"<>|]+/g,' ').trim()+'.pdf';
    if(!dl){$('#qErr').textContent='Las descargas no están disponibles en esta vista.';}
    else{try{await dl.save({filename:name,data:new Blob([bytes],{type:'application/pdf'})});}catch(e){if(e&&e.code!=='declined')$('#qErr').textContent='No se pudo descargar el PDF.';}}}
  catch(e){$('#qErr').textContent='No se pudo generar el PDF. Revisa la conexión e inténtalo otra vez.';}
  b.disabled=false;b.textContent='Descargar PDF';});

/* ---------- Harvey ---------- */
