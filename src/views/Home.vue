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
      <p class="eyebrow">Hi, I'm</p>
      <h1>{{ profile.name }}</h1>
      <p class="hero__title">{{ profile.title }}</p>
      <p class="hero__summary">{{ profile.summary }}</p>

      <div class="hero__actions">
        <RouterLink to="/projects" class="btn btn-primary">View Projects</RouterLink>
        <a class="btn btn-secondary" href="/resume-forrest-tocheri.pdf" download>Download Resume</a>
        <RouterLink to="/contact" class="btn btn-secondary">Contact</RouterLink>
      </div>

      <div class="hero__stack">
        <span v-for="item in stack" :key="item" class="tag">{{ item }}</span>
      </div>
    </div>
  </section>

  <RevealSection class="section">
    <div class="container">
      <h2>Years by the numbers</h2>
      <p class="section__lede">Straight from the resume — actual years, not invented percentages.</p>
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
    </div>
  </RevealSection>

  <RevealSection class="section">
    <div class="container">
      <div class="section__header">
        <h2>Featured Projects</h2>
        <RouterLink to="/projects" class="section__link">See all →</RouterLink>
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
  padding-top: var(--space-9);
  padding-bottom: var(--space-9);
  text-align: center;
}

.hero__inner {
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.hero h1 {
  font-size: var(--text-4xl);
  font-weight: 800;
  letter-spacing: -0.02em;
}

.hero__title {
  font-size: var(--text-xl);
  color: var(--color-accent);
  font-weight: 600;
}

.hero__summary {
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  line-height: 1.6;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
  margin-top: var(--space-3);
}

.hero__stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  justify-content: center;
  margin-top: var(--space-5);
}

.section__lede {
  color: var(--color-text-muted);
  margin-top: var(--space-2);
  margin-bottom: var(--space-6);
}

.section__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: var(--space-6);
}

.section__link {
  color: var(--color-accent);
  text-decoration: none;
  font-weight: 600;
  font-size: var(--text-sm);
}

.bars {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  max-width: 640px;
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

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-5);
}
</style>
