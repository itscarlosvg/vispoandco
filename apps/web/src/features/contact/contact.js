  // contacto: solicitud sin precios → Netlify Forms → reunión en el calendario propio (Cal.com)
  const SVC=[['web','Web'],['shop','Tienda online'],['app','App'],['wa','Asistente con IA en WhatsApp e Instagram'],['call','Recepcionista telefónica con IA'],['auto','Automatizaciones'],['vid','Vídeo y reels'],['marca','Logo y marca']];
  const SECTORS=['Restaurante o cafetería','Hotel o alojamiento','Tienda','Salud o estética','Gimnasio o deporte','Academia o formación','Servicios profesionales','Otro'];
  const NOW=['Empiezo de cero','Tengo web y quiero renovarla','Tengo web y quiero vender más'];
  const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const opt=(type,name,v,l)=>`<label class="opt"><input type="${type}" name="${name}" value="${esc(v)}"><span>${esc(l)}</span></label>`;
  $('#ctSvc').innerHTML=SVC.map(s=>opt('checkbox','ct-svc',s[0],s[1])).join('');
  const selOpts=(list,ph)=>`<option value="">${ph}</option>`+list.map(s=>`<option>${esc(s)}</option>`).join('');
  $('#q-sec').innerHTML=selOpts(SECTORS,'Elige tu sector');
  $('#q-now').innerHTML=selOpts(NOW,'Elige una opción');
  const ctForm=$('#ctForm');
  const picked=n=>$$(`#ctForm input[name="${n}"]`).filter(i=>i.checked).map(i=>i.value);
  /** Rellena el formulario desde un plan o un proyecto y lleva al usuario a él. */
  function contactPrefill(svcs,msg){
    $$('#ctForm input[name="ct-svc"]').forEach(i=>i.checked=svcs.includes(i.value));
    if(msg&&!$('#q-msg').value.trim())$('#q-msg').value=msg;
    $('#qErr').textContent='';
    if(!$('#ctDone').hidden){$('#ctWrap').hidden=false;$('#ctDone').hidden=true;}
    setTimeout(()=>$('#contacto').scrollIntoView({behavior:RM?'auto':'smooth'}),60);}
  ctForm.addEventListener('change',()=>$('#qErr').textContent='');

  const PLANS={'Presencia':['web','marca'],'Crecimiento':['web','wa','vid'],'A medida':['app','web','call','wa','vid']};
  $$('[data-plan]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();contactPrefill(PLANS[a.dataset.plan]||[],`Me interesa el plan ${a.dataset.plan}.`);}));

  const CAL='https://cal.com/vispoandco-lszwyh/meetings';
  // CRM: cada solicitud y reunión entra en el panel (Supabase) por la función pública web_lead
  const SB_URL='{{SB_URL}}',SB_KEY='{{SB_KEY}}';
  const isOwn=()=>/^https?:$/.test(location.protocol)&&!/claude|anthropic|usercontent|localhost|127\.0\.0\.1/.test(location.hostname);
  const madrid=iso=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Madrid',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(iso)).replace(' ','T');
  // prueba de consentimiento: fecha, hora e IP las guarda el servidor (tabla consentimientos)
  function toConsent(p){if(!isOwn())return;fetch(SB_URL+'/rest/v1/rpc/web_consent',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json',apikey:SB_KEY,Authorization:'Bearer '+SB_KEY},body:JSON.stringify({p})}).catch(()=>{});}
  function toCRM(p){if(!isOwn())return;fetch(SB_URL+'/rest/v1/rpc/web_lead',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json',apikey:SB_KEY,Authorization:'Bearer '+SB_KEY},body:JSON.stringify({p})}).catch(()=>{});}
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
          const moved=!!bookUid;bookUid=(j.data&&j.data.uid)||bookUid;bookStart=pick;done();toCRM({ref:qRef,reunion:madrid(pick),calUid:bookUid||''});
          head(moved?'Hora cambiada':'Reunión reservada',moved?'Reunión actualizada':'¡Hecho! Nos vemos en la reunión',`Te hemos enviado la confirmación a ${pre.email} con el enlace de la videollamada.`);}
        catch(_){err.textContent='Esa hora ya no está disponible. Elige otra.';delete go.dataset.busy;go.firstChild.textContent=lbl;
          try{slots=await getSlots();draw();}catch(_){}}});
    }
    if(bookUid){done();head('Datos actualizados','Tu reunión sigue reservada','Hemos recibido los cambios.');}
    else picker();
  }

  let sending=false,qRef=null,qSent=0;
  ctForm.addEventListener('submit',async e=>{
    e.preventDefault();if(sending)return;const err=$('#qErr');
    const svc=picked('ct-svc').map(k=>SVC.find(s=>s[0]===k)[1]),sector=$('#q-sec').value,now=$('#q-now').value;
    const name=$('#q-name').value.trim(),biz=$('#q-biz').value.trim(),mail=$('#q-mail').value.trim(),tel=$('#q-tel').value.trim(),msg=$('#q-msg').value.trim();
    if(!svc.length){err.textContent='Elige al menos una opción.';$('#ctSvc input').focus();return;}
    if(!name){err.textContent='Escribe tu nombre.';$('#q-name').focus();return;}
    if(!biz){err.textContent='Escribe el nombre de tu negocio.';$('#q-biz').focus();return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)){err.textContent='Revisa tu email.';$('#q-mail').focus();return;}
    if(!$('#q-priv').checked){err.textContent='Acepta la política de privacidad para continuar.';return;}
    if(!qRef)qRef='P-'+Date.now().toString(36).toUpperCase().slice(-6);qSent++;
    const txt=[`Negocio: ${biz}${sector?' ('+sector+')':''}`].concat(now?[`Situación: ${now}`]:[]).concat(['','Necesita: '+svc.join(', ')]).concat(msg?['',msg]:[]).join('\n');
    const data={'form-name':'presupuesto','bot-field':'',subject:(qSent>1?'Corrección de solicitud · ':'Nueva solicitud · ')+biz+' · '+qRef,referencia:qRef+(qSent>1?' (versión '+qSent+', sustituye a la anterior)':''),
      nombre:name,negocio:biz,email:mail,telefono:tel,sector,situacion:now,reunion:'Cal.com',formato:'Videollamada',servicios:svc.join(', '),comentarios:msg};
    const own=isOwn();
    toConsent({ref:qRef,nombre:name,email:mail,acepta:true,politica:POLICY,pagina:location.origin+location.pathname});
    toCRM({ref:qRef,nombre:name,negocio:biz,email:mail,telefono:tel,sector,servicios:svc.join(', '),nota:[now?'Situación: '+now:'',msg].filter(Boolean).join('\n')});
    const send=$('#ctSend span');sending=true;send.textContent='Enviando…';
    let ok=false;
    if(own){try{const r=await fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(data).toString()});ok=r.ok;}catch(_){ok=false;}}
    sending=false;send.textContent='Enviar y elegir hora';
    $('#qdSum').textContent=txt;$('#qdSum').hidden=own;
    const acts=$('#qdActs');acts.innerHTML='';
    const mk=(tag,cls,label)=>{const el=document.createElement(tag);el.className=cls;el.textContent=label;acts.appendChild(el);return el;};
    const notes=[`${biz}${sector?' ('+sector+')':''} · Ref. ${qRef}`,'Necesita: '+svc.join(', ')].concat(tel?['Teléfono: '+tel]:[]).concat(msg?[msg]:[]).join('\n').slice(0,1500);
    const cal=mk('a','btn','Elegir día y hora');cal.href=CAL+'?'+new URLSearchParams({name,email:mail,notes});cal.target='_blank';cal.rel='noopener';
    if(own){cal.hidden=true;nativeCal({name,email:mail,notes},cal);}
    if(!bookUid){$('#qdTitle').textContent='Ahora elige día y hora';
      if(ok){$('#qdEye').textContent='Solicitud enviada';$('#qdText').textContent=`Reunión de 30 minutos por videollamada. Recibirás la confirmación en ${mail}.`;}
      else{$('#qdEye').textContent='Solicitud lista';$('#qdText').textContent='Reunión de 30 minutos por videollamada.';
        const cp=mk('button','btn ghost','Copiar texto');cp.type='button';
        cp.addEventListener('click',()=>{const full='Hola, Vispo & Co. Soy '+name+'.\n\n'+txt+'\n\nEmail: '+mail+(tel?'\nTeléfono: '+tel:'');
          const okc=()=>$('#copyMsg').textContent='Texto copiado.';const fb=()=>{const r=document.createRange();r.selectNodeContents($('#qdSum'));const s=getSelection();s.removeAllRanges();s.addRange(r);$('#copyMsg').textContent='Texto seleccionado: cópialo.';};
          try{navigator.clipboard.writeText(full).then(okc,fb);}catch(_){fb();}});}}
    const ed=mk('button','btn ghost','Editar');ed.type='button';
    ed.addEventListener('click',()=>vt(()=>{$('#ctWrap').hidden=false;$('#ctDone').hidden=true;$('#copyMsg').textContent='';$('#calInline').hidden=true;}));
    vt(()=>{$('#ctWrap').hidden=true;$('#ctDone').hidden=false;});
    const top=$('#contacto').getBoundingClientRect().top;window.scrollTo({top:scrollY+top-80,behavior:RM?'auto':'smooth'});
  });
