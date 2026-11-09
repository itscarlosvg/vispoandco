  // ai demo — scripted conversations with an automation log
  const SC={
    reserva:{sub:'WhatsApp · ahora',steps:[['u','Hola, ¿tenéis mesa para 4 este sábado a las 21:00?'],['log','Intención detectada: reserva','4 personas · sábado · 21:00'],['log','Disponibilidad consultada','Mesa 7 libre'],['a','¡Hola! Sí, tengo mesa para 4 el sábado a las 21:00. ¿A nombre de quién la reservo?'],['u','Marta'],['log','Reserva creada en el calendario','Marta · mesa 7',1],['a','Hecho, Marta. Te acabo de enviar la confirmación. ¡Os esperamos!'],['log','Confirmación y recordatorio enviados','SMS el sábado a las 18:00',1]],t:'2 s'},
    pedido:{sub:'Instagram · ahora',steps:[['u','Quiero 2 pollos a la brasa para recoger a las 14:00'],['log','Intención detectada: pedido','2 × Pollo a la brasa'],['log','Carta y horario consultados','Recogida 14:00 disponible'],['a','Perfecto: 2 pollos a la brasa (25,00 €), listos a las 14:00. ¿Pagas al recoger?'],['u','Sí, en el local'],['log','Pedido enviado a cocina','Ticket #128',1],['a','Apuntado. Te aviso en cuanto esté listo.'],['log','Aviso programado','13:55 · «Tu pedido está listo»',1]],t:'3 s'},
    resena:{sub:'Google · reseña nueva',steps:[['rev','Luis M. ★★★★★','La mejor carne de la ciudad y un trato de diez. Volveremos.'],['log','Reseña nueva detectada','5 estrellas · Google'],['log','Respuesta redactada con el tono de la marca','Revisión opcional'],['a','¡Gracias, Luis! Nos alegra muchísimo que os gustara. Os guardamos la mesa para la próxima.'],['log','Respuesta publicada','Google Maps',1]],t:'4 s'},
    duda:{sub:'WhatsApp · ahora',steps:[['u','¿Tenéis opciones sin gluten?'],['log','Pregunta frecuente','Alérgenos'],['log','Carta consultada','3 platos sin gluten'],['a','Sí: el pulpo a la brasa, la coliflor a la llama y la piña asada no llevan gluten. ¿Te reservo mesa?'],['log','Respondida y etiquetada','Cliente interesado en reservar',1]],t:'2 s'}};
  const msgs=$('#aiMsgs'),log=$('#aiLog'),dot=$('#aiDot'),tm=$('#aiTime');
  let scTimers=[],curSc='reserva',aiAuto=null;
  function playSc(k,instant){scTimers.forEach(clearTimeout);scTimers=[];curSc=k;msgs.innerHTML='';log.innerHTML='';tm.textContent='—';$('#aiSub').textContent=SC[k].sub;
    $$('.svc.ai .seg button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.sc===k)));
    let t=300;const add=(fn,d)=>{if(instant){fn();return;}scTimers.push(setTimeout(fn,t));t+=d;};
    dot.classList.add('busy');
    SC[k].steps.forEach(st=>{
      if(st[0]==='u'||st[0]==='rev'){add(()=>{const b=document.createElement('div');b.className='ai-b '+(st[0]==='u'?'u':'rev');if(st[0]==='rev'){b.innerHTML='<b></b> <span class="st"></span><div style="margin-top:6px;color:#5D5C64"></div>';b.querySelector('b').textContent=st[1].replace(/ ★+/,'');b.querySelector('.st').textContent='★★★★★';b.lastChild.textContent=st[2];}else b.textContent=st[1];msgs.appendChild(b);},900);}
      else if(st[0]==='a'){add(()=>{const ty=document.createElement('div');ty.className='ai-typing';ty.innerHTML='<i></i><i></i><i></i>';ty.id='aiTy';msgs.appendChild(ty);},900);
        add(()=>{const ty=$('#aiTy');if(ty)ty.remove();const b=document.createElement('div');b.className='ai-b a';b.append(st[1]);msgs.appendChild(b);},1100);}
      else{add(()=>{const li=document.createElement('li');if(st[3])li.className='ok';const d=document.createElement('div');d.textContent=st[1];const sm=document.createElement('small');sm.textContent=st[2];d.appendChild(sm);li.appendChild(d);log.appendChild(li);},650);}
    });
    add(()=>{dot.classList.remove('busy');tm.textContent=SC[k].t;},400);
  }
  $$('.svc.ai .seg button').forEach(b=>b.addEventListener('click',()=>{clearInterval(aiAuto);aiAuto=null;playSc(b.dataset.sc,RM);}));
  playSc('reserva',RM);
  if(!RM){const order=Object.keys(SC);aiAuto=setInterval(()=>playSc(order[(order.indexOf(curSc)+1)%order.length]),14000);}


