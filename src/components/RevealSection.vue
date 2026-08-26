<script setup>
import { useInView } from '../composables/useInView';

const { target, isVisible } = useInView();
</script>

<template>
  <div ref="target" class="reveal" :class="{ 'is-visible': isVisible }">
    <slot />
  </div>
</template>
