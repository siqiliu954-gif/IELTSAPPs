const pages = ['home', 'flashcard', 'quiz', 'spelling', 'stats'];
let currentPage = 'home';
let renderers = {};

export function initRouter(rendererMap) {
  renderers = rendererMap;
  window.addEventListener('hashchange', onRoute);
  const hash = window.location.hash.slice(1) || 'home';
  showPage(hash);
}

function onRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  showPage(hash);
}

function showPage(name) {
  pages.forEach(p => {
    const el = document.getElementById(`page-${p}`);
    if (el) el.style.display = p === name ? 'block' : 'none';
  });
  currentPage = name;
  if (renderers[name]) {
    renderers[name]();
  }
}

export function navigateTo(name) {
  window.location.hash = `#${name}`;
}

export function getCurrentPage() {
  return currentPage;
}
