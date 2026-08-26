<script setup>
import NavBar from './components/NavBar.vue';
import AppFooter from './components/AppFooter.vue';
</script>

<template>
  <NavBar />
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
</template>

<style scoped>
main {
  min-height: 60vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
