import { ref, watchEffect } from 'vue';

const STORAGE_KEY = 'fstocheri-theme';

const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
const stored = localStorage.getItem(STORAGE_KEY);

const theme = ref(stored ?? (prefersDark ? 'dark' : 'light'));

watchEffect(() => {
  document.documentElement.setAttribute('data-theme', theme.value);
  localStorage.setItem(STORAGE_KEY, theme.value);
});

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  }

  return { theme, toggleTheme };
}
