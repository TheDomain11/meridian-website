// ── NAV SCROLL EFFECT ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── MOBILE NAV TOGGLE ──
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', links.classList.contains('open'));
  });
  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ── FADE-UP ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.step-card, .client-card, .pain-item, .timeline-step, .makes-item, .principle-item, .cred-card'
).forEach((el, i) => {
  el.classList.add('fade-up');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// ── ACTIVE NAV LINK ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.style.color = '#C4973B';
  }
});

// ── CONTACT FORM SUBMIT ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    // Simulate — replace with real endpoint
    setTimeout(() => {
      form.innerHTML = `
        <div style="text-align:center; padding: 48px 0;">
          <div style="width:56px;height:56px;background:#0A7E6B;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style="font-family:'Libre Baskerville',serif;color:#0C2340;margin-bottom:12px;">Inquiry received.</h3>
          <p style="color:#5A5A5A;font-size:0.95rem;">Thank you for getting in touch. You will receive a response within one business day.</p>
        </div>`;
    }, 1200);
  });
}
