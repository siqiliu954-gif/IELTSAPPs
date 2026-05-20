import { navigateTo } from '../router.js';
import { speak } from '../utils/speech.js';
import { words } from '../data/ielts-words.js';

// Fixed-seed shuffle: mulberry32 PRNG
function seededRandom(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let shuffledWords = null;

function getShuffledWords() {
  if (shuffledWords) return shuffledWords;
  const rng = seededRandom(2026);
  const copy = [...words];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  shuffledWords = copy;
  return shuffledWords;
}

export function renderBrowse() {
  const el = document.getElementById('page-browse');
  const list = getShuffledWords();

  el.innerHTML = `
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">词汇浏览</span>
      <span class="browse__count">${list.length} 词</span>
    </div>
    <div class="browse__search">
      <input class="browse__search-input" id="browse-search" type="text" placeholder="搜索英文或中文..." autocomplete="off">
    </div>
    <div class="browse__list" id="browse-list"></div>
  `;

  el.querySelector('[data-nav]').addEventListener('click', () => navigateTo('home'));

  const searchInput = el.querySelector('#browse-search');
  const listEl = el.querySelector('#browse-list');

  function renderList(filter) {
    const f = filter.toLowerCase();
    const filtered = list.filter(w =>
      !f || w.word.toLowerCase().includes(f) || w.meaning.includes(filter)
    );
    listEl.innerHTML = filtered.map((w, i) => `
      <div class="browse__item" data-idx="${i}" data-word="${w.word}">
        <div class="browse__item-main">
          <span class="browse__item-word">${w.word}</span>
          <span class="browse__item-meaning">${w.meaning}</span>
        </div>
        <div class="browse__item-detail" id="detail-${i}" style="display:none">
          <div class="browse__detail-phonetic">${w.phonetic}</div>
          <div class="browse__detail-example">${w.example}</div>
          <div class="browse__detail-example-cn">${w.example_cn}</div>
          <button class="flashcard__speaker browse__detail-speaker" data-speak="${w.word}">🔊</button>
        </div>
      </div>
    `).join('');

    listEl.querySelectorAll('.browse__item-main').forEach(main => {
      main.addEventListener('click', () => {
        const item = main.parentElement;
        const detail = item.querySelector('.browse__item-detail');
        const isOpen = detail.style.display !== 'none';
        detail.style.display = isOpen ? 'none' : 'block';
      });
    });

    listEl.querySelectorAll('.browse__detail-speaker').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        speak(btn.dataset.speak);
      });
    });
  }

  renderList('');
  searchInput.addEventListener('input', () => renderList(searchInput.value));
}
