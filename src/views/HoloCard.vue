<script setup lang="ts">
import { ref, computed } from 'vue';

defineOptions({
  name: 'HoloCardView'
});

const cardRef = ref<HTMLElement | null>(null);

// Состояние для отслеживания мыши
const mouseX = ref(0);
const mouseY = ref(0);
const isHovering = ref(false);
const cardWidth = ref(0);
const cardHeight = ref(0);

const handleMouseMove = (e: MouseEvent) => {
  if (!cardRef.value) return;
  
  const rect = cardRef.value.getBoundingClientRect();
  cardWidth.value = rect.width;
  cardHeight.value = rect.height;
  
  // Вычисляем положение мыши внутри карточки
  mouseX.value = e.clientX - rect.left;
  mouseY.value = e.clientY - rect.top;
};

const handleMouseEnter = () => {
  isHovering.value = true;
};

const handleMouseLeave = () => {
  isHovering.value = false;
};

// Вычисляем стили трансформации
const cardTransform = computed(() => {
  if (!isHovering.value) {
    // Возвращаем в исходное положение плавно
    return {
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.5s ease-out'
    };
  }

  // Центр карточки - это (0,0) для расчетов
  const xPct = mouseX.value / cardWidth.value - 0.5;
  const yPct = mouseY.value / cardHeight.value - 0.5;

  // Максимальный угол поворота (в градусах)
  const maxRotation = 20;
  
  // Инвертируем Y, чтобы наклон был естественным (мышь вверх -> карта наклоняется от нас)
  const rX = yPct * -maxRotation; 
  const rY = xPct * maxRotation;

  return {
    transform: `perspective(1000px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.05)`,
    transition: 'transform 0.1s ease-out' // Быстрая реакция при движении
  };
});

// Вычисляем стиль блика (glare)
const glareStyle = computed(() => {
  if (!isHovering.value) return { opacity: 0 };

  const xPct = (mouseX.value / cardWidth.value) * 100;
  const yPct = (mouseY.value / cardHeight.value) * 100;

  return {
    background: `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
    opacity: 0.25,
    transition: 'opacity 0.2s'
  };
});
</script>
 
<template>
  <div class="page-container">
    <div class="scene">
      <div
        class="card"
        ref="cardRef"
        @mousemove="handleMouseMove"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        :style="cardTransform"
      >
        <div class="card-content">
          <div class="card-header">
            <span class="rarity">LEGENDARY</span>
            <h2>Vorpal Sword</h2>
          </div>
          
          <div class="card-image">
            ⚔️
          </div>

          <div class="card-stats">
            <div class="stat">
              <span class="label">ATK</span>
              <span class="value">+3</span>
            </div>
            <div class="stat">
              <span class="label">DMG</span>
              <span class="value">6d8</span>
            </div>
          </div>
          
          <p class="description">
            The weapon ignores resistance to slashing damage. 
            When you attack a creature that has at least one head...
          </p>
        </div>
        
        <!-- Слой блика -->
        <div class="glare" :style="glareStyle"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as *;

.page-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $bg-deep;
  font-family: 'Courier New', Courier, monospace;

  .scene {
    perspective: 1000px;

    .card {
      width: 300px;
      height: 480px;
      background: linear-gradient(135deg, #2c3e50 0%, #000000 100%);
      border-radius: 20px;
      position: relative;
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
      border: 2px solid $primary;
      overflow: hidden;
      cursor: pointer;
      transform-style: preserve-3d;

      .card-content {
        position: relative;
        z-index: 2;
        height: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        color: $white;
        pointer-events: none;

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;

          .rarity {
            font-size: 0.7rem;
            color: $gold;
            border: 1px solid $gold;
            padding: 2px 6px;
            border-radius: 4px;
            letter-spacing: 1px;
          }

          h2 {
            margin: 0;
            font-size: 1.2rem;
            text-align: right;
            flex-grow: 1;
          }
        }

        .card-image {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 8rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
          transform: translateZ(20px);
        }

        .card-stats {
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
          transform: translateZ(10px);

          .stat {
            text-align: center;

            .label {
              display: block;
              font-size: 0.8rem;
              color: $gray-500;
            }

            .value {
              font-size: 1.5rem;
              font-weight: bold;
              color: $primary;
            }
          }
        }

        .description {
          font-size: 0.85rem;
          line-height: 1.4;
          color: $gray-400;
          font-style: italic;
          transform: translateZ(5px);
          padding-bottom: 20px;
        }
      }

      .glare {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
        pointer-events: none;
        mix-blend-mode: overlay;
      }
    }
  }

  @media (max-width: $mobile-small) {
    .scene {
      transform: scale(0.85);
    }
  }
}
</style>