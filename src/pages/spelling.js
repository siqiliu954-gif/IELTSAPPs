import { navigateTo } from '../router.js';
import { getProgress, setProgress, recordStudy } from '../store.js';
import { createProgressBar } from '../components/progress.js';
import { speak } from '../utils/speech.js';
import { words } from '../data/ielts-words.js';

let currentIndex = 0;
let score = 0;
let hintsUsed = 0;
let maxHints = 3;
let wrongList = [];

export function renderSpelling() {
  const el = document.getElementById('page-spelling');
  currentIndex = getProgress('spelling').index;
  score = 0;
  wrongList = [];
  hintsUsed = 0;
  el.innerHTML = `
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">拼写模式</span>
    </div>
    <div id="spelling-prompt"></div>
    <div id="spelling-progress"></div>
    <div class="spelling__input-area">
      <input class="spelling__input" id="spelling-input" type="text" autocomplete="off" autocapitalize="off" placeholder="输入英文单词...">
      <div class="spelling__hint" id="spelling-hint"></div>
      <button class="spelling__hint-btn" id="spelling-hint-btn">💡 提示 (${maxHints})</button>
    </div>
    <div class="spelling__feedback" id="spelling-feedback"></div>
    <button class="flashcard__speaker" id="spelling-speaker" style="align-self:center">🔊</button>
  `;

  el.querySelector('[data-nav]').addEventListener('click', () => navigateTo('home'));
  el.querySelector('#spelling-hint-btn').addEventListener('click', showHint);
  el.querySelector('#spelling-input').addEventListener('keydown', onInputEnter);
  el.querySelector('#spelling-speaker').addEventListener('click', () => {
    const w = words[currentIndex];
    speak(w.word);
  });

  renderPrompt(el);
  updateProgress(el);
}

function renderPrompt(el) {
  const w = words[currentIndex];
  el.querySelector('#spelling-prompt').innerHTML = `
    <div class="spelling__meaning">${w.meaning}</div>
    <div class="spelling__example">"${w.example_cn}"</div>
  `;
  el.querySelector('#spelling-hint').textContent = '';
  el.querySelector('#spelling-input').value = '';
  el.querySelector('#spelling-input').className = 'spelling__input';
  el.querySelector('#spelling-input').focus();
  el.querySelector('#spelling-feedback').innerHTML = '';
  el.querySelector('#spelling-feedback').className = 'spelling__feedback';
  el.querySelector('#spelling-hint-btn').textContent = `💡 提示 (${maxHints - hintsUsed})`;
  el.querySelector('#spelling-hint-btn').disabled = hintsUsed >= maxHints;
}

function showHint() {
  if (hintsUsed >= maxHints) return;
  const w = words[currentIndex];
  hintsUsed++;
  const hint = w.word[0] + '_'.repeat(w.word.length - 1);
  document.querySelector('#spelling-hint').textContent = hint;
  document.querySelector('#spelling-hint-btn').textContent = `💡 提示 (${maxHints - hintsUsed})`;
  if (hintsUsed >= maxHints) {
    document.querySelector('#spelling-hint-btn').disabled = true;
  }
}

function onInputEnter(e) {
  if (e.key === 'Enter') {
    checkAnswer();
  }
}

function checkAnswer() {
  const input = document.querySelector('#spelling-input');
  const userAnswer = input.value.trim().toLowerCase();
  const w = words[currentIndex];
  const correct = userAnswer === w.word.toLowerCase();

  const fb = document.querySelector('#spelling-feedback');

  if (correct) {
    score++;
    input.classList.add('spelling__input--correct');
    fb.innerHTML = '✓ 正确！';
    fb.className = 'spelling__feedback spelling__feedback--correct';
  } else {
    wrongList.push({ ...w, userAnswer });
    input.classList.add('spelling__input--wrong');
    fb.innerHTML = `✗ 正确答案：<b>${w.word}</b> — ${w.meaning}`;
    fb.className = 'spelling__feedback spelling__feedback--wrong';
    input.value = '';
    input.placeholder = w.word;
  }

  recordStudy(w.word, correct);
  speak(w.word);

  setTimeout(() => advance(), 1500);
}

function advance() {
  currentIndex++;
  if (currentIndex >= words.length) {
    showResult();
    return;
  }
  setProgress('spelling', currentIndex);
  const el = document.getElementById('page-spelling');
  renderPrompt(el);
  updateProgress(el);
}

function showResult() {
  const el = document.getElementById('page-spelling');
  const pct = Math.round((score / words.length) * 100);
  const scoreClass = pct < 60 ? 'result__score--low' : '';
  el.innerHTML = `
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">本轮成绩</span>
    </div>
    <div class="result">
      <div class="result__score ${scoreClass}">${pct}%</div>
      <div class="result__label">正确率</div>
      <div class="result__stats">
        <div class="result__stat">
          <div class="result__stat-val">${score}</div>
          <div class="result__stat-lbl">正确</div>
        </div>
        <div class="result__stat">
          <div class="result__stat-val">${words.length - score}</div>
          <div class="result__stat-lbl">错误</div>
        </div>
        <div class="result__stat">
          <div class="result__stat-val">${hintsUsed}</div>
          <div class="result__stat-lbl">使用提示</div>
        </div>
      </div>
      ${wrongList.length > 0 ? `
        <div class="result__wrong-list">
          <p style="font-weight:600;margin-bottom:4px">错词：</p>
          <ul>${wrongList.map(w => `<li><b>${w.word}</b> — ${w.meaning}</li>`).join('')}</ul>
        </div>
      ` : ''}
      <button class="result__btn result__btn--retry" id="btn-retry-spell">再做一轮</button>
      <button class="result__btn result__btn--home" id="btn-home-spell">返回首页</button>
    </div>
  `;
  el.querySelector('#btn-retry-spell').addEventListener('click', () => {
    setProgress('spelling', 0);
    renderSpelling();
  });
  el.querySelector('#btn-home-spell').addEventListener('click', () => navigateTo('home'));
  el.querySelector('[data-nav]').addEventListener('click', () => navigateTo('home'));
}

function updateProgress(el) {
  el.querySelector('#spelling-progress').innerHTML =
    createProgressBar(currentIndex, words.length);
}
