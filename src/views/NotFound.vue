<template>
  <section class="section not-found">
    <div class="container">
      <p class="kicker">404</p>
      <h1>Page not found</h1>
      <p class="lede">That page doesn't exist — try the nav above.</p>
      <RouterLink to="/" class="btn btn-primary">Back home</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding-block: var(--space-9);
}

.lede {
  color: var(--color-text-muted);
  margin-block: var(--space-3) var(--space-6);
}
</style>
