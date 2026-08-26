<script setup>
import { profile } from '../data/resume';
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <p>© {{ new Date().getFullYear() }} {{ profile.name }}</p>
      <div class="footer__links">
        <a href="https://github.com/ftocheri" target="_blank" rel="noreferrer">GitHub</a>
        <a :href="`mailto:${profile.email}`">Email</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding-block: var(--space-6);
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  align-items: center;
  justify-content: space-between;
}

.footer__links {
  display: flex;
  gap: var(--space-5);
}

.footer__links a {
  text-decoration: none;
  color: var(--color-text-muted);
  transition: color var(--transition-base);
}

.footer__links a:hover {
  color: var(--color-accent);
}
</style>
