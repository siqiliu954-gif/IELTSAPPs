import { navigateTo } from '../router.js';
import { getProgress, setProgress, recordStudy, updateWordState, getWordState } from '../store.js';
import { createProgressBar } from '../components/progress.js';
import { speak } from '../utils/speech.js';
import { words } from '../data/ielts-words.js';

let currentIndex = 0;
let shown = false;

export function renderFlashcard() {
  const el = document.getElementById('page-flashcard');
  currentIndex = getProgress('flashcard').index;
  shown = false;
  el.innerHTML = `
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">闪卡模式</span>
    </div>
    <div class="flashcard__container">
      <div class="flashcard__card" id="flashcard-card">
        <div class="flashcard__face flashcard__face--front" id="flashcard-front"></div>
        <div class="flashcard__face flashcard__face--back" id="flashcard-back"></div>
      </div>
    </div>
    <div id="flashcard-progress"></div>
    <div class="flashcard__actions">
      <button class="flashcard__btn flashcard__btn--forgot" id="btn-forgot">没记住</button>
      <button class="flashcard__btn flashcard__btn--knew" id="btn-knew">记住了</button>
    </div>
  `;

  renderCard(el);
  updateProgress();

  el.querySelector('#flashcard-card').addEventListener('click', flipCard);
  el.querySelector('#btn-forgot').addEventListener('click', () => answer(false));
  el.querySelector('#btn-knew').addEventListener('click', () => answer(true));
  el.querySelector('[data-nav]').addEventListener('click', () => navigateTo('home'));
}

function renderCard(el) {
  const w = words[currentIndex];
  const front = el.querySelector('#flashcard-front');
  const back = el.querySelector('#flashcard-back');

  front.innerHTML = `
    <div class="flashcard__word">${w.word}</div>
    <div class="flashcard__phonetic">${w.phonetic}</div>
    <button class="flashcard__speaker" id="speaker-btn" title="朗读">🔊</button>
  `;

  back.innerHTML = `
    <div class="flashcard__meaning">${w.meaning}</div>
    <div class="flashcard__example">${w.example}</div>
    <div class="flashcard__example-cn">${w.example_cn}</div>
  `;

  el.querySelector('#speaker-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    speak(w.word);
  });

  speak(w.word);
}

function flipCard() {
  shown = !shown;
  const card = document.querySelector('#flashcard-card');
  card.classList.toggle('flashcard__card--flipped', shown);
}

function answer(knew) {
  const w = words[currentIndex];
  recordStudy(w.word, knew);
  updateWordState(w.word, {
    mastery: knew ? Math.min(2, getWordState(w.word).mastery + 1) : 0
  });

  currentIndex++;
  if (currentIndex >= words.length) {
    currentIndex = 0;
  }
  setProgress('flashcard', currentIndex);
  shown = false;

  const el = document.getElementById('page-flashcard');
  const card = el.querySelector('#flashcard-card');
  card.classList.remove('flashcard__card--flipped');
  renderCard(el);
  updateProgress();
}

function updateProgress() {
  document.getElementById('flashcard-progress').innerHTML =
    createProgressBar(currentIndex, words.length);
}
