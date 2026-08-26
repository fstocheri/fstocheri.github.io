<script setup>
import { education, experience, skillBars, skillTags } from '../data/resume';
import RevealSection from '../components/RevealSection.vue';
</script>

<template>
 <div>
  <section class="section section--intro">
    <div class="container">
      <p class="kicker">About</p>
      <h1>Experience &amp; Background</h1>
    </div>
  </section>

  <RevealSection class="section section--tight">
    <div class="container">
      <div class="section-head">
        <span class="section-head__index">§ 01</span>
        <h2>Experience</h2>
      </div>
      <ol class="timeline">
        <li v-for="(job, index) in experience" :key="job.company" class="timeline__item">
          <span class="timeline__number">{{ String(index + 1).padStart(2, '0') }}</span>
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
      <div class="section-head">
        <span class="section-head__index">§ 02</span>
        <h2>Education</h2>
      </div>
      <div class="edu-list">
        <div v-for="item in education" :key="item.degree" class="edu-item">
          <h3>{{ item.degree }}</h3>
          <p class="edu-item__school">{{ item.school }} — {{ item.note }}</p>
        </div>
      </div>
    </div>
  </RevealSection>

  <RevealSection class="section section--tight">
    <div class="container">
      <div class="section-head">
        <span class="section-head__index">§ 03</span>
        <h2>Skills</h2>
      </div>
      <div class="bars">
        <div v-for="skill in skillBars" :key="skill.name" class="bar">
          <span class="bar__name">{{ skill.name }}</span>
          <div class="bar__track">
            <div class="bar__fill" :style="{ width: `${(skill.years / 10) * 100}%` }" />
          </div>
          <span class="bar__years">{{ skill.years }}+ yrs</span>
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
.section--intro {
  padding-bottom: var(--space-6);
}

.section--tight {
  padding-block: var(--space-7);
}

.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.timeline__item {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: var(--space-5);
  padding-block: var(--space-6);
  border-top: 1px solid var(--color-border);
}

.timeline__item:last-child {
  border-bottom: 1px solid var(--color-border);
}

.timeline__number {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-accent);
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
  font-family: var(--font-mono);
  font-size: var(--text-sm);
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

.edu-list {
  display: flex;
  flex-direction: column;
}

.edu-item {
  padding-block: var(--space-4);
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
}

.edu-item:last-child {
  border-bottom: 1px solid var(--color-border);
}

.edu-item h3 {
  font-size: var(--text-base);
  font-weight: 500;
}

.edu-item__school {
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
}

.bars {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 640px;
  margin-bottom: var(--space-7);
}

.bar {
  display: grid;
  grid-template-columns: 110px 1fr 60px;
  align-items: center;
  gap: var(--space-4);
}

.bar__name {
  font-size: var(--text-sm);
  font-weight: 600;
}

.bar__track {
  height: 2px;
  background: var(--color-border);
}

.bar__fill {
  height: 100%;
  background: var(--color-accent);
  transition: width 900ms ease;
}

.bar__years {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: right;
}

.tag-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-6);
}

.tag-group h3 {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
  font-weight: 500;
}

.tag-group__items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}
</style>
