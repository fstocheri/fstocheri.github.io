<script setup>
import { profile } from '../data/resume';
import RevealSection from '../components/RevealSection.vue';

const links = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
  { label: 'GitHub', value: 'github.com/ftocheri', href: 'https://github.com/ftocheri', external: true },
  { label: 'Résumé', value: 'Download PDF', href: '/resume-forrest-tocheri.pdf', download: true },
];
</script>

<template>
 <div>
  <section class="section">
    <div class="container">
      <p class="kicker">Contact</p>
      <h1>Let's talk</h1>
      <p class="lede">
        Open to new opportunities — the fastest way to reach me is email.
      </p>
    </div>
  </section>

  <RevealSection class="section section--tight">
    <div class="container">
      <div class="contact-list">
        <a
          v-for="(link, index) in links"
          :key="link.label"
          :href="link.href"
          :target="link.external ? '_blank' : undefined"
          :rel="link.external ? 'noreferrer' : undefined"
          :download="link.download ? '' : undefined"
          class="contact-row"
        >
          <span class="contact-row__index">{{ String(index + 1).padStart(2, '0') }}</span>
          <span class="contact-row__label">{{ link.label }}</span>
          <span class="contact-row__value">{{ link.value }} →</span>
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
  max-width: 560px;
}

.section--tight {
  padding-top: 0;
}

.contact-list {
  display: flex;
  flex-direction: column;
  border-top: 2px solid var(--color-text);
}

.contact-row {
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: baseline;
  gap: var(--space-4);
  padding-block: var(--space-5);
  border-bottom: 1px solid var(--color-border);
  text-decoration: none;
  color: inherit;
}

.contact-row__index {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.contact-row__label {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  transition: color var(--transition-base);
}

.contact-row:hover .contact-row__label {
  color: var(--color-accent);
}

.contact-row__value {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  text-align: right;
}

@media (max-width: 560px) {
  .contact-row {
    grid-template-columns: 32px 1fr;
  }

  .contact-row__value {
    grid-column: 2 / -1;
    text-align: left;
  }
}
</style>
