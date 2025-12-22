<script setup lang="ts">
interface Props {
  skinColor: string;
  hat: 'none' | 'wizard' | 'helmet' | 'hood';
  weapon: 'none' | 'staff' | 'shield' | 'bow' | 'sword';
}

const props = withDefaults(defineProps<Props>(), {
  skinColor: '#f0c0a0',
  hat: 'none',
  weapon: 'none',
});

const pixelSize = 10;

const clothesColor = '#42b883';
const pantsColor = '#35495e';
const shoesColor = '#2c3e50';

const hatColors: Record<string, string> = {
  wizard: '#4b0082',
  helmet: '#7f8c8d',
  hood: '#2c3e50',
};

const weaponColors: Record<string, string> = {
  staff: '#8e44ad',
  shield: '#e67e22',
  bow: '#27ae60',
  sword: '#bdc3c7',
};
</script>

<template>
  <div class="pixel-character">
    <svg width="120" height="180" viewBox="0 0 120 180" shape-rendering="crispEdges">

      <g transform="translate(10, 40)">
        
        <!-- Ноги (Штаны) -->
        <rect :x="3 * pixelSize" :y="10 * pixelSize" :width="2 * pixelSize" :height="3 * pixelSize" :fill="pantsColor" />
        <rect :x="6 * pixelSize" :y="10 * pixelSize" :width="2 * pixelSize" :height="3 * pixelSize" :fill="pantsColor" />
        
        <!-- Обувь -->
        <rect :x="2.5 * pixelSize" :y="13 * pixelSize" :width="2.5 * pixelSize" :height="1 * pixelSize" :fill="shoesColor" />
        <rect :x="6 * pixelSize" :y="13 * pixelSize" :width="2.5 * pixelSize" :height="1 * pixelSize" :fill="shoesColor" />

        <!-- Руки -->
        <rect :x="1 * pixelSize" :y="5 * pixelSize" :width="2 * pixelSize" :height="3 * pixelSize" :fill="clothesColor" />
        <rect :x="1 * pixelSize" :y="8 * pixelSize" :width="2 * pixelSize" :height="2 * pixelSize" :fill="props.skinColor" />

        <rect :x="8 * pixelSize" :y="5 * pixelSize" :width="2 * pixelSize" :height="3 * pixelSize" :fill="clothesColor" />
        <rect :x="8 * pixelSize" :y="8 * pixelSize" :width="2 * pixelSize" :height="2 * pixelSize" :fill="props.skinColor" />

        <!-- Туловище -->
        <rect :x="3 * pixelSize" :y="5 * pixelSize" :width="5 * pixelSize" :height="6 * pixelSize" :fill="clothesColor" />
        <!-- Пояс -->
        <rect :x="3 * pixelSize" :y="9 * pixelSize" :width="5 * pixelSize" :height="1 * pixelSize" fill="rgba(0,0,0,0.2)" />

        <!-- Голова -->
        <rect :x="3 * pixelSize" :y="1 * pixelSize" :width="5 * pixelSize" :height="5 * pixelSize" :fill="props.skinColor" />
        
        <!-- Лицо -->
        <rect :x="4 * pixelSize" :y="3 * pixelSize" :width="1 * pixelSize" :height="1 * pixelSize" fill="#333" />
        <rect :x="7 * pixelSize" :y="3 * pixelSize" :width="1 * pixelSize" :height="1 * pixelSize" fill="#333" />
        <!-- Румянец -->
        <rect :x="3.5 * pixelSize" :y="4 * pixelSize" :width="1 * pixelSize" :height="0.5 * pixelSize" fill="rgba(255,0,0,0.2)" />
        <rect :x="7.5 * pixelSize" :y="4 * pixelSize" :width="1 * pixelSize" :height="0.5 * pixelSize" fill="rgba(255,0,0,0.2)" />

        <!-- Шапки -->
        <g v-if="props.hat === 'wizard'">
          <rect :x="1 * pixelSize" :y="0" :width="9 * pixelSize" :height="1 * pixelSize" :fill="hatColors.wizard" />
          <rect :x="2 * pixelSize" :y="-1 * pixelSize" :width="7 * pixelSize" :height="1 * pixelSize" :fill="hatColors.wizard" />
          <rect :x="3 * pixelSize" :y="-2 * pixelSize" :width="5 * pixelSize" :height="1 * pixelSize" :fill="hatColors.wizard" />
          <rect :x="4 * pixelSize" :y="-3 * pixelSize" :width="3 * pixelSize" :height="1 * pixelSize" :fill="hatColors.wizard" />
          <rect :x="5 * pixelSize" :y="-4 * pixelSize" :width="1 * pixelSize" :height="1 * pixelSize" :fill="hatColors.wizard" />
        </g>

        <g v-else-if="props.hat === 'helmet'">
           <rect :x="2.5 * pixelSize" :y="0" :width="6 * pixelSize" :height="4 * pixelSize" :fill="hatColors.helmet" />
           <rect :x="5 * pixelSize" :y="1 * pixelSize" :width="1 * pixelSize" :height="3 * pixelSize" fill="#333" />
           <rect :x="3 * pixelSize" :y="1.5 * pixelSize" :width="5 * pixelSize" :height="0.5 * pixelSize" fill="#333" />
        </g>

        <g v-else-if="props.hat === 'hood'">
           <rect :x="2.5 * pixelSize" :y="0" :width="6 * pixelSize" :height="5 * pixelSize" :fill="hatColors.hood" />
           <rect :x="3.5 * pixelSize" :y="1 * pixelSize" :width="4 * pixelSize" :height="4 * pixelSize" :fill="props.skinColor" />
           <rect :x="3.5 * pixelSize" :y="1 * pixelSize" :width="4 * pixelSize" :height="1 * pixelSize" fill="rgba(0,0,0,0.3)" />
        </g>

        <!-- Оружие -->
        <g v-if="props.weapon === 'sword'">
           <rect :x="9 * pixelSize" :y="7 * pixelSize" :width="1 * pixelSize" :height="3 * pixelSize" fill="#8e44ad" />
           <rect :x="8 * pixelSize" :y="7 * pixelSize" :width="3 * pixelSize" :height="1 * pixelSize" fill="#f1c40f" />
           <rect :x="9 * pixelSize" :y="2 * pixelSize" :width="1 * pixelSize" :height="5 * pixelSize" :fill="weaponColors.sword" />
           <rect :x="9.2 * pixelSize" :y="2 * pixelSize" :width="0.3 * pixelSize" :height="5 * pixelSize" fill="#fff" opacity="0.5" />
        </g>

        <g v-else-if="props.weapon === 'staff'">
           <rect :x="9 * pixelSize" :y="1 * pixelSize" :width="1 * pixelSize" :height="12 * pixelSize" fill="#8d6e63" />
           <rect :x="8.5 * pixelSize" :y="1 * pixelSize" :width="2 * pixelSize" :height="2 * pixelSize" :fill="weaponColors.staff" />
           <rect :x="9 * pixelSize" :y="1.5 * pixelSize" :width="1 * pixelSize" :height="1 * pixelSize" fill="#e056fd" />
        </g>

        <g v-else-if="props.weapon === 'shield'">
           <rect :x="7.5 * pixelSize" :y="6 * pixelSize" :width="4 * pixelSize" :height="5 * pixelSize" :fill="weaponColors.shield" rx="2" />
           <rect :x="8.5 * pixelSize" :y="7 * pixelSize" :width="2 * pixelSize" :height="3 * pixelSize" fill="rgba(0,0,0,0.2)" />
        </g>

        <g v-else-if="props.weapon === 'bow'">
           <path d="M 90 40 Q 115 70 90 100" stroke="#8d6e63" stroke-width="4" fill="none" />
           <line x1="90" y1="40" x2="90" y2="100" stroke="#fff" stroke-width="1" />
        </g>
      </g>
    </svg>
  </div>
</template>

<style scoped>
.pixel-character {
  display: inline-block;
  animation: idle 2s infinite ease-in-out;
}

@keyframes idle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
</style>