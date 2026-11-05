const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  navigation.classList.remove('is-open');
}
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);
document.querySelector('#year').textContent = new Date().getFullYear();
const navLinks = [...navigation.querySelectorAll('a')];
const sections = [...document.querySelectorAll('main > section[id], .about-section[id]')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach(link => {
      if (link.hash === '#' + visible.target.id) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin: '-15% 0px -55% 0px', threshold: 0});
  sections.forEach(section => observer.observe(section));
}
const copyButton = document.querySelector('.copy-email');
const copyStatus = document.querySelector('.copy-status');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('adityanaikhpt@gmail.com');
    copyStatus.textContent = 'Email address copied.';
  } catch {
    copyStatus.textContent = 'Email: adityanaikhpt@gmail.com — select the address above to copy it.';
  }
});

// An original point-cloud torus knot. No external animation or 3D library.
// Motion is capped at 30 fps and stops when hidden, paused, or off screen.
(() => {
  const canvas = document.querySelector('#neural-sculpture');
  const control = document.querySelector('.motion-toggle');
  if (!canvas || !control) return;
  const context = canvas.getContext('2d');
  if (!context) { control.hidden = true; return; }
  canvas.parentElement.classList.add('canvas-ready');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  let inView = true;
  let frame = 0;
  let previousTime = 0;
  let angle = .45;
  let width = 0;
  let height = 0;
  let pointerX = 0;
  let pointerY = 0;
  let rotationX = 0;
  let rotationY = 0;
  let points = [];

  function centerAt(t) {
    return [(2 + .62 * Math.cos(3 * t)) * Math.cos(2 * t),
      (2 + .62 * Math.cos(3 * t)) * Math.sin(2 * t), .95 * Math.sin(3 * t)];
  }
  function normalized(vector) {
    const length = Math.hypot(...vector) || 1;
    return vector.map(value => value / length);
  }
  function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function makePoints() {
    points = [];
    const rings = width < 400 ? 128 : 190;
    const dots = width < 400 ? 9 : 12;
    for (let i = 0; i < rings; i++) {
      const t = i / rings * Math.PI * 2;
      const center = centerAt(t);
      const next = centerAt(t + .001);
      const tangent = normalized(next.map((value, index) => value - center[index]));
      const normal = normalized(cross(tangent, [0, 0, 1]));
      const binormal = normalized(cross(tangent, normal));
      for (let j = 0; j < dots; j++) {
        const s = j / dots * Math.PI * 2;
        points.push(center.map((value, index) => value + .3 * (normal[index] * Math.cos(s) + binormal[index] * Math.sin(s))));
      }
    }
  }
  function draw() {
    context.clearRect(0, 0, width, height);
    const scale = Math.min(width, height) * .148;
    const yaw = angle + rotationX;
    const tilt = .85 + rotationY;
    const cosine = Math.cos(yaw), sine = Math.sin(yaw);
    const tiltCos = Math.cos(tilt), tiltSin = Math.sin(tilt);
    const projected = points.map(point => {
      const x = point[0] * cosine - point[2] * sine;
      const z = point[0] * sine + point[2] * cosine;
      const y = point[1] * tiltCos - z * tiltSin;
      const depth = point[1] * tiltSin + z * tiltCos;
      const perspective = 7 / (7 + depth);
      return {x: width * .52 + x * scale * perspective,
        y: height * .47 + y * scale * perspective, depth, perspective};
    }).sort((a, b) => b.depth - a.depth);
    for (const point of projected) {
      const light = Math.max(.15, Math.min(1, (3.8 - point.depth) / 6));
      const radius = (.62 + light * .45) * point.perspective;
      context.beginPath();
      context.fillStyle = `rgba(255, ${Math.round(112 + light * 58)}, ${Math.round(61 + light * 45)}, ${.2 + light * .74})`;
      context.arc(point.x, point.y, radius, 0, Math.PI * 2);
      context.fill();
    }
  }
  function shouldAnimate() { return !paused && inView && !document.hidden; }
  function tick(time) {
    frame = 0;
    if (!shouldAnimate()) return;
    if (time - previousTime >= 1000 / 30) {
      const delta = previousTime ? Math.min(time - previousTime, 65) : 33;
      angle += delta * .0001;
      rotationX += (pointerX - rotationX) * .055;
      rotationY += (pointerY - rotationY) * .055;
      previousTime = time;
      draw();
    }
    frame = requestAnimationFrame(tick);
  }
  function schedule() {
    if (shouldAnimate() && !frame) { previousTime = 0; frame = requestAnimationFrame(tick); }
    if (!shouldAnimate() && frame) { cancelAnimationFrame(frame); frame = 0; }
  }
  function updateControl() {
    control.setAttribute('aria-pressed', String(paused));
    control.setAttribute('aria-label', paused ? 'Resume sculpture animation' : 'Pause sculpture animation');
    control.innerHTML = paused ? 'Resume motion <span aria-hidden="true">▷</span>' : 'Pause motion <span aria-hidden="true">Ⅱ</span>';
  }
  control.addEventListener('click', () => { paused = !paused; updateControl(); schedule(); });
  canvas.addEventListener('pointermove', event => {
    const rect = canvas.getBoundingClientRect();
    pointerX = ((event.clientX - rect.left) / rect.width - .5) * .45;
    pointerY = ((event.clientY - rect.top) / rect.height - .5) * .25;
  });
  canvas.addEventListener('pointerleave', () => { pointerX = 0; pointerY = 0; });
  reducedMotion.addEventListener('change', () => {
    paused = reducedMotion.matches; updateControl(); schedule(); draw();
  });
  document.addEventListener('visibilitychange', schedule);
  new ResizeObserver(() => {
    const rect = canvas.getBoundingClientRect();
    width = rect.width; height = rect.height;
    const density = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * density);
    canvas.height = Math.round(height * density);
    context.setTransform(density, 0, 0, density, 0, 0);
    makePoints(); draw(); schedule();
  }).observe(canvas);
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }).observe(canvas);
  updateControl();
})();
