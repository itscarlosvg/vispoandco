  // ---------- work: Clínica Sonríe (llamada con IA, automatización, web) ----------
  const SX_AUDIO='{{CLINIC_AUDIO}}';
  const SX_TIMES={{CLINIC_TIMES}};
  const SX_MARK='<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18"/><path d="M11.5 21.5c2.2 4.4 5.2 6.5 8.5 6.5s6.3-2.1 8.5-6.5"/><circle cx="14.5" cy="15" r="1.6"/><circle cx="25.5" cy="15" r="1.6"/></svg>';
  const SX_LINES=[
    ['ai','Clínica Dental Sonríe, buenos días. Le atiende Sofía, la asistente virtual. ¿En qué puedo ayudarle?'],
    ['pt','Hola, buenos días. Me duele una muela desde ayer y quería ver si me pueden mirar pronto.'],
    ['ai','Vaya, lo siento. ¿Es usted paciente de la clínica?'],
    ['pt','Sí, soy Elena Vidal.'],
    ['ai','Gracias, Elena. Tengo hueco hoy a las cinco y media de la tarde con la doctora Ruiz, o mañana a las diez y cuarto. ¿Cuál le viene mejor?'],
    ['pt','Hoy a las cinco y media, por favor.'],
    ['ai','Perfecto. Le confirmo: hoy a las cinco y media con la doctora Ruiz. Le envío ahora la confirmación por WhatsApp. ¡Que se mejore, Elena!'],
    ['pt','Genial, muchas gracias.']];
  // [línea tras la que se rellena, campo, valor]
  const SX_FIELDS=[[1,'Motivo','Dolor de muela · urgente'],[3,'Paciente','Elena Vidal · ficha encontrada'],[5,'Cita','Hoy · 17:30 · Dra. Ruiz'],[6,'WhatsApp','Confirmación enviada']];
  const SX_RING=2.2;
  function sxTimeline(){
    if(SX_TIMES)return SX_TIMES;
    let t=SX_RING;return SX_LINES.map(([,s])=>{const d=Math.max(1.6,s.length/15.5),r=[t,t+d];t+=d+.55;return r;});
  }
  const sxClock=s=>{s=Math.max(0,Math.floor(s));return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');};
  const SX_ICO={
    play:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>',
    pause:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
    again:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    phone:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>'};

  /* llamada */
  function vCall(view){
    const T=sxTimeline(),END=T[T.length-1][1]+.8,NB=30;
    view.innerHTML=`<div class="ph sx-ph"><div class="ph-s"><div class="sxc" data-st="idle">
      <div class="sxc-sb"><span>10:42</span><span>▂▄▆</span></div>
      <div class="sxc-top"><span class="sxc-orb"><i></i></span><b>Sofía</b><small>Asistente IA · Clínica Sonríe</small><span class="sxc-time mn">Llamada entrante</span></div>
      <div class="sxc-wave" aria-hidden="true">${'<i></i>'.repeat(NB)}</div>
      <div class="sxc-log" aria-live="polite"></div>
      <div class="sxc-ctl"><button type="button" class="sxc-btn" aria-label="Escuchar la llamada">${SX_ICO.play}</button></div>
    </div></div></div>
    <aside class="sx-side"><span class="mn">Ficha de la llamada</span>
      <ul>${SX_FIELDS.map(f=>`<li data-f="${f[1]}"><span>${f[1]}</span><b></b><i>${SX_ICO.check}</i></li>`).join('')}</ul>
      <div class="sx-done">${SX_ICO.check}<div><b>Cita creada en la agenda</b><span>Sin intervención del equipo</span></div></div></aside>`;
    const root=view.querySelector('.sxc'),log=root.querySelector('.sxc-log'),time=root.querySelector('.sxc-time'),btn=root.querySelector('.sxc-btn'),
      bars=[...root.querySelectorAll('.sxc-wave i')],side=view.querySelector('.sx-side');
    const audio=SX_AUDIO?new Audio(SX_AUDIO):null;
    let raf=0,t0=0,acc=0,playing=false,shown=-1,filled=-1;
    const now=()=>audio?audio.currentTime:acc+(playing?(performance.now()-t0)/1000:0);
    function reset(){shown=-1;filled=-1;log.innerHTML='';side.classList.remove('fin');root.dataset.st='idle';side.querySelectorAll('li').forEach(li=>{li.classList.remove('on');li.querySelector('b').textContent='';});}
    function setBtn(k,l){btn.innerHTML=SX_ICO[k];btn.setAttribute('aria-label',l);}
    function frame(){
      const t=now();
      const cur=T.findIndex(([a,b])=>t>=a&&t<b);
      while(shown<SX_LINES.length-1&&t>=T[shown+1][0]){shown++;const [w,s]=SX_LINES[shown];const p=document.createElement('p');p.className='sxc-l '+w;p.textContent=s;log.appendChild(p);log.scrollTo({top:log.scrollHeight,behavior:RM?'auto':'smooth'});}
      SX_FIELDS.forEach((f,i)=>{if(i>filled&&t>=T[f[0]][1]-.2){filled=i;const li=side.querySelector(`[data-f="${f[1]}"]`);li.querySelector('b').textContent=f[2];li.classList.add('on');}});
      if(t<T[0][0]-.25){root.dataset.st='ring';time.textContent='Llamando…';}
      else{root.dataset.st=cur<0?'live':'talk-'+SX_LINES[cur][0];time.textContent=sxClock(t-T[0][0]+.25);}
      const amp=cur<0?0:1;
      bars.forEach((b,i)=>{const v=amp?(.25+.75*Math.abs(Math.sin(t*(7+i%5)+i*1.7))*(.55+.45*Math.sin(t*2.3+i))):.06;b.style.transform=`scaleY(${Math.max(.06,v).toFixed(3)})`;});
      if(t>=END){stop(true);return;}
      raf=requestAnimationFrame(frame);
    }
    function play(){if(playing)return;if(root.dataset.st==='end'){acc=0;if(audio)audio.currentTime=0;reset();}
      playing=true;t0=performance.now();if(audio)audio.play().catch(()=>{});setBtn('pause','Pausar');cancelAnimationFrame(raf);raf=requestAnimationFrame(frame);}
    function pause(){if(!playing)return;acc=now();playing=false;if(audio)audio.pause();cancelAnimationFrame(raf);setBtn('play','Continuar');}
    function stop(done){playing=false;cancelAnimationFrame(raf);if(audio)audio.pause();
      if(done){root.dataset.st='end';side.classList.add('fin');time.textContent='Llamada finalizada';bars.forEach(b=>b.style.transform='scaleY(.06)');setBtn('again','Volver a escuchar');}}
    btn.addEventListener('click',()=>playing?pause():play());
    return ()=>{stop(false);if(audio){audio.removeAttribute('src');audio.load();}};
  }

  /* automatización */
  function vFlow(view){
    const AG=[['09:00','Limpieza','Marcos Gil','Dr. Otero'],['10:15','Revisión','Ana Soto','Dra. Ruiz'],['12:00','Ortodoncia','Luis Pena','Dr. Otero'],['17:30','Urgencia','Elena Vidal','Dra. Ruiz',1],['18:30','Blanqueamiento','Rosa Castro','Dra. Ruiz']];
    const ST=[['10:42','Llamada atendida por Sofía','Elena Vidal · dolor de muela',''],
      ['10:43','Cita creada en la agenda','Hoy 17:30 · Dra. Ruiz · Gabinete 2',''],
      ['10:43','Confirmación por WhatsApp','',`<div class="wa"><p>Hola, Elena. Tu cita en Clínica Sonríe es hoy a las 17:30 con la Dra. Ruiz. Responde <b>1</b> para confirmar o <b>2</b> para cambiarla.</p><p class="me">1</p></div>`],
      ['16:30','Recordatorio 1 h antes','',`<div class="wa"><p>Te esperamos a las 17:30 en Rúa do Progreso 14, Pontevedra.</p></div>`],
      ['18:45','Reseña tras la visita','',`<div class="wa"><p>¿Qué tal tu visita, Elena? Nos ayudas mucho si nos dejas tu opinión en Google.</p></div><div class="sxf-rev"><span>★★★★★</span><b>Nueva reseña en Google</b><small>“Me atendieron el mismo día. Muy amables.”</small></div>`]];
    view.innerHTML=`<div class="bw"><div class="bw-bar"><i></i><i></i><i></i><span>panel.clinicasonrie.es · Automatizaciones</span></div><div class="bw-c"><div class="sxf">
      <header class="sxf-h"><span class="sx-logo">${SX_MARK}Sonríe</span><b>Hoy, martes</b><button type="button" class="sxf-re" aria-label="Repetir">${SX_ICO.again}</button></header>
      <div class="sxf-k">${[['23','Llamadas atendidas'],['9','Citas creadas por IA'],['31','Recordatorios'],['4','Reseñas nuevas']].map(k=>`<div><b>${k[0]}</b><span>${k[1]}</span></div>`).join('')}</div>
      <div class="sxf-g">
        <section class="sxf-ag"><h6>Agenda</h6>${AG.map(a=>`<div class="sxf-ap${a[4]?' new':''}"><span class="mn">${a[0]}</span><div><b>${a[2]}</b><small>${a[1]} · ${a[3]}</small></div>${a[4]?'<em>IA</em>':''}</div>`).join('')}</section>
        <section class="sxf-tl"><h6>Elena Vidal</h6><ol>${ST.map((s,i)=>`<li style="--i:${i}"><span class="mn">${s[0]}</span><div><b>${s[1]}</b>${s[2]?`<small>${s[2]}</small>`:''}${s[3]}</div></li>`).join('')}</ol></section>
      </div></div></div></div>`;
    const f=view.querySelector('.sxf'),items=[...f.querySelectorAll('.sxf-tl li')],ap=f.querySelector('.sxf-ap.new');
    let tm=[];
    function run(){tm.forEach(clearTimeout);tm=[];items.forEach(li=>li.classList.remove('on'));ap.classList.remove('on');
      items.forEach((li,i)=>tm.push(setTimeout(()=>{li.classList.add('on');if(i===1)ap.classList.add('on');},RM?0:400+i*1100)));}
    f.querySelector('.sxf-re').addEventListener('click',run);
    run();return ()=>tm.forEach(clearTimeout);
  }

  /* web de la clínica */
  function vClinic(view,ctx){
    const st=ctx.state.sx||(ctx.state.sx={tr:null,d:null,h:null,ok:false});
    const TR=[['rev','Revisión','Diagnóstico completo con radiografía','Gratis'],['lim','Limpieza','Higiene profesional y pulido','35 €'],['urg','Urgencia','Te vemos el mismo día','45 €'],['orto','Ortodoncia invisible','Alineadores transparentes a medida','1.900 €'],['blan','Blanqueamiento','Hasta 3 tonos más claro en una sesión','190 €'],['imp','Implantes','Implante de titanio y corona','890 €']];
    const days=[];for(let d=new Date(),n=0;n<5;){d.setDate(d.getDate()+1);if(d.getDay()%6){days.push(new Date(d));n++;}}
    const DN=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],HR=['09:30','11:00','12:30','16:00','17:30','19:00'];
    const full=(di,h)=>(di*3+HR.indexOf(h))%4===1;
    view.innerHTML=`<div class="bw"><div class="bw-bar"><i></i><i></i><i></i><span>clinicasonrie.es</span></div><div class="bw-c"><div class="sx">
      <nav class="sx-nav"><span class="sx-logo">${SX_MARK}Sonríe</span><span class="sx-links"><a data-go="tr">Tratamientos</a><a data-go="eq">Equipo</a><a data-go="ct">Contacto</a></span><button type="button" class="sx-cta" data-go="bk">Pedir cita</button></nav>
      <section class="sx-hero"><div class="sx-copy"><span class="sx-eye">Clínica dental · Pontevedra</span><h4>Tu sonrisa, <em>sin esperas</em></h4><p>Reserva online en un minuto o llámanos a cualquier hora: siempre te atendemos.</p>
        <div class="sx-proof"><b>4,9</b><span>★★★★★</span><small>en Google</small></div></div>
        <div class="sx-book" data-sec="bk"></div></section>
      <section class="sx-sec" data-sec="tr"><h5>Tratamientos</h5><div class="sx-tr">${TR.map(t=>`<button type="button" class="sx-tc" data-tr="${t[0]}"><b>${t[1]}</b><small>${t[2]}</small><span>${t[3]==='Gratis'?'Gratis':'desde '+t[3]}</span></button>`).join('')}</div></section>
      <section class="sx-sec" data-sec="eq"><h5>Equipo</h5><div class="sx-eq">${[['Dra. Marta Ruiz','Odontología general y urgencias','MR'],['Dr. Pablo Otero','Ortodoncia','PO'],['Lucía Fariña','Higienista dental','LF']].map(p=>`<div><span class="sx-av">${p[2]}</span><b>${p[0]}</b><small>${p[1]}</small></div>`).join('')}</div></section>
      <section class="sx-call" data-sec="ct"><div><b>¿Prefieres llamar?</b><span>Sofía, nuestra asistente, te atiende las 24 horas.</span></div><button type="button" class="sx-cta inv" data-call>${SX_ICO.phone}986 123 456</button></section>
      <footer class="sx-ft"><span class="sx-logo">${SX_MARK}Sonríe</span><span>Rúa do Progreso 14 · Pontevedra</span><span>L–V 9:00–20:00</span></footer>
    </div></div></div>`;
    const c=view.querySelector('.bw-c'),bk=view.querySelector('.sx-book');
    const goto=k=>{const s=view.querySelector(`[data-sec="${k}"]`);if(s)c.scrollTo({top:Math.max(0,s.offsetTop-12),behavior:RM?'auto':'smooth'});};
    function draw(){
      if(st.ok){const d=days[st.d],t=TR.find(x=>x[0]===st.tr);
        bk.innerHTML=`<div class="sx-ok">${SX_ICO.check}<b>Cita reservada</b><span>${t[1]} · ${DN[d.getDay()]} ${d.getDate()} · ${st.h}</span><small>Te hemos enviado la confirmación por WhatsApp.</small><button type="button" class="sx-lnk" data-new>Pedir otra cita</button></div>`;return;}
      bk.innerHTML=`<h6>Pide tu cita</h6>
        <div class="sx-q"><span>Tratamiento</span><div class="sx-ch">${TR.slice(0,5).map(t=>`<button type="button" data-tr="${t[0]}" aria-pressed="${st.tr===t[0]}">${t[1]}</button>`).join('')}</div></div>
        <div class="sx-q"><span>Día</span><div class="sx-ds">${days.map((d,i)=>`<button type="button" data-d="${i}" aria-pressed="${st.d===i}"><small>${DN[d.getDay()]}</small><b>${d.getDate()}</b></button>`).join('')}</div></div>
        <div class="sx-q"><span>Hora</span><div class="sx-hs">${HR.map(h=>{const off=st.d===null||full(st.d,h);return `<button type="button" data-h="${h}" aria-pressed="${st.h===h}"${off?' disabled':''}>${h}</button>`;}).join('')}</div></div>
        <button type="button" class="sx-go" data-ok${st.tr&&st.d!==null&&st.h?'':' disabled'}>Confirmar cita</button>`;
    }
    view.addEventListener('click',e=>{
      const g=e.target.closest('[data-go]');if(g){goto(g.dataset.go);return;}
      if(e.target.closest('[data-call]')){ctx.tab('call');return;}
      const tr=e.target.closest('[data-tr]');if(tr){st.tr=tr.dataset.tr;st.ok=false;draw();if(tr.classList.contains('sx-tc'))goto('bk');return;}
      const d=e.target.closest('[data-d]');if(d){st.d=+d.dataset.d;if(st.h&&full(st.d,st.h))st.h=null;draw();return;}
      const h=e.target.closest('[data-h]');if(h){st.h=h.dataset.h;draw();return;}
      if(e.target.closest('[data-ok]')){st.ok=true;draw();return;}
      if(e.target.closest('[data-new]')){Object.assign(st,{tr:null,d:null,h:null,ok:false});draw();}
    });
    draw();
  }
