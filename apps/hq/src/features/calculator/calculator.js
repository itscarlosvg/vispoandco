// ---------- calculadora: precios de partida para preparar propuestas (solo en el panel) ----------
(()=>{
  const QZ=[
    {k:'neg',t:'Tu negocio',h:'Cuéntanos de qué es tu negocio',g:[
      {id:'sector',type:'radio',lbl:'Sector',def:'Restaurante o cafetería',opts:[['Restaurante o cafetería'],['Hotel o alojamiento'],['Tienda'],['Salud o estética'],['Gimnasio o deporte'],['Academia o formación'],['Servicios profesionales'],['Otro']]},
      {id:'actual',type:'radio',lbl:'Ahora mismo',def:'Empiezo de cero',opts:[['Empiezo de cero'],['Tengo web y quiero renovarla'],['Tengo web y quiero vender más']]}]},
    {k:'web',t:'Web',h:'Tu web',g:[
      {id:'web',type:'card',lbl:'Tipo de web',ln:'Web',cat:'web',def:'corp',wk:{land:[1,2],corp:[2,3],big:[3,5],shop:[4,6]},opts:[['no','Sin web',0,0,'Ahora no la necesito'],['land','Página única',190,0,'Todo lo esencial en una página'],['corp','Corporativa',390,0,'Hasta 5 páginas'],['big','Amplia',790,0,'De 6 a 12 páginas'],['shop','Tienda online',990,0,'Catálogo, carrito y pagos']]},
      {id:'webx',type:'check',lbl:'Funciones',cat:'web',needs:'web',opts:[['res','Reservas online',150],['ped','Pedidos para recoger o a domicilio',250],['qr','Carta o catálogo con QR',120],['pay','Pagos online',120],['login','Área de clientes',290],['blog','Blog o novedades',90],['seo','SEO local',190],['txt','Redacción de textos',90],['p3d','Diseño premium con 3D y animaciones',220]]},
      {id:'lang',type:'radio',lbl:'Idiomas',ln:'Idiomas',cat:'web',needs:'web',def:'1',opts:[['1','Uno',0],['2','Dos',90],['3','Tres',170],['4','Cuatro o más',240]]}]},
    {k:'app',t:'App',h:'Tu app para iOS, Android y web',g:[
      {id:'app',type:'card',lbl:'Tipo de app',ln:'App',cat:'app',def:'no',wk:{basic:[6,8],users:[8,12],custom:[12,16]},opts:[['no','Sin app',0,0,'Ahora no la necesito'],['basic','Sencilla',2190,0,'Información, carta o catálogo y reservas'],['users','Con usuarios y pagos',4400,0,'Cuentas, pedidos, pagos y avisos'],['custom','A medida',7900,0,'Funciones propias y lógica avanzada']]},
      {id:'appx',type:'check',lbl:'Extras',cat:'app',needs:'app',opts:[['panel','Panel de gestión web',890],['push','Notificaciones push',190],['fid','Puntos y fidelización',490],['tpv','Conexión con tu TPV o software',450],['stores','Publicación en App Store y Google Play',150]]}]},
    {k:'ia',t:'IA',h:'Inteligencia artificial que trabaja por ti',g:[
      {id:'aia',type:'check',lbl:'Automatización',cat:'ia',wkAll:[1,2],opts:[['wa','Asistente en WhatsApp e Instagram',490,49],['agenda','Reservas y pedidos automáticos en tu calendario',290,0],['rev','Respuestas a reseñas de Google',190,19],['mail','Emails y facturas automáticas',250,15],['custom','Automatización a medida',450,0]]},
      {id:'call',type:'card',lbl:'Recepcionista telefónica con IA',ln:'Llamadas con IA',cat:'ia',def:'no',wk:{in:[2,3],inout:[2,4]},opts:[['no','Sin llamadas',0,0,'Ahora no la necesito'],['in','Atiende llamadas',690,89,'24/7, en el idioma de quien llama'],['inout','Atiende y llama',990,129,'Además confirma y recuerda citas']]},
      {id:'callx',type:'check',lbl:'Extras de llamadas',cat:'ia',needs:'call',opts:[['voz','Voz propia de tu marca',250],['sys','Conexión con tu sistema de reservas',190]]}]},
    {k:'vid',t:'Vídeo y marca',h:'Vídeo, redes y marca',g:[
      {id:'vid',type:'check',lbl:'Vídeo',cat:'vid',wkAll:[1,2],opts:[['intro','Intro de logo animada',150],['spot','Spot promocional de 30 a 60 s',290],['m3d','Vídeo 3D y motion avanzado',390],['rodaje','Grabación en tu local',120]]},
      {id:'reels',type:'radio',lbl:'Reels al mes',ln:'Reels',cat:'vid',def:'0',opts:[['0','Ninguno',0,0],['4','4 al mes',0,90],['8','8 al mes',0,160],['12','12 al mes',0,220]]},
      {id:'marca',type:'check',lbl:'Marca',cat:'vid',wkAll:[1,2],opts:[['logo','Logo',190],['ident','Identidad completa',490],['plant','Plantillas para redes',120],['gbp','Ficha de Google optimizada',90]]}]},
    {k:'mant',t:'Mantenimiento',h:'Mantenimiento y plazos',g:[
      {id:'mant',type:'card',lbl:'Mantenimiento y alojamiento',ln:'Mantenimiento',def:'basic',opts:[['no','Sin mantenimiento',0,0,'Te lo entregamos y lo gestionas tú'],['basic','Básico',0,10,'Alojamiento, dominio, SSL y copias'],['pro','Pro',0,29,'Básico, cambios cada mes e informe'],['prem','Premium',0,49,'Pro, soporte prioritario y mejoras']]},
      {id:'urg',type:'radio',lbl:'Plazo de entrega',def:'norm',opts:[['norm','Normal',0],['urg','Urgente',0]]}]},]; 
  const G={};QZ.forEach(st=>st.g.forEach(g=>{g.step=st.k;G[g.id]=g;}));
  const tag=(o,check)=>{const a=o[2]||0,m=o[3]||0;if(!a&&!m)return'';
    if(check)return (a?'+'+eur(a):'')+(a&&m?' · ':'')+(m?eur(m)+'/mes':'');
    return a?(eur(a)+(m?' + '+eur(m)+'/mes':'')):(eur(m)+'/mes');};
  const DEF={};Object.values(G).forEach(g=>DEF[g.id]=g.type==='check'?[]:g.def);
  function calc(S){
    let one=0,mo=0;const lines=[],cats=new Set(),wk=[0,0];
    const add=(name,a,m,g,key,desc)=>{if(!a&&!m)return;one+=a;mo+=m;lines.push([name,a,m,0,desc||'']);if(g.cat)cats.add(g.cat);
      const w=(g.wk&&g.wk[key])||g.wkAll;if(w){wk[0]=Math.max(wk[0],w[0]);wk[1]=Math.max(wk[1],w[1]);}};
    Object.values(G).forEach(g=>{
      if(g.needs&&(S[g.needs]||'no')==='no')return;
      if(!g.opts[0][2]&&g.opts[0][2]!==0&&g.type!=='card')return;
      const pick=g.type==='check'?S[g.id]:[S[g.id]];
      pick.forEach(key=>{const o=g.opts.find(x=>x[0]===key);if(!o)return;let a=o[2]||0;
        if(g.id==='marca'&&key==='logo'&&S.marca.includes('ident'))a=0;
        add(g.ln&&g.type!=='check'?g.ln+' · '+o[1]:o[1],a,o[3]||0,g,key,o[4]);});});
    const sub=one;let disc=0,urg=0;
    if(cats.size>=3&&one>0){disc=Math.round(one*.1);lines.push(['Descuento pack',-disc,0,'disc','']);one-=disc;}
    if(S.urg==='urg'&&one>0){urg=Math.round(one*.2);lines.push(['Entrega urgente',urg,0,0,'Plazo reducido']);one+=urg;}
    one=Math.round(one/10)*10;
    let plazo='—';
    if(wk[1]){let lo=wk[0],hi=wk[1]+(cats.size>1?1:0);if(S.urg==='urg'){lo=Math.max(1,Math.ceil(lo*.7));hi=Math.ceil(hi*.7);}plazo=lo===hi?lo+' semanas':lo+'–'+hi+' semanas';}
    return {one,mo,lines,plazo,cats,sub,disc};
  }

  const root=$('#cz'),panes=$('#czPanes');
  panes.innerHTML=QZ.map(st=>`<div class="cz-pane" data-pane="${st.k}" hidden>`+st.g.map(g=>{
    let inner;
    if(g.type==='card')inner=`<div class="cz-cards">`+g.opts.map(o=>`<label class="cz-c"><input type="radio" name="c-${g.id}" value="${esc(o[0])}"><span><b>${esc(o[1])}</b><small>${esc(o[4]||'')}</small><em>${tag(o)||'&nbsp;'}</em></span></label>`).join('')+'</div>';
    else inner=`<div class="cz-opts">`+g.opts.map(o=>`<label class="cz-o"><input type="${g.type==='check'?'checkbox':'radio'}" name="c-${g.id}" value="${esc(o[0])}"><span>${esc(o[1]||o[0])}<em>${g.id==='urg'&&o[0]==='urg'?'+20 %':tag(o,g.type==='check')}</em></span></label>`).join('')+'</div>';
    return `<div class="cz-g" data-g="${g.id}"><span class="lbl">${esc(g.lbl)}</span>${inner}</div>`;}).join('')+'</div>').join('');
  $('#czSteps').innerHTML=QZ.map((st,i)=>`<button type="button" data-i="${i}"><i>${i+1}</i>${esc(st.t)}</button>`).join('');

  function read(){const S={};Object.values(G).forEach(g=>{const ins=$$(`#cz input[name="c-${g.id}"]`);S[g.id]=g.type==='check'?ins.filter(i=>i.checked).map(i=>i.value):((ins.find(i=>i.checked)||{}).value||g.def);});return S;}
  function write(S){Object.values(G).forEach(g=>{const v=S[g.id];$$(`#cz input[name="c-${g.id}"]`).forEach(i=>i.checked=Array.isArray(v)?v.includes(i.value):i.value===v);});}
  let R=null;
  function update(){const S=read();R=calc(S);
    $('#czTot').textContent=eur(R.one);$('#czMo').textContent=R.mo?'+ '+eur(R.mo)+'/mes':'';$('#czPlazo').textContent=R.plazo;
    $('#czLines').innerHTML=R.lines.length?R.lines.map(l=>`<li${l[3]?' class="disc"':''}><span>${esc(l[0])}</span><span>${l[1]<0?'−'+eur(-l[1]):l[1]?eur(l[1]):''}${l[1]&&l[2]?' · ':''}${l[2]?eur(l[2])+'/mes':''}</span></li>`).join(''):'<li class="empty"><span>Sin servicios</span></li>';
    Object.values(G).forEach(g=>{if(g.needs)$(`.cz-g[data-g="${g.id}"]`).classList.toggle('off',(S[g.needs]||'no')==='no');});
    QZ.forEach((st,i)=>{const has=st.g.some(g=>{if(!g.cat&&g.id!=='mant')return false;const v=S[g.id];return Array.isArray(v)?v.length:v&&v!=='no'&&v!=='0';});$$('#czSteps button')[i].classList.toggle('has',!!has);});
    $('#czGo').disabled=!R.one&&!R.mo;}
  let step=0;
  function go(i){step=Math.max(0,Math.min(QZ.length-1,i));
    $$('.cz-pane').forEach(p=>p.hidden=p.dataset.pane!==QZ[step].k);
    $$('#czSteps button').forEach((b,j)=>j===step?b.setAttribute('aria-current','step'):b.removeAttribute('aria-current'));
    $('#czPrev').disabled=step===0;$('#czNext').disabled=step===QZ.length-1;}
  $('#czSteps').addEventListener('click',e=>{const b=e.target.closest('button');if(b)go(+b.dataset.i);});
  $('#czPrev').addEventListener('click',()=>go(step-1));
  $('#czNext').addEventListener('click',()=>go(step+1));
  root.addEventListener('change',update);
  $('#czReset').addEventListener('click',()=>{write(DEF);update();go(0);});
  $('#czGo').addEventListener('click',()=>{if(!R)return;const S=read();
    const lineas=[];R.lines.forEach(l=>{if(l[3])return;
      if(l[1])lineas.push({concepto:l[0],detalle:l[4],cantidad:1,precio:l[1],tipo:'unico'});
      if(l[2])lineas.push({concepto:l[0],detalle:l[1]?'Cuota mensual':l[4],cantidad:1,precio:l[2],tipo:'mensual'});});
    const q=blankQuote();q.lineas=lineas;q.descuento=R.disc&&R.sub?Math.round(R.disc/R.sub*100):0;
    q.notas=`Sector: ${S.sector}. Plazo estimado: ${R.plazo}.`;
    openQuote(null,q);});
  write(DEF);update();go(0);
})();
