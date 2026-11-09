const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const eur=n=>{n=Math.round(+n||0);return (n<0?'−':'')+String(Math.abs(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.')+' €';};
const pad=n=>String(n).padStart(2,'0');
const isoDay=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const TODAY=()=>isoDay(new Date());
const addDays=(n)=>{const d=new Date();d.setDate(d.getDate()+n);return isoDay(d);};
const DOW=['dom','lun','mar','mié','jue','vie','sáb'],MON=['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'];
const MONL=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
const parseDay=s=>{if(!s)return null;const [y,m,d]=String(s).slice(0,10).split('-').map(Number);return y?new Date(y,m-1,d):null;};
const fmtDay=s=>{const d=parseDay(s);return d?`${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`:'';};

const STAGES=[['nuevo','Nuevo','#9C9BA4'],['contactado','Contactado','#7FA7FF'],['reunion','Reunión','#F2B544'],['propuesta','Propuesta','#FF6E9A'],['ganado','Ganado','#43D18A'],['perdido','Perdido','#6E6D76']];
const OPEN=['nuevo','contactado','reunion','propuesta'];
const SRC=['Web','Harvey','Instagram','Referido','Llamada','Otro'];
const SECT=['Restaurante o cafetería','Hotel o alojamiento','Tienda','Salud o estética','Gimnasio o deporte','Academia o formación','Servicios profesionales','Otro'];
const FIELDS=['negocio','nombre','sector','ciudad','email','telefono','web','fuente','etapa','proxima','valor','mensual','servicios','reunion','formato','nota'];
const stName=k=>(STAGES.find(s=>s[0]===k)||[,k])[1];

let db=null,LEADS=[],TASKS=[],QUOTES=[],loaded={l:false,t:false},showDone=false;

/* ---------- views ---------- */
const VIEWS={resumen:['Resumen',''],pipeline:['Clientes','Arrastra cada tarjeta a su etapa'],agenda:['Agenda',''],objetivos:['Objetivos',''],presupuestos:['Presupuestos',''],importar:['Importar',''],harvey:['Harvey','']};
