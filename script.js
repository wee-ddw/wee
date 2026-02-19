const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Theme toggle: supports light and dark themes with persistence
const themeToggle = document.getElementById("theme-toggle");

function getStoredTheme() {
  return localStorage.getItem('theme');
}

function storeTheme(theme) {
  localStorage.setItem('theme', theme);
}

function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  updateToggleIcon(theme);
}

function updateToggleIcon(theme) {
  if (!themeToggle) return;
  themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
}

function detectPreferredTheme() {
  const stored = getStoredTheme();
  if (stored) return stored;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

(function initTheme() {
  const theme = detectPreferredTheme();
  applyTheme(theme);
})();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
    storeTheme(next);
  });
}
