  // HUD
  const vp=$('#vp');const setVp=()=>vp.textContent=`${innerWidth} × ${innerHeight}`;setVp();addEventListener('resize',setVp);
  const fpsEl=$('#fps');let fr=0,last=performance.now();
  (function f(n){fr++;if(n-last>1000){fpsEl.textContent=Math.round(fr*1000/(n-last))+' fps';fr=0;last=n;}requestAnimationFrame(f);})(last);
  const tcHud=$('#tcHud');const t0=performance.now();
  setInterval(()=>{const s=(performance.now()-t0)/1000;const f=Math.floor(s*30)%30;tcHud.textContent=`00:${String(Math.floor(s/60)%60).padStart(2,'0')}:${String(Math.floor(s)%60).padStart(2,'0')}:${String(f).padStart(2,'0')}`;},1000/30);

