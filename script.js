// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
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
