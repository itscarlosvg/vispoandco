// ---------- 3D hero (three.js r160) ----------
const canvas=document.getElementById('gl'), fallback=document.getElementById('fallback');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function useFallback(){canvas.style.display='none';fallback.hidden=false;}
try{
  const THREE=await import('three');
  const {RoundedBoxGeometry}=await import('three/addons/geometries/RoundedBoxGeometry.js');
  const {RoomEnvironment}=await import('three/addons/environments/RoomEnvironment.js');
  const {EffectComposer}=await import('three/addons/postprocessing/EffectComposer.js');
  const {RenderPass}=await import('three/addons/postprocessing/RenderPass.js');
  const {UnrealBloomPass}=await import('three/addons/postprocessing/UnrealBloomPass.js');
  const {OutputPass}=await import('three/addons/postprocessing/OutputPass.js');

  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));
  renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=.82;
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  const scene=new THREE.Scene();
  const pm=new THREE.PMREMGenerator(renderer);scene.environment=pm.fromScene(new RoomEnvironment(renderer),.04).texture;scene.environmentIntensity=.7;
  const cam=new THREE.PerspectiveCamera(32,1,.1,100);cam.position.set(0,0,12);

  const C={ink:0x111214,paper:0xF5F2EC,acc:0xE8336F};
  const root=new THREE.Group();scene.add(root);

  // extruded chevron + raspberry cursor (the logo mark)
  const pts=[[15,18],[37,18],[65,50],[37,82],[15,82],[43,50]];
  const sh=new THREE.Shape();pts.forEach(([x,y],i)=>{const X=(x-40)*.045,Y=-(y-50)*.045;i?sh.lineTo(X,Y):sh.moveTo(X,Y);});sh.closePath();
  const chevG=new THREE.ExtrudeGeometry(sh,{depth:.55,bevelEnabled:true,bevelThickness:.08,bevelSize:.06,bevelSegments:6,curveSegments:4});chevG.center();
  const chev=new THREE.Mesh(chevG,new THREE.MeshPhysicalMaterial({color:0xD9D4CA,roughness:.42,metalness:0,clearcoat:.5,clearcoatRoughness:.3}));
  const curM=new THREE.MeshPhysicalMaterial({color:C.acc,emissive:C.acc,emissiveIntensity:.22,roughness:.35,clearcoat:.5});
  const cursor=new THREE.Mesh(new RoundedBoxGeometry(.72,.62,.62,4,.08),curM);cursor.position.set(1.62,-.95,0);
  const mark=new THREE.Group();mark.add(chev,cursor);mark.scale.setScalar(1.15);root.add(mark);

  // screens drawn on canvas textures
  function tex(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');draw(g,w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
  const rr=(g,x,y,w,h,r)=>{g.beginPath();g.roundRect(x,y,w,h,r);g.fill();};
  const webT=tex(1024,640,(g,w,h)=>{g.fillStyle='#fff';g.fillRect(0,0,w,h);g.fillStyle='#F1EEE8';g.fillRect(0,0,w,54);['#D7D2C8','#D7D2C8','#D7D2C8'].forEach((c,i)=>{g.fillStyle=c;g.beginPath();g.arc(30+i*24,27,8,0,7);g.fill();});
    g.fillStyle='#fff';rr(g,120,14,360,26,13);g.fillStyle='#111214';g.font='700 30px Space Grotesk, sans-serif';g.fillText('Casa Brava',40,108);
    g.fillStyle='#111214';rr(g,40,134,944,270,18);g.fillStyle='#2A2C31';g.beginPath();g.arc(800,270,120,0,7);g.fill();g.fillStyle='#E8336F';g.beginPath();g.arc(800,300,80,Math.PI,0);g.fill();
    g.fillStyle='#F5F2EC';g.font='700 52px Space Grotesk, sans-serif';g.fillText('Cocina de brasa,',80,240);g.fillText('en el centro.',80,300);g.fillStyle='#E8336F';rr(g,80,330,220,50,10);
    ['#FFE0EA','#DEDAD2','#FFE0EA'].forEach((c,i)=>{g.fillStyle='#F5F2EC';rr(g,40+i*318,430,296,180,14);g.fillStyle=c;rr(g,40+i*318,430,296,100,14);});});
  const appT=tex(420,860,(g,w,h)=>{g.fillStyle='#F5F2EC';g.fillRect(0,0,w,h);g.fillStyle='#111214';rr(g,w/2-50,16,100,28,14);g.fillStyle='#E8336F';rr(g,22,70,w-44,170,28);
    g.fillStyle='#111214';g.font='700 36px Space Grotesk, sans-serif';g.fillText('Hola, Laura',46,130);
    for(let i=0;i<3;i++){g.fillStyle='#fff';rr(g,22,266+i*118,w-44,100,22);g.fillStyle=i%2?'#DEDAD2':'#FFE0EA';rr(g,40,286+i*118,60,60,16);g.fillStyle='#111214';g.font='600 22px Inter, sans-serif';g.fillText(['Pedir a domicilio','Reservar mesa','Mis puntos'][i],120,326+i*118);}
    g.fillStyle='#111214';rr(g,22,h-100,w-44,74,20);g.fillStyle='#E8336F';g.font='600 24px Inter, sans-serif';g.fillText('Pedir ahora',w/2-64,h-54);});
  const vidT=tex(960,540,(g,w,h)=>{const gr=g.createLinearGradient(0,0,w,h);gr.addColorStop(0,'#E8336F');gr.addColorStop(1,'#7a1236');g.fillStyle=gr;g.fillRect(0,0,w,h);
    g.fillStyle='rgba(245,242,236,.95)';g.beginPath();g.moveTo(w/2-40,h/2-54);g.lineTo(w/2+60,h/2);g.lineTo(w/2-40,h/2+54);g.closePath();g.fill();
    g.fillStyle='rgba(0,0,0,.35)';g.fillRect(0,h-56,w,56);g.fillStyle='#F5F2EC';g.fillRect(24,h-30,w*.42,6);g.fillStyle='rgba(245,242,236,.35)';g.fillRect(24+w*.42,h-30,w*.52,6);
    g.font='500 22px JetBrains Mono, monospace';g.fillStyle='#F5F2EC';g.fillText('00:00:04:12',24,40);});

  function panel(w,h,d,t,radius){const grp=new THREE.Group();
    const body=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,4,radius),new THREE.MeshPhysicalMaterial({color:0x0c0c0e,roughness:.35,metalness:.2,clearcoat:.6}));
    const face=new THREE.Mesh(new THREE.PlaneGeometry(w*.94,h*.94),new THREE.MeshBasicMaterial({map:t,toneMapped:false,color:0xD8D8D8}));face.position.z=d/2+.002;
    grp.add(body,face);return grp;}
  const aiT=tex(720,900,(g,w,h)=>{g.fillStyle='#F5F2EC';g.fillRect(0,0,w,h);g.fillStyle='#fff';g.fillRect(0,0,w,110);g.fillStyle='#111214';rr(g,30,28,56,56,16);g.fillStyle='#FF6E9A';g.font='600 34px Inter, sans-serif';g.fillText('✦',43,70);
    g.fillStyle='#111214';g.font='600 28px Inter, sans-serif';g.fillText('Asistente IA',108,62);g.fillStyle='#5D5C64';g.font='400 20px Inter, sans-serif';g.fillText('responde al instante',108,90);
    const bub=(x,y,w2,h2,c,txt,tc)=>{g.fillStyle=c;rr(g,x,y,w2,h2,26);g.fillStyle=tc;g.font='500 24px Inter, sans-serif';txt.forEach((t,i)=>g.fillText(t,x+24,y+44+i*32));};
    bub(260,170,420,110,'#111214',['¿Mesa para 4 el','sábado a las 21:00?'],'#F5F2EC');
    bub(40,310,470,150,'#fff',['¡Sí! Tengo mesa a esa','hora. ¿A nombre de','quién la reservo?'],'#111214');
    bub(470,490,210,70,'#111214',['Marta'],'#F5F2EC');
    bub(40,590,470,110,'#fff',['Hecho, Marta. Te envío','la confirmación.'],'#111214');
    g.fillStyle='#E8336F';rr(g,40,740,640,110,24);g.fillStyle='#111214';g.font='600 26px Inter, sans-serif';g.fillText('✓ Reserva creada · sáb 21:00',72,806);});
  const pWeb=panel(3.0,1.88,.08,webT,.08), pApp=panel(.98,2.0,.1,appT,.12), pVid=panel(2.3,1.3,.08,vidT,.06), pAI=panel(1.3,1.62,.08,aiT,.1);
  const orbit=new THREE.Group();root.add(orbit);
  const slots=[{o:pWeb,a:0,r:4.3,y:.55},{o:pApp,a:1.6,r:3.9,y:-.2},{o:pVid,a:3.2,r:4.2,y:-.8},{o:pAI,a:4.75,r:4.0,y:.3}];
  slots.forEach(s=>orbit.add(s.o));

  // particles
  const N=420,pos=new Float32Array(N*3),col=new Float32Array(N*3);const cA=new THREE.Color(C.acc),cP=new THREE.Color(C.paper);
  for(let i=0;i<N;i++){const r=4+Math.random()*7,a=Math.random()*Math.PI*2,y=(Math.random()-.5)*7;pos.set([Math.cos(a)*r,y,Math.sin(a)*r-2],i*3);const c=Math.random()<.22?cA:cP;col.set([c.r,c.g,c.b],i*3);}
  const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));pg.setAttribute('color',new THREE.BufferAttribute(col,3));
  const dots=new THREE.Points(pg,new THREE.PointsMaterial({size:.035,vertexColors:true,transparent:true,opacity:.75,depthWrite:false}));root.add(dots);

  // lights
  scene.add(new THREE.HemisphereLight(0xffffff,0x1a1a20,.6));
  const key=new THREE.DirectionalLight(0xffffff,1.1);key.position.set(4,5,6);scene.add(key);
  const rim=new THREE.PointLight(C.acc,14,20,1.6);rim.position.set(-3,-1,3);scene.add(rim);

  const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,cam));
  const bloom=new UnrealBloomPass(new THREE.Vector2(1,1),.28,.5,.9);composer.addPass(bloom);composer.addPass(new OutputPass());

  function size(){const r=canvas.getBoundingClientRect();const w=Math.max(1,r.width),h=Math.max(1,r.height);renderer.setSize(w,h,false);composer.setSize(w,h);cam.aspect=w/h;
    const wide=w>1060;root.position.x=wide?2.6:0;root.position.y=wide?-.1:1.55;root.scale.setScalar(wide?1:Math.min(1,w/900)*.82+.12);cam.updateProjectionMatrix();}
  size();new ResizeObserver(size).observe(canvas);

  let mx=0,my=0,sx=0,sy=0;addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;});
  let visible=true;new IntersectionObserver(([e])=>visible=e.isIntersecting).observe(canvas);
  const clock=new THREE.Clock();let t=0;
  function frame(){requestAnimationFrame(frame);if(!visible)return;const dt=Math.min(clock.getDelta(),.05);t+=RM?0:dt;
    sx+=(mx-sx)*.05;sy+=(my-sy)*.05;const sc=Math.min(1,scrollY/700);
    mark.rotation.y=Math.sin(t*.6)*.35+sx*.9+sc*1.4;mark.rotation.x=-sy*.5+Math.sin(t*.4)*.08;mark.position.y=Math.sin(t*1.1)*.08;
    cursor.position.y=-.95+Math.max(0,Math.sin(t*2.2))*.06;curM.emissiveIntensity=.16+.1*(.5+.5*Math.sin(t*3));
    orbit.rotation.y=t*.16+sx*.4+sc*.8;
    slots.forEach((s,i)=>{const a=s.a;s.o.position.set(Math.cos(a)*s.r,s.y+Math.sin(t*.9+i*2)*.12,Math.sin(a)*s.r);
      const wp=new THREE.Vector3();s.o.getWorldPosition(wp);s.o.lookAt(cam.position.x,wp.y,cam.position.z);s.o.rotateY(-.25);});
    dots.rotation.y=t*.03;cam.position.y=-sc*1.2;cam.lookAt(root.position.x*.35,-sc*1.2,0);
    composer.render();}
  frame();
}catch(e){console.warn('3D desactivado:',e);useFallback();}
