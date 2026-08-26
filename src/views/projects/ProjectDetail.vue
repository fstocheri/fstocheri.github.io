<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { findProject } from '../../data/projects';
import RevealSection from '../../components/RevealSection.vue';
import TerminalDemo from '../../components/TerminalDemo.vue';

const props = defineProps({
  slug: { type: String, required: true },
});

const router = useRouter();
const project = computed(() => findProject(props.slug));

if (!project.value) {
  router.replace({ name: 'not-found' });
}
</script>

<template>
  <div v-if="project">
    <section class="section section--intro">
      <div class="container">
        <RouterLink to="/projects" class="back-link">&larr; All projects</RouterLink>
        <p class="kicker">Project</p>
        <h1>{{ project.name }}</h1>
        <p class="lede">{{ project.description }}</p>

        <div class="tags">
          <span v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</span>
        </div>

        <div class="actions">
          <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noreferrer" class="btn btn-primary">
            View live demo
          </a>
          <a
            :href="project.repoUrl"
            target="_blank"
            rel="noreferrer"
            :class="project.liveUrl ? 'btn btn-secondary' : 'btn btn-primary'"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </section>

    <RevealSection v-if="project.terminalScript" class="section section--tight">
      <div class="container">
        <div class="section-head">
          <span class="section-head__index">§ Demo</span>
          <h2>See it run</h2>
        </div>
        <TerminalDemo :script="project.terminalScript" />
      </div>
    </RevealSection>

    <RevealSection v-if="project.screenshots" class="section section--tight">
      <div class="container">
        <div class="section-head">
          <span class="section-head__index">§ Screens</span>
          <h2>Screenshots</h2>
        </div>
        <div class="gallery">
          <figure v-for="shot in project.screenshots" :key="shot.src">
            <img :src="shot.src" :alt="shot.caption" loading="lazy" />
            <figcaption>{{ shot.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </RevealSection>

    <RevealSection class="section section--tight">
      <div class="container">
        <div class="section-head">
          <span class="section-head__index">§ Notes</span>
          <h2>Design decisions</h2>
        </div>
        <div class="highlights">
          <div v-for="item in project.highlights" :key="item.title" class="highlight">
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
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

.back-link {
  display: inline-block;
  color: var(--color-text-muted);
  font-family: var(--font-mono);
  text-decoration: none;
  font-size: var(--text-sm);
  margin-bottom: var(--space-5);
}

.back-link:hover {
  color: var(--color-accent);
}

.lede {
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  max-width: 640px;
  margin-top: var(--space-3);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-5);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.section--tight {
  padding-top: 0;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-6);
}

.gallery figure {
  margin: 0;
  border-top: 2px solid var(--color-text);
}

.gallery img {
  width: 100%;
  display: block;
  border-bottom: 1px solid var(--color-border);
}

.gallery figcaption {
  padding-block: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

.highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-6);
}

.highlight {
  border-top: 1px solid var(--color-border);
  padding-top: var(--space-4);
}

.highlight h3 {
  font-size: var(--text-base);
  margin-bottom: var(--space-2);
  font-family: var(--font-mono);
  font-weight: 500;
  color: var(--color-accent);
}

.highlight p {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  line-height: 1.6;
}
</style>
