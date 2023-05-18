<script setup>
import { ref, computed, defineAsyncComponent } from 'vue';
import { useRoute, RouterLink, RouterView } from 'vue-router';

const Sidebar = defineAsyncComponent(() => import('./components/Sidebar.vue'));

const route = useRoute();
const isShowSidebar = ref(false);

const title = computed(() => {
  return route.path.toLowerCase().includes('pokemon') ? 'Pokemon' : 'Starship';
});

function showSidebar() {
  isShowSidebar.value = true;
};

function hideSidebar() { isShowSidebar.value = false };
</script>

<template>
  <div class="header">
    <span
      class="hamburger-btn"
      @click="showSidebar"
    >
      &#9776;
    </span>
    <h2 class="title">
      {{ title }}
    </h2>
  </div>

  <Sidebar
    v-if="isShowSidebar"
    @close="hideSidebar"
  />

  <RouterView />
</template>

<style scoped>
.header {
  display: flex;
  height: 60px;
  width: 100%;
  margin: 0;
  padding: 0;
  align-items: center;
  background-color: #5CC6D0;
  box-shadow: 0px 2px 20px -10px rgba(0,0,0,0.75);
  -webkit-box-shadow: 0px 2px 20px -10px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 2px 20px -10px rgba(0,0,0,0.75);
}

.title {
  color: white;
  margin-left: 20px;
}

.hamburger-btn {
  margin-left: 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}
</style>
