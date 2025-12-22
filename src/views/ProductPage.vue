<script setup lang="ts">
import { ref, computed } from 'vue';

import potionRed from '../assets/potion-red.svg?url';
import potionBlue from '../assets/potion-blue.svg?url';
import potionGreen from '../assets/potion-green.svg?url';

const products = [
  {
    name: 'Potion of Frontend Mastery',
    description: 'A legendary elixir that grants unparalleled skill in Vue, TypeScript, and CSS. Side effects may include an insatiable desire to refactor everything.',
    price: 99.99,
    image: potionRed,
    reviews: 42,
    rating: 4.8,
  },
  {
    name: 'Potion of Backend Power',
    description: 'A mystical brew that enhances your Node.js, Python, and database skills. Warning: May cause excessive API optimization.',
    price: 89.99,
    image: potionBlue,
    reviews: 38,
    rating: 4.6,
  },
  {
    name: 'Potion of DevOps Wisdom',
    description: 'An ancient formula that bestows knowledge of Docker, Kubernetes, and CI/CD. Side effects include speaking in YAML.',
    price: 109.99,
    image: potionGreen,
    reviews: 51,
    rating: 4.9,
  },
];

const currentProductIndex = ref(0);
const product = computed(() => products[currentProductIndex.value]);

const activeImage = ref(product.value!.image);
const quantity = ref(1);

const setActiveProduct = (index: number) => {
  currentProductIndex.value = index;
  activeImage.value = product.value!.image;
};

const incrementQuantity = () => {
  quantity.value++;
};

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = () => {
  alert(`${quantity.value} "${product.value!.name}" added to cart! (In a real app, this would update a global state.)`);
};
</script>

<template>
  <div class="product-page-container">
    <div class="product-card">
      <div class="product-gallery">
        <div class="main-image">
          <img :src="activeImage" alt="Product Image" />
        </div>
        <div class="thumbnail-images">
          <img
            v-for="(prod, index) in products"
            :key="index"
            :src="prod.image"
            :class="{ active: index === currentProductIndex }"
            @click="setActiveProduct(index)"
            alt="Product Thumbnail"
          />
        </div>
      </div>
      <div class="product-details">
        <h1>{{ product!.name }}</h1>
        <div class="reviews">
          <span>★★★★☆</span> ({{ product!.reviews }} reviews)
        </div>
        <p class="description">{{ product!.description }}</p>
        <div class="price">${{ product!.price }}</div>
        <div class="actions">
          <div class="quantity-selector">
            <button @click="decrementQuantity">-</button>
            <span>{{ quantity }}</span>
            <button @click="incrementQuantity">+</button>
          </div>
          <button class="add-to-cart-btn" @click="addToCart">Add to Cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #3d3d3d;
  padding: 2rem;
  font-family: 'Courier New', Courier, monospace;
}

.product-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  background: #f0e8d8;
  padding: 2rem;
  border: 4px solid #2c3e50;
  box-shadow: inset 0 0 0 4px #c0b8a8;
  max-width: 900px;
  width: 100%;
}

.product-gallery .main-image {
  border: 4px solid #2c3e50;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  background: #c0b8a8;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-images {
  display: flex;
  gap: 10px;
  margin-top: 1rem;
}

.thumbnail-images img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border: 3px solid #c0b8a8;
  transition: border-color 0.3s;
}

.thumbnail-images img.active {
  border-color: #c0392b;
}

.product-details h1 {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.reviews {
  color: #777;
  margin-bottom: 1rem;
}

.reviews span {
  color: #f39c12;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 2rem;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #e67e22;
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.quantity-selector {
  display: flex;
  align-items: center;
}

.quantity-selector button {
  background: #bdc3c7;
  border: 2px solid #2c3e50;
  padding: 10px 15px;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: inherit;
  font-weight: bold;
}

.quantity-selector span {
  padding: 0 15px;
  font-size: 1.2rem;
  min-width: 20px;
  text-align: center;
  background: #fff;
  border-top: 2px solid #2c3e50;
  border-bottom: 2px solid #2c3e50;
  height: 42px;
  line-height: 42px;
}

.add-to-cart-btn {
  background: #27ae60;
  color: #fff;
  border: 2px solid #2c3e50;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.1s;
  box-shadow: 4px 4px 0px #2c3e50;
  font-family: inherit;
}

.add-to-cart-btn:hover {
  background: #2ecc71;
}

.add-to-cart-btn:active {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #2c3e50;
}
</style>