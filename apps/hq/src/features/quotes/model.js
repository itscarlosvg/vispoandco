const CAT=[
 ['Web','Página única','Diseño a medida en una página, adaptada a móvil, con formulario de contacto, botón de WhatsApp y redes.',190,'unico'],
 ['Web','Web corporativa','Hasta 5 páginas a medida, adaptada a móvil, con formulario de contacto y textos legales.',390,'unico'],
 ['Web','Web amplia','De 6 a 12 páginas a medida, adaptada a móvil, con formulario de contacto y textos legales.',790,'unico'],
 ['Web','Tienda online','Catálogo, carrito, pagos y gestión de pedidos.',990,'unico'],
 ['Web','Reservas online','Sistema de reservas integrado en la web.',150,'unico'],
 ['Web','Pedidos para recoger o a domicilio','Pedidos online con aviso al negocio.',250,'unico'],
 ['Web','Carta o catálogo con QR','Carta digital editable con código QR para el local.',120,'unico'],
 ['Web','Pagos online','Pasarela de pago con tarjeta.',120,'unico'],
 ['Web','Área de clientes','Acceso con usuario y contraseña para clientes.',290,'unico'],
 ['Web','Blog o novedades','Sección de noticias editable.',90,'unico'],
 ['Web','SEO local','Optimización para aparecer en búsquedas de tu zona.',190,'unico'],
 ['Web','Redacción de textos','Textos de todas las páginas.',90,'unico'],
 ['Web','Diseño premium con 3D y animaciones','Elementos 3D y animaciones a medida.',220,'unico'],
 ['Web','Idioma adicional','Traducción y versión de la web en otro idioma.',90,'unico'],
 ['App','App sencilla','App para iOS, Android y web con información, carta o catálogo y reservas.',2190,'unico'],
 ['App','App con usuarios y pagos','App para iOS, Android y web con cuentas, pedidos, pagos y avisos.',4400,'unico'],
 ['App','App a medida','App para iOS, Android y web con funciones propias.',7900,'unico'],
 ['App','Panel de gestión web','Panel para gestionar contenidos, pedidos y usuarios.',890,'unico'],
 ['App','Notificaciones push','Avisos en el móvil de tus clientes.',190,'unico'],
 ['App','Puntos y fidelización','Programa de puntos y recompensas.',490,'unico'],
 ['App','Conexión con TPV o software','Integración con tu sistema de caja o gestión.',450,'unico'],
 ['App','Publicación en App Store y Google Play','Alta y publicación en las tiendas.',150,'unico'],
 ['IA','Asistente en WhatsApp e Instagram · puesta en marcha','Configuración y entrenamiento con la información del negocio.',490,'unico'],
 ['IA','Asistente en WhatsApp e Instagram · servicio','Funcionamiento, mantenimiento y mejoras del asistente.',49,'mensual'],
 ['IA','Reservas y pedidos automáticos','Conexión del asistente con tu calendario o sistema de pedidos.',290,'unico'],
 ['IA','Respuestas a reseñas · puesta en marcha','Respuesta automática a reseñas de Google con el tono de tu marca.',190,'unico'],
 ['IA','Respuestas a reseñas · servicio','Funcionamiento y revisión mensual.',19,'mensual'],
 ['IA','Emails y facturas automáticas · puesta en marcha','Automatización de emails y facturas.',250,'unico'],
 ['IA','Emails y facturas automáticas · servicio','Funcionamiento y mantenimiento.',15,'mensual'],
 ['IA','Automatización a medida','Automatización diseñada para tu proceso.',450,'unico'],
 ['Llamadas','Recepcionista telefónica IA · puesta en marcha','Configuración de voz, saludo e información del negocio. Atiende llamadas 24/7 en el idioma de quien llama.',690,'unico'],
 ['Llamadas','Recepcionista telefónica IA · servicio','Atención de llamadas, resumen de cada llamada y mantenimiento.',89,'mensual'],
 ['Llamadas','Recepcionista que atiende y llama · puesta en marcha','Además confirma y recuerda citas por teléfono.',990,'unico'],
 ['Llamadas','Recepcionista que atiende y llama · servicio','Llamadas entrantes y salientes, resúmenes y mantenimiento.',129,'mensual'],
 ['Llamadas','Voz propia de la marca','Voz personalizada para el asistente.',250,'unico'],
 ['Llamadas','Conexión con tu sistema de reservas','Las reservas por teléfono entran directamente en tu sistema.',190,'unico'],
 ['Vídeo','Intro de logo animada','Animación del logotipo para redes y vídeos.',150,'unico'],
 ['Vídeo','Spot promocional de 30 a 60 s','Guion, edición, música y versiones para redes.',290,'unico'],
 ['Vídeo','Vídeo 3D y motion avanzado','Pieza con animación 3D y motion graphics.',390,'unico'],
 ['Vídeo','Grabación en el local','Sesión de grabación en tu negocio.',120,'unico'],
 ['Vídeo','Reels · 4 al mes','Edición de 4 reels mensuales.',90,'mensual'],
 ['Vídeo','Reels · 8 al mes','Edición de 8 reels mensuales.',160,'mensual'],
 ['Vídeo','Reels · 12 al mes','Edición de 12 reels mensuales.',220,'mensual'],
 ['Marca','Logo','Diseño de logotipo con versiones.',190,'unico'],
 ['Marca','Identidad completa','Logo, colores, tipografías y manual de marca.',490,'unico'],
 ['Marca','Plantillas para redes','Plantillas editables para publicaciones.',120,'unico'],
 ['Marca','Ficha de Google optimizada','Alta y optimización del perfil de empresa en Google.',90,'unico'],
 ['Mantenimiento','Mantenimiento Básico','Alojamiento, dominio, certificado SSL y copias de seguridad.',10,'mensual'],
 ['Mantenimiento','Mantenimiento Pro','Básico, cambios cada mes e informe mensual.',29,'mensual'],
 ['Mantenimiento','Mantenimiento Premium','Pro, soporte prioritario y mejoras continuas.',49,'mensual']];
const CO_DEF={nombre:'Vispo & Co.',titular:'',nif:'',email:'',telefono:'',web:'instagram.com/vispoandco',direccion:'',iban:'',iva:21,irpf:0,validez:30,
  cond:'Forma de pago: 50 % al aceptar el presupuesto y 50 % a la entrega.\nLas cuotas mensuales se cobran al inicio de cada mes y pueden cancelarse avisando con 30 días.\nEl plazo de entrega empieza cuando recibimos el primer pago y los contenidos del cliente.'};
let CO=Object.assign({},CO_DEF),curQ=null,qDirty=false;
const QST={borrador:['Borrador',''],enviado:['Enviado','warn'],aceptado:['Aceptado','ok'],rechazado:['Rechazado','bad']};
const eur2=n=>{n=Math.round((+n||0)*100)/100;const neg=n<0;n=Math.abs(n);const [i,d]=n.toFixed(2).split('.');return (neg?'−':'')+i.replace(/\B(?=(\d{3})+(?!\d))/g,'.')+','+d+' €';};
function qCalc(q){const L=q.lineas||[];const imp=l=>(+l.cantidad||0)*(+l.precio||0);
  const uni=L.filter(l=>l.tipo!=='mensual').reduce((s,l)=>s+imp(l),0),men=L.filter(l=>l.tipo==='mensual').reduce((s,l)=>s+imp(l),0);
  const desc=uni*(+q.descuento||0)/100,base=uni-desc,iva=base*(+q.iva||0)/100,irpf=base*(+q.irpf||0)/100;
  const mIva=men*(+q.iva||0)/100,mIrpf=men*(+q.irpf||0)/100;
  return {uni,desc,base,iva,irpf,total:base+iva-irpf,men,mIva,mIrpf,mTotal:men+mIva-mIrpf};}
function nextNum(){const y=new Date().getFullYear();const n=QUOTES.map(q=>String(q.numero||'')).filter(s=>s.startsWith('P-'+y+'-')).map(s=>+s.split('-')[2]||0);return `P-${y}-${String((n.length?Math.max(...n):0)+1).padStart(3,'0')}`;}
function clientFrom(l){return l?{negocio:l.negocio||'',nombre:l.nombre||'',email:l.email||'',telefono:l.telefono||'',direccion:[l.direccion,l.ciudad].filter(Boolean).join(', '),nif:l.nif||''}:{negocio:'',nombre:'',email:'',telefono:'',direccion:'',nif:''};}
function blankQuote(leadId){const l=leadId?LEADS.find(x=>x.id===leadId):null;
  return {numero:nextNum(),leadId:l?l.id:'',cliente:clientFrom(l),fecha:TODAY(),validez:+CO.validez||30,estado:'borrador',lineas:[],descuento:0,iva:+CO.iva||0,irpf:+CO.irpf||0,notas:'',condiciones:CO.cond||''};}
const cleanLines=ls=>(Array.isArray(ls)?ls:[]).slice(0,60).map(l=>({concepto:String(l.concepto||'').slice(0,160),detalle:String(l.detalle||'').slice(0,400),cantidad:Math.max(0,+l.cantidad||(l.cantidad===0?0:1)),precio:Math.max(0,Math.round((+l.precio||0)*100)/100),tipo:l.tipo==='mensual'?'mensual':'unico'}));
async function createQuote(q){const ref=db.collection('presupuestos').doc();const now=new Date().toISOString();const body=Object.assign({},q,{lineas:cleanLines(q.lineas),creado:now,actualizado:now});await ref.set(body);return ref.id;}

