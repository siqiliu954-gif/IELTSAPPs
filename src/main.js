import { initRouter } from './router.js';
import { initStore } from './store.js';
import { renderHome } from './pages/home.js';

initStore();
initRouter();
renderHome();
