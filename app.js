'use strict';
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
navToggle?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Luk menu' : 'Åbn menu');
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
  navToggle?.setAttribute('aria-label', 'Åbn menu');
}));
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
const dateInput = document.getElementById('demo-date');
if (dateInput) {
  const now = new Date();
  const localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0,10);
  dateInput.min = localToday;
}
document.getElementById('booking-demo')?.addEventListener('submit', e => {
  e.preventDefault();
  const service = document.getElementById('demo-service').value;
  const date = dateInput.value;
  const time = document.getElementById('demo-time').value;
  const msg = document.getElementById('demo-message');
  if (!service || !date || !time) return;
  const readable = new Date(date + 'T12:00:00').toLocaleDateString('da-DK',{day:'numeric',month:'long',year:'numeric'});
  msg.textContent = `Demo: ${service} den ${readable} kl. ${time}. Ingen rigtig booking er oprettet.`;
  msg.classList.add('success');
});
document.querySelectorAll('[data-plan]').forEach(a => a.addEventListener('click', () => {
  const interest = document.getElementById('interest');
  if (interest) interest.value = a.dataset.plan === 'Plus' ? 'Plus – 1.299 kr./md.' : 'Start – 899 kr./md.';
  const status = document.getElementById('form-status');
  if (status) status.textContent = `Du har valgt ${a.dataset.plan}. Formularen er lukket, indtil virksomheden er lanceret.`;
}));
// Forms stay deliberately disabled until legal details and a real backend exist.
// Never collect real personal information on this demonstration site.
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  const status = document.getElementById('form-status');
  if (status) status.textContent = 'Demoen sendte ikke noget. Formularmodtagelse aktiveres først ved lancering.';
});
const bookingSlider = document.getElementById('calc-bookings');
const marginInput = document.getElementById('calc-margin');
function updateCalculator() {
  const bookings = Number(bookingSlider?.value || 0);
  const margin = Math.max(0,Math.min(100000,Number(marginInput?.value || 0)));
  const fmt = new Intl.NumberFormat('da-DK',{maximumFractionDigits:0});
  const amount = bookings * margin;
  document.getElementById('calc-bookings-out').textContent = String(bookings);
  document.getElementById('calc-result').textContent = fmt.format(amount) + ' kr./md.';
  document.getElementById('calc-net').textContent = 'Efter Plus-abonnement: ' + fmt.format(amount - 1299) + ' kr./md.';
}
bookingSlider?.addEventListener('input',updateCalculator);
marginInput?.addEventListener('input',updateCalculator);
updateCalculator();
