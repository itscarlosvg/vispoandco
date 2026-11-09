  // video demo — a tiny real-time compositor drawn on canvas
  const vc=$('#vidc'),cx=vc.getContext('2d'),sc=$('#scrub'),ph=$('#ph'),tc=$('#tc'),mon=$('#monitor');
  const clips=[[0,90,'#E8336F'],[90,180,'#D9D4CB'],[180,240,'#FFE0EA'],[240,300,'#2A2C31']];
  let frame=0,playing=!RM,dragging=false;
  function draw(){
    const W=vc.width,H=vc.height;const c=clips.find(k=>frame>=k[0]&&frame<k[1])||clips[3];const lp=(frame-c[0])/(c[1]-c[0]);
    cx.fillStyle=c[2];cx.fillRect(0,0,W,H);
    const dark=c[2]==='#E8336F'||c[2]==='#2A2C31';
    cx.fillStyle=dark?'#F5F2EC':'#E8336F';cx.beginPath();cx.arc(W*(.18+.64*lp),H*.5,Math.min(W,H)*(.18+.04*Math.sin(lp*6)),0,Math.PI*2);cx.fill();
    if((frame>=60&&frame<150)||(frame>=210&&frame<300)){
      const txt=frame<150?'Nuevo menú':'vispo & co.';cx.font=`700 ${Math.round(Math.min(W,H)*.13)}px "Space Grotesk",sans-serif`;
      const tw=cx.measureText(txt).width;const a=Math.min(1,((frame<150?frame-60:frame-210))/12);
      cx.globalAlpha=a;cx.fillStyle='#111214';cx.fillRect(W*.06,H*.72,tw+W*.06,H*.18);cx.fillStyle='#F5F2EC';cx.fillText(txt,W*.09,H*.86);cx.globalAlpha=1;}
    const s=Math.floor(frame/30),f=frame%30;tc.textContent=`00:00:${String(s).padStart(2,'0')}:${String(f).padStart(2,'0')}`;
    ph.style.left=(frame/300*100)+'%';
  }
  function resizeVid(){const r=mon.getBoundingClientRect();const d=Math.min(2,devicePixelRatio||1);vc.width=Math.max(2,Math.round(r.width*d));vc.height=Math.max(2,Math.round(r.height*d));draw();}
  new ResizeObserver(resizeVid).observe(mon);
  sc.addEventListener('input',()=>{frame=+sc.value;dragging=true;draw();});
  sc.addEventListener('change',()=>{dragging=false;});
  let lastT=0;(function play(t){if(playing&&!dragging&&t-lastT>1000/30){frame=(frame+1)%300;sc.value=frame;draw();lastT=t;}requestAnimationFrame(play);})(0);
  $$('.vid-ctrl .seg button').forEach(b=>b.addEventListener('click',()=>{
    $$('.vid-ctrl .seg button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    mon.style.aspectRatio=b.dataset.ar;$('#arL').textContent=b.textContent;
    mon.style.height=b.dataset.ar==='9/16'?'360px':'';}));


