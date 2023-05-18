<script setup>
import { defineProps } from 'vue';

const props = defineProps(['api'])
</script>

<template>
  <div class="not-found">
    &#9888; {{ props.api }} Not Found &#9888;
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  width: 100vw;
  margin-top: 50px;
  font-size: 20px;
  color: rgb(252, 86, 86);
  justify-content: center;
}
</style>