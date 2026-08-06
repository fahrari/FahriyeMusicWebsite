// Popup
const popup = document.getElementById('popup-overlay');
if (popup) {
  document.getElementById('popup-close').addEventListener('click', () => popup.classList.add('hidden'));
  popup.addEventListener('click', e => { if (e.target === popup) popup.classList.add('hidden'); });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Nav overlay
const toggle = document.querySelector('.nav-toggle');
const navOverlay = document.getElementById('nav-overlay');
const navClose = document.getElementById('nav-close');
toggle.addEventListener('click', () => navOverlay.classList.add('open'));
navClose.addEventListener('click', () => navOverlay.classList.remove('open'));
navOverlay.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navOverlay.classList.remove('open'))
);

// Contact form
document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const status = document.getElementById('form-status');
  const btn = this.querySelector('button[type="submit"]');

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all required fields.';
    status.className = 'form-status error';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'Sending…';

  const response = await fetch(this.action, {
    method: 'POST',
    body: new FormData(this),
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    status.textContent = "Thanks! I'll get back to you soon.";
    status.className = 'form-status success';
    this.reset();
  } else {
    status.textContent = 'Something went wrong. Please email me directly.';
    status.className = 'form-status error';
  }

  btn.disabled = false;
  btn.textContent = 'Send Message';
});
