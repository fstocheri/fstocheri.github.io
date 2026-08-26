<script setup>
import { profile, skillBars } from '../data/resume';
import { projects } from '../data/projects';
import RevealSection from '../components/RevealSection.vue';
import ProjectCard from '../components/ProjectCard.vue';

const stack = ['PHP', 'Laravel', 'JavaScript', 'Vue.js', 'React', 'HTML/CSS', 'MySQL', 'C#'];
const featured = projects.slice(0, 2);
</script>

<template>
 <div>
  <section class="hero section">
    <div class="container hero__inner">
      <p class="kicker">Portfolio — 2026</p>
      <h1>{{ profile.name }}</h1>
      <p class="hero__title">{{ profile.title }}</p>
      <p class="hero__summary">{{ profile.summary }}</p>

      <div class="hero__actions">
        <RouterLink to="/projects" class="btn btn-primary">View Projects</RouterLink>
        <a class="hero__link" href="/resume-forrest-tocheri.pdf" download>Download Résumé ↓</a>
        <RouterLink to="/contact" class="hero__link">Contact →</RouterLink>
      </div>

      <p class="hero__stack">
        <span v-for="(item, i) in stack" :key="item">{{ item }}<template v-if="i < stack.length - 1"> / </template></span>
      </p>
    </div>
  </section>

  <RevealSection class="section">
    <div class="container">
      <div class="section-head">
        <span class="section-head__index">§ 01 — By the numbers</span>
        <h2>Years, not percentages</h2>
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
    </div>
  </RevealSection>

  <RevealSection class="section">
    <div class="container">
      <div class="section-head section-head--split">
        <div>
          <span class="section-head__index">§ 02 — Selected work</span>
          <h2>Featured Projects</h2>
        </div>
        <RouterLink to="/projects" class="hero__link">See all →</RouterLink>
      </div>
      <div class="grid">
        <ProjectCard v-for="project in featured" :key="project.slug" :project="project" />
      </div>
    </div>
  </RevealSection>
 </div>
</template>

<style scoped>
.hero {
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
}

.hero__inner {
  max-width: 680px;
}

.hero h1 {
  font-size: var(--text-4xl);
  line-height: 1.05;
}

.hero__title {
  font-family: var(--font-mono);
  font-size: var(--text-base);
  color: var(--color-accent);
  margin-top: var(--space-3);
}

.hero__summary {
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  line-height: 1.6;
  margin-top: var(--space-5);
  max-width: 56ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-6);
  margin-top: var(--space-6);
}

.hero__link {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  text-decoration: underline;
  text-decoration-color: var(--color-border);
  text-underline-offset: 4px;
  transition: text-decoration-color var(--transition-base);
}

.hero__link:hover {
  text-decoration-color: var(--color-accent);
}

.hero__stack {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  margin-top: var(--space-7);
  line-height: 1.8;
}

.section-head--split {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-4);
}

.bars {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  max-width: 640px;
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
}
</style>
