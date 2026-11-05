// Progressive enhancement: content is visible even without JavaScript or motion.
// Entrances animate only transform/translate and opacity and run once per item.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  let observer;

  function animate(element, delay = 0, distance = 22) {
    if (reduced.matches || typeof element.animate !== 'function') return;
    const animation = element.animate([
      {opacity: .15, translate: `0 ${distance}px`},
      {opacity: 1, translate: '0 0'}
    ], {duration: 680, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards'});
    active.add(animation);
    animation.finished.catch(() => {}).finally(() => active.delete(animation));
  }

  if (!reduced.matches) {
    if (!location.hash || location.hash === '#home') {
      document.querySelectorAll('.hero-copy > *').forEach((element, index) => animate(element, index * 65));
      animate(document.querySelector('.hero-art'), 160, 14);
    }
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const siblings = [...entry.target.parentElement.children];
          animate(entry.target, Math.min(siblings.indexOf(entry.target) * 55, 165), 20);
        });
      }, {threshold: .08, rootMargin: '0px 0px -25px 0px'});
      document.querySelectorAll('.section-heading, .project, .about-grid > *, .skills-header, .skill-grid > *, .column-title, .credential, .milestone, .contact-top, .contact-bottom').forEach(element => observer.observe(element));
    }
  }

  document.querySelectorAll('details').forEach(details => {
    details.addEventListener('toggle', () => {
      if (details.open) details.querySelectorAll('p').forEach(element => animate(element, 0, 7));
    });
  });
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      observer?.disconnect();
      active.forEach(animation => animation.cancel());
      active.clear();
    }
  });

  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);
  let queued = false;
  function updateProgress() {
    const range = document.documentElement.scrollHeight - innerHeight;
    const fraction = range > 0 ? Math.min(1, Math.max(0, scrollY / range)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    queued = false;
  }
  function queueProgress() {
    if (!queued) { queued = true; requestAnimationFrame(updateProgress); }
  }
  window.addEventListener('scroll', queueProgress, {passive: true});
  window.addEventListener('resize', queueProgress, {passive: true});
  // An expanded project changes the scrollable range without a viewport resize.
  document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', queueProgress));
  window.addEventListener('load', queueProgress, {once: true});
  updateProgress();
})();
