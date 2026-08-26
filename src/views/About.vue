<script setup>
import { education, experience, skillBars, skillTags } from '../data/resume';
import RevealSection from '../components/RevealSection.vue';
</script>

<template>
 <div>
  <section class="section">
    <div class="container">
      <p class="eyebrow">About</p>
      <h1>Experience &amp; Background</h1>
    </div>
  </section>

  <RevealSection class="section section--tight">
    <div class="container">
      <h2>Experience</h2>
      <ol class="timeline">
        <li v-for="job in experience" :key="job.company" class="timeline__item">
          <div class="timeline__marker" />
          <div class="timeline__content">
            <div class="timeline__heading">
              <h3>{{ job.role }}</h3>
              <span class="timeline__period">{{ job.period }}</span>
            </div>
            <p class="timeline__company">{{ job.company }}</p>
            <ul>
              <li v-for="point in job.highlights" :key="point">{{ point }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </RevealSection>

  <RevealSection class="section section--tight">
    <div class="container">
      <h2>Education</h2>
      <div class="edu-grid">
        <div v-for="item in education" :key="item.degree" class="edu-card">
          <h3>{{ item.degree }}</h3>
          <p class="edu-card__school">{{ item.school }}</p>
          <span class="tag">{{ item.note }}</span>
        </div>
      </div>
    </div>
  </RevealSection>

  <RevealSection class="section section--tight">
    <div class="container">
      <h2>Skills</h2>
      <div class="bars">
        <div v-for="skill in skillBars" :key="skill.name" class="bar">
          <div class="bar__label">
            <span>{{ skill.name }}</span>
            <span>{{ skill.years }}+ yrs</span>
          </div>
          <div class="bar__track">
            <div class="bar__fill" :style="{ width: `${(skill.years / 10) * 100}%` }" />
          </div>
        </div>
      </div>

      <div class="tag-groups">
        <div v-for="(items, group) in skillTags" :key="group" class="tag-group">
          <h3>{{ group }}</h3>
          <div class="tag-group__items">
            <span v-for="item in items" :key="item" class="tag">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </RevealSection>
 </div>
</template>

<style scoped>
.section--tight {
  padding-block: var(--space-7);
}

h2 {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-6);
}

.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-7);
  position: relative;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 6px;
  bottom: 6px;
  width: 2px;
  background: var(--color-border);
}

.timeline__item {
  position: relative;
  padding-left: var(--space-6);
}

.timeline__marker {
  position: absolute;
  left: 0;
  top: 6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-accent);
  box-shadow: 0 0 0 4px var(--color-accent-soft);
}

.timeline__heading {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-3);
}

.timeline__heading h3 {
  font-size: var(--text-lg);
}

.timeline__period {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  font-family: var(--font-mono);
}

.timeline__company {
  color: var(--color-accent);
  font-weight: 600;
  margin-block: var(--space-1) var(--space-3);
}

.timeline__content ul {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--color-text-muted);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.edu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-5);
}

.edu-card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  background: var(--color-surface);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.edu-card h3 {
  font-size: var(--text-base);
}

.edu-card__school {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
}

.bars {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  max-width: 640px;
  margin-bottom: var(--space-7);
}

.bar__label {
  display: flex;
  justify-content: space-between;
  font-size: var(--text-sm);
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.bar__track {
  height: 10px;
  border-radius: 999px;
  background: var(--color-bg-alt);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.bar__fill {
  height: 100%;
  background: var(--color-accent);
  border-radius: inherit;
  transition: width 900ms ease;
}

.tag-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-6);
}

.tag-group h3 {
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
}

.tag-group__items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
