import { navigateTo } from '../router.js';
import { getState, getTotalMastered } from '../store.js';
import { words } from '../data/ielts-words.js';

export function renderStats() {
  const el = document.getElementById('page-stats');
  const state = getState();
  const stats = state.stats;
  const mastered = getTotalMastered();

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toISOString().slice(0, 10);
    days.push({
      label: `${d.getMonth() + 1}/${d.getDate()}`,
      value: (stats.days[key] || {}).learned || 0
    });
  }
  const maxVal = Math.max(...days.map(d => d.value), 1);

  el.innerHTML = `
    <div class="page-header">
      <button class="page-header__back" data-nav="home">←</button>
      <span class="page-header__title">学习统计</span>
    </div>
    <div class="stats__grid">
      <div class="stats__card">
        <div class="stats__card-val">${Object.keys(stats.days).length}</div>
        <div class="stats__card-lbl">学习天数</div>
      </div>
      <div class="stats__card">
        <div class="stats__card-val">${stats.streak}</div>
        <div class="stats__card-lbl">连续打卡</div>
      </div>
      <div class="stats__card">
        <div class="stats__card-val">${mastered}</div>
        <div class="stats__card-lbl">已掌握</div>
      </div>
      <div class="stats__card">
        <div class="stats__card-val">${words.length}</div>
        <div class="stats__card-lbl">总词汇量</div>
      </div>
    </div>
    <div class="stats__chart">
      <div class="stats__chart-title">近 7 天学习量</div>
      <div class="stats__bars">
        ${days.map(d => `
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:100%">
            <span style="font-size:11px;color:#9A9A90;margin-bottom:4px">${d.value}</span>
            <div class="stats__bar" style="height:${(d.value / maxVal) * 100}%"></div>
            <span style="font-size:10px;color:#B0B0A8;margin-top:4px">${d.label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  el.querySelector('[data-nav]').addEventListener('click', () => navigateTo('home'));
}
