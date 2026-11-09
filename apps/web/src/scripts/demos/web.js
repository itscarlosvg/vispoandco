  // web demo — real widths, scaled to fit
  const stW=$('#stageWeb'),dev=$('#dev'),devIn=$('#devIn'),webW=$('#webW');
  const MODES={desk:{w:1200,label:'1440 px'},tab:{w:768,label:'820 px'},mob:{w:390,label:'390 px'}};
  let mode='desk';
  let swapping=false,swapT=0;
  function fitWeb(k){const m=MODES[mode];devIn.style.width=m.w+'px';
    const pad=mode==='desk'?0:(mode==='tab'?44:28);const avail=stW.clientWidth-32;
    const capH=mode==='desk'?Infinity:640;
    const totW=m.w+pad,totH=devIn.offsetHeight+pad;
    const sc=Math.min(1,avail/totW,capH/totH);
    if(!swapping||k)dev.style.transform=`translateX(-50%) scale(${sc*(k||1)})`;
    stW.style.height=Math.ceil(totH*sc+44)+'px';}
  $$('.svc.web .seg button').forEach(b=>b.addEventListener('click',()=>{
    if(b.dataset.mode===mode)return;
    $$('.svc.web .seg button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    const next=b.dataset.mode;clearTimeout(swapT);
    if(RM){mode=next;dev.dataset.mode=mode;webW.textContent=MODES[mode].label;fitWeb();return;}
    swapping=true;dev.classList.add('swap');
    swapT=setTimeout(()=>{mode=next;dev.dataset.mode=mode;webW.textContent=MODES[mode].label;
      dev.style.transition='none';fitWeb(.97);void dev.offsetWidth;dev.style.transition='';
      requestAnimationFrame(()=>{dev.classList.remove('swap');swapping=false;fitWeb();});},190);}));
  const fw=()=>fitWeb();new ResizeObserver(fw).observe(stW);addEventListener('load',fw);if(document.fonts)document.fonts.ready.then(fw);fw();

