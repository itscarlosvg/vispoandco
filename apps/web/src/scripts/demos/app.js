  // app demo
  const screens=$$('.screen'),tabs=$$('.tabbar i');let cs=0;
  function showScreen(n){if(n===cs)return;screens.forEach((s,i)=>{if(i===n)s.removeAttribute('data-off');else s.setAttribute('data-off',i<n?'l':'r');});tabs.forEach((t,i)=>t.classList.toggle('on',i===n));cs=n;
    $$('.app-side .seg button[data-s]').forEach(x=>x.setAttribute('aria-pressed',String(+x.dataset.s===n)));
    if(n===2){const r=$('#ring');let p=20;const id=setInterval(()=>{p+=2;r.style.setProperty('--p',p+'%');$('#ringT').textContent=Math.max(1,Math.round(10-p/10))+' min';if(p>=86)clearInterval(id);},40);}}
  $$('.app-side .seg button[data-s]').forEach(b=>b.addEventListener('click',()=>showScreen(+b.dataset.s)));
  $$('.app-side .seg button[data-os]').forEach(b=>b.addEventListener('click',()=>vt(()=>{
    $$('.app-side .seg button[data-os]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
    $('#phone').classList.toggle('android',b.dataset.os==='android');$('#appOs').textContent=b.dataset.os==='android'?'Android':'iOS';})));
  let auto=RM?null:setInterval(()=>showScreen((cs+1)%3),3200);
  $('.stage-app').addEventListener('pointerdown',()=>{clearInterval(auto);auto=null;},{once:true});

