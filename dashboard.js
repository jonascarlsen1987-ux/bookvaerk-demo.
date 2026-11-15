'use strict';
// Fictional demonstration data. No customer data is requested, saved or transmitted.
const demoSeed = Object.freeze([
  {id:'DEMO-101',vehicle:'Lille bil',service:'Indvendig rengøring',value:349,status:'Ny'},
  {id:'DEMO-102',vehicle:'SUV',service:'Komplet klargøring',value:1199,status:'Tilbud sendt'},
  {id:'DEMO-103',vehicle:'Personbil',service:'Polering',value:1499,status:'Booket'},
  {id:'DEMO-104',vehicle:'Varebil',service:'Udvendig vask',value:849,status:'Ny'},
  {id:'DEMO-105',vehicle:'SUV',service:'Indvendig rengøring',value:549,status:'Afsluttet'},
  {id:'DEMO-106',vehicle:'Personbil',service:'Komplet klargøring',value:999,status:'Booket'},
  {id:'DEMO-107',vehicle:'Lille bil',service:'Udvendig vask',value:449,status:'Tilbud sendt'}
]);
let leads = demoSeed.map(lead => ({...lead}));
let activeFilter = 'Alle';
const statuses = ['Ny','Tilbud sendt','Booket','Afsluttet'];
const formatKr = amount => new Intl.NumberFormat('da-DK',{maximumFractionDigits:0}).format(amount) + ' kr.';
const rowsEl = document.getElementById('lead-rows');
const searchEl = document.getElementById('lead-search');
const statusEl = document.getElementById('demo-action-status');
function renderLeads() {
  document.getElementById('stat-total').textContent = String(leads.length);
  document.getElementById('stat-new').textContent = String(leads.filter(x=>x.status==='Ny').length);
  document.getElementById('stat-booked').textContent = String(leads.filter(x=>x.status==='Booket').length);
  document.getElementById('stat-value').textContent = formatKr(leads.filter(x=>x.status!=='Afsluttet').reduce((sum,x)=>sum+x.value,0));
  document.getElementById('count-all').textContent = '('+leads.length+')';
  const q = searchEl.value.trim().toLocaleLowerCase('da-DK');
  const visible = leads.filter(x=>(activeFilter==='Alle'||x.status===activeFilter) && (x.vehicle+' '+x.service+' '+x.id).toLocaleLowerCase('da-DK').includes(q));
  rowsEl.replaceChildren();
  for (const lead of visible) {
    const tr = document.createElement('tr');
    const idTd = document.createElement('td');
    const strong = document.createElement('strong'); strong.textContent=lead.id;
    const small = document.createElement('small'); small.textContent=lead.vehicle+' · fiktiv';
    idTd.append(strong,small);
    const serviceTd = document.createElement('td');serviceTd.textContent=lead.service;
    const valueTd = document.createElement('td');valueTd.textContent=formatKr(lead.value);
    const stateTd = document.createElement('td');const badge=document.createElement('span');
    badge.className='lead-badge status-'+(lead.status==='Tilbud sendt'?'Tilbud':lead.status);badge.textContent=lead.status;stateTd.append(badge);
    const actionTd = document.createElement('td');
    const action=document.createElement('select');action.setAttribute('aria-label','Skift status for '+lead.id);
    for (const s of statuses) {const opt=document.createElement('option');opt.value=s;opt.textContent=s;opt.selected=lead.status===s;action.append(opt);}
    action.addEventListener('change',()=>{lead.status=action.value;statusEl.textContent=lead.id+' ændret til '+lead.status+' (kun i demoen).';renderLeads();});
    actionTd.append(action);tr.append(idTd,serviceTd,valueTd,stateTd,actionTd);rowsEl.append(tr);
  }
  document.getElementById('lead-empty').hidden=visible.length>0;
}
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{
  activeFilter=btn.dataset.filter;
  document.querySelectorAll('[data-filter]').forEach(b=>{const on=b===btn;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  renderLeads();
}));
// Add a fictional enquiry locally: no personal data, server, cookies or persistence.
let demoCounter = 108;
document.getElementById('new-demo-lead')?.addEventListener('submit',event=>{
  event.preventDefault();
  const serviceInput=document.getElementById('new-lead-service');
  const vehicleInput=document.getElementById('new-lead-vehicle');
  const price=Number(serviceInput.selectedOptions[0]?.dataset.price ?? 0);
  if(!Number.isFinite(price)||price<0)return;
  const id='DEMO-'+String(demoCounter++);
  leads.unshift({id,vehicle:vehicleInput.value,service:serviceInput.value,value:price,status:'Ny'});
  searchEl.value='';activeFilter='Alle';
  document.querySelectorAll('[data-filter]').forEach(b=>{const on=b.dataset.filter==='Alle';b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  statusEl.textContent='Tilføjet '+id+' som fiktiv henvendelse. Intet blev gemt eller sendt.';
  renderLeads();
});
searchEl.addEventListener('input',renderLeads);
document.getElementById('reset-demo').addEventListener('click',()=>{
  leads=demoSeed.map(lead=>({...lead}));demoCounter=108;activeFilter='Alle';searchEl.value='';
  document.querySelectorAll('[data-filter]').forEach(b=>{const on=b.dataset.filter==='Alle';b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
  statusEl.textContent='Demo nulstillet. Ingen oplysninger blev gemt.';renderLeads();
});
const serviceEl=document.getElementById('quote-service');
const sizeEl=document.getElementById('quote-size');
const extraEl=document.getElementById('quote-extra');
function updateQuote(){const price=Number(serviceEl.value)+Number(sizeEl.value)+(extraEl.checked?150:0);document.getElementById('quote-total').textContent=formatKr(price);return price;}
[serviceEl,sizeEl,extraEl].forEach(input=>input.addEventListener('change',updateQuote));
document.getElementById('quote-demo').addEventListener('submit',event=>{
  event.preventDefault();const sum=updateQuote();
  document.getElementById('quote-result').textContent='Eksempeltilbud: '+serviceEl.selectedOptions[0].text.split(' – ')[0]+' — '+formatKr(sum)+'. Tilbuddet er ikke sendt til nogen.';
});
renderLeads();updateQuote();
