import { initRouter } from './router.js';
import { initStore } from './store.js';
import { renderHome } from './pages/home.js';
import { renderFlashcard } from './pages/flashcard.js';
import { renderQuiz } from './pages/quiz.js';
import { renderSpelling } from './pages/spelling.js';
import { renderStats } from './pages/stats.js';

initStore();
initRouter({
  home: renderHome,
  flashcard: renderFlashcard,
  quiz: renderQuiz,
  spelling: renderSpelling,
  stats: renderStats
});
