<script setup lang="ts">
import { ref, computed } from 'vue';

const form = ref({
  username: '',
  password: '',
});

const activeField = ref<'username' | 'password'>('username');

// (QWERTY + цифры)
const initialLayout = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
  'z', 'x', 'c', 'v', 'b', 'n', 'm'
];

const currentKeys = ref([...initialLayout]);

const rowLengths = [10, 10, 9, 7];

const keyboardRows = computed(() => {
  const rows: string[][] = [];
  let currentIndex = 0;
  
  for (const length of rowLengths) {
    rows.push(currentKeys.value.slice(currentIndex, currentIndex + length));
    currentIndex += length;
  }
  
  return rows;
});

// Функция перемешивания (Fisher-Yates shuffle)
const shuffleKeys = () => {
  const keys = [...currentKeys.value];
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = keys[i]!;
    keys[i] = keys[j]!;
    keys[j] = temp;
  }
  currentKeys.value = keys;
};

const handleKeyPress = (key: string) => {
  form.value[activeField.value] += key;
  shuffleKeys();
};

const handleBackspace = () => {
  const currentText = form.value[activeField.value];
  form.value[activeField.value] = currentText.slice(0, -1);
  shuffleKeys();
};

const handleLogin = () => {
  if (form.value.username && form.value.password) {
    alert('Login successful!');
  } else {
    alert('Please enter both username and password.');
  }
}

const setActive = (field: 'username' | 'password') => {
  activeField.value = field;
};
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <h2>Secure Login</h2>
      <p class="subtitle">Virtual Keypad Scrambler</p>

      <div class="form-group">
        <label :class="{ active: activeField === 'username' }">Username</label>
        <input 
          type="text" 
          v-model="form.username" 
          @focus="setActive('username')"
          readonly 
          placeholder="Select to type..."
        />
      </div>

      <div class="form-group">
        <label :class="{ active: activeField === 'password' }">Password</label>
        <input 
          type="password" 
          v-model="form.password" 
          @focus="setActive('password')"
          readonly
          placeholder="Select to type..."
        />
      </div>

      <div class="virtual-keyboard">
        <div v-for="(row, rowIndex) in keyboardRows" :key="rowIndex" class="keyboard-row">
          <TransitionGroup name="flip">
            <button 
              v-for="key in row" 
              :key="key" 
              class="key-btn"
              @click="handleKeyPress(key)"
            >
              {{ key }}
            </button>
          </TransitionGroup>
        </div>
        
        <div class="keyboard-row actions">
          <button class="key-btn action primary" @click="handleBackspace">⌫</button>
          <button class="key-btn action primary" @click="handleLogin">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../assets/styles/variables' as *;

.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: $bg-dark;
  color: $white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  .auth-card {
    background: $bg-card;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
    width: 100%;
    max-width: 500px;
    text-align: center;

    h2 {
      margin: 0;
      color: $primary;
    }

    .subtitle {
      color: $gray-700;
      margin-bottom: 2rem;
      font-size: 0.9rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
      text-align: left;

      label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.8rem;
        color: $gray-500;
        transition: color 0.3s;

        &.active {
          color: $primary;
        }
      }

      input {
        width: -webkit-fill-available;
        padding: 10px;
        background: $bg-input;
        border: 2px solid transparent;
        border-radius: 6px;
        color: $white;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s;

        &:focus {
          border-color: $primary;
        }
      }
    }

    .virtual-keyboard {
      margin-top: 2rem;
      background: $bg-keyboard;
      padding: 1rem;
      border-radius: 8px;
      user-select: none;

      .keyboard-row {
        display: flex;
        justify-content: center;
        gap: 6px;
        margin-bottom: 6px;

        &.actions {
          margin-top: 10px;
        }
      }

      .key-btn {
        width: 36px;
        height: 40px;
        background: $border-dark;
        border: none;
        border-radius: 4px;
        color: $white;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.1s, transform 0.1s;
        text-transform: uppercase;

        &:active {
          background: $primary;
          transform: scale(0.95);
        }

        &.action {
          width: auto;
          padding: 0 1.5rem;
          font-size: 0.9rem;
        }

        &.primary {
          background: $primary;
          color: $bg-dark;

          &:hover {
            background: $primary-hover;
          }
        }
      }
    }
  }
}

.flip-move {
  transition: transform 0.5s ease;
}

.flip-enter-active,
.flip-leave-active {
  transition: all 0.4s ease;
}

.flip-enter-from,
.flip-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.flip-leave-active {
  position: absolute;
}

@media (max-width: $mobile) {
  .auth-card {
    padding: 1rem;
  }

  .virtual-keyboard {
    .key-btn {
      width: 30px;
      height: 35px;
      font-size: 0.8rem;
    }
  }
}

</style>