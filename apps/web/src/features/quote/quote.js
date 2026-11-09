  // quote builder — prices are starting points ("desde"), closed in the meeting
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
      {id:'urg',type:'radio',lbl:'Plazo de entrega',def:'norm',opts:[['norm','Normal',0],['urg','Urgente',0]]}]},
    {k:'cita',t:'Reunión'}];
  const G={};QZ.forEach(st=>(st.g||[]).forEach(g=>{g.step=st.k;G[g.id]=g;}));
  const eur=n=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.')+' €';
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const priceTag=(o,check)=>{const a=o[2]||0,m=o[3]||0;if(!a&&!m)return'';
    if(check)return (a?'+'+eur(a):'')+(a&&m?' · ':'')+(m?eur(m)+'/mes':'');
    return a?('desde '+eur(a)+(m?' + '+eur(m)+'/mes':'')):(eur(m)+'/mes');};

  // render panes
  const qzForm=$('#qz'),panes=$('#qzPanes');
  panes.innerHTML=QZ.filter(st=>st.g).map(st=>`<div class="qz-pane" data-pane="${st.k}" hidden><h3>${esc(st.h)}</h3>`+st.g.map(g=>{
    const v=o=>esc(o[0]);
    let inner;
    if(g.type==='card')inner=`<div class="qz-cards" role="radiogroup" aria-labelledby="ql-${g.id}">`+g.opts.map(o=>`<label class="qc"><input type="radio" name="q-${g.id}" value="${v(o)}"><span><b>${esc(o[1])}</b><small>${esc(o[4]||'')}</small><em>${priceTag(o)||'&nbsp;'}</em></span></label>`).join('')+'</div>';
    else if(g.type==='check')inner=`<div class="opts" role="group" aria-labelledby="ql-${g.id}">`+g.opts.map(o=>`<label class="opt"><input type="checkbox" name="q-${g.id}" value="${v(o)}"><span>${esc(o[1])}<em>${priceTag(o,1)}</em></span></label>`).join('')+'</div>';
    else inner=`<div class="opts" role="radiogroup" aria-labelledby="ql-${g.id}">`+g.opts.map(o=>`<label class="opt"><input type="radio" name="q-${g.id}" value="${v(o)}"><span>${esc(o[1]||o[0])}<em>${g.id==='urg'&&o[0]==='urg'?'+20 %':priceTag(o,1)}</em></span></label>`).join('')+'</div>';
    return `<div class="qz-g" data-g="${g.id}"><span class="lbl" id="ql-${g.id}">${esc(g.lbl)}</span>${inner}</div>`;}).join('')+'</div>').join('');
  const allPanes=$$('.qz-pane');

  // state
  const DEF={};Object.values(G).forEach(g=>DEF[g.id]=g.type==='check'?[]:g.def);
  function readState(){const S={};Object.values(G).forEach(g=>{const ins=$$(`#qz input[name="q-${g.id}"]`);S[g.id]=g.type==='check'?ins.filter(i=>i.checked).map(i=>i.value):((ins.find(i=>i.checked)||{}).value||g.def);});return S;}
  function writeState(S){Object.values(G).forEach(g=>{const val=S[g.id];$$(`#qz input[name="q-${g.id}"]`).forEach(i=>i.checked=Array.isArray(val)?val.includes(i.value):i.value===val);});}
  function calc(S){
    let one=0,mo=0;const lines=[],cats=new Set(),wk=[0,0];
    const add=(name,a,m,g,key)=>{if(!a&&!m)return;one+=a;mo+=m;lines.push([name,a,m]);if(g.cat)cats.add(g.cat);
      const w=(g.wk&&g.wk[key])||g.wkAll;if(w){wk[0]=Math.max(wk[0],w[0]);wk[1]=Math.max(wk[1],w[1]);}};
    Object.values(G).forEach(g=>{
      if(g.needs&&(S[g.needs]||'no')==='no')return;
      if(!g.opts[0][2]&&g.opts[0][2]!==0&&g.type!=='card')return;
      const pick=g.type==='check'?S[g.id]:[S[g.id]];
      pick.forEach(key=>{const o=g.opts.find(x=>x[0]===key);if(!o)return;let a=o[2]||0;
        if(g.id==='marca'&&key==='logo'&&S.marca.includes('ident'))a=0;
        add(g.ln&&g.type!=='check'?g.ln+' · '+o[1]:o[1],a,o[3]||0,g,key);});});
    const sub=one;let disc=0,urg=0;
    if(cats.size>=3&&one>0){disc=Math.round(one*.1);lines.push(['Descuento pack',-disc,0,'disc']);one-=disc;}
    if(S.urg==='urg'&&one>0){urg=Math.round(one*.2);lines.push(['Entrega urgente',urg,0]);one+=urg;}
    one=Math.round(one/10)*10;
    let plazo='—';
    if(wk[1]){let lo=wk[0],hi=wk[1]+(cats.size>1?1:0);if(S.urg==='urg'){lo=Math.max(1,Math.ceil(lo*.7));hi=Math.ceil(hi*.7);}plazo=lo===hi?lo+' semanas':lo+'–'+hi+' semanas';}
    return {one,mo,lines,plazo,cats,sub};
  }

  // animated total
  let shownTot=0,totRaf=0;
  function setTot(n){cancelAnimationFrame(totRaf);const from=shownTot,t0=performance.now(),d=RM?0:450;
    const tick=now=>{const k=d?Math.min(1,(now-t0)/d):1,e=1-Math.pow(1-k,3);shownTot=from+(n-from)*e;$('#qzTot').textContent=$('#qzTot2').textContent=eur(shownTot);if(k<1)totRaf=requestAnimationFrame(tick);};
    totRaf=requestAnimationFrame(tick);}
  function update(){const S=readState(),R=calc(S);
    setTot(R.one);
    const moTxt=R.mo?'+ '+eur(R.mo)+'/mes':'';$('#qzMo').textContent=moTxt;$('#qzMo2').textContent=moTxt;
    $('#qzPlazo').textContent=R.plazo;$('#qzSector').textContent=S.sector;
    $('#qzLines').innerHTML=R.lines.length?R.lines.map(l=>`<li${l[3]?' class="disc"':''}><span>${esc(l[0])}</span><span>${l[1]<0?'−'+eur(-l[1]):l[1]?eur(l[1]):''}${l[1]&&l[2]?' · ':''}${l[2]?eur(l[2])+'/mes':''}</span></li>`).join(''):'<li class="empty"><span>Elige lo que necesitas</span></li>';
    Object.values(G).forEach(g=>{if(g.needs){const off=(S[g.needs]||'no')==='no';const el=$(`.qz-g[data-g="${g.id}"]`);el.classList.toggle('off',off);el.setAttribute('aria-disabled',String(off));}});
    QZ.forEach((st,i)=>{const has=st.g?st.g.some(g=>{if(!g.cat&&g.id!=='mant')return false;const v=S[g.id];return Array.isArray(v)?v.length:v&&v!=='no'&&v!=='0';}):!!($('#q-name').value.trim()&&$('#q-mail').value.trim());
      const b=$$('#qzSteps button')[i];if(b)b.classList.toggle('has',!!has);});
    return R;}

  // steps
  $('#qzSteps').innerHTML=QZ.map((st,i)=>`<button type="button" role="tab" data-i="${i}"><i>${i+1}</i>${esc(st.t)}</button>`).join('');
  let qStep=0;
  function go(i,scroll){qStep=Math.max(0,Math.min(QZ.length-1,i));
    allPanes.forEach(p=>p.hidden=p.dataset.pane!==QZ[qStep].k);
    $$('#qzSteps button').forEach((b,j)=>{if(j===qStep){b.setAttribute('aria-current','step');b.setAttribute('aria-selected','true');const c=$('#qzSteps');c.scrollTo({left:b.offsetLeft-c.clientWidth/2+b.offsetWidth/2,behavior:RM?'auto':'smooth'});}else{b.removeAttribute('aria-current');b.setAttribute('aria-selected','false');}});
    $('#qzPrev').disabled=qStep===0;$('#qzNextL').textContent=qStep===QZ.length-1?'Enviar y elegir hora':'Siguiente';
    if(scroll){const top=$('#qzSteps').getBoundingClientRect().top;if(top<70||top>innerHeight*.5)window.scrollTo({top:scrollY+top-96,behavior:RM?'auto':'smooth'});}}
  $$('#qzSteps button').forEach(b=>b.addEventListener('click',()=>go(+b.dataset.i)));
  $('#qzPrev').addEventListener('click',()=>go(qStep-1,1));
  $('#qzNext').addEventListener('click',()=>{if(qStep<QZ.length-1)go(qStep+1,1);else submitQuote();});
  qzForm.addEventListener('change',()=>{update();$('#qErr').textContent='';});
  qzForm.addEventListener('submit',e=>e.preventDefault());

  const CAL='https://cal.com/vispoandco-lszwyh/meetings';

  // plans: computed starting prices + presets
  const PLANS={'Presencia':{web:'land',webx:['qr'],marca:['gbp'],mant:'basic'},
    'Crecimiento':{web:'corp',webx:['res','seo'],aia:['wa'],reels:'4',mant:'pro'},
    'A medida':{web:'corp',app:'basic',appx:['panel','stores'],aia:['wa'],call:'in',vid:['spot'],mant:'prem'}};
  const planState=k=>Object.assign({},DEF,{sector:readState().sector,actual:readState().actual},PLANS[k]);
  $$('[data-pp]').forEach(el=>{const R=calc(planState(el.dataset.pp));el.innerHTML=`<span>Desde</span><b>${eur(R.one)}</b><span>${R.mo?'+ '+eur(R.mo)+'/mes':''}</span>`;});
  $$('[data-plan]').forEach(a=>a.addEventListener('click',()=>{writeState(planState(a.dataset.plan));update();go(1);}));

  writeState(DEF);update();go(0);

  // submit
  function summaryText(S,R){
    const val=$('#q-msg').value.trim();
    return [`Negocio: ${$('#q-biz').value.trim()} (${S.sector})`,`Situación: ${S.actual}`,'',...R.lines.map(l=>`· ${l[0]}: ${l[1]<0?'−'+eur(-l[1]):l[1]?eur(l[1]):''}${l[1]&&l[2]?' + ':''}${l[2]?eur(l[2])+'/mes':''}`),'',
      `Estimación: desde ${eur(R.one)}${R.mo?' + '+eur(R.mo)+'/mes':''}`,`Plazo estimado: ${R.plazo}`]
      .concat(val?['',val]:[]).join('\n');}
  function embedCal(pre,fallback){const box=$('#calInline');box.hidden=false;box.innerHTML='';
    try{(function(C,A,L){let p=function(a,ar){a.q.push(ar);};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true;}if(ar[0]===L){const api=function(){p(api,arguments);};const namespace=ar[1];api.q=api.q||[];if(typeof namespace==="string"){cal.ns[namespace]=cal.ns[namespace]||api;p(cal.ns[namespace],ar);p(cal,["initNamespace",namespace]);}else p(cal,ar);return;}p(cal,ar);};})(window,"https://app.cal.com/embed/embed.js","init");
      if(!window.__calInit){Cal("init","vispo",{origin:"https://app.cal.com"});window.__calInit=1;
        Cal.ns.vispo("ui",{theme:"dark",cssVarsPerTheme:{dark:{"cal-brand":"#E8336F"}},hideEventTypeDetails:false,layout:"month_view"});
        Cal.ns.vispo("on",{action:"linkFailed",callback:()=>{const b=$('#calInline');b.hidden=true;const f=$('#qdActs a.btn');if(f)f.hidden=false;}});
        Cal.ns.vispo("on",{action:"bookingSuccessful",callback:()=>{$('#qdEye').textContent='Reunión reservada';$('#qdTitle').textContent='¡Hecho! Nos vemos en la reunión';$('#qdText').textContent='Te hemos enviado la confirmación por email con el enlace de la videollamada.';}});}
      Cal.ns.vispo("inline",{elementOrSelector:"#calInline",calLink:CAL.replace('https://cal.com/',''),config:Object.assign({layout:"month_view",theme:"dark"},pre)});}
    catch(_){box.hidden=true;fallback.hidden=false;return;}
    setTimeout(()=>{if(!box.querySelector('iframe')){box.hidden=true;fallback.hidden=false;}},9000);}
  const CAL_API='https://api.cal.com/v2',CAL_USER='vispoandco-lszwyh',CAL_EV='meetings';
  let bookUid=null,bookStart=null;
  async function nativeCal(pre,fallback){
    const box=$('#calInline');box.hidden=false;box.className='ncal';
    const tz=(Intl.DateTimeFormat().resolvedOptions().timeZone)||'Europe/Madrid';
    const iso=d=>d.toISOString().slice(0,10),cap=t=>t.charAt(0).toUpperCase()+t.slice(1);
    const fD=new Intl.DateTimeFormat('es-ES',{weekday:'short',timeZone:'UTC'}),fM=new Intl.DateTimeFormat('es-ES',{month:'short',timeZone:'UTC'}),
      fL=new Intl.DateTimeFormat('es-ES',{weekday:'long',day:'numeric',month:'long',timeZone:'UTC'}),
      fH=new Intl.DateTimeFormat('es-ES',{hour:'2-digit',minute:'2-digit',timeZone:tz}),
      fW=new Intl.DateTimeFormat('es-ES',{weekday:'long',day:'numeric',month:'long',hour:'2-digit',minute:'2-digit',timeZone:tz});
    const dd=k=>new Date(k+'T12:00:00Z');
    const head=(eye,t,p)=>{$('#qdEye').textContent=eye;$('#qdTitle').textContent=t;$('#qdText').textContent=p;};
    async function getSlots(){const q={eventTypeSlug:CAL_EV,username:CAL_USER,start:iso(new Date()),end:iso(new Date(Date.now()+35*864e5)),timeZone:tz};
      if(bookUid)q.bookingUidToReschedule=bookUid;
      const r=await fetch(`${CAL_API}/slots?${new URLSearchParams(q)}`,{headers:{'cal-api-version':'2024-09-04'}});
      const j=await r.json();if(!r.ok||j.status!=='success')throw 0;return j.data||{};}
    function done(){
      box.innerHTML=`<div class="ncal-ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg><b>${cap(fW.format(new Date(bookStart)))}</b><span>Videollamada · 30 min</span><button type="button" class="btn ghost" id="ncMove">Cambiar hora</button></div>`;
      $('#ncMove').addEventListener('click',()=>picker());}
    async function picker(){
      box.innerHTML='<div class="ncal-load"><i></i><i></i><i></i></div>';
      let slots;try{slots=await getSlots();}catch(_){if(bookUid){done();return;}box.className='cal-inline';embedCal(pre,fallback);return;}
      const days=Object.keys(slots).filter(k=>slots[k]&&slots[k].length).sort();
      if(!days.length){box.innerHTML='<p class="ncal-msg">No quedan horas libres estas semanas.</p>';if(!bookUid)fallback.hidden=false;return;}
      let day=days[0],pick=null;
      box.innerHTML=`<div class="ncal-days" role="radiogroup" aria-label="Día">${days.map((k,i)=>`<label class="qd"><input type="radio" name="ncd" value="${k}"${i?'':' checked'}><span><small>${fD.format(dd(k)).replace('.','')}</small><b>${dd(k).getUTCDate()}</b><small>${fM.format(dd(k)).replace('.','')}</small></span></label>`).join('')}</div>
        <div class="ncal-day"><b id="ncLbl"></b><span class="mono">${tz.replace('_',' ')}</span></div>
        <div class="ncal-times" id="ncTimes" role="radiogroup" aria-label="Hora"></div>
        <div class="ncal-foot"><p class="err" id="ncErr" role="alert"></p>${bookUid?'<button type="button" class="btn ghost" id="ncBack">Mantener hora</button>':''}<button type="button" class="btn" id="ncGo" disabled><span>${bookUid?'Cambiar a esta hora':'Confirmar reunión'}</span></button></div>`;
      const go=$('#ncGo'),err=$('#ncErr'),lbl=go.firstChild.textContent;
      if(bookUid)$('#ncBack').addEventListener('click',done);
      const draw=()=>{$('#ncLbl').textContent=cap(fL.format(dd(day)));pick=null;go.disabled=true;
        $('#ncTimes').innerHTML=(slots[day]||[]).map(s=>`<label class="nct"><input type="radio" name="nct" value="${s.start}"><span>${fH.format(new Date(s.start))}</span></label>`).join('');};
      box.onchange=e=>{const t=e.target;if(t.name==='ncd'){day=t.value;draw();}else if(t.name==='nct'){pick=t.value;go.disabled=false;err.textContent='';}};
      draw();
      go.addEventListener('click',async()=>{if(!pick||go.dataset.busy)return;go.dataset.busy=1;go.firstChild.textContent=bookUid?'Cambiando…':'Reservando…';err.textContent='';
        const start=new Date(pick).toISOString();
        try{const r=bookUid
            ?await fetch(`${CAL_API}/bookings/${encodeURIComponent(bookUid)}/reschedule`,{method:'POST',headers:{'Content-Type':'application/json','cal-api-version':'2026-02-25'},body:JSON.stringify({start,rescheduledBy:pre.email,reschedulingReason:'Cambio de hora desde la web'})})
            :await fetch(`${CAL_API}/bookings`,{method:'POST',headers:{'Content-Type':'application/json','cal-api-version':'2026-02-25'},body:JSON.stringify({start,eventTypeSlug:CAL_EV,username:CAL_USER,attendee:{name:pre.name,email:pre.email,timeZone:tz,language:'es'},bookingFieldsResponses:{notes:pre.notes}})});
          const j=await r.json().catch(()=>({}));if(!r.ok||j.status!=='success')throw j;
          const moved=!!bookUid;bookUid=(j.data&&j.data.uid)||bookUid;bookStart=pick;done();
          head(moved?'Hora cambiada':'Reunión reservada',moved?'Reunión actualizada':'¡Hecho! Nos vemos en la reunión',`Te hemos enviado la confirmación a ${pre.email} con el enlace de la videollamada.`);}
        catch(_){err.textContent='Esa hora ya no está disponible. Elige otra.';delete go.dataset.busy;go.firstChild.textContent=lbl;
          try{slots=await getSlots();draw();}catch(_){}}});
    }
    if(bookUid){done();head('Datos actualizados','Tu reunión sigue reservada','Hemos recibido los cambios.');}
    else picker();
  }
  let sending=false,qRef=null,qSent=0;
  async function submitQuote(){
    if(sending)return;const S=readState(),R=update(),err=$('#qErr');
    const name=$('#q-name').value.trim(),biz=$('#q-biz').value.trim(),mail=$('#q-mail').value.trim(),tel=$('#q-tel').value.trim();
    if(!R.one&&!R.mo){err.textContent='Elige al menos un servicio.';go(1,1);return;}
    if(!name){err.textContent='Escribe tu nombre.';$('#q-name').focus();return;}
    if(!biz){err.textContent='Escribe el nombre de tu negocio.';$('#q-biz').focus();return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)){err.textContent='Revisa tu email.';$('#q-mail').focus();return;}
    if(!$('#q-priv').checked){err.textContent='Acepta la política de privacidad para continuar.';return;}
    const txt=summaryText(S,R);
    if(!qRef)qRef='P-'+Date.now().toString(36).toUpperCase().slice(-6);qSent++;
    const data={'form-name':'presupuesto','bot-field':'',subject:(qSent>1?'Corrección de presupuesto · ':'Nuevo presupuesto · ')+biz+' · '+qRef,referencia:qRef+(qSent>1?' (versión '+qSent+', sustituye a la anterior)':''),nombre:name,negocio:biz,email:mail,telefono:tel,sector:S.sector,situacion:S.actual,
      estimacion:eur(R.one),mensual:R.mo?eur(R.mo)+'/mes':'',plazo:R.plazo,reunion:'Cal.com',formato:'Videollamada',servicios:R.lines.map(l=>l[0]).join(', '),comentarios:$('#q-msg').value.trim(),detalle:JSON.stringify({S,one:R.one,mo:R.mo})};
    sending=true;$('#qzNextL').textContent='Enviando…';
    let ok=false;
    if(/^https?:$/.test(location.protocol)&&!/claude|anthropic|usercontent|localhost|127\.0\.0\.1/.test(location.hostname)){
      try{const r=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString()});ok=r.ok;}catch(_){ok=false;}}
    sending=false;$('#qzNextL').textContent='Enviar y elegir hora';
    $('#qdSum').textContent=txt;
    const acts=$('#qdActs');acts.innerHTML='';acts.hidden=false;
    const mk=(tag,cls,label)=>{const e=document.createElement(tag);e.className=cls;e.textContent=label;acts.appendChild(e);return e;};
    const notes=[`${biz} (${S.sector}) · Ref. ${qRef}`,`Estimación: desde ${eur(R.one)}${R.mo?' + '+eur(R.mo)+'/mes':''}`,'Servicios: '+R.lines.filter(l=>!l[3]).map(l=>l[0]).join(', ')].concat(tel?['Teléfono: '+tel]:[]).concat($('#q-msg').value.trim()?[$('#q-msg').value.trim()]:[]).join('\n');
    const calUrl=CAL+'?'+new URLSearchParams({name,email:mail,notes:notes.slice(0,1500)}).toString();
    const cal=mk('a','btn','Elegir día y hora');cal.href=calUrl;cal.target='_blank';cal.rel='noopener';
    const own=/^https?:$/.test(location.protocol)&&!/claude|anthropic|usercontent|localhost|127\.0\.0\.1/.test(location.hostname);
    $('#qdSum').hidden=own;
    if(own){cal.hidden=true;nativeCal({name,email:mail,notes:notes.slice(0,1500)},cal);}
    if(!bookUid)$('#qdTitle').textContent='Ahora elige día y hora';
    if(bookUid){}else if(ok){$('#qdEye').textContent='Solicitud enviada';$('#qdText').textContent=`Reunión de 30 minutos por videollamada. Solo verás las horas libres y recibirás la confirmación en ${mail}.`;}
    else{$('#qdEye').textContent='Solicitud lista';$('#qdText').textContent='Reunión de 30 minutos por videollamada. Al reservar nos llega tu presupuesto con la cita.';
      const cp=mk('button','btn ghost','Copiar texto');cp.type='button';
      cp.addEventListener('click',()=>{const full='Hola, Vispo & Co. Soy '+name+'.\n\n'+txt+'\n\nEmail: '+mail+(tel?'\nTeléfono: '+tel:'');
        const okc=()=>$('#copyMsg').textContent='Texto copiado.';const fb=()=>{const r=document.createRange();r.selectNodeContents($('#qdSum'));const s=getSelection();s.removeAllRanges();s.addRange(r);$('#copyMsg').textContent='Texto seleccionado: cópialo.';};
        try{navigator.clipboard.writeText(full).then(okc,fb);}catch(_){fb();}});}
    const ed=mk('button','btn ghost','Editar');ed.type='button';
    ed.addEventListener('click',()=>vt(()=>{qzForm.hidden=false;$('#qzDone').hidden=true;$('#copyMsg').textContent='';$('#calInline').hidden=true;}));
    vt(()=>{qzForm.hidden=true;$('#qzDone').hidden=false;});
    const top=$('#contacto').getBoundingClientRect().top;window.scrollTo({top:scrollY+top-80,behavior:RM?'auto':'smooth'});
  }

