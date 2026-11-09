const LABEL={resumen_negocio:'Mirando tus cifras',buscar_clientes:'Buscando clientes',ver_cliente:'Abriendo ficha'};
let turns=[],ctl=null,busy=false;
const msgs=$('#hvMsgs'),inp=$('#hvIn'),send=$('#hvSend'),st=$('#hvState');
function md(t){const lines=esc(t).split('\n');let h='',inList=false;
  lines.forEach(ln=>{const b=ln.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');const m=ln.match(/^\s*[-•*]\s+(.*)/)||ln.match(/^\s*\d+[.)]\s+(.*)/);
    if(m){if(!inList){h+='<ul>';inList=true;}h+='<li>'+(b.replace(/^\s*([-•*]|\d+[.)])\s+/,''))+'</li>';}
    else{if(inList){h+='</ul>';inList=false;}if(ln.trim())h+='<p>'+b.replace(/^#+\s*/,'')+'</p>';}});
  if(inList)h+='</ul>';return h;}
function bubble(cls,html){$('#hvStart')?.remove();const d=document.createElement('div');d.className='m '+cls;d.innerHTML=html;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight;return d;}
function hvTool(t){bubble('tool',esc(t));}
function hvQuote(n,id){bubble('tool',`Presupuesto ${esc(n)} listo <button class="btn sm ghost" type="button" data-openq="${esc(id)}" style="margin-left:6px;height:26px">Abrir</button>`);}
function setBusy(b){busy=b;st.className=b?'busy':'';st.querySelector('span').textContent=b?'Trabajando…':'Listo';
  send.classList.toggle('stop',b);send.setAttribute('aria-label',b?'Parar':'Enviar');
  send.innerHTML=b?'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>':'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';}
async function ask(text){text=String(text||'').trim();if(!text||busy)return;
  const sample=await getSample();
  bubble('u',esc(text));
  if(!sample){bubble('sys','Harvey no está disponible en esta vista.');return;}
  turns.push({role:'user',content:text});
  const input=turns.map((t,i)=>i===0?{role:'user',content:rules()+'\n\n---\n\n'+t.content}:t);
  const tk=bubble('a think','<i></i>Pensando…');
  setBusy(true);ctl=new AbortController();
  let tools=TOOLS;
  try{const lim=await sample.limits();if(!lim.tools)tools=null;else if(lim.tools.maxCount<TOOLS.length)tools=TOOLS.slice(0,lim.tools.maxCount);}catch(_){}
  const wrapped=tools&&tools.map(t=>Object.assign({},t,{execute:(i,c)=>{if(LABEL[t.name])hvTool(LABEL[t.name]);return t.execute(i||{},c);}}));
  let out=null;
  try{const r=await sample(input,Object.assign({signal:ctl.signal,cache:false,modelTier:'default',onText:({text})=>{if(!out){tk.remove();out=bubble('a','');}out.innerHTML=md(text);msgs.scrollTop=msgs.scrollHeight;}},wrapped?{tools:wrapped}:{}));
    if(!out){tk.remove();out=bubble('a','');}out.innerHTML=md(r.text);addCopy(out,r.text);
    turns.push({role:'assistant',content:r.text});
    if(r.truncated)bubble('sys','La respuesta se cortó. Pídele que siga.');}
  catch(e){tk.remove();if(e&&e.text){if(!out)out=bubble('a','');out.innerHTML=md(e.text);turns.push({role:'assistant',content:e.text});}
    else{turns.pop();if(out&&e&&e.code==='refused')out.remove();}
    if(!e||e.code!=='cancelled')bubble('sys',esc(sampleMsg(e)));}
  finally{setBusy(false);ctl=null;}
  while(turns.length>24)turns.splice(0,2);
}
function addCopy(el,text){const w=document.createElement('div');w.className='mcopy';const b=document.createElement('button');b.type='button';b.className='btn sm ghost';b.textContent='Copiar';
  b.onclick=()=>{const ok=()=>{b.textContent='Copiado';setTimeout(()=>b.textContent='Copiar',1600);};const fb=()=>{const r=document.createRange();r.selectNodeContents(el);const s=getSelection();s.removeAllRanges();s.addRange(r);b.textContent='Seleccionado';};
    try{navigator.clipboard.writeText(text).then(ok,fb);}catch(_){fb();}};w.appendChild(b);el.appendChild(w);}
$('#hvForm').addEventListener('submit',e=>{e.preventDefault();if(busy){ctl?.abort();return;}const t=inp.value;inp.value='';inp.style.height='';ask(t);});
inp.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey&&!e.isComposing){e.preventDefault();$('#hvForm').requestSubmit();}});
inp.addEventListener('input',()=>{inp.style.height='auto';inp.style.height=Math.min(160,inp.scrollHeight)+'px';});
const START=$('#hvStart').outerHTML;
msgs.addEventListener('click',e=>{const b=e.target.closest('.sugs button');if(b)ask(b.textContent);const o=e.target.closest('[data-openq]');if(o)openQuote(o.dataset.openq);});
$('#hvNew').addEventListener('click',()=>{if(busy)ctl?.abort();turns=[];msgs.innerHTML=START;});
