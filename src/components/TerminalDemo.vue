<script setup>
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { useInView } from '../composables/useInView';

const props = defineProps({
  script: { type: Array, required: true },
});

const { target, isVisible } = useInView({ threshold: 0.4 });
const lines = ref([]);
const isPlaying = ref(false);
const hasPlayed = ref(false);
let runToken = 0;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeCommand(text, token) {
  const line = { type: 'command', text: '' };
  lines.value.push(line);

  for (const char of text) {
    if (token !== runToken) return;
    line.text += char;
    await wait(18);
  }
}

async function play() {
  const token = ++runToken;
  lines.value = [];
  isPlaying.value = true;
  hasPlayed.value = true;

  for (const step of props.script) {
    if (token !== runToken) break;

    await typeCommand(step.command, token);
    await wait(280);

    for (const outputLine of step.output) {
      if (token !== runToken) break;
      lines.value.push({ type: 'output', text: outputLine });
      await wait(90);
    }

    await wait(550);
  }

  if (token === runToken) {
    isPlaying.value = false;
  }
}

let stopWatching;

onMounted(() => {
  stopWatching = watchOnce(isVisible, (visible) => {
    if (visible && !hasPlayed.value) {
      play();
    }
  });
});

function watchOnce(source, callback) {
  const unwatch = watchEffect(() => {
    if (source.value) {
      callback(source.value);
      unwatch();
    }
  });

  return unwatch;
}

onUnmounted(() => {
  runToken++;
  stopWatching?.();
});
</script>

<template>
  <div ref="target" class="terminal">
    <div class="terminal__bar">
      <span class="terminal__dot terminal__dot--red" />
      <span class="terminal__dot terminal__dot--yellow" />
      <span class="terminal__dot terminal__dot--green" />
      <span class="terminal__title">taskman</span>
      <button class="terminal__replay" type="button" :disabled="isPlaying" @click="play">
        {{ isPlaying ? 'Playing…' : '↻ Replay' }}
      </button>
    </div>
    <div class="terminal__body">
      <p v-for="(line, index) in lines" :key="index" class="terminal__line">
        <template v-if="line.type === 'command'">
          <span class="terminal__prompt">$</span> {{ line.text }}
        </template>
        <template v-else>{{ line.text }}</template>
      </p>
      <p v-if="lines.length === 0" class="terminal__line terminal__line--muted">
        Scroll into view to play the demo…
      </p>
    </div>
  </div>
</template>

<style scoped>
.terminal {
  background: #0b1020;
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border);
}

.terminal__bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  background: #161c2e;
}

.terminal__dot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
}

.terminal__dot--red {
  background: #ef4444;
}

.terminal__dot--yellow {
  background: #f59e0b;
}

.terminal__dot--green {
  background: #22c55e;
}

.terminal__title {
  margin-left: var(--space-2);
  color: #94a3b8;
  font-size: var(--text-xs);
  font-family: var(--font-mono);
}

.terminal__replay {
  margin-left: auto;
  background: transparent;
  border: 1px solid #2b3554;
  color: #cbd5f5;
  border-radius: var(--radius-sm);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  cursor: pointer;
}

.terminal__replay:disabled {
  opacity: 0.6;
  cursor: default;
}

.terminal__body {
  padding: var(--space-5);
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  min-height: 220px;
  color: #e2e8f0;
}

.terminal__line {
  margin: 0 0 var(--space-2) 0;
  white-space: pre-wrap;
  line-height: 1.6;
}

.terminal__line--muted {
  color: #64748b;
}

.terminal__prompt {
  color: #4ade80;
  font-weight: 700;
}
</style>
