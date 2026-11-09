  // brand cursor
  const cur=$('#bcur');
  if(matchMedia('(pointer:fine)').matches&&!RM){
    document.body.classList.add('has-cur');
    let x=-100,y=-100,tx=x,ty=y;
    addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;cur.classList.add('on');});
    addEventListener('pointerleave',()=>cur.classList.remove('on'));
    document.addEventListener('pointerover',e=>{cur.classList.toggle('big',!!e.target.closest('a,button,summary,.opt,input,select,textarea,.case'));});
    (function loop(){x+=(tx-x)*.25;y+=(ty-y)*.25;const w=cur.offsetWidth,h=cur.offsetHeight;cur.style.transform=`translate3d(${x-w/2}px,${y-h/2}px,0)`;requestAnimationFrame(loop);})();
  }

