  // mobile menu
  const mb=$('#menuBtn'), mm=$('#mMenu');
  mb.addEventListener('click',()=>{const o=mm.hidden;mm.hidden=!o;mb.setAttribute('aria-expanded',String(o));});
  mm.addEventListener('click',e=>{if(e.target.tagName==='A'){mm.hidden=true;mb.setAttribute('aria-expanded','false');}});

