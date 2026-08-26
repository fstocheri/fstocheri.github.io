<script setup>
defineProps({
  project: { type: Object, required: true },
});
</script>

<template>
  <RouterLink :to="`/projects/${project.slug}`" class="card">
    <div class="card__media">
      <img v-if="project.thumbnail" :src="project.thumbnail" :alt="`${project.name} screenshot`" />
      <div v-else class="card__media-fallback">
        <span>{{ project.name.slice(0, 2).toUpperCase() }}</span>
      </div>
    </div>
    <div class="card__body">
      <h3>{{ project.name }}</h3>
      <p>{{ project.pitch }}</p>
      <div class="card__tags">
        <span v-for="tech in project.tech" :key="tech" class="tag">{{ tech }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  border-top: 2px solid var(--color-text);
}

.card__media {
  aspect-ratio: 16 / 10;
  background: var(--color-bg-alt);
  overflow: hidden;
  border-bottom: 1px solid var(--color-border);
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: opacity var(--transition-base);
}

.card:hover .card__media img {
  opacity: 0.85;
}

.card__media-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: var(--text-3xl);
  color: var(--color-accent);
  background: var(--color-accent-soft);
}

.card__body {
  padding-block: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  flex: 1;
}

.card__body h3 {
  font-size: var(--text-xl);
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 4px;
  transition: text-decoration-color var(--transition-base);
}

.card:hover .card__body h3 {
  text-decoration-color: var(--color-accent);
}

.card__body p {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  flex: 1;
}

.card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-1);
}
</style>
