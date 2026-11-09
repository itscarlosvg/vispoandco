  // 3D tilt on cases
  $$('.case').forEach(c=>{c.addEventListener('pointermove',e=>{if(RM)return;const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;c.style.transform=`rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(10px)`;});c.addEventListener('pointerleave',()=>c.style.transform='');});

