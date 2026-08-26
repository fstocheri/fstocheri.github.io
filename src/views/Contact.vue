<script setup>
import { profile } from '../data/resume';
import RevealSection from '../components/RevealSection.vue';
</script>

<template>
 <div>
  <section class="section">
    <div class="container">
      <p class="eyebrow">Contact</p>
      <h1>Let's talk</h1>
      <p class="lede">
        Open to new opportunities — the fastest way to reach me is email.
      </p>
    </div>
  </section>

  <RevealSection class="section section--tight">
    <div class="container">
      <div class="cards">
        <a :href="`mailto:${profile.email}`" class="contact-card">
          <span class="contact-card__icon">✉️</span>
          <div>
            <h3>Email</h3>
            <p>{{ profile.email }}</p>
          </div>
        </a>

        <a href="https://github.com/ftocheri" target="_blank" rel="noreferrer" class="contact-card">
          <span class="contact-card__icon">🐙</span>
          <div>
            <h3>GitHub</h3>
            <p>github.com/ftocheri</p>
          </div>
        </a>

        <a href="/resume-forrest-tocheri.pdf" download class="contact-card">
          <span class="contact-card__icon">📄</span>
          <div>
            <h3>Resume</h3>
            <p>Download PDF</p>
          </div>
        </a>
      </div>
    </div>
  </RevealSection>
 </div>
</template>

<style scoped>
.lede {
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  margin-top: var(--space-3);
}

.section--tight {
  padding-top: 0;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-5);
}

.contact-card {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-5);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  text-decoration: none;
  color: inherit;
  transition: transform var(--transition-base), box-shadow var(--transition-base),
    border-color var(--transition-base);
}

.contact-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-accent);
}

.contact-card__icon {
  font-size: var(--text-2xl);
}

.contact-card h3 {
  font-size: var(--text-base);
  margin-bottom: var(--space-1);
}

.contact-card p {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}
</style>
