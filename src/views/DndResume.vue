<script setup lang="ts">
import { reactive } from 'vue';
import PixelCharacter from '../components/PixelCharacter.vue';
import DiceD20 from '../components/DiceD20.vue';

type HatType = 'none' | 'wizard' | 'helmet' | 'hood';
type WeaponType = 'none' | 'staff' | 'shield' | 'bow' | 'sword';

const character = reactive({
  name: 'Frontend Adventurer',
  level: 5,
  class: 'Vue Developer',
  skinColor: '#f0c0a0',
  hat: 'none' as HatType,
  weapon: 'none' as WeaponType,
});

const skills = [
  { name: 'Vue 2/3', value: 9, modifier: '+4' },
  { name: 'TypeScript', value: 8, modifier: '+3' },
  { name: 'JavaScript', value: 9, modifier: '+4' },
  { name: 'CSS/SCSS', value: 8, modifier: '+3' },
  { name: 'HTML', value: 10, modifier: '+5' },
];

const hatOptions: { value: HatType; label: string }[] = [
  { value: 'none', label: 'No Hat' },
  { value: 'wizard', label: 'Wizard Hat' },
  { value: 'helmet', label: 'Helmet' },
  { value: 'hood', label: 'Hood' },
];

const weaponOptions: { value: WeaponType; label: string }[] = [
  { value: 'none', label: 'No Weapon' },
  { value: 'staff', label: 'Staff' },
  { value: 'shield', label: 'Shield' },
  { value: 'bow', label: 'Bow' },
  { value: 'sword', label: 'Sword' },
];

const skinColors = [
  '#ffdfc4', // Very Light
  '#f0c0a0', // Light (Default)
  '#e0ac69', // Medium
  '#8d5524', // Dark
  '#523218', // Very Dark
  '#6d8c5e', // Orcish Green
];

const cycleSkinColor = (direction: number) => {
  const currentIndex = skinColors.indexOf(character.skinColor);
  let newIndex = currentIndex + direction;
  if (newIndex < 0) newIndex = skinColors.length - 1;
  if (newIndex >= skinColors.length) newIndex = 0;
  character.skinColor = skinColors[newIndex]!;
};
</script>

<template>
  <div class="dnd-sheet-container">
    <div class="paper-sheet">
      <header class="sheet-header">
        <div class="header-block">
          <label>Name</label>
          <input v-model="character.name" type="text" class="handwritten-input" />
        </div>
        <div class="header-block">
          <label>Class</label>
          <div class="static-value">{{ character.class }}</div>
        </div>
        <div class="header-block small">
          <label>Level</label>
          <div class="static-value">{{ character.level }}</div>
        </div>
      </header>

      <div class="sheet-body">
        <section class="skills-section">
          <h2>Skills</h2>
          <ul class="skills-list">
            <li v-for="skill in skills" :key="skill.name" class="skill-item">
              <span class="skill-name">{{ skill.name }}</span>
              <div class="skill-dots">
                <span 
                  v-for="n in 10" 
                  :key="n" 
                  class="dot" 
                  :class="{ filled: n <= skill.value }"
                ></span>
              </div>
              <span class="skill-mod">{{ skill.modifier }}</span>
            </li>
          </ul>
          <div class="control-group roll-dice-group">
            <label>Roll for Luck</label>
            <DiceD20 />
          </div>
        </section>

        <section class="character-section">
          <h2>Appearance</h2>
          
          <div class="character-preview">
            <PixelCharacter 
              :skin-color="character.skinColor"
              :hat="character.hat"
              :weapon="character.weapon"
            />
          </div>

          <div class="controls">
            <div class="control-group">
              <label>Skin Color</label>
              <div class="skin-selector">
                <button class="nav-btn" @click="cycleSkinColor(-1)">&#9664;</button>
                <div class="color-swatch" :style="{ backgroundColor: character.skinColor }"></div>
                <button class="nav-btn" @click="cycleSkinColor(1)">&#9654;</button>
              </div>
            </div>

            <div class="control-group">
              <label>Headgear</label>
              <select v-model="character.hat">
                <option v-for="opt in hatOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>

            <div class="control-group">
              <label>Weapon</label>
              <select v-model="character.weapon">
                <option v-for="opt in weaponOptions" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dnd-sheet-container {
  display: flex;
  justify-content: center;
  background-color: #2c3e50;
  min-height: 100vh;
  font-family: 'Courier New', Courier, monospace;
}

.paper-sheet {
  background-color: #fdfbf7;
  width: 100%;
  max-width: 800px;
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  border: 1px solid #d3c6b1;
}

.sheet-header {
  display: flex;
  gap: 1rem;
  border-bottom: 2px solid #333;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

.header-block {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header-block.small {
  flex: 0 0 80px;
}

.handwritten-input, .static-value {
  font-size: 1.2rem;
  border: none;
  border-bottom: 1px solid #999;
  background: transparent;
  font-family: inherit;
  padding: 0.2rem 0;
}

.sheet-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.skills-list {
  list-style: none;
  padding: 0;
}

.skill-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  justify-content: space-between;
}

.skill-name {
  font-weight: bold;
  width: 100px;
}

.skill-dots {
  display: flex;
  gap: 4px;
}

.dot {
  width: 12px;
  height: 12px;
  border: 1px solid #333;
  border-radius: 50%;
}

.dot.filled {
  background-color: #c0392b;
}

.skill-mod {
  font-weight: bold;
  color: #7f8c8d;
  width: 30px;
  text-align: right;
}

.character-preview {
  border: 2px solid #333;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eee;
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
}

.skin-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.roll-dice-group {
  align-items: center;
  margin-top: 1rem;
}

.nav-btn {
  background: #eee;
  border: 1px solid #333;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
}

.color-swatch {
  width: 50px;
  height: 24px;
  border: 2px solid #333;
}

h2 {
  border-bottom: 2px solid #333;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-size: 1.1rem;
}
</style>