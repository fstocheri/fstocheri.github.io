<script setup>
import { projects } from '../data/projects';
import ProjectCard from '../components/ProjectCard.vue';
import RevealSection from '../components/RevealSection.vue';
</script>

<template>
 <div>
  <section class="section">
    <div class="container">
      <p class="kicker">Projects</p>
      <h1>Things I've built</h1>
      <p class="lede">
        A couple of from-scratch demos, each picked to show a different part of the stack.
        More will land here over time.
      </p>
    </div>
  </section>

  <RevealSection class="section section--tight">
    <div class="container">
      <div class="grid">
        <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      </div>
    </div>
  </RevealSection>
 </div>
</template>

<style scoped>
.section--tight {
  padding-top: 0;
}

.lede {
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  max-width: 560px;
  margin-top: var(--space-3);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-5);
}
</style>
