  // call demo — real audio, live transcript, booking fields
  const CALL={{CALL_DATA}};
  const au=$('#callAudio'),tr=$('#cpTr'),cv=$('#cpWave'),cg=cv.getContext('2d'),pl=$('#callPlay'),plL=$('#callPlayL'),av=$('#cpAv');
  let shown=0,raf=0,actx=null,an=null,buf=null;
  function resetCall(){tr.innerHTML='';shown=0;$$('#cbFields dd').forEach(d=>{d.textContent='—';d.parentElement.classList.remove('on');});$('#cbConf').classList.remove('on');$('#cpTime').textContent='00:00';$('.cp-pill').textContent='Llamada entrante';$('.cp-pill').classList.remove('live');$('#callState').textContent='lista para llamar';}
  function drawWave(level){const W=cv.width,H=cv.height;cg.clearRect(0,0,W,H);const n=48;for(let i=0;i<n;i++){const ph=Math.sin(i*.55+performance.now()/180)*.5+.5;const v=Math.max(.06,level*(.35+.65*ph)*(1-Math.abs(i-n/2)/(n*.62)));const h=v*H*.9;cg.fillStyle=i%7===0?'#FF6E9A':'rgba(245,242,236,.75)';cg.beginPath();cg.roundRect(i*(W/n)+2,(H-h)/2,W/n-5,h,3);cg.fill();}}
  function step(){const t=au.currentTime;const m=Math.floor(t/60),sec=Math.floor(t%60);$('#cpTime').textContent=String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');
    while(shown<CALL.lines.length&&t>=CALL.lines[shown][0]){const [t0,who,txt]=CALL.lines[shown];const d=document.createElement('div');d.className='cp-l '+who;d.append(txt);tr.appendChild(d);while(tr.children.length>4)tr.firstChild.remove();shown++;}
    CALL.fields.forEach(([tf,k,v])=>{if(t>=tf){const dd=document.querySelector('#cbFields dd[data-f="'+k+'"]');if(dd.textContent!==v){dd.textContent=v;dd.parentElement.classList.add('on');}}});
    if(t>=CALL.confirm)$('#cbConf').classList.add('on');
    let lvl=0;if(an){an.getByteTimeDomainData(buf);let s=0;for(let i=0;i<buf.length;i++){const x=(buf[i]-128)/128;s+=x*x;}lvl=Math.min(1,Math.sqrt(s/buf.length)*4.5);}else{const k=Math.floor(t*30);lvl=CALL.env[k]||0;}
    drawWave(au.paused?0:lvl);if(!au.paused)raf=requestAnimationFrame(step);}
  drawWave(0);
  pl.addEventListener('click',async()=>{
    if(!au.paused){au.pause();return;}
    if(au.ended||au.currentTime===0)resetCall();
    try{if(!actx){actx=new (window.AudioContext||window.webkitAudioContext)();const src=actx.createMediaElementSource(au);an=actx.createAnalyser();an.fftSize=512;buf=new Uint8Array(an.fftSize);src.connect(an);an.connect(actx.destination);}if(actx.state==='suspended')await actx.resume();}catch(_){an=null;}
    try{await au.play();}catch(_){plL.textContent='No se pudo reproducir el audio';return;}
    plL.textContent='Pausar llamada';$('.cp-pill').textContent='En llamada';$('.cp-pill').classList.add('live');$('#callState').textContent='en llamada';av.classList.remove('ring');cancelAnimationFrame(raf);step();});
  au.addEventListener('pause',()=>{plL.textContent=au.ended?'Escuchar otra vez':'Seguir escuchando';$('#callState').textContent=au.ended?'reserva completada':'en pausa';});
  au.addEventListener('ended',()=>{plL.textContent='Escuchar otra vez';$('.cp-pill').textContent='Llamada finalizada';$('.cp-pill').classList.remove('live');});
  av.classList.add('ring');



