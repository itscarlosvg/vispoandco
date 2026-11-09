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

  const RINGS='<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="6"/><circle cx="20" cy="20" r="12"/><circle cx="20" cy="20" r="18"/></svg>';
  const LEAF='<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18"/><path d="M20 31 C 11 24, 12 13, 20 8 C 28 13, 29 24, 20 31 Z"/><path d="M20 31 L 20 13"/></svg>';
  const CARTA_HTML={{CARTA_HTML}};
  const HORTA=[['Grelos','Grelos',[1,2,3,11,12],'#4f7a2c'],['Nabizas','Hojas de nabo',[10,11,12],'#6b8f3a'],['Repolo','Col',[1,2,3,10,11,12],'#8fae5d'],['Porros','Puerros',[1,2,3,10,11,12],'#b7c98a'],['Limóns','Limones',[1,2,3,4,12],'#e9cf3f'],['Chícharos','Guisantes',[4,5,6],'#7fb04a'],['Amorodos','Fresas',[4,5,6],'#d8433a'],['Leitugas','Lechugas',[4,5,6,7,8,9,10],'#a3c46b'],['Cenorias','Zanahorias',[5,6,7,8,9,10,11],'#ea8a2e'],['Allos','Ajos',[6,7],'#e8e0cc'],['Cebolas','Cebollas',[6,7,8,9],'#c98b5b'],['Patacas novas','Patatas nuevas',[6,7,8,9,10],'#d9b77a'],['Cabaciñas','Calabacines',[6,7,8,9],'#5d8a3c'],['Pementos de Padrón','Pimientos de Padrón',[6,7,8,9,10],'#3f7d2b'],['Tomates','Tomates',[7,8,9,10],'#d9432f'],['Feixóns','Judías verdes',[7,8,9],'#6a9c3a'],['Figos','Higos',[8,9],'#6b3d5a'],['Cabazas','Calabazas',[9,10,11],'#ee8f2f'],['Mazás','Manzanas',[9,10,11],'#c7442e'],['Castañas','Castañas',[10,11],'#7a4a2a']];
  const MAR=[['Mexillón','Mejillón de batea','Todo el año','#1d2c3a'],['Ameixa','Almeja','Otoño e invierno','#c9b49a'],['Zamburiña','Zamburiña','Otoño a primavera','#c0643e'],['Polbo','Pulpo','Todo el año en cocina','#8a3f4b'],['Centola','Centolla','Invierno y primavera','#b8462f'],['Rodaballo','Rodaballo','Todo el año','#6f7a6b']];
  const MESES=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];

  // WebGL ría (port of the hotel's own shader)
  function startRia(canvas,getP){
    const gl=canvas.getContext('webgl',{antialias:false,premultipliedAlpha:false});if(!gl)return ()=>{};
    const NOISE=`float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);}
float fbm(vec2 p){float v=0.0,a=0.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=0.5;}return v;}`;
    const FS=`precision highp float;uniform float uTime;uniform vec2 uRes;uniform vec2 uMouse;uniform float uProgress;varying vec2 vUv;${NOISE}
vec3 sky(float y,float night){vec3 duskLow=vec3(0.95,0.67,0.36);vec3 duskMid=vec3(0.60,0.45,0.43);vec3 duskTop=vec3(0.05,0.15,0.18);vec3 nightLow=vec3(0.10,0.18,0.22);vec3 nightTop=vec3(0.012,0.035,0.05);vec3 dusk=mix(duskLow,duskMid,smoothstep(0.0,0.2,y));dusk=mix(dusk,duskTop,smoothstep(0.12,0.8,y));vec3 nite=mix(nightLow,nightTop,smoothstep(0.0,0.7,y));return mix(dusk,nite,night);}
void main(){vec2 uv=vUv;float aspect=uRes.x/uRes.y;vec2 p=vec2((uv.x-0.5)*aspect,uv.y);float t=uTime;float night=smoothstep(0.0,1.0,uProgress);
float horizon=0.43+uMouse.y*0.012;vec2 sun=vec2(-0.2*aspect+uMouse.x*0.05,horizon+mix(0.075,0.33,night));vec3 sunCol=mix(vec3(1.0,0.8,0.52),vec3(0.82,0.88,0.96),night);float sunR=mix(0.042,0.028,night);vec3 col;
float shoreMask=smoothstep(-0.95*aspect,-0.2,p.x)*(1.0-smoothstep(0.35*aspect,0.5*aspect,p.x)*0.7);float hill=horizon+0.004+(0.012+0.06*fbm(vec2(p.x*2.4+4.0,1.3)))*shoreMask;
if(uv.y>=horizon){float y=(uv.y-horizon)/(1.0-horizon);col=sky(y,night);float c=fbm(vec2(p.x*1.1+t*0.01,uv.y*7.0-t*0.004));float cm=smoothstep(0.55,0.85,c)*smoothstep(0.02,0.3,y)*(1.0-y*0.5);vec3 cloud=mix(vec3(0.99,0.72,0.52),vec3(0.13,0.19,0.24),night);col=mix(col,cloud,cm*0.5);
float d=length(p-sun);col+=sunCol*smoothstep(sunR,sunR*0.85,d);col+=sunCol*exp(-d*8.0)*mix(0.55,0.14,night);
vec2 sg=floor(uv*uRes/2.5);float s=step(0.9972,hash(sg))*smoothstep(0.12,0.6,y)*night;col+=s*(0.6+0.4*sin(t*2.5+hash(sg+3.0)*20.0));
if(uv.y<hill){vec3 hillCol=mix(mix(vec3(0.33,0.25,0.27),vec3(0.03,0.07,0.09),night),sky(0.0,night),0.25);col=hillCol;float lights=step(0.975,hash(vec2(floor(p.x*240.0),7.0)))*step(uv.y,horizon+0.006)*night;col+=vec3(1.0,0.78,0.45)*lights*(0.7+0.3*sin(t*3.0+p.x*90.0));}}
else{float depth=horizon-uv.y;float z=0.08/(depth+0.004);vec2 w=vec2(p.x*z,z);float n1=fbm(w*vec2(1.2,0.45)+vec2(t*0.05,-t*0.16));float n2=fbm(w*vec2(3.2,1.0)+vec2(-t*0.08,-t*0.32));float wave=n1*0.6+n2*0.4;
float ry=clamp(depth*1.3+(wave-0.5)*0.1,0.0,1.0);vec3 refl=sky(ry,night);vec3 deep=mix(vec3(0.03,0.13,0.15),vec3(0.008,0.035,0.05),night);col=mix(refl*0.82,deep,smoothstep(0.0,0.28,depth)*0.8);
float dx=p.x-sun.x;float path=exp(-dx*dx/(0.0012+depth*0.07));float glit=pow(noise(w*vec2(7.0,1.6)+vec2(0.0,-t*0.9)),5.0)*4.0;col+=sunCol*path*(0.2+glit)*mix(1.0,0.5,night)*(1.0-smoothstep(0.0,0.45,depth)*0.6);
float raft=0.0;for(int i=0;i<6;i++){float fi=float(i);float rz=2.0+fi*1.3+hash(vec2(fi,3.0))*0.6;float yr=horizon-(0.08/rz-0.004);float sc=1.0/rz;float xw=p.x*rz+fi*0.73;float cellw=1.35;float id=floor(xw/cellw);float lx=fract(xw/cellw)-0.5;float on=step(0.42,hash(vec2(id,fi+11.0)));float bob=sin(t*1.1+id*1.7+fi)*0.0008*sc*4.0;float hh=0.0075*sc;float dy=uv.y-(yr+bob);float aa=0.02;float halfW=0.13+hash(vec2(id,fi))*0.05;float inX=1.0-smoothstep(halfW-aa,halfW,abs(lx));float inY=1.0-smoothstep(hh*0.55,hh,abs(dy));float cabX=1.0-smoothstep(0.03-aa,0.03,abs(lx-0.07));float cab=cabX*step(0.0,dy)*(1.0-smoothstep(hh*2.0,hh*2.4,dy));raft=max(raft,on*max(inX*inY,cab));}
vec3 raftCol=mix(vec3(0.12,0.09,0.1),vec3(0.01,0.02,0.03),night);col=mix(col,raftCol,raft*0.92);col+=(wave-0.5)*0.05;}
col=mix(col,sky(0.02,night)*1.03,exp(-abs(uv.y-horizon)*40.0)*0.32);col*=mix(1.0,0.7,smoothstep(0.35,1.15,length((uv-0.5)*vec2(aspect*0.75,1.0))));gl_FragColor=vec4(col,1.0);}`;
    const VS='attribute vec2 a;varying vec2 vUv;void main(){vUv=a*0.5+0.5;gl_Position=vec4(a,0.0,1.0);}';
    const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o;};
    const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,VS));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,FS));gl.linkProgram(pr);
    if(!gl.getProgramParameter(pr,gl.LINK_STATUS))return ()=>{};gl.useProgram(pr);
    const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
    const loc=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
    const U=n=>gl.getUniformLocation(pr,n);const uT=U('uTime'),uR=U('uRes'),uM=U('uMouse'),uP=U('uProgress');
    let raf=0,t=7,last=performance.now(),mx=0,my=0,tx=0,ty=0;
    const mv=e=>{const r=canvas.getBoundingClientRect();tx=((e.clientX-r.left)/r.width)*2-1;ty=-(((e.clientY-r.top)/r.height)*2-1);};
    canvas.parentElement.addEventListener('pointermove',mv);
    const frame=now=>{const dpr=Math.min(devicePixelRatio||1,1.5),w=canvas.clientWidth,h=canvas.clientHeight;
      if(w&&h&&(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr))){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
      gl.viewport(0,0,canvas.width,canvas.height);t+=Math.min(now-last,50)/1000;last=now;mx+=(tx-mx)*.04;my+=(ty-my)*.04;
      gl.uniform1f(uT,RM?7:t);gl.uniform2f(uR,canvas.width,canvas.height);gl.uniform2f(uM,mx,my);gl.uniform1f(uP,getP());gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
      if(!RM)raf=requestAnimationFrame(frame);};
    raf=requestAnimationFrame(frame);
    return ()=>{cancelAnimationFrame(raf);canvas.parentElement&&canvas.parentElement.removeEventListener('pointermove',mv);gl.getExtension('WEBGL_lose_context')?.loseContext();};
  }
  function qrSvg(seed,fg){let s=seed;const r=()=>(s=(s*9301+49297)%233280)/233280;const N=25,c=[];
    const finder=(x,y)=>{for(let i=0;i<7;i++)for(let j=0;j<7;j++){const e=i===0||i===6||j===0||j===6||(i>1&&i<5&&j>1&&j<5);if(e)c.push([x+i,y+j]);}};
    finder(0,0);finder(N-7,0);finder(0,N-7);
    for(let i=0;i<N;i++)for(let j=0;j<N;j++){const inF=(i<8&&j<8)||(i>N-9&&j<8)||(i<8&&j>N-9);if(!inF&&r()<.48)c.push([i,j]);}
    return `<svg viewBox="0 0 ${N} ${N}" width="100%" height="100%" shape-rendering="crispEdges" aria-hidden="true">${c.map(([x,y])=>`<rect x="${x}" y="${y}" width="1" height="1" fill="${fg}"/>`).join('')}</svg>`;}

  /* views */
  function vHotel(view,ctx){
    view.innerHTML=`<div class="bw"><div class="bw-bar"><i></i><i></i><i></i><a href="https://hotel-o-castro-preview.netlify.app" target="_blank" rel="noopener" class="bw-url">hotel-o-castro-preview.netlify.app ↗</a></div><div class="bw-c"><div class="hx">
    <section class="hx-hero"><canvas></canvas><nav class="hx-nav"><span class="hx-brand">${RINGS}O Castro</span><span class="hx-links"><a data-go="rooms">Habitaciones</a><a data-tab="resto">Restaurante</a><a data-go="res">Reservar</a></span><button class="hx-cta" type="button" data-go="res">Reservar</button></nav>
      <div class="hx-meta mn"><span>42°28′35″N · 8°53′43″W</span><span>Ría de Arousa</span></div>
      <h4 class="hx-title" style="margin:0"><em>Hotel</em><b>O Castro</b></h4>
      <div class="hx-foot"><p>Un hotel acogedor y familiar frente a la Ría de Arousa, en Reboredo, O Grove.</p><span class="hx-badge"><svg viewBox="0 0 120 120"><defs><path id="hxb" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"/></defs><text><textPath href="#hxb">Baixa á ría · Baixa á ría · Baixa á ría ·</textPath></text></svg>↓</span></div></section>
    <section class="hx-sec hx-mani"><p class="hx-eye">A casa</p><p class="big">En Galicia, un castro es un poblado antiguo de piedra, en alto y mirando al mar. Aquí seguimos esa idea: muros de granito, la Ría de Arousa delante y una huerta detrás.</p>
      <dl class="hx-facts"><div><dt>Valoración en Google</dt><dd>4,3<small>/5</small></dd></div><div><dt>Habitaciones</dt><dd>4<small>tipos</small></dd></div><div><dt>Desayuno</dt><dd>Incluido</dd></div><div><dt>Reserva</dt><dd>Directa</dd></div></dl></section>
    <section class="hx-sec hx-mani" data-sec="rooms" style="padding-top:0;--hac:#16424a"><p class="hx-eye">Os cuartos</p><h5 class="hx-h2">Cuatro formas de <em>quedarse</em></h5><div class="hx-rooms">
      ${[['Doble','2 personas','Dos camas o cama de matrimonio, con vistas a la piscina.','#b9b4a8','#16424a',['Baño privado','Wifi','Desayuno incluido']],['Doble con vistas','2 personas · vistas a la ría','Despiértate con la Ría de Arousa delante de la ventana.','#16424a','#d6a73a',['Vistas a la ría','Calefacción','Desayuno incluido']],['Triple','3 personas','Amplia y con balcón, pensada para familias o grupos pequeños.','#50614f','#c9c3b3',['Balcón','Wifi','Desayuno incluido']],['Cuádruple','4 personas','Espacio para toda la familia, con balcón y opción con vistas al mar.','#0c2226','#8fb3b0',['Balcón','Baño privado','Desayuno incluido']]].map(r=>`<article class="hx-room"><div><span class="mn" style="opacity:.7">${r[1]}</span><b>${r[0]}</b><p>${r[2]}</p><span class="hx-chips">${r[5].map(c=>`<i>${c}</i>`).join('')}</span></div></article>`).join('')}</div></section>
    <section class="hx-teaser"><div class="hx-mq"><span>Mar e Horta</span><i></i><span>Restaurante O Castro</span><i></i><span>Mar e Horta</span><i></i><span>Restaurante O Castro</span><i></i></div>
      <div class="hx-tgrid"><div><p class="hx-eye">O restaurante</p><h5 class="hx-h2" style="font-family:Gloock,serif;font-weight:400">Cocina gallega con lo que da <em>la ría y nuestra huerta</em></h5></div><div><p>Marisco, pescado y recetas caseras con vistas a la ría. Un restaurante con vida propia, abierto también a quien no se aloja en el hotel.</p><button class="hx-round" type="button" data-tab="resto">Entrar al restaurante</button></div></div></section>
    <section class="hx-sec hx-res" data-sec="res"><h5 class="hx-h2">Reserva <em>directa</em></h5><ul><li><span>Teléfono</span>+34 986 733 819</li><li><span>WhatsApp</span>Escribir</li><li><span>Email</span>info@hotelocastro.es</li></ul></section>
    <footer class="hx-fw">O Castro</footer></div></div></div>`;
    const c=view.querySelector('.bw-c');
    view.querySelectorAll('[data-go]').forEach(a=>a.addEventListener('click',()=>{const s=view.querySelector(`[data-sec="${a.dataset.go}"]`);if(s)c.scrollTo({top:s.offsetTop,behavior:RM?'auto':'smooth'});}));
    view.querySelectorAll('[data-tab]').forEach(a=>a.addEventListener('click',()=>ctx.tab(a.dataset.tab)));
    return startRia(view.querySelector('canvas'),()=>Math.min(1,c.scrollTop/(c.clientHeight*.9)));
  }
  function vResto(view,ctx){
    const m0=new Date().getMonth()+1;
    view.innerHTML=`<div class="bw"><div class="bw-bar"><i></i><i></i><i></i><span>Restaurante O Castro · Mar e Horta</span></div><div class="bw-c"><div class="rx">
    <section class="rx-hero"><nav class="hx-nav"><span class="hx-brand">${LEAF}O Castro <em style="font:400 1.1em 'Instrument Serif',serif;text-transform:none">Restaurante</em></span><span class="hx-links rx-links"><a data-go="horta">A horta</a><a data-go="mar">O mar</a><a data-tab="carta">Carta</a><a data-tab="web">← Hotel</a></span><button class="hx-cta" type="button" data-tab="carta">Ver la carta</button></nav>
      <p class="hx-meta mn"><span>Restaurante O Castro</span><span>Reboredo · O Grove</span></p>
      <h4 class="rx-title" style="margin:0"><span>Mar</span><span>e</span><span>Horta</span></h4>
      <div class="hx-foot"><p>Marisco de la Ría de Arousa y verdura de nuestra propia huerta, a pocos pasos de la cocina. Cocina gallega, casera y de temporada.</p></div></section>
    <section class="hx-sec rx-leite"><p class="hx-eye">Da horta á mesa</p><p class="big">Lo que no crece en nuestra huerta llega de la ría que tenemos delante. Cocinamos poco lo que ya es bueno.</p>
      <div class="rx-steps"><div><b>Sembramos</b><p>La huerta está junto al hotel. Plantamos lo que mejor se da en las Rías Baixas.</p></div><div><b>Recogemos</b><p>Cada cosa en su momento: grelos en invierno, pimientos y tomates en verano.</p></div><div><b>Cocinamos</b><p>Recetas de casa, con el marisco y el pescado del día.</p></div></div></section>
    <section class="hx-sec" data-sec="horta"><p class="hx-eye">A horta · calendario</p><h5 class="rx-h2">Qué sale de la huerta <em>cada mes</em></h5>
      <div class="rx-months" role="group" aria-label="Mes">${MESES.map((m,i)=>`<button type="button" data-m="${i+1}" aria-pressed="${i+1===m0}">${m}</button>`).join('')}</div><ul class="rx-produce"></ul></section>
    <section class="hx-sec rx-sea" data-sec="mar"><p class="hx-eye">O mar</p><h5 class="rx-h2">Lo que trae <em>la ría</em></h5><div class="rx-seagrid">${MAR.map(s=>`<div><i style="background:${s[3]}"></i><b>${s[0]}</b><small>${s[1]} · ${s[2]}</small></div>`).join('')}</div></section>
    <section class="hx-sec rx-cab"><h5 class="rx-h2">Reserva <em>mesa</em></h5><button class="hx-round" type="button" data-tab="carta" style="border-color:#16230f">Ver la carta de hoy</button></section></div></div></div>`;
    const c=view.querySelector('.bw-c'),list=view.querySelector('.rx-produce');
    const fill=m=>{list.innerHTML=HORTA.filter(h=>h[2].includes(m)).map(h=>`<li><i style="background:${h[3]}"></i><span><b>${h[0]}</b><small>${h[1]}</small></span></li>`).join('');};
    fill(m0);
    view.querySelector('.rx-months').addEventListener('click',e=>{const b=e.target.closest('[data-m]');if(!b)return;view.querySelectorAll('.rx-months button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));fill(+b.dataset.m);});
    view.querySelectorAll('[data-go]').forEach(a=>a.addEventListener('click',()=>{const s=view.querySelector(`[data-sec="${a.dataset.go}"]`);if(s)c.scrollTo({top:s.offsetTop,behavior:RM?'auto':'smooth'});}));
    view.querySelectorAll('[data-tab]').forEach(a=>a.addEventListener('click',()=>ctx.tab(a.dataset.tab)));
    return ()=>{};
  }
  function vCarta(view){
    view.innerHTML=`<div class="ph"><div class="ph-s"><div class="cq"><main class="wrap">${CARTA_HTML}</main></div></div></div><div class="cq-side"><div class="qr">${qrSvg(7,'#13201B')}</div><b>Un QR en cada mesa</b><span>El restaurante cambia platos, precios y el menú del día desde el móvil, y marca lo agotado al momento. También la descarga en PDF.</span></div>`;
    const sc=view.querySelector('.cq');
    sc.addEventListener('click',e=>{const a=e.target.closest('[data-href]');if(a){e.preventDefault();const id=a.getAttribute('data-href').slice(1);const t=sc.querySelector(`[data-s="${id}"],[data-x="${id}"]`);if(t)sc.scrollTo({top:t.offsetTop-60,behavior:RM?'auto':'smooth'});return;}
      const p=e.target.closest('.plato');if(p){p.classList.toggle('agotado');const has=p.querySelector('.tag-out');if(p.classList.contains('agotado')&&!has){const t=document.createElement('span');t.className='tag-out';t.textContent='Agotado';p.querySelector('.p-name').after(t);}else if(!p.classList.contains('agotado')&&has)has.remove();}});
    if(matchMedia('(max-width:700px)').matches)view.querySelector('.cq-side').hidden=true;
    return ()=>{};
  }
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
    castro:{eye:'Proyecto real · En desarrollo',wip:true,t:'Hotel O Castro',p:'Web para un hotel familiar frente a la Ría de Arousa y su restaurante, cada uno con identidad propia, y una carta digital que el restaurante cambia cada día.',
      list:['Web del hotel con la ría al atardecer generada en 3D, en tiempo real','Restaurante como marca propia: Mar e Horta','Calendario interactivo de lo que da la huerta cada mes','Carta QR editable desde el móvil, con alérgenos y PDF','Reserva directa, sin intermediarios'],
      ext:'https://hotel-o-castro-preview.netlify.app',tabs:[['web','Web del hotel',vHotel],['resto','Restaurante',vResto],['carta','Carta QR',vCarta]],sector:'Hotel o alojamiento',preset:{web:'corp',webx:['qr','p3d'],mant:'basic'}},
    atelier:{eye:'Concepto · Tienda de moda',t:'Atelier Nube',p:'Tienda online para una marca de ropa de mujer: catálogo por colecciones, bolsa de compra y pago en pocos pasos, más reels cada mes para Instagram.',
      list:['Catálogo con filtros, tallas y vista rápida','Bolsa con aviso de envío gratis','Pago con tarjeta, Bizum y Apple Pay','Reels de colección, looks y taller'],
      tabs:[['shop','Tienda online',vShop],['reels','Reels',vReels]],sector:'Tienda',preset:{web:'shop',webx:['seo'],reels:'8',vid:['spot'],mant:'pro'}},
    pulso:{eye:'Concepto · App de gimnasio',t:'Pulso Gym',p:'App para iOS y Android con la que los socios reservan clases, entran con su código QR y reciben avisos.',
      list:['Reserva de clases con plazas en tiempo real','Lista de espera que se reserva sola','Acceso al gimnasio con código QR','Avisos antes de cada clase'],
      tabs:[['app','App de socios',vApp]],sector:'Gimnasio o deporte',preset:{web:'land',app:'users',appx:['push','stores'],mant:'pro'}}};
  const csDlg=$('#caseDlg');let csKey=null,csStop=null,csState={};
  const caseState=k=>Object.assign({},DEF,{sector:CASES[k].sector,actual:'Empiezo de cero'},CASES[k].preset);
  function csTab(key){const C=CASES[csKey];const tab=C.tabs.find(t=>t[0]===key)||C.tabs[0];if(csStop){try{csStop();}catch(_){}}csStop=null;
    $$('#csTabs button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.k===tab[0])));
    const v=$('#csView');v.innerHTML='';csStop=tab[2](v,{tab:csTab,state:csState});}
  function openCase(k){csKey=k;csState={};const C=CASES[k];
    $('#csEye').textContent=C.eye;$('#csT').textContent=C.t;$('#csP').textContent=C.p;$('#csList').innerHTML=C.list.map(x=>`<li>${x}</li>`).join('');const ex=$('#csExt');ex.hidden=!C.ext;if(C.ext)ex.href=C.ext;$('#csNote').hidden=!C.wip;if(C.ext)$('#csNoteA').href=C.ext;$('.cs-stage').classList.toggle('has-note',!!C.wip);
    const R=calc(caseState(k));$('#csPrice').textContent='Desde '+eur(R.one);$('#csMo').textContent=R.mo?'+ '+eur(R.mo)+'/mes':'';
    $('#csTabs').innerHTML=C.tabs.map(t=>`<button type="button" role="tab" data-k="${t[0]}">${t[1]}</button>`).join('');$('#csTabs').hidden=C.tabs.length<2;
    csDlg.showModal();csTab(C.tabs[0][0]);}
  $('#csTabs').addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b)csTab(b.dataset.k);});
  csDlg.addEventListener('close',()=>{if(csStop){try{csStop();}catch(_){}}csStop=null;$('#csView').innerHTML='';});
  $('#csClose').addEventListener('click',()=>csDlg.close());
  $('#csCta').addEventListener('click',()=>{const k=csKey;csDlg.close();writeState(caseState(k));update();go(1);setTimeout(()=>$('#contacto').scrollIntoView({behavior:RM?'auto':'smooth'}),60);});
  $$('[data-case]').forEach(b=>b.addEventListener('click',()=>openCase(b.dataset.case)));

