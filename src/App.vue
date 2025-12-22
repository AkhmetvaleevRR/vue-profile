<script setup lang="ts">
import { ref } from 'vue';
import { RouterView, RouterLink } from 'vue-router'

const isMenuOpen = ref(false);
</script>

<template>
  <nav class="main-nav">
    <button class="burger-btn" @click="isMenuOpen = !isMenuOpen" :class="{ open: isMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="nav-links" :class="{ open: isMenuOpen }">
      <RouterLink to="/" @click="isMenuOpen = false">D&D Resume</RouterLink>
      <RouterLink to="/auth" @click="isMenuOpen = false">Secure Auth</RouterLink>
      <RouterLink to="/product" @click="isMenuOpen = false">Product Page</RouterLink>
      <RouterLink to="/bestiary" @click="isMenuOpen = false">Bestiary</RouterLink>
    </div>
  </nav>
  <RouterView />
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

.main-nav {
  position: fixed;
  top: 0;
  right: 0;
  padding: 1rem;
  z-index: 1000;
}

.burger-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1002;
  padding: 0;
}

.burger-btn span {
  width: 100%;
  height: 3px;
  background-color: #fff;
  border-radius: 3px;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.5);
}

.burger-btn.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 6px);
}

.burger-btn.open span:nth-child(2) {
  opacity: 0;
}

.burger-btn.open span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -6px);
}

.nav-links {
  position: absolute;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  padding: 4rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  height: 100vh;
  box-shadow: -5px 0 15px rgba(0,0,0,0.5);
}

.nav-links.open {
  transform: translateX(0);
}

.nav-links a {
  color: #fff;
  text-decoration: none;
  font-family: sans-serif;
  font-size: 1.2rem;
  transition: color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: #42b883;
}
</style>
