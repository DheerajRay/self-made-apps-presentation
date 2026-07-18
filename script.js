const projects = {
  duel: { title: 'Duel Engine', url: 'https://duel-engine.vercel.app' },
  fresh: { title: 'FreshKeeper', url: 'https://fresh-keeper-orcin.vercel.app' },
  flow: {
    title: 'FlowWays',
    url: 'https://flowways.vercel.app',
    viewports: { desktop: { width: 1840, height: 900 } }
  },
  note: { title: 'NoteMaker', url: 'https://note-maker-ten-bice.vercel.app' },
};

const slides = [...document.querySelectorAll('.slide')];
const accordion = document.getElementById('projectAccordion');
const sectionIndex = document.getElementById('sectionIndex');
const sectionName = document.getElementById('sectionName');
const notesText = document.getElementById('notesText');
const notesPanel = document.getElementById('speakerNotes');
const notesToggle = document.getElementById('notesToggle');
const dots = document.getElementById('slideDots');
const previousSlideButton = document.getElementById('previousSlide');
const nextSlideButton = document.getElementById('nextSlide');
let activeSlide = 0;

slides.forEach((slide, index) => {
  const dot = document.createElement('button');
  dot.type = 'button';
  dot.className = 'slide-dot';
  dot.setAttribute('aria-label', `Go to section ${index + 1}: ${slide.dataset.title}`);
  dot.addEventListener('click', () => goToSlide(index));
  dots.appendChild(dot);
});

const dotButtons = [...dots.children];

function setActiveSlide(index) {
  activeSlide = index;
  const slide = slides[index];
  sectionIndex.textContent = String(index + 1).padStart(2, '0');
  sectionName.textContent = slide.dataset.title;
  notesText.textContent = slide.dataset.notes || '';
  dotButtons.forEach((dot, i) => {
    const isCurrent = i === index;
    dot.classList.toggle('is-active', isCurrent);
    if (isCurrent) dot.setAttribute('aria-current', 'step');
    else dot.removeAttribute('aria-current');
  });
  previousSlideButton.disabled = index === 0;
  nextSlideButton.disabled = index === slides.length - 1;
}

function goToSlide(index) {
  if (document.getElementById('demoDialog')?.open) return;
  const target = Math.max(0, Math.min(index, slides.length - 1));
  slides[target].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = slides.indexOf(entry.target);
      entry.target.classList.add('is-visible');
      setActiveSlide(index);
    }
  });
}, { threshold: .58 });

slides.forEach((slide) => slideObserver.observe(slide));
setActiveSlide(0);

previousSlideButton.addEventListener('click', () => goToSlide(activeSlide - 1));
nextSlideButton.addEventListener('click', () => goToSlide(activeSlide + 1));
document.querySelectorAll('[data-goto]').forEach((button) => button.addEventListener('click', () => {
  if (document.getElementById('demoDialog')?.open) return;
  document.getElementById(button.dataset.goto)?.scrollIntoView({ behavior: 'smooth' });
}));

document.addEventListener('keydown', (event) => {
  if (document.getElementById('demoDialog').open) return;
  if (['ArrowDown', 'ArrowRight', 'PageDown', ' '].includes(event.key)) {
    event.preventDefault();
    goToSlide(activeSlide + 1);
  }
  if (['ArrowUp', 'ArrowLeft', 'PageUp'].includes(event.key)) {
    event.preventDefault();
    goToSlide(activeSlide - 1);
  }
  if (event.key.toLowerCase() === 'n') toggleNotes();
  if (event.key.toLowerCase() === 'f') toggleFullscreen();
});

accordion.addEventListener('click', (event) => {
  const tab = event.target.closest('.project-tab');
  if (!tab) return;
  const selected = tab.closest('.project-panel');
  accordion.querySelectorAll('.project-panel').forEach((panel) => {
    const isSelected = panel === selected;
    panel.classList.toggle('is-active', isSelected);
    panel.querySelector('.project-tab').setAttribute('aria-expanded', String(isSelected));
  });
});

function toggleNotes(force) {
  const open = typeof force === 'boolean' ? force : !notesPanel.classList.contains('is-open');
  notesPanel.classList.toggle('is-open', open);
  notesPanel.setAttribute('aria-hidden', String(!open));
  notesToggle.setAttribute('aria-pressed', String(open));
}

notesToggle.addEventListener('click', () => toggleNotes());
document.getElementById('notesClose').addEventListener('click', () => toggleNotes(false));

async function toggleFullscreen() {
  if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
  else await document.exitFullscreen?.();
}

document.getElementById('fullscreenButton').addEventListener('click', toggleFullscreen);

const demoDialog = document.getElementById('demoDialog');
const demoFrame = document.getElementById('demoFrame');
const demoPlaceholder = document.getElementById('demoPlaceholder');
const demoTitle = document.getElementById('demoTitle');
const demoStage = document.getElementById('demoStage');
const demoViewport = document.getElementById('demoViewport');
const demoViewportToggle = document.getElementById('demoViewportToggle');
const demoViewportLabel = document.getElementById('demoViewportLabel');
let presentationScrollPosition = 0;
let activeDemoProject = null;
const demoViewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 }
};

function lockPresentation() {
  presentationScrollPosition = window.scrollY;
  document.documentElement.classList.add('demo-open');
  document.body.classList.add('demo-open');
  document.body.style.top = `-${presentationScrollPosition}px`;
}

function unlockPresentation() {
  document.documentElement.classList.remove('demo-open');
  document.body.classList.remove('demo-open');
  document.body.style.removeProperty('top');
  window.scrollTo({ top: presentationScrollPosition, left: 0, behavior: 'instant' });
}

function updateDemoViewportSize() {
  const mode = demoDialog.classList.contains('is-mobile') ? 'mobile' : 'desktop';
  const viewport = activeDemoProject?.viewports?.[mode] || demoViewports[mode];
  const gutter = 28;
  const scale = Math.min(
    1,
    (demoStage.clientWidth - gutter) / viewport.width,
    (demoStage.clientHeight - gutter) / viewport.height
  );
  const safeScale = Math.max(scale, 0.1);

  demoViewport.style.width = `${Math.round(viewport.width * safeScale)}px`;
  demoViewport.style.height = `${Math.round(viewport.height * safeScale)}px`;
  demoFrame.style.width = `${viewport.width}px`;
  demoFrame.style.height = `${viewport.height}px`;
  demoFrame.style.transform = `scale(${safeScale})`;
  demoFrame.style.display = demoFrame.hasAttribute('src') ? 'block' : 'none';
}

function setDemoViewport(mode) {
  const isMobile = mode === 'mobile';
  demoDialog.classList.toggle('is-mobile', isMobile);
  demoViewportToggle.setAttribute('aria-pressed', String(isMobile));
  demoViewportToggle.setAttribute('aria-label', `Switch app preview to ${isMobile ? 'desktop' : 'mobile'} view`);
  demoViewportLabel.textContent = isMobile ? 'Desktop view' : 'Mobile view';
  demoViewportToggle.querySelector('.viewport-toggle-icon').textContent = isMobile ? '▭' : '▯';
  requestAnimationFrame(updateDemoViewportSize);
}

document.querySelectorAll('.open-demo').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.demo];
    activeDemoProject = project;
    demoTitle.textContent = project.title;
    setDemoViewport('desktop');
    if (project.url) {
      demoFrame.src = project.url;
      demoFrame.style.display = 'block';
      demoPlaceholder.style.display = 'none';
    } else {
      demoFrame.removeAttribute('src');
      demoFrame.style.display = 'none';
      demoPlaceholder.style.display = 'grid';
    }
    lockPresentation();
    demoDialog.showModal();
  });
});

function closeDemo() {
  demoDialog.close();
}

document.getElementById('demoClose').addEventListener('click', closeDemo);
demoViewportToggle.addEventListener('click', () => {
  setDemoViewport(demoDialog.classList.contains('is-mobile') ? 'desktop' : 'mobile');
});
new ResizeObserver(updateDemoViewportSize).observe(demoStage);
demoDialog.addEventListener('close', () => {
  demoFrame.removeAttribute('src');
  activeDemoProject = null;
  unlockPresentation();
});
demoDialog.addEventListener('click', (event) => {
  if (event.target === demoDialog) closeDemo();
});

document.addEventListener('fullscreenchange', () => {
  document.getElementById('fullscreenButton').textContent = document.fullscreenElement ? '↙' : '↗';
});
