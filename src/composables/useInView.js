import { onMounted, onUnmounted, ref } from 'vue';

/**
 * Toggles `isVisible` the first time the bound element scrolls into the
 * viewport. Used to drive the .reveal / .reveal.is-visible CSS transition
 * instead of pulling in an animation library for one effect.
 */
export function useInView(options = { threshold: 0.15 }) {
  const target = ref(null);
  const isVisible = ref(false);
  let observer;

  onMounted(() => {
    if (!target.value) return;

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect();
      }
    }, options);

    observer.observe(target.value);
  });

  onUnmounted(() => observer?.disconnect());

  return { target, isVisible };
}
