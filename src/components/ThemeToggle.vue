<script setup>
import { useTheme } from '../composables/useTheme';

const { theme, toggleTheme } = useTheme();
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <span v-if="theme === 'dark'">☀️</span>
    <span v-else>🌙</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  cursor: pointer;
  font-size: 1.1rem;
  transition: border-color var(--transition-base), transform var(--transition-base);
}

.theme-toggle:hover {
  border-color: var(--color-accent);
  transform: translateY(-1px);
}
</style>
