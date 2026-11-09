// company settings
const coDlg=$('#coDlg');const CO_F=['nombre','titular','nif','email','telefono','web','direccion','iban','iva','irpf','validez','cond'];
$('#qCoBtn').addEventListener('click',()=>{CO_F.forEach(k=>$('#co-'+k).value=CO[k]??'');$('#coErr').textContent='';coDlg.showModal();});
$('#coClose').addEventListener('click',()=>coDlg.close());
$('#coForm').addEventListener('submit',async e=>{e.preventDefault();const o={};CO_F.forEach(k=>{const v=$('#co-'+k).value;o[k]=['iva','irpf','validez'].includes(k)?Math.max(0,+v||0):v.trim();});if(!o.validez)o.validez=30;
  try{await db.doc('ajustes/empresa').set(o);coDlg.close();}catch(err){$('#coErr').textContent=dbMsg(err);}});
function subscribeQuotes(fail){
  db.collection('presupuestos').onSnapshot(s=>{QUOTES=s.docs.map(d=>Object.assign({id:d.id},d.data()));lastSync=new Date();renderQuotes();render();},fail);
  db.doc('ajustes/empresa').onSnapshot(s=>{CO=Object.assign({},CO_DEF,s.exists?s.data():{});if(curQ)qPreview();},fail);}
renderQuotes();

