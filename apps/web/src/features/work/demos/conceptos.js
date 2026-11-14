  // ---------- work: Casa Brava (restaurante), Costa Norte (inmobiliaria), Lumen (cafetería) ----------
  const CK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>';
  const WD=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
  const dayAt=k=>{const d=new Date();d.setDate(d.getDate()+k);return d;};
  const dayName=k=>k===0?'Hoy':k===1?'Mañana':`${WD[dayAt(k).getDay()]} ${dayAt(k).getDate()}`;
  const timers=()=>{let ids=[],alive=true;return {later:(f,ms)=>ids.push(setTimeout(()=>alive&&f(),RM?Math.min(ms,60):ms)),stop:()=>{alive=false;ids.forEach(clearTimeout);ids=[];},reset:()=>{ids.forEach(clearTimeout);ids=[];}};};

  /* ===== Casa Brava ===== */
  function brFood(k){
    const ring=(n,r,f)=>[...Array(n)].map((_,i)=>{const a=i/n*Math.PI*2-.4;return f(50+Math.cos(a)*r,50+Math.sin(a)*r,a);}).join('');
    const F={
      pulpo:ring(8,17,(x,y)=>`<circle cx="${x}" cy="${y}" r="7.5" fill="#B9566A"/><circle cx="${x}" cy="${y}" r="3.2" fill="#EBC2C9"/>`)+'<circle cx="50" cy="50" r="8" fill="#D9C08A"/>'+ring(10,24,(x,y)=>`<circle cx="${x}" cy="${y}" r="1.4" fill="#C2401E"/>`),
      croq:[[38,40,-20],[60,38,15],[40,60,10],[62,61,-10]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="11" ry="7.5" transform="rotate(${r} ${x} ${y})" fill="#C27C35"/><ellipse cx="${x-2}" cy="${y-2}" rx="6" ry="3" transform="rotate(${r} ${x} ${y})" fill="#DDA25C"/>`).join(''),
      padron:[[34,44,-30],[52,36,10],[62,52,40],[44,60,-10],[56,66,25]].map(([x,y,r])=>`<path d="M${x-10} ${y} q10 -9 20 0 q-10 6 -20 0z" transform="rotate(${r} ${x} ${y})" fill="#4F7A2E"/><path d="M${x+10} ${y} l4 -3" stroke="#6E8F3A" stroke-width="2" transform="rotate(${r} ${x} ${y})"/>`).join('')+ring(7,10,(x,y)=>`<circle cx="${x}" cy="${y}" r="1.1" fill="#fff"/>`),
      chuleton:'<path d="M26 54 C24 36 42 26 58 28 C74 30 80 46 74 60 C68 72 44 76 32 68 Z" fill="#6E3B26"/><path d="M34 40 L68 64M30 50 L62 72M42 32 L74 54" stroke="#3B1E12" stroke-width="3" opacity=".7"/><path d="M70 30 q8 -6 12 2 q-4 6 -10 4z" fill="#F4EBDD"/>'+ring(9,14,(x,y)=>`<rect x="${x}" y="${y}" width="2" height="2" fill="#F7F1E6"/>`),
      rodaballo:'<ellipse cx="46" cy="50" rx="24" ry="17" fill="#D9C3A0"/><path d="M68 50 L82 38 L80 62 Z" fill="#CBB18A"/><circle cx="32" cy="45" r="2.2" fill="#3B2A1C"/><path d="M36 38 L52 62M44 36 L60 62M52 36 L64 56" stroke="#8B6A44" stroke-width="2.6" opacity=".8"/><path d="M28 72 q8 -5 16 0" stroke="#5E8A3A" stroke-width="3" fill="none"/>',
      secreto:[[36,46,-20],[52,48,-8],[66,52,6]].map(([x,y,r])=>`<rect x="${x-9}" y="${y-14}" width="16" height="28" rx="6" transform="rotate(${r} ${x} ${y})" fill="#94503A"/><path d="M${x-6} ${y-6} h10M${x-6} ${y+4} h10" stroke="#5E2D1E" stroke-width="2" transform="rotate(${r} ${x} ${y})"/>`).join('')+'<circle cx="38" cy="70" r="6" fill="#E3C56A"/><circle cx="50" cy="73" r="6" fill="#E3C56A"/><path d="M60 70 q8 -6 14 2" stroke="#C0392B" stroke-width="5" fill="none" stroke-linecap="round"/>',
      tarta:'<path d="M50 50 L24 36 A30 30 0 0 1 72 30 Z" fill="#EBCB91"/><path d="M50 50 L24 36 L24 44 L50 58 Z" fill="#D9B272"/><path d="M50 50 L72 30 L72 38 L50 58 Z" fill="#E3BF80"/><path d="M24 36 A30 30 0 0 1 72 30 L67 33 A26 26 0 0 0 29 38 Z" fill="#5A3420"/><circle cx="62" cy="66" r="4" fill="#9C2C3D"/><circle cx="70" cy="62" r="3" fill="#9C2C3D"/>',
      filloas:'<path d="M22 56 A26 26 0 0 1 74 56 Z" fill="#E3B871"/><path d="M30 62 A22 22 0 0 1 74 62 Z" fill="#EBC888" transform="rotate(-12 52 62)"/><path d="M34 52 q8 -10 16 -2 q8 8 16 -2" stroke="#C98E3E" stroke-width="2" fill="none"/><ellipse cx="50" cy="70" rx="14" ry="5" fill="#F5E6B8"/>',
      torrija:'<rect x="26" y="34" width="36" height="30" rx="7" fill="#C47A32"/><rect x="26" y="34" width="36" height="9" rx="5" fill="#8A4A16"/><circle cx="68" cy="62" r="10" fill="#FBF6EA"/><circle cx="65" cy="59" r="3" fill="#fff"/><path d="M30 70 q12 6 26 0" stroke="#A55A1E" stroke-width="3" fill="none"/>'};
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="48" fill="#EFE4D6"/><circle cx="50" cy="50" r="37" fill="#E6D7C3"/>${F[k]||''}</svg>`;
  }
  const BR_CARTA={
    'Entrantes':[['Pulpo á feira','Cachelos, aceite de oliva y pimentón de la Vera','16 €','pulpo'],['Croquetas de lacón','Seis unidades, cremosas por dentro','9 €','croq'],['Pimientos de Padrón','Unos pican y otros no','8 €','padron']],
    'De la brasa':[['Chuletón de vaca gallega','1 kg, madurado 40 días, para compartir','52 €','chuleton'],['Rodaballo a la brasa','Salvaje, con ajada y patata','24 €','rodaballo'],['Secreto ibérico','Con patatas y pimiento asado','18 €','secreto']],
    'Postres':[['Tarta de queso','Al horno, con el centro cremoso','7 €','tarta'],['Filloas con crema','La receta de la abuela','6 €','filloas'],['Torrija caramelizada','Con helado de vainilla','7 €','torrija']]};
  const BR_TIMES=['13:30','14:00','14:30','15:00','20:30','21:00','21:30','22:00'];
  function vBrava(view,ctx){
    const st=ctx.state.brava||(ctx.state.brava={pax:2,day:0,time:'',done:false,cat:'Entrantes'});
    const full=(k,t)=>{const i=BR_TIMES.indexOf(t);return ((k*5+i*3+st.pax)%7)===0||(k===0&&i<4&&new Date().getHours()>=15)||st.pax>8&&i%2===1;};
    view.innerHTML=`<div class="bw"><div class="bw-bar"><i></i><i></i><i></i><span>casabrava.es</span></div><div class="bw-c"><div class="br">
      <nav class="br-nav"><span class="br-logo">Casa Brava</span><span class="br-links"><span>Carta</span><span>Nosotros</span><span>Dónde estamos</span></span><button type="button" class="br-btn sm" data-go>Reservar</button></nav>
      <header class="br-hero"><div class="br-hl"><small>Cocina de brasa · Vigo</small><h4>Cocina de brasa,<br><em>en el centro.</em></h4><p>Producto gallego a la parrilla de leña de roble. De martes a domingo, comidas y cenas.</p>
        <div class="br-facts"><span><b>4,8</b>en Google</span><span><b>Roble</b>leña de verdad</span><span><b>Lonja</b>pescado del día</span></div></div>
        <div class="br-res"></div></header>
      <section class="br-carta"><div class="br-ch"><h5>La carta</h5><div class="br-tabs" role="group" aria-label="Secciones de la carta">${Object.keys(BR_CARTA).map(c=>`<button type="button" data-c="${c}">${c}</button>`).join('')}</div></div><div class="br-dishes"></div></section>
      <footer class="br-foot"><span class="br-logo">Casa Brava</span><span>Vigo · Martes a domingo · 13:30–16:00 y 20:30–23:30</span></footer>
    </div></div></div>`;
    const res=view.querySelector('.br-res'),dishes=view.querySelector('.br-dishes'),bwc=view.querySelector('.bw-c');
    const tb=t=>`<button type="button" data-t="${t}" aria-pressed="${st.time===t}" ${full(st.day,t)?'disabled':''}>${t}</button>`;
    const drawRes=()=>{
      if(st.done){res.innerHTML=`<div class="br-ok"><i>${CK}</i><b>Mesa reservada</b><p>${st.pax} ${st.pax===1?'persona':'personas'} · ${dayName(st.day)} · ${st.time}</p><small>Te hemos enviado la confirmación por WhatsApp.</small><button type="button" class="br-link" data-k="again">Hacer otra reserva</button></div>`;return;}
      res.innerHTML=`<b class="br-rt">Reserva tu mesa</b>
        <div class="br-row"><span>Personas</span><div class="br-pax"><button type="button" data-k="-" aria-label="Una persona menos">−</button><b>${st.pax}</b><button type="button" data-k="+" aria-label="Una persona más">+</button></div></div>
        <div class="br-days" role="group" aria-label="Día">${[0,1,2,3].map(k=>`<button type="button" data-d="${k}" aria-pressed="${k===st.day}">${dayName(k)}</button>`).join('')}</div>
        <small class="br-lab">Comida</small><div class="br-times">${BR_TIMES.slice(0,4).map(tb).join('')}</div>
        <small class="br-lab">Cena</small><div class="br-times">${BR_TIMES.slice(4).map(tb).join('')}</div>
        <button type="button" class="br-btn" data-k="go" ${st.time?'':'disabled'}>${st.time?`Reservar a las ${st.time}`:'Elige una hora'}</button>`;};
    const drawCarta=()=>{view.querySelectorAll('.br-tabs button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.c===st.cat)));
      dishes.innerHTML=BR_CARTA[st.cat].map(([n,d,p,k])=>`<article class="br-d"><span class="br-plate">${brFood(k)}</span><div><b>${n}</b><p>${d}</p></div><span class="br-pr">${p}</span></article>`).join('');};
    res.addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const k=b.dataset.k;
      if(k==='-'||k==='+'){st.pax=Math.max(1,Math.min(12,st.pax+(k==='+'?1:-1)));}
      else if(b.dataset.d!==undefined){st.day=+b.dataset.d;}
      else if(b.dataset.t){st.time=b.dataset.t;}
      else if(k==='go'){st.done=true;}
      else if(k==='again'){st.done=false;st.time='';}
      if(st.time&&full(st.day,st.time))st.time='';
      drawRes();});
    view.querySelector('.br-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-c]');if(!b)return;st.cat=b.dataset.c;drawCarta();});
    view.querySelector('[data-go]').onclick=()=>{bwc.scrollTo({top:0,behavior:RM?'auto':'smooth'});res.classList.remove('pulse');void res.offsetWidth;res.classList.add('pulse');};
    drawRes();drawCarta();return ()=>{};
  }
  function vBravaChat(view){
    view.innerHTML=`<div class="ph"><div class="ph-s"><div class="brc">
      <div class="brc-sb"><span>23:41</span><span>▂▄▆</span></div>
      <div class="brc-h"><span class="brc-av">CB</span><span><b>Casa Brava</b><small>Asistente · responde al instante</small></span></div>
      <div class="brc-m" aria-live="polite"></div>
      <div class="brc-q" role="group" aria-label="Respuestas"></div></div></div></div>`;
    const M=view.querySelector('.brc-m'),Q=view.querySelector('.brc-q'),T=timers();
    let step=0,hour='',min=41;
    const clock=()=>`23:${String(Math.min(59,min++)).padStart(2,'0')}`;
    const scroll=()=>{M.scrollTop=M.scrollHeight;};
    const add=(who,html)=>{const d=document.createElement('div');d.className='brc-b '+who;d.innerHTML=`<span>${html}</span><small>${clock()}</small>`;M.appendChild(d);scroll();};
    const chips=c=>{Q.innerHTML=(c||[]).map(x=>`<button type="button">${x}</button>`).join('');};
    const ai=(html,next,ms=1200)=>{chips();const ty=document.createElement('div');ty.className='brc-b ai brc-typ';ty.innerHTML='<i></i><i></i><i></i>';M.appendChild(ty);scroll();T.later(()=>{ty.remove();add('ai',html);if(typeof next==='function')next();else chips(next);},ms);};
    const start=()=>{T.reset();M.innerHTML='';chips();step=1;hour='';min=41;
      T.later(()=>{add('me','Hola, ¿tenéis mesa para 4 esta noche?');T.later(()=>ai('¡Hola! Esta noche tengo mesa para 4 a las 21:00 o a las 22:30. ¿Cuál te viene mejor?',['A las 21:00','A las 22:30']),500);},500);};
    Q.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const v=b.textContent;
      if(v==='Empezar de nuevo'){start();return;}
      add('me',v);
      if(step===1){hour=v.replace('A las ','');step=2;ai('Perfecto. ¿A nombre de quién la pongo?',['Laura Méndez']);}
      else if(step===2){step=3;ai(`Hecho, Laura. Mesa para 4 hoy a las ${hour}. ¿Alguien tiene alguna alergia o intolerancia?`,['Sí, a los frutos secos','No, ninguna']);}
      else if(step===3){step=4;const al=v.startsWith('Sí');
        ai(`${al?'Anotado, se lo paso a cocina. ':'Genial. '}Esta tarde te mando un recordatorio. ¡Os esperamos!`,()=>T.later(()=>{const c=document.createElement('div');c.className='brc-sys';
          c.innerHTML=`<i>${CK}</i><span><b>Reserva añadida a la agenda</b>4 personas · Hoy ${hour} · Laura Méndez${al?' · Alergia: frutos secos':''}</span>`;M.appendChild(c);scroll();chips(['Empezar de nuevo']);},900));}});
    start();return ()=>T.stop();
  }

  /* ===== Costa Norte ===== */
  const CN_P=[
    {id:1,op:'Comprar',z:'Vigo',t:'Piso con vistas a la ría',h:3,b:2,m:98,p:265000,sky:'#CFE0EA',c:'#EDE4D6',k:'piso'},
    {id:2,op:'Comprar',z:'Sanxenxo',t:'Ático con terraza',h:2,b:2,m:84,p:320000,sky:'#F2DCC8',c:'#F6F2EA',k:'atico'},
    {id:3,op:'Comprar',z:'Baiona',t:'Casa de piedra con jardín',h:4,b:3,m:210,p:445000,sky:'#D7E4D2',c:'#CDBDA4',k:'casa'},
    {id:4,op:'Alquilar',z:'Vigo',t:'Estudio reformado en el centro',h:1,b:1,m:42,p:690,sky:'#E3DDEB',c:'#EFE8DC',k:'piso'},
    {id:5,op:'Alquilar',z:'O Grove',t:'Apartamento a 100 m de la playa',h:2,b:1,m:65,p:850,sky:'#CDE5E6',c:'#F6F2EA',k:'atico'},
    {id:6,op:'Comprar',z:'Vigo',t:'Dúplex en Bouzas',h:3,b:2,m:120,p:298000,sky:'#E9E1CF',c:'#DED0BA',k:'duplex'},
    {id:7,op:'Alquilar',z:'Baiona',t:'Casa con vistas al mar',h:3,b:2,m:140,p:1450,sky:'#D3E2EE',c:'#E8E0D2',k:'casa'},
    {id:8,op:'Comprar',z:'O Grove',t:'Piso junto al puerto',h:2,b:1,m:72,p:189000,sky:'#DCE7EF',c:'#F0E9DC',k:'piso'},
    {id:9,op:'Alquilar',z:'Sanxenxo',t:'Piso con piscina comunitaria',h:3,b:2,m:96,p:1100,sky:'#F0E2CF',c:'#F6F2EA',k:'duplex'},
    {id:10,op:'Comprar',z:'Sanxenxo',t:'Chalet con piscina',h:5,b:4,m:260,p:690000,sky:'#D8E8D9',c:'#F1EBE0',k:'casa'}];
  const cnPrice=p=>p.op==='Alquilar'?`${p.p.toLocaleString('es-ES')} €/mes`:`${p.p.toLocaleString('es-ES')} €`;
  function cnHouse(p){
    const W='#9FB6C4',win=(x,y,cols,rows,w=8,h=9,gx=5,gy=6)=>{let s='';for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)s+=`<rect x="${x+c*(w+gx)}" y="${y+r*(h+gy)}" width="${w}" height="${h}" rx="1.5" fill="${W}"/>`;return s;};
    const B={
      piso:`<rect x="52" y="22" width="56" height="64" rx="3" fill="${p.c}"/>${win(58,28,4,4,8,9,5,6)}<rect x="74" y="74" width="12" height="12" fill="#8C6A52"/>`,
      atico:`<rect x="40" y="34" width="80" height="52" rx="3" fill="${p.c}"/><rect x="58" y="22" width="44" height="12" rx="2" fill="${p.c}"/><path d="M40 34 H120" stroke="#B9A88F" stroke-width="2"/>${win(48,42,5,3,9,8,6,6)}<circle cx="46" cy="30" r="5" fill="#6F9A5B"/><circle cx="114" cy="30" r="5" fill="#6F9A5B"/>`,
      casa:`<rect x="44" y="46" width="62" height="40" fill="${p.c}"/><path d="M38 48 L75 20 L112 48 Z" fill="#9C5B42"/><rect x="92" y="24" width="7" height="14" fill="#7E4836"/>${win(52,54,2,2,10,9,26,6)}<rect x="69" y="64" width="12" height="22" rx="2" fill="#6B4D3A"/><circle cx="124" cy="66" r="12" fill="#6F9A5B"/><rect x="122" y="74" width="4" height="12" fill="#6B4D3A"/>`,
      duplex:`<rect x="34" y="36" width="44" height="50" fill="${p.c}"/><rect x="80" y="30" width="46" height="56" fill="${p.c}" opacity=".85"/><path d="M34 36 L56 24 L78 36ZM80 30 L103 18 L126 30Z" fill="#B0745A"/>${win(41,44,2,3,10,8,10,7)}${win(88,40,2,3,10,8,10,7)}`};
    return `<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="160" height="100" fill="${p.sky}"/><circle cx="132" cy="20" r="9" fill="#FFF6E0"/><rect y="84" width="160" height="16" fill="#B9C7A8"/>${B[p.k]}</svg>`;
  }
  $$('[data-thumb-houses]').forEach(el=>el.innerHTML=[CN_P[0],CN_P[2],CN_P[1]].map(p=>`<div><figure>${cnHouse(p)}</figure><b>${cnPrice(p)}</b><span>${p.t}</span></div>`).join(''));
  function vCosta(view,ctx){
    const st=ctx.state.costa||(ctx.state.costa={op:'Comprar',z:'Todas',h:0});
    view.innerHTML=`<div class="bw"><div class="bw-bar"><i></i><i></i><i></i><span>costanorte.es</span></div><div class="bw-c"><div class="cn">
      <nav class="cn-nav"><span class="cn-logo"><i></i>costa norte</span><span class="cn-links"><span>Vender</span><span>Nosotros</span><span>Contacto</span></span></nav>
      <header class="cn-hero"><h4>Tu casa en las<br>Rías Baixas</h4>
        <div class="cn-s"><div class="cn-seg" role="group" aria-label="Operación">${['Comprar','Alquilar'].map(o=>`<button type="button" data-op="${o}">${o}</button>`).join('')}</div>
          <div class="cn-f"><small>Zona</small><div class="cn-chips" data-g="z">${['Todas','Vigo','Sanxenxo','Baiona','O Grove'].map(z=>`<button type="button" data-v="${z}">${z}</button>`).join('')}</div></div>
          <div class="cn-f"><small>Habitaciones</small><div class="cn-chips" data-g="h">${[0,1,2,3,4].map(h=>`<button type="button" data-v="${h}">${h?h+'+':'Todas'}</button>`).join('')}</div></div></div></header>
      <div class="cn-rh"><b></b><span>Ordenado por más recientes</span></div><div class="cn-grid"></div></div></div></div>`;
    const cn=view.querySelector('.cn'),grid=view.querySelector('.cn-grid'),bwc=view.querySelector('.bw-c');
    const draw=()=>{view.querySelectorAll('[data-op]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.op===st.op)));
      view.querySelectorAll('[data-g="z"] button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.v===st.z)));
      view.querySelectorAll('[data-g="h"] button').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.v===st.h)));
      const list=CN_P.filter(p=>p.op===st.op&&(st.z==='Todas'||p.z===st.z)&&p.h>=st.h);
      view.querySelector('.cn-rh b').textContent=`${list.length} ${list.length===1?'vivienda':'viviendas'}`;
      grid.innerHTML=list.length?list.map(p=>`<button type="button" class="cn-card" data-p="${p.id}"><span class="cn-img">${cnHouse(p)}<em>${p.z}</em></span><b>${cnPrice(p)}</b><span class="cn-t">${p.t}</span><small>${p.h} hab · ${p.b} ${p.b===1?'baño':'baños'} · ${p.m} m²</small></button>`).join(''):`<div class="cn-empty">No hay viviendas con esos filtros. Prueba con otra zona.</div>`;};
    view.querySelector('.cn-s').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
      if(b.dataset.op)st.op=b.dataset.op;else{const g=b.parentElement.dataset.g;if(g==='z')st.z=b.dataset.v;if(g==='h')st.h=+b.dataset.v;}draw();});
    const close=()=>cn.querySelectorAll('.cn-over').forEach(x=>x.remove());
    grid.addEventListener('click',e=>{const c=e.target.closest('[data-p]');if(!c)return;const p=CN_P.find(x=>x.id===+c.dataset.p);let slot='';
      const SL=[[1,'10:00'],[1,'17:30'],[2,'12:00'],[3,'18:30']].map(([k,t])=>`${dayName(k)} · ${t}`);
      const ov=document.createElement('div');ov.className='cn-over';ov.innerHTML=`<div class="cn-dt" role="dialog" aria-label="${p.t}"><button type="button" class="cn-x" aria-label="Cerrar">✕</button>
        <div class="cn-dimg">${cnHouse(p)}</div><div class="cn-db"><small>${p.op==='Comprar'?'En venta':'En alquiler'} · ${p.z}</small><h5>${p.t}</h5><b class="cn-dp">${cnPrice(p)}</b>
        <div class="cn-specs"><span><b>${p.h}</b>hab.</span><span><b>${p.b}</b>${p.b===1?'baño':'baños'}</span><span><b>${p.m}</b>m²</span></div>
        <p>Luminosa, lista para entrar a vivir y a pocos minutos de todo. Te la enseñamos cuando mejor te venga.</p>
        <div class="cn-visit"><small>Pide una visita</small><div class="cn-slots">${SL.map(s=>`<button type="button" data-s="${s}">${s}</button>`).join('')}</div><button type="button" class="cn-btn" disabled>Elige un horario</button></div></div></div>`;
      ov.addEventListener('click',ev=>{if(ev.target===ov||ev.target.closest('.cn-x')){close();return;}
        const s=ev.target.closest('[data-s]');const go=ov.querySelector('.cn-btn');
        if(s){slot=s.dataset.s;ov.querySelectorAll('[data-s]').forEach(x=>x.setAttribute('aria-pressed',String(x===s)));go.disabled=false;go.textContent='Solicitar visita';return;}
        if(ev.target===go&&slot){ov.querySelector('.cn-visit').innerHTML=`<div class="cn-ok"><i>${CK}</i><b>Visita solicitada · ${slot}</b><span>Te confirmamos por WhatsApp en unos minutos.</span></div>`;}});
      cn.appendChild(ov);bwc.scrollTo({top:0});});
    draw();return ()=>{};
  }
  const CL_POOL=[
    {n:'Marta Iglesias',src:'Idealista',msg:'Hola, ¿sigue disponible el piso de Vigo con vistas?',tags:['Compra','3 hab','Hasta 280.000 €','Hipoteca preaprobada'],hot:1,visit:`${dayName(4)} · 17:30 · Piso con vistas a la ría`},
    {n:'Pablo Ferreiro',src:'Web',msg:'Busco alquiler en Sanxenxo para todo el año.',tags:['Alquiler','2-3 hab','Hasta 1.100 €/mes','Con mascota'],hot:1,visit:`${dayName(2)} · 12:00 · Piso con piscina comunitaria`},
    {n:'Lucía Otero',src:'WhatsApp',msg:'¿Qué casas tenéis en Baiona por menos de 400.000?',tags:['Compra','Casa','Hasta 400.000 €','Sin prisa'],hot:0,next:'Le hemos enviado 3 casas parecidas'},
    {n:'Iago Comesaña',src:'Fotocasa',msg:'Quiero vender mi piso en O Grove, ¿cuánto puede valer?',tags:['Venta','2 hab','O Grove','Valoración'],hot:1,visit:`${dayName(1)} · 10:00 · Valoración en O Grove`}];
  function vCostaLeads(view,ctx){
    const st=ctx.state.leads||(ctx.state.leads={i:0});
    view.innerHTML=`<div class="bw"><div class="bw-bar"><i></i><i></i><i></i><span>panel.costanorte.es/contactos</span></div><div class="bw-c"><div class="cl">
      <div class="cl-top"><div><h5>Contactos</h5><p>La IA responde a cada contacto, lo cualifica y le agenda la visita.</p></div><button type="button" class="cl-btn">Simular nuevo contacto</button></div>
      <div class="cl-board">${[['new','Nuevos'],['qual','Cualificados por IA'],['visit','Visita agendada']].map(([k,t])=>`<section class="cl-col" data-col="${k}"><h6>${t}<i>0</i></h6><div class="cl-list"></div></section>`).join('')}</div></div></div></div>`;
    const T=timers(),btn=view.querySelector('.cl-btn');
    const col=k=>view.querySelector(`[data-col="${k}"] .cl-list`);
    const count=()=>view.querySelectorAll('.cl-col').forEach(c=>c.querySelector('h6 i').textContent=c.querySelectorAll('.cl-card').length);
    const card=(L,stage)=>{const d=document.createElement('article');d.className='cl-card';
      d.innerHTML=`<div class="cl-h"><b>${L.n}</b><span class="cl-src">${L.src}</span></div><p>“${L.msg}”</p><div class="cl-x"></div>`;
      if(stage>=1)qual(d,L);if(stage>=2)visit(d,L);return d;};
    const qual=(d,L)=>{d.querySelector('.cl-x').innerHTML=`<div class="cl-tags">${L.tags.map(t=>`<span>${t}</span>`).join('')}</div><span class="cl-score ${L.hot?'hot':''}">${L.hot?'Caliente':'Templado'}</span>${L.hot?'':`<small class="cl-nx">${L.next}</small>`}`;};
    const visit=(d,L)=>{d.querySelector('.cl-x').insertAdjacentHTML('beforeend',`<div class="cl-v"><i>${CK}</i>${L.visit}</div>`);};
    const move=(d,k)=>{d.classList.remove('enter');col(k).prepend(d);void d.offsetWidth;d.classList.add('enter');count();};
    col('visit').append(card({n:'Ana Lorenzo',src:'Web',msg:'Me interesa el dúplex de Bouzas.',tags:['Compra','3 hab','Hasta 310.000 €'],hot:1,visit:'Hoy · 19:00 · Dúplex en Bouzas'},2));
    col('qual').append(card({n:'Xoán Rial',src:'Idealista',msg:'¿Aceptan mascotas en el estudio del centro?',tags:['Alquiler','1 hab','Hasta 700 €/mes'],hot:0,next:'Le hemos respondido con las condiciones'},1));
    count();
    const run=()=>{btn.disabled=true;const L=CL_POOL[st.i++%CL_POOL.length];const d=card(L,0);move(d,'new');
      const x=d.querySelector('.cl-x');T.later(()=>{x.innerHTML='<span class="cl-ai"><i></i>La IA ya le ha respondido · 4 s</span>';},700);
      T.later(()=>{x.innerHTML='<span class="cl-ai busy"><i></i>Analizando la conversación…</span>';},1800);
      T.later(()=>{qual(d,L);move(d,'qual');},3200);
      T.later(()=>{if(L.hot){visit(d,L);move(d,'visit');}btn.disabled=false;},L.hot?4800:3400);};
    btn.onclick=run;T.later(run,700);
    return ()=>T.stop();
  }

  /* ===== Lumen ===== */
  const LM_COL=[['Espresso','#1C1714'],['Crema','#F4ECDF'],['Ámbar','#F2A93B'],['Avellana','#A77A55']];
  const lmMark=(fg)=>`<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="${fg}"/><path d="M50 4a46 46 0 0 1 46 46H50z" fill="#F2A93B"/></svg>`;
  const lmMarkInner=(fg,x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fg}"/><path d="M${x} ${y-r}a${r} ${r} 0 0 1 ${r} ${r}H${x}z" fill="#F2A93B"/>`;
  function lmApp(k){
    const E='#1C1714',C='#F4ECDF',A='#F2A93B',H='#A77A55',G="font-family:Gloock,serif";
    const M={
      Vaso:`<svg viewBox="0 0 200 200"><ellipse cx="100" cy="182" rx="46" ry="6" fill="rgba(0,0,0,.18)"/><path d="M62 52 L138 52 L128 178 L72 178 Z" fill="${C}"/><path d="M66 92 L134 92 L130 140 L70 140 Z" fill="${A}"/>${lmMarkInner(E,100,116,15)}<rect x="56" y="38" width="88" height="16" rx="5" fill="${E}"/><rect x="66" y="30" width="68" height="10" rx="4" fill="${E}"/><path class="lm-steam" d="M88 24 q-8 -10 0 -18M104 22 q-8 -10 0 -18M120 24 q-8 -10 0 -18" stroke="${H}" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`,
      Bolsa:`<svg viewBox="0 0 200 200"><ellipse cx="100" cy="184" rx="58" ry="6" fill="rgba(0,0,0,.18)"/><path d="M50 60 L150 60 L158 180 L42 180 Z" fill="#C9A27E"/><path d="M50 60 L150 60 L148 72 L52 72 Z" fill="#B48C68"/><path d="M78 60 q0 -30 22 -30 q22 0 22 30" stroke="${E}" stroke-width="5" fill="none"/>${lmMarkInner(E,100,112,20)}<text x="100" y="160" text-anchor="middle" style="${G};font-size:22px" fill="${E}">lumen</text></svg>`,
      Tarjeta:`<svg viewBox="0 0 200 200"><rect x="22" y="48" width="156" height="104" rx="12" fill="${E}"/>${lmMarkInner(C,48,74,10)}<text x="64" y="80" style="${G};font-size:17px" fill="${C}">lumen</text><text x="34" y="104" style="font:600 8px Figtree,sans-serif;letter-spacing:1.5px" fill="${H}">TARJETA DE CAFÉ</text>${[...Array(8)].map((_,i)=>`<circle cx="${40+(i%4)*36}" cy="${i<4?122:140}" r="7" fill="${i<5?A:'none'}" stroke="${A}" stroke-width="1.6"/>`).join('')}</svg>`,
      Instagram:`<svg viewBox="0 0 200 200"><rect x="40" y="20" width="120" height="160" rx="14" fill="#fff"/>${lmMarkInner(E,58,38,8)}<text x="72" y="42" style="font:600 9px Figtree,sans-serif" fill="${E}">lumencafe</text>${[...Array(9)].map((_,i)=>{const x=46+(i%3)*37,y=56+Math.floor(i/3)*37,f=[E,A,C,H,E,C,A,H,E][i];return `<rect x="${x}" y="${y}" width="35" height="35" rx="3" fill="${f}"/>`+(i===0?lmMarkInner(C,x+17.5,y+17.5,9):i===4?`<text x="${x+17.5}" y="${y+21}" text-anchor="middle" style="${G};font-size:9px" fill="${A}">hola</text>`:'');}).join('')}</svg>`};
    return M[k];
  }
  function vLumenBrand(view,ctx){
    const st=ctx.state.lumen||(ctx.state.lumen={th:'dark',app:'Vaso'});
    view.innerHTML=`<div class="lm"><div class="lm-g">
      <section class="lm-c lm-logo"><div class="lm-lg"><span class="lm-mk"></span><span class="lm-wm">lumen</span><small>café · obrador</small></div>
        <div class="lm-sw" role="group" aria-label="Versión del logo"><button type="button" data-th="dark">Oscuro</button><button type="button" data-th="light">Claro</button></div></section>
      <section class="lm-c lm-cols"><small>Colores</small><div class="lm-pal">${LM_COL.map(([n,h])=>`<button type="button" data-hex="${h}"><i style="background:${h}"></i><b>${n}</b><span>${h}</span></button>`).join('')}</div></section>
      <section class="lm-c lm-app"><div class="lm-apt" role="group" aria-label="Aplicaciones">${['Vaso','Bolsa','Tarjeta','Instagram'].map(a=>`<button type="button" data-app="${a}">${a}</button>`).join('')}</div><div class="lm-mock"></div></section>
      <section class="lm-c lm-type"><small>Tipografía</small><div class="lm-aa">Aa</div><p><b>Gloock</b> para titulares<br><b>Figtree</b> para textos</p></section>
    </div></div>`;
    const draw=()=>{const lg=view.querySelector('.lm-logo');lg.dataset.th=st.th;lg.querySelector('.lm-mk').innerHTML=lmMark(st.th==='dark'?'#F4ECDF':'#1C1714');
      view.querySelectorAll('[data-th]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.th===st.th)));
      view.querySelectorAll('[data-app]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.app===st.app)));
      const m=view.querySelector('.lm-mock');m.innerHTML=lmApp(st.app);m.classList.remove('enter');void m.offsetWidth;m.classList.add('enter');};
    view.querySelector('.lm-g').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
      if(b.dataset.th){st.th=b.dataset.th;draw();}
      else if(b.dataset.app){st.app=b.dataset.app;draw();}
      else if(b.dataset.hex){try{navigator.clipboard&&navigator.clipboard.writeText(b.dataset.hex);}catch(_){}const s=b.querySelector('span');s.textContent='Copiado';b.classList.add('ok');setTimeout(()=>{s.textContent=b.dataset.hex;b.classList.remove('ok');},1400);}});
    draw();return ()=>{};
  }
  function vLumenReels(view){
    view.innerHTML=`<div class="ph"><div class="ph-s"><div class="rl">
      <div class="rl-slide lmr-1"><h6>Buenos<br><em>días</em></h6><svg class="lmr-cup" viewBox="0 0 200 200" aria-hidden="true"><path class="lm-steam" d="M80 46 q-10 -14 0 -28M100 42 q-10 -14 0 -28M120 46 q-10 -14 0 -28" stroke="#A77A55" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M44 64 H156 L146 150 Q140 170 100 170 Q60 170 54 150 Z" fill="#F4ECDF"/><path d="M156 84 q26 2 22 26 q-4 20 -28 18" stroke="#F4ECDF" stroke-width="10" fill="none"/><ellipse cx="100" cy="66" rx="56" ry="9" fill="#6B4630"/><path d="M84 64 q16 -10 32 0 q-16 8 -32 0z" fill="#E9D3B4"/></svg></div>
      <div class="rl-slide lmr-2"><h6>Latte de<br><em>avellana</em></h6><div class="lmr-ing"><span><b>1</b>Espresso doble</span><span><b>2</b>Leche de avena</span><span><b>3</b>Avellana tostada</span></div></div>
      <div class="rl-slide lmr-3"><h6>Brunch<br><em>los domingos</em></h6><ul class="lmr-list"><li>Huevos benedictinos</li><li>Tostada de aguacate</li><li>Tortitas con fruta</li><li>Zumo y café de especialidad</li></ul><span class="lmr-h">De 10:00 a 14:00</span></div>
      <div class="rl-nav"><button type="button" aria-label="Anterior"></button><button type="button" aria-label="Siguiente"></button></div>
      <div class="rl-prog"><i><span></span></i><i><span></span></i><i><span></span></i></div>
      <div class="rl-top"><i class="lmr-av">${lmMark('#F4ECDF')}</i>lumencafe<span>Seguir</span></div>
      <div class="rl-side"><button type="button" class="rl-heart" style="background:none;border:0;color:#fff;font:inherit;cursor:pointer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3.3 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.7 0 6.1 3.8 4.6 7.3C19.5 16.4 12 21 12 21z"/></svg><span>842</span></button><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z"/></svg>36</span></div>
      <div class="rl-cap"><b>lumencafe</b><span class="rl-txt"></span><span class="rl-music">♫ Audio original · lumen</span></div></div></div></div>`;
    const slides=view.querySelectorAll('.rl-slide'),prog=view.querySelectorAll('.rl-prog i'),txt=view.querySelector('.rl-txt');
    const CAP=['Abrimos a las 8:00. El primer café del día sabe mejor aquí.','Nuevo en la barra: latte de avellana. ¿Lo pruebas esta semana?','Este domingo estrenamos brunch. Reserva tu mesa por WhatsApp.'];
    let i=0,tm=0;const D=7000;
    const go=n=>{i=(n+3)%3;slides.forEach((s,k)=>s.classList.toggle('on',k===i));prog.forEach((p,k)=>{p.classList.remove('run','done');if(k<i)p.classList.add('done');});void view.offsetWidth;prog[i].style.setProperty('--d',D+'ms');prog[i].classList.add('run');txt.textContent=CAP[i];clearTimeout(tm);if(!RM)tm=setTimeout(()=>go(i+1),D);};
    const nav=view.querySelectorAll('.rl-nav button');nav[0].onclick=()=>go(i-1);nav[1].onclick=()=>go(i+1);
    const h=view.querySelector('.rl-heart');h.onclick=e=>{e.stopPropagation();h.classList.toggle('on');h.querySelector('span').textContent=h.classList.contains('on')?'843':'842';};
    go(0);return ()=>clearTimeout(tm);
  }
  $$('[data-thumb-lumen]').forEach(el=>el.innerHTML=lmMark('#1C1714'));
  $$('[data-thumb-cup]').forEach(el=>el.innerHTML=lmApp('Vaso'));

  Object.assign(CASES,{
    brava:{eye:'Concepto · Restaurante',t:'Casa Brava',p:'Web para un restaurante de brasa con la carta y reservas en dos toques, y un asistente con IA que atiende WhatsApp a cualquier hora y apunta las mesas solo.',
      list:['Reserva online con las horas libres en tiempo real','Carta por secciones, siempre al día','Asistente con IA en WhatsApp que reserva por ti','Alergias y notas que llegan directas a cocina','Recordatorio automático el mismo día'],
      tabs:[['web','Web',vBrava],['wa','WhatsApp con IA',vBravaChat]],svc:['web','wa']},
    costa:{eye:'Concepto · Inmobiliaria',t:'Costa Norte',p:'Web para una inmobiliaria de las Rías Baixas con buscador de viviendas y visita en un clic, y una IA que responde a cada contacto, lo cualifica y le agenda la visita.',
      list:['Buscador por operación, zona y habitaciones','Ficha de cada vivienda con petición de visita','Respuesta automática a cada contacto en segundos','Contactos cualificados por presupuesto y necesidad','Visitas agendadas sin llamadas de por medio'],
      tabs:[['web','Web',vCosta],['leads','Contactos con IA',vCostaLeads]],svc:['web','wa','auto']},
    lumen:{eye:'Concepto · Cafetería',t:'Lumen',p:'Identidad completa para una cafetería de especialidad: logo, colores y tipografía aplicados al vaso, la bolsa y las redes, y reels cada semana para Instagram.',
      list:['Logo con versión clara y oscura','Paleta y tipografías listas para usar','Vaso, bolsa, tarjeta de fidelidad e Instagram','Reels de producto y novedades cada semana'],
      tabs:[['marca','Marca',vLumenBrand],['reels','Reels',vLumenReels]],svc:['marca','vid']}});
