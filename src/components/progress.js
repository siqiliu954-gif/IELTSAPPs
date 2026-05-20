export function createProgressBar(current, total) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  return `
    <div class="progress-bar">
      <div class="progress-bar__fill" style="width:${pct}%"></div>
      <span class="progress-bar__text">${current} / ${total}</span>
    </div>
  `;
}

export function createProgressRing(percent, label) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return `
    <svg class="progress-ring" viewBox="0 0 120 120">
      <circle class="progress-ring__bg" cx="60" cy="60" r="${r}"
        fill="none" stroke="#E8E8E0" stroke-width="8"/>
      <circle class="progress-ring__fg" cx="60" cy="60" r="${r}"
        fill="none" stroke="#4CAF50" stroke-width="8" stroke-linecap="round"
        stroke-dasharray="${circ}" stroke-dashoffset="${offset}"
        transform="rotate(-90 60 60)" style="transition: stroke-dashoffset 0.6s ease"/>
      <text class="progress-ring__pct" x="60" y="56" text-anchor="middle"
        fill="#4A4A4A" font-size="22" font-weight="700">${Math.round(percent)}%</text>
      <text class="progress-ring__label" x="60" y="76" text-anchor="middle"
        fill="#8A8A80" font-size="12">${label}</text>
    </svg>
  `;
}
