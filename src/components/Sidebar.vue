<script setup>
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const emit = defineEmits(['close']);
const router = useRouter();

function changeAPI(api) {
  if (api === 'starship') {
    router.push('/')
  } else {
    router.push('/pokemon');
  }
  emit('close')
}
</script>

<template>
  <div class="sidebar">
    <div class="content slide-in">
      <div class="sidebar-title">API</div>
      <div
        class="sidebar-item"
        @click="changeAPI('starship')"
      >
        Starship
      </div>
      <div
        class="sidebar-item"
        @click="changeAPI('pokemon')"
      >
        Pokemon
      </div>
    </div>
    <div
      class="backdrop"
      @click="emit('close')"
    />
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
}

.sidebar-title {
  margin-bottom: 25px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: rgb(0, 141, 141);
}

.sidebar-item {
  margin: 15px 0 0 30px;
  font-size: 18px;
  cursor: pointer;
}

.sidebar-item:hover {
  color: rgb(2, 175, 175);
}

.content {
  height: 100vh;
  width: 200px;
  padding-top: 30px;
  background-color: white;
  transform: translateX(-100%);
  -webkit-transform: translateX(-100%);
}

.backdrop {
  height: 100vh;
  width: calc(100vw - 200px);
  background-color: #7F7F7F;
  opacity: 0.4;
}

.slide-in {
  animation: slide-in 0.5s forwards;
  -webkit-animation: slide-in 0.5s forwards;
}

@keyframes slide-in {
  100% { transform: translateX(0%);}
}

@-webkit-keyframes slide-in {
  100% { transform: translateX(0%);}
}
</style>