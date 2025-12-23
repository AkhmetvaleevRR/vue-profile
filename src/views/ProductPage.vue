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

<style scoped lang="scss">
@use '../assets/styles/variables' as *;

.product-page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: $bg-input;
  padding: 2rem;
  font-family: 'Courier New', Courier, monospace;

  .product-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    background: $bg-paper-alt;
    padding: 2rem;
    border: 4px solid $secondary;
    box-shadow: inset 0 0 0 4px $border-paper-shadow;
    max-width: 900px;
    width: 100%;

    .product-gallery {
      .main-image {
        border: 4px solid $secondary;
        overflow: hidden;
        aspect-ratio: 1 / 1;
        background: $border-paper-shadow;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .thumbnail-images {
        display: flex;
        gap: 10px;
        margin-top: 1rem;

        img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          cursor: pointer;
          border: 3px solid $border-paper-shadow;
          transition: border-color 0.3s;

          &.active {
            border-color: $danger;
          }
        }
      }
    }

    .product-details {
      h1 {
        font-size: 2.5rem;
        margin: 0 0 0.5rem 0;
        color: $gray-900;
      }

      .reviews {
        color: $gray-700;
        margin-bottom: 1rem;

        span {
          color: $warning;
        }
      }

      .description {
        font-size: 1rem;
        line-height: 1.6;
        color: $gray-800;
        margin-bottom: 2rem;
      }

      .price {
        font-size: 2rem;
        font-weight: bold;
        color: $warning;
        margin-bottom: 2rem;
      }

      .actions {
        display: flex;
        gap: 1rem;
        align-items: center;

        .quantity-selector {
          display: flex;
          align-items: center;

          button {
            background: $gray-400;
            border: 2px solid $secondary;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 1.2rem;
            font-family: inherit;
            font-weight: bold;
          }

          span {
            padding: 0 15px;
            font-size: 1.2rem;
            min-width: 20px;
            text-align: center;
            background: $white;
            border-top: 2px solid $secondary;
            border-bottom: 2px solid $secondary;
            height: 42px;
            line-height: 42px;
          }
        }

        .add-to-cart-btn {
          background: $success;
          color: $white;
          border: 2px solid $secondary;
          padding: 12px 25px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.1s;
          box-shadow: 4px 4px 0px $secondary;
          font-family: inherit;

          &:hover {
            background: $success-hover;
          }

          &:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px $secondary;
          }
        }
      }
    }
  }

  @media (max-width: $tablet) {
    .product-card {
      grid-template-columns: 1fr;
      padding: 1.5rem;
      gap: 1.5rem;
    }

    .product-details h1 {
      font-size: 2rem;
    }
  }
}

</style>