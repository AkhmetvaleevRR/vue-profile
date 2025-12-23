<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineOptions({
  name: 'BestiaryView'
});

interface Monster {
  index: string;
  name: string;
  url: string;
}

const monsters = ref<Monster[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await fetch('https://www.dnd5eapi.co/api/classes/'); //Заменил пока на классы т.к. API монстров не подгружается
    if (!response.ok) {
      throw new Error('Failed to fetch monsters');
    }
    const data = await response.json();
    console.log(data)
    monsters.value = data.results;
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'An error occurred';
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="bestiary-container">
    <div class="bestiary-content">
      <header>
        <h1>Bestiary</h1>
        <p>Creatures from the D&D 5e API</p>
      </header>

      <div v-if="isLoading" class="loading">Loading creatures...</div>
      <div v-if="error" class="error">Error: {{ error }}</div>

      <ul v-if="!isLoading && !error" class="monster-list">
        <li v-for="monster in monsters" :key="monster.index" class="monster-item">
          <a :href="`https://www.dnd5eapi.co${monster.url}`" target="_blank" rel="noopener noreferrer">
            {{ monster.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.bestiary-container {
  display: flex;
  justify-content: center;
  padding: 4rem 2rem;
  background-color: #1a1a1a;
  color: #e0e0e0;
  min-height: 100vh;
  font-family: 'Courier New', Courier, monospace;
}

.bestiary-content {
  width: 100%;
  max-width: 700px;
}

header {
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 1rem;
}

header h1 {
  color: #42b883;
  margin: 0;
}

.loading, .error {
  text-align: center;
  font-size: 1.2rem;
  padding: 2rem;
}

.error {
  color: #c0392b;
}

.monster-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.monster-item a {
  display: block;
  padding: 1rem;
  background: #2d2d2d;
  border: 1px solid #444;
  border-radius: 4px;
  text-decoration: none;
  color: #e0e0e0;
  transition: background-color 0.2s, transform 0.2s;
}

.monster-item a:hover {
  background-color: #3c3c3c;
  transform: translateY(-2px);
}
</style>