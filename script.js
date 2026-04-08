// ===== INTERSECTION OBSERVER FOR FADE-IN =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-in to major sections
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in elements
  const fadeTargets = document.querySelectorAll(
    '.problem-card, .accountability-card, .pillar-card, .step, .feature-card, .parallel-point, .artifact-row, .value-item, .manifesto-item, .code-block, .beta-card, .get-started-step'
  );
  fadeTargets.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // Staggered hero flow animation
  const flowSteps = document.querySelectorAll('.flow-step');
  const flowArrows = document.querySelectorAll('.flow-arrow');

  flowSteps.forEach((step, i) => {
    setTimeout(() => {
      step.classList.add('visible');
      if (flowArrows[i]) {
        setTimeout(() => flowArrows[i].classList.add('visible'), 150);
      }
    }, 400 + i * 200);
  });

  // Staggered parallel task animation
  const parallelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tasks = entry.target.querySelectorAll('.parallel-task');
        tasks.forEach((task, i) => {
          setTimeout(() => task.classList.add('visible'), i * 150);
        });
        parallelObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const parallelTrack = document.querySelector('.parallel-track');
  if (parallelTrack) parallelObserver.observe(parallelTrack);

  // Mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('nav-mobile');

  toggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });

  // Nav background on scroll
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
      nav.style.background = 'rgba(10, 10, 15, 0.8)';
    }
  }, { passive: true });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Lightbox for screenshots
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');

  document.querySelectorAll('.get-started-screenshot img, .step-screenshot img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') lightbox.classList.remove('open');
  });
});
