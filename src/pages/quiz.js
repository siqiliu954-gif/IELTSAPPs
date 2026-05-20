import { navigateTo } from '../router.js';
import { getProgress, setProgress, recordStudy } from '../store.js';
import { createProgressBar } from '../components/progress.js';
import { speak } from '../utils/speech.js';
import { words } from '../data/ielts-words.js';

let currentIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 15;
let answered = false;
let wrongList = [];

export function renderQuiz() {
  const el = document.getElementById('page-quiz');
  currentIndex = getProgress('quiz').index;
  score = 0;
  wrongList = [];
  answered = false;
  el.innerHTML = `
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">选择题模式</span>
    </div>
    <div id="quiz-word-area"></div>
    <div id="quiz-progress"></div>
    <div class="quiz__options" id="quiz-options"></div>
    <div class="quiz__feedback" id="quiz-feedback"></div>
  `;
  el.querySelector('[data-nav]').addEventListener('click', () => {
    clearInterval(timer);
    navigateTo('home');
  });
  renderQuestion(el);
  updateProgress();
}

function renderQuestion(el) {
  answered = false;
  timeLeft = 15;
  const w = words[currentIndex];

  const others = words.filter(x => x.word !== w.word);
  const distractors = shuffle(others).slice(0, 3);
  const options = shuffle([w, ...distractors]);

  el.querySelector('#quiz-word-area').innerHTML = `
    <div class="quiz__word">${w.word}</div>
    <button class="flashcard__speaker" id="quiz-speaker">🔊</button>
    <div class="quiz__timer" id="quiz-timer">⏱ ${timeLeft}s</div>
  `;

  el.querySelector('#quiz-options').innerHTML = options.map(o => `
    <button class="quiz__option" data-meaning="${o.meaning.replace(/"/g, '&quot;')}">${o.meaning}</button>
  `).join('');

  el.querySelector('#quiz-feedback').innerHTML = '';

  el.querySelector('#quiz-speaker').addEventListener('click', () => speak(w.word));

  el.querySelectorAll('.quiz__option').forEach(btn => {
    btn.addEventListener('click', () => selectOption(btn, w, el));
  });

  const timerEl = el.querySelector('#quiz-timer');
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏱ ${timeLeft}s`;
    if (timeLeft <= 5) timerEl.classList.add('quiz__timer--warn');
    if (timeLeft <= 0) {
      clearInterval(timer);
      handleAnswer(false, w, el);
    }
  }, 1000);

  speak(w.word);
}

function selectOption(btn, correctWord, el) {
  if (answered) return;
  answered = true;
  const chosen = btn.dataset.meaning;
  const correct = chosen === correctWord.meaning;

  el.querySelectorAll('.quiz__option').forEach(b => {
    b.classList.add('quiz__option--disabled');
    if (b.dataset.meaning === correctWord.meaning) b.classList.add('quiz__option--correct');
    else if (b === btn) b.classList.add('quiz__option--wrong');
  });

  handleAnswer(correct, correctWord, el);
}

function handleAnswer(correct, w, el) {
  clearInterval(timer);

  if (correct) {
    score++;
    el.querySelector('#quiz-feedback').innerHTML = `
      <span style="color:#4CAF50">✓ 正确！</span>
      <div style="margin-top:4px">${w.example}</div>
      <div style="color:#9A9A90;font-size:13px">${w.example_cn}</div>
    `;
  } else {
    wrongList.push(w);
    el.querySelector('#quiz-feedback').innerHTML = `
      <span style="color:#E53935">✗ 正确答案：${w.meaning}</span>
      <div style="margin-top:4px">${w.example}</div>
      <div style="color:#9A9A90;font-size:13px">${w.example_cn}</div>
    `;
  }

  recordStudy(w.word, correct);

  setTimeout(() => advance(el), 2000);
}

function advance(el) {
  currentIndex++;
  if (currentIndex >= words.length) {
    showResult(el);
    return;
  }
  setProgress('quiz', currentIndex);
  renderQuestion(el);
  updateProgress();
}

function showResult(el) {
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
      </div>
      ${wrongList.length > 0 ? `
        <div class="result__wrong-list">
          <p style="font-weight:600;margin-bottom:4px">错题：</p>
          <ul>${wrongList.map(w => `<li><b>${w.word}</b> — ${w.meaning}</li>`).join('')}</ul>
        </div>
      ` : ''}
      <button class="result__btn result__btn--retry" id="btn-retry-quiz">再做一轮</button>
      <button class="result__btn result__btn--home" id="btn-home-quiz">返回首页</button>
    </div>
  `;
  el.querySelector('#btn-retry-quiz').addEventListener('click', () => {
    setProgress('quiz', 0);
    renderQuiz();
  });
  el.querySelector('#btn-home-quiz').addEventListener('click', () => navigateTo('home'));
  el.querySelector('[data-nav]').addEventListener('click', () => navigateTo('home'));
}

function updateProgress() {
  document.getElementById('quiz-progress').innerHTML =
    createProgressBar(currentIndex, words.length);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
