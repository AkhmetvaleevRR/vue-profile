<script setup lang="ts">
import { ref } from 'vue';

const isRolling = ref(false);
const rollResult = ref<number | null>(null);

const roll = () => {
  if (isRolling.value) return;

  isRolling.value = true;
  rollResult.value = null;
  setTimeout(() => {
    rollResult.value = Math.floor(Math.random() * 20) + 1;
    isRolling.value = false;
  }, 1000);
};
</script>

<template>
  <div class="dice-roller">
    <button @click="roll" :disabled="isRolling" class="d20-btn" title="Roll the d20">
      <div class="d20-icon" :class="{ rolling: isRolling }">
        <svg viewBox="0 0 100 100" class="d20-svg">
          <polygon points="50,5 95,30 95,70 50,95 5,70 5,30" stroke="#333" stroke-width="3" fill="#fdfbf7"/>
          
          <text x="50" y="53" font-size="35" text-anchor="middle" dominant-baseline="middle" font-weight="bold" fill="#c0392b">
            {{ isRolling ? '?' : (rollResult ?? '20') }}
          </text>
        </svg>
      </div>
    </button>
  </div>
</template>

<style scoped>
.d20-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: 50%;
}

.d20-btn:disabled {
  cursor: not-allowed;
}

.d20-icon {
  width: 80px;
  height: 80px;
  transition: transform 0.2s ease-out;
}

.d20-btn:not(:disabled):hover .d20-icon {
  transform: scale(1.1);
}

.d20-icon.rolling .d20-svg {
  animation: roll-d20 1s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

@keyframes roll-d20 {
  0% {
    transform: rotate(0deg) scale(1);
  }
  100% {
    transform: rotate(1080deg) scale(1);
  }
}
</style>