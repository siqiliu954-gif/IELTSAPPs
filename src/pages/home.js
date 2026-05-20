import { navigateTo } from '../router.js';
import { getTodayStats, getStreak, getTotalMastered } from '../store.js';
import { createProgressRing } from '../components/progress.js';
import { words } from '../data/ielts-words.js';

export function renderHome() {
  const el = document.getElementById('page-home');
  const stats = getTodayStats();
  const pct = words.length > 0 ? Math.round((stats.learned / words.length) * 100) : 0;

  el.innerHTML = `
    <div class="home__top">
      <p class="home__greeting">Hi, 今天继续加油 👋</p>
      <p class="home__date">连续打卡 <strong>${getStreak()}</strong> 天 · 已掌握 <strong>${getTotalMastered()}</strong> 词</p>
      ${createProgressRing(pct, '今日进度')}
    </div>
    <div class="home__cards">
      <button class="home__card" data-nav="flashcard">
        <div class="home__card-icon home__card-icon--flash">🃏</div>
        <div>
          <div class="home__card-title">闪卡模式</div>
          <div class="home__card-desc">翻卡记忆 · 自动朗读</div>
        </div>
      </button>
      <button class="home__card" data-nav="quiz">
        <div class="home__card-icon home__card-icon--quiz">🎯</div>
        <div>
          <div class="home__card-title">选择题模式</div>
          <div class="home__card-desc">四选一 · 限时作答</div>
        </div>
      </button>
      <button class="home__card" data-nav="spelling">
        <div class="home__card-icon home__card-icon--spell">✏️</div>
        <div>
          <div class="home__card-title">拼写模式</div>
          <div class="home__card-desc">看中文写英文 · 提示辅助</div>
        </div>
      </button>
    </div>
    <div class="home__footer">
      <button class="home__stats-btn" data-nav="stats">📊 学习统计</button>
    </div>
  `;

  el.querySelectorAll('[data-nav]').forEach(btn =>
    btn.addEventListener('click', () => navigateTo(btn.dataset.nav))
  );
}
