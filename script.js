const projects = {
  duel: { title: 'Duel Engine', url: 'https://duel-engine.vercel.app' },
  fresh: { title: 'FreshKeeper', url: 'https://fresh-keeper-orcin.vercel.app' },
  flow: { title: 'FlowWays', url: 'https://flowways.vercel.app' },
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
  dotButtons.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
}

function goToSlide(index) {
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

document.getElementById('previousSlide').addEventListener('click', () => goToSlide(activeSlide - 1));
document.getElementById('nextSlide').addEventListener('click', () => goToSlide(activeSlide + 1));
document.querySelectorAll('[data-goto]').forEach((button) => button.addEventListener('click', () => {
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

document.querySelectorAll('.open-demo').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.demo];
    demoTitle.textContent = project.title;
    if (project.url) {
      demoFrame.src = project.url;
      demoFrame.style.display = 'block';
      demoPlaceholder.style.display = 'none';
    } else {
      demoFrame.removeAttribute('src');
      demoFrame.style.display = 'none';
      demoPlaceholder.style.display = 'grid';
    }
    demoDialog.showModal();
  });
});

function closeDemo() {
  demoDialog.close();
  demoFrame.removeAttribute('src');
}

document.getElementById('demoClose').addEventListener('click', closeDemo);
demoDialog.addEventListener('click', (event) => {
  if (event.target === demoDialog) closeDemo();
});

document.addEventListener('fullscreenchange', () => {
  document.getElementById('fullscreenButton').textContent = document.fullscreenElement ? '↙' : '↗';
});
