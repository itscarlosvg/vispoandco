const PER={mes:['Este mes','vs mes pasado, mismos días'],mesant:['Mes pasado','vs el mes anterior'],trim:['Trimestre','vs trimestre pasado, mismos días'],anio:['Año','vs año pasado, mismos días'],u12:['12 meses','vs los 12 meses anteriores']};
const GOALS=[['fact','Facturación','€'],['mrr','Recurrente nuevo','€/mes'],['clientes','Clientes ganados',''],['leads','Leads nuevos',''],['reuniones','Reuniones',''],['presupuestos','Presupuestos enviados','']];
const WEIGHT={nuevo:.1,contactado:.2,reunion:.4,propuesta:.6};
let OBJ={},FIL={per:'mes',src:'',sec:''},lastSync=null;
const sum=(a,k)=>a.reduce((s,x)=>s+(+x[k]||0),0);
const inR=(v,r)=>!!v&&String(v).slice(0,10)>=r[0]&&String(v).slice(0,10)<r[1];
const monthKey=d=>d.getFullYear()+'-'+pad(d.getMonth()+1);
function range(k,prev){const d=new Date(),y=d.getFullYear(),m=d.getMonth();let s,e,ps,pe;
  if(k==='mes'){s=new Date(y,m,1);e=new Date(y,m+1,1);ps=new Date(y,m-1,1);pe=new Date(y,m-1,d.getDate()+1);}
  else if(k==='mesant'){s=new Date(y,m-1,1);e=new Date(y,m,1);ps=new Date(y,m-2,1);pe=new Date(y,m-1,1);}
  else if(k==='trim'){const q=Math.floor(m/3)*3;s=new Date(y,q,1);e=new Date(y,q+3,1);ps=new Date(y,q-3,1);pe=new Date(y,q-3+(m-q),d.getDate()+1);}
  else if(k==='anio'){s=new Date(y,0,1);e=new Date(y+1,0,1);ps=new Date(y-1,0,1);pe=new Date(y-1,m,d.getDate()+1);}
  else{s=new Date(y,m-11,1);e=new Date(y,m+1,1);ps=new Date(y,m-23,1);pe=new Date(y,m-11,1);}
  return prev?[isoDay(ps),isoDay(pe)]:[isoDay(s),isoDay(e)];}
const passL=l=>(!FIL.src||(l.fuente||'Otro')===FIL.src)&&(!FIL.sec||l.sector===FIL.sec);
const FL=()=>LEADS.filter(passL);
const passQ=q=>{if(!FIL.src&&!FIL.sec)return true;const l=LEADS.find(x=>x.id===q.leadId);return !!l&&passL(l);};
function metrics(r,all){const L=all?LEADS:FL();
  const won=L.filter(l=>l.etapa==='ganado'&&inR(l.cerrado,r)),lost=L.filter(l=>l.etapa==='perdido'&&inR(l.cerrado,r));
  const Q=QUOTES.filter(q=>q.estado!=='borrador'&&inR(q.fecha,r)&&(all||passQ(q)));
  return {fact:sum(won,'valor'),mrr:sum(won,'mensual'),clientes:won.length,lost:lost.length,leads:L.filter(l=>inR(l.creado,r)).length,
    reuniones:L.filter(l=>inR(l.reunion,r)).length,presupuestos:Q.length,qAcc:Q.filter(q=>q.estado==='aceptado').length,
    conv:won.length+lost.length?won.length/(won.length+lost.length)*100:null};}
function stats(){
  const now=TODAY();
  const open=LEADS.filter(l=>OPEN.includes(l.etapa));
  const won=LEADS.filter(l=>l.etapa==='ganado'),lost=LEADS.filter(l=>l.etapa==='perdido');
  const meets=LEADS.filter(l=>l.reunion&&l.reunion.slice(0,10)>=now&&l.etapa!=='perdido').sort((a,b)=>a.reunion<b.reunion?-1:1);
  const overdue=LEADS.filter(l=>l.proxima&&l.proxima<now&&OPEN.includes(l.etapa));
  const m=metrics(range('mes'),true);
  return {open,won,lost,meets,overdue,openV:sum(open,'valor'),openM:sum(open,'mensual'),wonV:m.fact,mrr:sum(won,'mensual'),
    conv:m.conv==null?null:Math.round(m.conv),pend:TASKS.filter(t=>!t.hecho)};
}
function goalOf(key){const o=OBJ[key];return o?o:null;}
function monthRange(key){const [y,m]=key.split('-').map(Number);return [isoDay(new Date(y,m-1,1)),isoDay(new Date(y,m,1))];}
function goalStatus(actual,goal,key){if(!goal)return null;const cur=monthKey(new Date());const p=actual/goal;
  if(p>=1)return ['Cumplido','ok'];
  if(key<cur)return ['No alcanzado','bad'];
  if(key>cur)return ['Pendiente',''];
  const d=new Date(),dim=new Date(d.getFullYear(),d.getMonth()+1,0).getDate(),f=Math.max(.04,(d.getDate()-.5)/dim);
  return p>=f*.9?['En ritmo','ok']:p>=f*.6?['Justo','warn']:['Por debajo','bad'];}
function pace(key){const cur=monthKey(new Date());if(key!==cur)return key<cur?1:0;const d=new Date();return (d.getDate()-.5)/new Date(d.getFullYear(),d.getMonth()+1,0).getDate();}
function goalRows(key,editable){const o=goalOf(key)||{},a=metrics(monthRange(key),true);
  return GOALS.map(([k,n,u])=>{const g=+o[k]||0,v=a[k]||0,st=goalStatus(v,g,key),pct=g?Math.min(100,v/g*100):0;
    const fmt=x=>u.startsWith('€')?eur(x)+(u==='€/mes'?'/mes':''):String(x);
    return `<div class="goal"><div class="goal-h"><span>${n}</span>${editable?'':`<b>${fmt(v)}${g?` <span style="color:var(--muted);font-weight:400">/ ${fmt(g)}</span>`:''}</b>`}</div>
      ${editable?`<input type="number" min="0" step="${u.startsWith('€')?10:1}" data-g="${k}" value="${g||''}" placeholder="—" aria-label="Objetivo de ${n}">`:''}
      <div class="gbw">${g?`<div class="gbar"><i class="${st?st[1]:''}" style="width:${pct}%"></i><u style="left:${pace(key)*100}%"></u></div>`:'<div class="gbar"></div>'}${editable?`<small class="num">${fmt(v)}${g?' de '+fmt(g):''}</small>`:''}</div>
      ${st?`<span class="chip ${st[1]}">${st[0]}</span>`:'<span class="chip">Sin objetivo</span>'}</div>`;}).join('');}
function deltaChip(cur,prev,pp){if(cur==null||prev==null)return '';if(pp){const d=Math.round(cur-prev);return `<span class="delta ${d>0?'up':d<0?'down':'eq'}">${d>0?'▲':d<0?'▼':'='} ${Math.abs(d)} pp</span>`;}
  if(!prev&&!cur)return '<span class="delta eq">= 0 %</span>';if(!prev)return '<span class="delta up">▲ nuevo</span>';const d=Math.round((cur-prev)/prev*100);return `<span class="delta ${d>0?'up':d<0?'down':'eq'}">${d>0?'▲':d<0?'▼':'='} ${Math.abs(d)} %</span>`;}
function goalsInRange(r){let s={};Object.entries(OBJ).forEach(([k,o])=>{if(o&&inR(k+'-01',r))GOALS.forEach(([g])=>s[g]=(s[g]||0)+(+o[g]||0));});return s;}
