// Reveal sections and animate HUD rings as they scroll into view
document.addEventListener('DOMContentLoaded', () => {

  const revealTargets = document.querySelectorAll('.section, .hero');
  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .7s ease, transform .7s ease';
  });

  const rings = document.querySelectorAll('.ring-progress');
  rings.forEach(r => {
    r.style.transition = 'none';
    r.style.strokeDashoffset = '440';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        // if this is the skills section, animate rings
        if (entry.target.id === 'skills') {
          const ringEls = entry.target.querySelectorAll('.ring-progress');
          ringEls.forEach(r => {
            requestAnimationFrame(() => {
              r.style.transition = 'stroke-dashoffset 1.2s ease';
              const pct = getComputedStyle(r).getPropertyValue('--pct');
              r.style.strokeDashoffset = `calc(440 - (440 * ${pct}) / 100)`;
            });
          });
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => observer.observe(el));

  // simple contact form feedback (no backend wired up)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', () => {
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Message sent';
      setTimeout(() => { btn.textContent = original; form.reset(); }, 2200);
    });
  }
});
