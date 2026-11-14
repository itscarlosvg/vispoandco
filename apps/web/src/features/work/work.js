  // ---------- work: case studies with live demos ----------
  const GARM={
    dress:(c)=>`<svg viewBox="0 0 100 120" aria-hidden="true"><path d="M38 10 L45 6 Q50 13 55 6 L62 10 L60 32 L74 108 Q50 116 26 108 L40 32 Z" fill="${c}"/><path d="M40 33 Q50 37 60 33" stroke="rgba(0,0,0,.18)" stroke-width="1.6" fill="none"/><path d="M47 40 L42 106M55 40 L61 106" stroke="rgba(0,0,0,.08)" stroke-width="1.4" fill="none"/></svg>`,
    sweater:(c)=>`<svg viewBox="0 0 100 120" aria-hidden="true"><path d="M30 18 L42 10 Q50 17 58 10 L70 18 L90 56 L79 62 L70 44 L70 106 L30 106 L30 44 L21 62 L10 56 Z" fill="${c}"/><path d="M30 99 H70M79 62 L90 56M21 62 L10 56" stroke="rgba(0,0,0,.16)" stroke-width="3" fill="none"/><path d="M42 10 Q50 20 58 10" stroke="rgba(0,0,0,.2)" stroke-width="2.4" fill="none"/></svg>`,
    trousers:(c)=>`<svg viewBox="0 0 100 120" aria-hidden="true"><path d="M31 8 H69 L75 112 H56 L50 42 L44 112 H25 Z" fill="${c}"/><path d="M31 15 H69" stroke="rgba(255,255,255,.18)" stroke-width="2"/><path d="M50 15 V40" stroke="rgba(0,0,0,.2)" stroke-width="1.4"/></svg>`,
    coat:(c)=>`<svg viewBox="0 0 100 120" aria-hidden="true"><path d="M30 16 L42 8 L50 30 L58 8 L70 16 L88 62 L77 66 L70 50 L73 114 L27 114 L30 50 L23 66 L12 62 Z" fill="${c}"/><path d="M50 30 V114M42 8 L50 30 L58 8" stroke="rgba(0,0,0,.22)" stroke-width="1.6" fill="none"/><circle cx="46" cy="52" r="1.6" fill="rgba(0,0,0,.3)"/><circle cx="46" cy="66" r="1.6" fill="rgba(0,0,0,.3)"/><path d="M34 76 H44M56 76 H66" stroke="rgba(0,0,0,.18)" stroke-width="1.6"/></svg>`,
    skirt:(c)=>`<svg viewBox="0 0 100 120" aria-hidden="true"><rect x="33" y="24" width="34" height="8" rx="2" fill="${c}"/><path d="M33 31 H67 L82 98 Q50 106 18 98 Z" fill="${c}"/><path d="M42 33 L34 100M50 33 V103M58 33 L66 100" stroke="rgba(0,0,0,.1)" stroke-width="1.4" fill="none"/></svg>`,
    bag:(c)=>`<svg viewBox="0 0 100 120" aria-hidden="true"><path d="M36 48 Q36 20 50 20 Q64 20 64 48" stroke="${c}" stroke-width="4" fill="none"/><rect x="22" y="44" width="56" height="54" rx="9" fill="${c}"/><path d="M22 60 H78" stroke="rgba(255,255,255,.15)" stroke-width="2"/><rect x="45" y="56" width="10" height="7" rx="2" fill="#D9C7A0"/></svg>`,
    blouse:(c)=>`<svg viewBox="0 0 100 120" aria-hidden="true"><path d="M34 18 L44 12 Q50 22 56 12 L66 18 L80 38 L71 44 L66 36 L68 96 L32 96 L34 36 L29 44 L20 38 Z" fill="${c}"/><path d="M50 22 V96" stroke="rgba(0,0,0,.12)" stroke-width="1.4"/><circle cx="50" cy="40" r="1.4" fill="rgba(0,0,0,.25)"/><circle cx="50" cy="56" r="1.4" fill="rgba(0,0,0,.25)"/><circle cx="50" cy="72" r="1.4" fill="rgba(0,0,0,.25)"/></svg>`,
    scarf:(c)=>`<svg viewBox="0 0 100 120" aria-hidden="true"><path d="M30 14 Q50 4 70 14 L66 30 Q50 22 34 30 Z" fill="${c}"/><path d="M38 28 L34 104 L48 104 L52 30 Z" fill="${c}"/><path d="M34 104 V112M38 104 V112M42 104 V112M46 104 V112" stroke="${c}" stroke-width="1.6"/><path d="M36 50 H50M36 70 H50" stroke="rgba(0,0,0,.12)" stroke-width="3"/></svg>`};
  const PRODS=[
    {id:'bruma',n:'Vestido Bruma',cat:'Vestidos',g:'dress',p:69,c:'#A9B8D6',bg:'#E4E9F4',cols:['#A9B8D6','#1D2030'],nuevo:1,d:'Vestido midi de viscosa con caída suave y cintura marcada.'},
    {id:'nimbo',n:'Jersey Nimbo',cat:'Punto',g:'sweater',p:54,c:'#E8D9C4',bg:'#F1EBE1',cols:['#E8D9C4','#9AA3B5'],nuevo:1,d:'Punto grueso de lana y algodón, cuello redondo y hombro caído.'},
    {id:'estrato',n:'Abrigo Estrato',cat:'Abrigos',g:'coat',p:129,c:'#B79E85',bg:'#EEE6DC',cols:['#B79E85','#3F4660'],d:'Abrigo recto de paño con botones ocultos y forro interior.'},
    {id:'cirro',n:'Pantalón Cirro',cat:'Básicos',g:'trousers',p:49,c:'#3F4660',bg:'#E3E5EC',cols:['#3F4660','#B79E85'],d:'Pantalón de pinzas, tiro alto y pierna ancha.'},
    {id:'alba',n:'Blusa Alba',cat:'Básicos',g:'blouse',p:39,c:'#F7F4EE',bg:'#E9E7E1',cols:['#F7F4EE','#A9B8D6'],d:'Blusa de algodón ligero con botones de nácar.'},
    {id:'llovizna',n:'Falda Llovizna',cat:'Básicos',g:'skirt',p:42,c:'#9FB3AA',bg:'#E3EBE7',cols:['#9FB3AA','#1D2030'],d:'Falda midi plisada con cintura elástica.'},
    {id:'alto',n:'Bolso Altocúmulo',cat:'Accesorios',g:'bag',p:38,c:'#2C2F3D',bg:'#E2E3E8',cols:['#2C2F3D','#B79E85'],d:'Bolso de piel vegana con asa corta y cierre de broche.'},
    {id:'niebla',n:'Bufanda Niebla',cat:'Accesorios',g:'scarf',p:24,c:'#9AA3B5',bg:'#E6E8EE',cols:['#9AA3B5','#E8D9C4'],d:'Bufanda de punto suave con flecos.'}];
  const eurA=n=>n.toLocaleString('es-ES',{minimumFractionDigits:n%1?2:0,maximumFractionDigits:2})+' €';
  // thumbs
  $$('[data-thumb-products]').forEach(el=>el.innerHTML=PRODS.slice(0,6).map(p=>`<div><figure style="background:${p.bg}">${GARM[p.g](p.c)}</figure><span><i style="font-style:normal">${p.n.split(' ')[0]}</i><i style="font-style:normal">${p.p} €</i></span></div>`).join(''));
  $$('[data-thumb-garment]').forEach(el=>el.innerHTML=GARM.dress('#C9D3F0'));

  function qrSvg(seed,fg){let s=seed;const r=()=>(s=(s*9301+49297)%233280)/233280;const N=25,c=[];
    const finder=(x,y)=>{for(let i=0;i<7;i++)for(let j=0;j<7;j++){const e=i===0||i===6||j===0||j===6||(i>1&&i<5&&j>1&&j<5);if(e)c.push([x+i,y+j]);}};
    finder(0,0);finder(N-7,0);finder(0,N-7);
    for(let i=0;i<N;i++)for(let j=0;j<N;j++){const inF=(i<8&&j<8)||(i>N-9&&j<8)||(i<8&&j>N-9);if(!inF&&r()<.48)c.push([i,j]);}
    return `<svg viewBox="0 0 ${N} ${N}" width="100%" height="100%" shape-rendering="crispEdges" aria-hidden="true">${c.map(([x,y])=>`<rect x="${x}" y="${y}" width="1" height="1" fill="${fg}"/>`).join('')}</svg>`;}

  /* views */
  function vShop(view,ctx){
    const st=ctx.state.shop||(ctx.state.shop={cat:'Todo',bag:[]});
    view.innerHTML=`<div class="bw"><div class="bw-bar"><i></i><i></i><i></i><span>ateliernube.es</span></div><div class="bw-c"><div class="an">
      <div class="an-ann">Envío gratis a partir de 60 € · Cambios en 30 días</div>
      <nav class="an-nav"><span class="an-logo">atelier nube</span><span class="an-cats" role="group" aria-label="Categorías">${['Todo','Vestidos','Punto','Abrigos','Básicos','Accesorios'].map(c=>`<button type="button" data-cat="${c}" aria-pressed="${c===st.cat}">${c}</button>`).join('')}</span><button class="an-bag" type="button">Bolsa <i>0</i></button></nav>
      <header class="an-hero"><h4>Colección<br><em>otoño nube</em></h4><p>Prendas suaves en tonos de cielo de octubre. Hechas en pequeñas series en Galicia.</p></header>
      <div class="an-grid"></div></div></div></div>`;
    const an=view.querySelector('.an'),grid=view.querySelector('.an-grid'),bagBtn=view.querySelector('.an-bag');
    const P=id=>PRODS.find(p=>p.id===id);
    const count=()=>st.bag.reduce((s,i)=>s+i.q,0),sub=()=>st.bag.reduce((s,i)=>s+i.q*P(i.id).p,0);
    const drawGrid=()=>{grid.innerHTML=PRODS.filter(p=>st.cat==='Todo'||p.cat===st.cat).map(p=>`<button class="an-p" type="button" data-p="${p.id}"><span class="an-img" style="background:${p.bg}">${p.nuevo?'<span class="an-new">Nuevo</span>':''}${GARM[p.g](p.c)}</span><b><span>${p.n}</span><span>${p.p} €</span></b><small>${p.cols.map(c=>`<i style="background:${c}"></i>`).join('')}</small></button>`).join('');};
    const drawBag=()=>{bagBtn.querySelector('i').textContent=count();};
    drawGrid();drawBag();
    view.querySelector('.an-cats').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;st.cat=b.dataset.cat;view.querySelectorAll('.an-cats button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));drawGrid();});
    const close=()=>an.querySelectorAll('.an-over,.an-qv').forEach(x=>x.remove());
    grid.addEventListener('click',e=>{const b=e.target.closest('[data-p]');if(!b)return;const p=P(b.dataset.p);let size='';
      const ov=document.createElement('div');ov.className='an-over';ov.addEventListener('click',close);
      const qv=document.createElement('div');qv.className='an-qv';
      qv.innerHTML=`<div class="an-img" style="background:${p.bg}">${GARM[p.g](p.c)}</div><div><button class="an-x" type="button" aria-label="Cerrar">✕</button><small style="color:var(--an-mut)">${p.cat}</small><h5>${p.n}</h5><span class="pr">${eurA(p.p)}</span><p>${p.d}</p><div class="an-sizes" role="group" aria-label="Talla">${['XS','S','M','L','XL'].map(s=>`<button type="button" data-s="${s}" aria-pressed="false">${s}</button>`).join('')}</div><p class="an-err"></p><button class="an-btn" type="button">Añadir a la bolsa</button></div>`;
      an.append(ov,qv);bw.scrollTo({top:0});
      qv.querySelector('.an-x').onclick=close;
      qv.querySelector('.an-sizes').addEventListener('click',ev=>{const s=ev.target.closest('[data-s]');if(!s)return;size=s.dataset.s;qv.querySelectorAll('.an-sizes button').forEach(x=>x.setAttribute('aria-pressed',String(x===s)));qv.querySelector('.an-err').textContent='';});
      qv.querySelector('.an-btn').onclick=()=>{if(!size){const z=qv.querySelector('.an-sizes');z.classList.remove('shake');void z.offsetWidth;z.classList.add('shake');qv.querySelector('.an-err').textContent='Elige una talla';return;}
        const ex=st.bag.find(i=>i.id===p.id&&i.s===size);if(ex)ex.q++;else st.bag.push({id:p.id,s:size,q:1});close();drawBag();bagBtn.classList.remove('bump');void bagBtn.offsetWidth;bagBtn.classList.add('bump');openBag();};});
    const bw=view.querySelector('.bw-c');
    function openBag(step){close();bw.scrollTo({top:0});const ov=document.createElement('div');ov.className='an-over';const dr=document.createElement('aside');dr.className='an-drawer';ov.appendChild(dr);ov.addEventListener('click',e=>{if(e.target===ov)close();});an.appendChild(ov);
      const render=()=>{const s=sub(),free=60,left=Math.max(0,free-s),ship=s>=free||!s?0:4.9;
        if(step==='ok'){dr.innerHTML=`<div class="an-dh"><b>Pedido confirmado</b><button class="an-x" style="position:static" type="button" aria-label="Cerrar">✕</button></div><div class="an-ok"><i>✓</i><b>Gracias por tu compra</b><p>Pedido AN-1042 · Te hemos enviado la confirmación por email y te avisaremos cuando salga.</p><button class="an-btn ghost" type="button" data-k="seguir">Seguir comprando</button></div>`;}
        else if(step==='pay'){dr.innerHTML=`<div class="an-dh"><b>Pago</b><button class="an-x" style="position:static" type="button" aria-label="Cerrar">✕</button></div><div class="an-items"><div class="an-pay" role="radiogroup" aria-label="Forma de pago">${['Tarjeta','Bizum','Apple Pay'].map((m,i)=>`<label><input type="radio" name="anpay" ${i===0?'checked':''}> ${m}</label>`).join('')}</div><p style="font-size:max(11px,1.2cqw);color:var(--an-mut)">Pago seguro. En la tienda real se abre la pasarela del banco.</p></div><div class="an-df"><div class="an-tot"><span>Total</span><span>${eurA(s+ship)}</span></div><button class="an-btn" type="button" data-k="ok">Pagar ${eurA(s+ship)}</button><button class="an-btn ghost" type="button" data-k="bag">Volver a la bolsa</button></div>`;}
        else{dr.innerHTML=`<div class="an-dh"><b>Tu bolsa</b><button class="an-x" style="position:static" type="button" aria-label="Cerrar">✕</button></div>${st.bag.length?`<div class="an-items">${st.bag.map((i,k)=>{const p=P(i.id);return `<div class="an-it"><span class="an-img" style="background:${p.bg}">${GARM[p.g](p.c)}</span><div><b>${p.n}</b><small>Talla ${i.s}</small><div class="an-qty"><button type="button" data-q="-1" data-k2="${k}" aria-label="Quitar uno">−</button><span>${i.q}</span><button type="button" data-q="1" data-k2="${k}" aria-label="Añadir uno">+</button></div></div><span>${eurA(p.p*i.q)}</span></div>`;}).join('')}</div>
          <div class="an-df"><div class="an-ship"><span>${left?`Te faltan ${eurA(left)} para el envío gratis`:'Tienes envío gratis'}</span><i><span style="width:${Math.min(100,s/free*100)}%"></span></i></div><div class="an-tot"><span>Subtotal</span><span>${eurA(s)}</span></div><button class="an-btn" type="button" data-k="pay">Tramitar pedido</button></div>`:`<div class="an-empty">Tu bolsa está vacía.</div>`}`;}
        dr.querySelector('.an-x').onclick=close;};
      dr.addEventListener('click',e=>{const q=e.target.closest('[data-q]');if(q){const it=st.bag[+q.dataset.k2];it.q+=+q.dataset.q;if(it.q<=0)st.bag.splice(+q.dataset.k2,1);drawBag();render();return;}
        const k=e.target.closest('[data-k]');if(!k)return;if(k.dataset.k==='ok'){st.bag=[];drawBag();}if(k.dataset.k==='seguir'){close();return;}step=k.dataset.k;render();});
      render();}
    bagBtn.addEventListener('click',()=>openBag());
    return ()=>{};
  }
  function vReels(view,ctx){
    view.innerHTML=`<div class="ph"><div class="ph-s"><div class="rl">
      <div class="rl-slide rl-1"><div class="big"><span>Otoño</span><span>nube</span></div>${['coat','dress','sweater'].map((g,i)=>`<div class="g">${GARM[g](['#B79E85','#C9D3F0','#E8D9C4'][i])}</div>`).join('')}</div>
      <div class="rl-slide rl-2"><h6>3 formas de llevar el <em>Jersey Nimbo</em></h6><div class="base">${GARM.sweater('#F7F4EE')}</div><div class="opt"><b>1</b>Con falda Llovizna</div><div class="opt"><b>2</b>Con pantalón Cirro</div><div class="opt"><b>3</b>Bajo el abrigo Estrato</div></div>
      <div class="rl-slide rl-3"><h6>Del boceto<br><em>a tu armario</em></h6><svg class="sk" viewBox="0 0 100 120" aria-hidden="true"><path class="fill" d="M38 10 L45 6 Q50 13 55 6 L62 10 L60 32 L74 108 Q50 116 26 108 L40 32 Z"/><path d="M38 10 L45 6 Q50 13 55 6 L62 10 L60 32 L74 108 Q50 116 26 108 L40 32 Z"/><path d="M40 33 Q50 37 60 33M47 40 L42 106M55 40 L61 106"/></svg></div>
      <div class="rl-nav"><button type="button" aria-label="Anterior"></button><button type="button" aria-label="Siguiente"></button></div>
      <div class="rl-prog"><i><span></span></i><i><span></span></i><i><span></span></i></div>
      <div class="rl-top"><i>a</i>ateliernube<span>Patrocinado</span></div>
      <div class="rl-side"><button type="button" class="rl-heart" style="background:none;border:0;color:#fff;font:inherit;cursor:pointer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3.3 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.7 0 6.1 3.8 4.6 7.3C19.5 16.4 12 21 12 21z"/></svg><span>1.248</span></button><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3 21l1.5-5.3A8.5 8.5 0 1 1 21 12z"/></svg>86</span><span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 3 11 14M22 3l-7 19-4-8-8-4z"/></svg>Enviar</span></div>
      <div class="rl-cap"><b>ateliernube</b><span class="rl-txt"></span><button class="rl-buy" type="button">Comprar ›</button><span class="rl-music">♫ Audio original · atelier nube</span></div></div></div></div>`;
    const slides=view.querySelectorAll('.rl-slide'),prog=view.querySelectorAll('.rl-prog i'),txt=view.querySelector('.rl-txt');
    const CAP=['La nueva colección ya está en la tienda. Prendas suaves para los días de cielo cambiante.','Un jersey, tres looks. ¿Con cuál te quedas?','Cada prenda empieza en papel, en nuestro taller de Vigo.'];
    let i=0,tm=0;const D=7000;
    const go=n=>{i=(n+3)%3;slides.forEach((s,k)=>s.classList.toggle('on',k===i));prog.forEach((p,k)=>{p.classList.remove('run','done');if(k<i)p.classList.add('done');});void view.offsetWidth;prog[i].style.setProperty('--d',D+'ms');prog[i].classList.add('run');txt.textContent=CAP[i];clearTimeout(tm);if(!RM)tm=setTimeout(()=>go(i+1),D);};
    const nav=view.querySelectorAll('.rl-nav button');nav[0].onclick=()=>go(i-1);nav[1].onclick=()=>go(i+1);
    const h=view.querySelector('.rl-heart');h.onclick=e=>{e.stopPropagation();h.classList.toggle('on');h.querySelector('span').textContent=h.classList.contains('on')?'1.249':'1.248';};
    view.querySelector('.rl-buy').onclick=e=>{e.stopPropagation();ctx.tab('shop');};
    go(0);return ()=>clearTimeout(tm);
  }
  function vApp(view,ctx){
    const st=ctx.state.app||(ctx.state.app={day:0,tab:'cls',booked:{},wait:{}});
    const days=[];for(let k=0;k<7;k++){const d=new Date();d.setDate(d.getDate()+k);days.push(d);}
    const DN=['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];
    const BASE=[['07:00','HIIT Express','Lucía','Sala 1',30,16,13,3],['09:30','Pilates Reformer','Andrea','Estudio',45,8,8,2],['13:15','Spinning','Dani','Sala ciclo',45,22,17,3],['18:00','Cross Training','Iago','Box',60,14,11,3],['19:30','Yoga Flow','Sara','Estudio',60,20,9,1],['20:30','Boxeo','Martín','Sala 2',50,16,16,3]];
    const classes=k=>BASE.map((c,j)=>{const seed=(k*7+j*3)%5;const bookedBase=Math.min(c[5],Math.max(2,c[6]-seed+(j%2)));return {id:k+'-'+j,t:c[0],n:c[1],coach:c[2],room:c[3],dur:c[4],cap:c[5],taken:(k===0?c[6]:bookedBase),int:c[7],date:days[k]};}).filter((c,j)=>!(days[k].getDay()===0&&j>3)&&!(days[k].getDay()===6&&j%2));
    view.innerHTML=`<div class="ph"><div class="ph-s"><div class="pg"><div class="pg-sb"><span>9:41</span><span>▂▄▆ <i></i></span></div><div class="pg-main"></div>
      <nav class="pg-tabs"><button type="button" data-t="cls"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>Clases</button><button type="button" data-t="res"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12l4 4 10-10"/></svg>Reservas</button><button type="button" data-t="qr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v1M14 20h1M18 18h3v3"/></svg>Acceso</button></nav>
      <div class="pg-note" role="status"><i>P</i><b>Pulso <span>ahora</span></b><p></p></div></div></div></div>`;
    const main=view.querySelector('.pg-main'),note=view.querySelector('.pg-note');let nt=0;
    const notify=t=>{note.querySelector('p').textContent=t;note.classList.add('show');clearTimeout(nt);nt=setTimeout(()=>note.classList.remove('show'),3200);};
    const all=()=>days.flatMap((d,k)=>classes(k));
    const taken=c=>c.taken+(st.booked[c.id]?1:0);
    const badge=()=>{const n=Object.keys(st.booked).length;const b=view.querySelector('.pg-tabs [data-t="res"]');b.dataset.n=n;b.classList.toggle('dot',!!n);};
    const fmtD=d=>`${DN[d.getDay()]} ${d.getDate()}`;
    const card=c=>{const full=taken(c)>=c.cap&&!st.booked[c.id];const pct=Math.min(100,taken(c)/c.cap*100);
      const btn=st.booked[c.id]?`<button class="pg-b ok" type="button" data-b="${c.id}">Reservada ✓</button>`:st.wait[c.id]?`<button class="pg-b wait" type="button" data-w="${c.id}">En espera · 2º</button>`:full?`<button class="pg-b wait" type="button" data-w="${c.id}">Lista de espera</button>`:`<button class="pg-b" type="button" data-b="${c.id}">Reservar</button>`;
      return `<article class="pg-c${st.booked[c.id]?' on':''}${full?' full':''}"><span class="pg-int">${[1,2,3].map(n=>`<i class="${n<=c.int?'on':''}"></i>`).join('')}</span><span class="pg-t">${c.t}<small>${c.dur} min</small></span><h6>${c.n}</h6><p>${c.coach} · ${c.room}</p><div class="pg-row"><span class="pg-cap"><span>${full?'Completa':(c.cap-taken(c))+' plazas libres'}</span><i><span style="width:${pct}%"></span></i></span>${btn}</div></article>`;};
    const render=()=>{view.querySelectorAll('.pg-tabs button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.t===st.tab)));badge();
      if(st.tab==='cls'){main.innerHTML=`<div class="pg-head"><div><small>Hola, Marta</small><h5>Clases</h5></div><span class="pg-av">M</span></div><div class="pg-days">${days.map((d,k)=>`<button type="button" data-d="${k}" aria-pressed="${k===st.day}"><small>${k===0?'Hoy':DN[d.getDay()]}</small><b>${d.getDate()}</b></button>`).join('')}</div><div class="pg-list">${classes(st.day).map(card).join('')}</div>`;}
      else if(st.tab==='res'){const mine=all().filter(c=>st.booked[c.id]);main.innerHTML=`<div class="pg-head"><div><small>Tus próximas clases</small><h5>Reservas</h5></div><span class="pg-av">M</span></div>${mine.length?`<div class="pg-list">${mine.map(c=>`<article class="pg-c on"><span class="pg-t">${c.t}<small>${fmtD(c.date)}</small></span><h6>${c.n}</h6><p>${c.coach} · ${c.room} · ${c.dur} min</p><div class="pg-row"><span class="pg-cap"><span>Te avisamos 1 h antes</span></span><button class="pg-b wait" type="button" data-x="${c.id}">Cancelar</button></div></article>`).join('')}</div>`:`<div class="pg-empty"><span>Aún no tienes clases reservadas.</span><button class="pg-b" type="button" data-t2="cls">Ver clases</button></div>`}`;}
      else{main.innerHTML=`<div class="pg-head"><div><small>Plan Ilimitado · activo</small><h5>Acceso</h5></div><span class="pg-av">M</span></div><div class="pg-pass"><div class="qr">${qrSvg(42,'#0F1013')}</div><b>Marta López</b><small>Acerca el código al lector de la entrada</small></div><div class="pg-stats"><div><span style="color:var(--pg-mut);font-size:3.2cqw">Este mes</span><b>9 visitas</b></div><div class="pg-bars">${[2,3,1,3].map((v,k)=>`<i class="${k===3?'on':''}" style="height:${v/3*100}%"><span>S${k+1}</span></i>`).join('')}</div></div>`;}};
    main.parentElement.addEventListener('click',e=>{const t=e.target.closest('[data-t],[data-t2]');if(t){st.tab=t.dataset.t||t.dataset.t2;render();main.scrollTop=0;return;}
      const d=e.target.closest('[data-d]');if(d){st.day=+d.dataset.d;render();return;}
      const b=e.target.closest('[data-b]');if(b){const c=all().find(x=>x.id===b.dataset.b);if(st.booked[c.id]){delete st.booked[c.id];render();notify(`Has cancelado ${c.n} del ${fmtD(c.date)}. Tu plaza queda libre para otra persona.`);}else{st.booked[c.id]=1;render();notify(`Reserva confirmada: ${c.n}, ${c.date.toDateString()===new Date().toDateString()?'hoy':fmtD(c.date)} a las ${c.t}. Te avisamos 1 h antes.`);}return;}
      const w=e.target.closest('[data-w]');if(w){const c=all().find(x=>x.id===w.dataset.w);if(st.wait[c.id]){delete st.wait[c.id];render();}else{st.wait[c.id]=1;render();notify(`Estás en lista de espera para ${c.n}. Si se libera una plaza, te la reservamos y te avisamos.`);}return;}
      const x=e.target.closest('[data-x]');if(x){const c=all().find(y=>y.id===x.dataset.x);delete st.booked[c.id];render();notify(`Has cancelado ${c.n}. Sin coste al cancelar con más de 2 h.`);}});
    render();return ()=>clearTimeout(nt);
  }
  const CASES={
    atelier:{eye:'Concepto · Tienda de moda',t:'Atelier Nube',p:'Tienda online para una marca de ropa de mujer: catálogo por colecciones, bolsa de compra y pago en pocos pasos, más reels cada mes para Instagram.',
      list:['Catálogo con filtros, tallas y vista rápida','Bolsa con aviso de envío gratis','Pago con tarjeta, Bizum y Apple Pay','Reels de colección, looks y taller'],
      tabs:[['shop','Tienda online',vShop],['reels','Reels',vReels]],svc:['shop','vid']},
    pulso:{eye:'Concepto · App de gimnasio',t:'Pulso Gym',p:'App para iOS y Android con la que los socios reservan clases, entran con su código QR y reciben avisos.',
      list:['Reserva de clases con plazas en tiempo real','Lista de espera que se reserva sola','Acceso al gimnasio con código QR','Avisos antes de cada clase'],
      tabs:[['app','App de socios',vApp]],svc:['app','web']},
    clinica:{eye:'Concepto · Clínica dental',t:'Clínica Sonríe',p:'Una recepcionista con IA que atiende el teléfono las 24 horas, da citas en la agenda real de la clínica y se encarga de confirmaciones, recordatorios y reseñas.',
      list:['Llamadas atendidas al momento, también fuera de horario','Citas creadas directamente en la agenda','Confirmación y recordatorio por WhatsApp','Petición de reseña en Google tras la visita','Web con cita online en un minuto'],
      tabs:[['call','Llamada con IA',vCall],['flow','Automatización',vFlow],['web','Web',vClinic]],svc:['call','auto','web']}};
  const csDlg=$('#caseDlg');let csKey=null,csStop=null,csState={};
  function csTab(key){const C=CASES[csKey];const tab=C.tabs.find(t=>t[0]===key)||C.tabs[0];if(csStop){try{csStop();}catch(_){}}csStop=null;
    $$('#csTabs button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.k===tab[0])));
    const v=$('#csView');v.innerHTML='';csStop=tab[2](v,{tab:csTab,state:csState});}
  function openCase(k){csKey=k;csState={};const C=CASES[k];
    $('#csEye').textContent=C.eye;$('#csT').textContent=C.t;$('#csP').textContent=C.p;$('#csList').innerHTML=C.list.map(x=>`<li>${x}</li>`).join('');const ex=$('#csExt');ex.hidden=!C.ext;if(C.ext)ex.href=C.ext;$('#csNote').hidden=!C.wip;if(C.ext)$('#csNoteA').href=C.ext;$('.cs-stage').classList.toggle('has-note',!!C.wip);
    $('#csTabs').innerHTML=C.tabs.map(t=>`<button type="button" role="tab" data-k="${t[0]}">${t[1]}</button>`).join('');$('#csTabs').hidden=C.tabs.length<2;
    csDlg.showModal();csTab(C.tabs[0][0]);}
  $('#csTabs').addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b)csTab(b.dataset.k);});
  csDlg.addEventListener('close',()=>{if(csStop){try{csStop();}catch(_){}}csStop=null;$('#csView').innerHTML='';});
  $('#csClose').addEventListener('click',()=>csDlg.close());
  $('#csCta').addEventListener('click',()=>{const C=CASES[csKey];csDlg.close();contactPrefill(C.svc,`Me interesa un proyecto como ${C.t}.`);});
  $$('[data-case]').forEach(b=>b.addEventListener('click',()=>openCase(b.dataset.case)));

