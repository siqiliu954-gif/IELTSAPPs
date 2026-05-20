const STORAGE_KEY = 'ielts-vocab-state';

let state;

const DEFAULT_STATE = {
  words: {},
  progress: {
    flashcard: { index: 0 },
    quiz: { index: 0 },
    spelling: { index: 0 }
  },
  stats: {
    days: {},
    streak: 0,
    lastStudyDate: null
  }
};

export function initStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    state = raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_STATE));
  } catch {
    state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  }
}

export function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getState() {
  return state;
}

export function getWordState(word) {
  if (!state.words[word]) {
    state.words[word] = { mastery: 0, reviewAt: null, mistakes: 0 };
  }
  return state.words[word];
}

export function updateWordState(word, updates) {
  const ws = getWordState(word);
  Object.assign(ws, updates);
  saveState();
}

export function getProgress(mode) {
  return state.progress[mode];
}

export function setProgress(mode, index) {
  state.progress[mode].index = index;
  saveState();
}

export function recordStudy(word, correct) {
  const today = new Date().toISOString().slice(0, 10);
  if (!state.stats.days[today]) {
    state.stats.days[today] = { learned: 0, correct: 0 };
  }
  state.stats.days[today].learned++;
  if (correct) state.stats.days[today].correct++;

  if (state.stats.lastStudyDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (state.stats.lastStudyDate === yesterday) {
      state.stats.streak++;
    } else if (state.stats.lastStudyDate !== today) {
      state.stats.streak = 1;
    }
    state.stats.lastStudyDate = today;
  }
  saveState();
}

export function getTodayStats() {
  const today = new Date().toISOString().slice(0, 10);
  return state.stats.days[today] || { learned: 0, correct: 0 };
}

export function getStreak() {
  return state.stats.streak;
}

export function getTotalMastered() {
  return Object.values(state.words).filter(w => w.mastery >= 2).length;
}

export function resetState() {
  state = JSON.parse(JSON.stringify(DEFAULT_STATE));
  saveState();
}
