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
// Contact is handled locally through the visitor's own email app.
// Nothing is collected by this static site or sent before the visitor presses Send.
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', e => {
  e.preventDefault();
  if (!contactForm.reportValidity()) return;
  const data = new FormData(contactForm);
  const field = key => String(data.get(key) || '').trim();
  const company = field('virksomhed');
  const name = field('navn');
  const replyEmail = field('email');
  const phone = field('telefon');
  const interest = field('interesse');
  const message = field('besked');
  const subject = 'BookVærk – forespørgsel fra ' + company.slice(0, 120);
  const body = [
    'Hej BookVærk',
    '',
    'Jeg vil gerne høre mere om jeres løsning.',
    '',
    'Virksomhed: ' + company,
    'Kontaktperson: ' + name,
    'E-mail til svar: ' + replyEmail,
    'Telefon: ' + (phone || 'Ikke oplyst'),
    'Interesse: ' + interest,
    '',
    'Besked:',
    message || 'Jeg ønsker en uforpligtende gennemgang.',
    '',
    'Med venlig hilsen',
    name
  ].join('\n');
  const status = document.getElementById('form-status');
  if (status) status.textContent = 'Din e-mailapp åbnes. Husk at trykke Send i mailprogrammet. Hvis den ikke åbner, skriv direkte til jonascarlsen1987@live.dk.';
  window.location.href = 'mailto:jonascarlsen1987@live.dk?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
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
  document.getElementById('calc-net').textContent = 'Efter abonnement: ' + fmt.format(amount - 899) + ' kr./md.';
}
bookingSlider?.addEventListener('input',updateCalculator);
marginInput?.addEventListener('input',updateCalculator);
updateCalculator();
