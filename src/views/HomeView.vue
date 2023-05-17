<script setup>
import { onMounted } from 'vue';
import TheWelcome from '../components/TheWelcome.vue'

onMounted( async () => {
  // await fetch('https://swapi.dev/api/starships', {
  //   method: 'GET'
  // })
  //   .then( async (res) => {
  //     const response = await res.json();
  //     console.log(response);
  //   })
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
