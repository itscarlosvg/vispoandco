function showNote(t){const n=$('#dbNote');n.textContent=t;n.hidden=!t;}
function dbMsg(e){const c=e&&e.code;return c==='quota_exceeded'?'No queda espacio para más registros. Borra algunos antiguos.':c==='invalid_argument'?'No tienes permiso para cambiar estos datos.':c==='resource_exhausted'?'Demasiados cambios seguidos. Espera unos segundos.':'No se pudo guardar. Revisa la conexión e inténtalo de nuevo.';}
const clean=o=>{const r={};FIELDS.forEach(f=>{if(o[f]!==undefined)r[f]=(f==='valor'||f==='mensual')?Math.max(0,Math.round(+o[f]||0)):String(o[f]??'').slice(0,2000);});return r;};
