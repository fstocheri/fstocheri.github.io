<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import ThemeToggle from './ThemeToggle.vue';

const isOpen = ref(false);

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

function closeMenu() {
  isOpen.value = false;
}
</script>

<template>
  <header class="nav">
    <div class="container nav__inner">
      <RouterLink to="/" class="nav__brand" @click="closeMenu">Forrest Tocheri</RouterLink>

      <nav class="nav__links" :class="{ 'nav__links--open': isOpen }">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav__link"
          @click="closeMenu"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="nav__actions">
        <ThemeToggle />
        <button
          class="nav__burger"
          type="button"
          aria-label="Toggle menu"
          @click="isOpen = !isOpen"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--color-bg) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: var(--space-3);
}

.nav__brand {
  font-weight: 700;
  text-decoration: none;
  font-size: var(--text-lg);
}

.nav__links {
  display: flex;
  gap: var(--space-6);
}

.nav__link {
  text-decoration: none;
  color: var(--color-text-muted);
  font-weight: 500;
  font-size: var(--text-sm);
  transition: color var(--transition-base);
}

.nav__link:hover,
.nav__link.router-link-exact-active {
  color: var(--color-accent);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.nav__burger {
  display: none;
  flex-direction: column;
  gap: 4px;
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.nav__burger span {
  width: 18px;
  height: 2px;
  background: var(--color-text);
}

@media (max-width: 720px) {
  .nav__links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-base);
  }

  .nav__links--open {
    max-height: 300px;
  }

  .nav__link {
    padding: var(--space-4) var(--space-5);
    border-top: 1px solid var(--color-border);
  }

  .nav__burger {
    display: flex;
  }
}
</style>
