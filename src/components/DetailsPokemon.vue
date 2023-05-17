<script setup>
import { reactive, defineEmits, defineProps, onMounted } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps(['pokemon']);

onMounted(() => {
  fetchDetail();
});

const pokemonDetails = reactive({});

async function fetchDetail() {
  await fetch(`https://pokeapi.co/api/v2/pokemon/${props.pokemon.name}/`, {
    method: 'GET'
  }).then( async(res) => {
    const response = await res.json();
    pokemonDetails.value = response;
    console.log(response);
  })

  await fetch('https://pokeapi.co/api/v2/ability/66/', {
    method: 'GET'
  }).then( async(res) => {
    let response = await res.json();
    console.log('ability', response);
  })
}

function typeColor(type) {
  const COLORS = {
    'normal': 'background-color: #AAAA99',
    'fighting': 'background-color: #BB5544',
    'flying': 'background-color: #8899FF',
    'poison': 'background-color: #B97FC9',
    'ground': 'background-color: #DBB954',
    'rock': 'background-color: #BBAA66',
    'bug': 'background-color: #729F3F',
    'ghost': 'background-color: #6666BB',
    'steel': 'background-color: #AAAABB',
    'fire': 'background-color: #FD7D24',
    'water': 'background-color: #4592C4',
    'grass': 'background-color: #77CC55',
    'electric': 'background-color: #FFCC33',
    'psychic': 'background-color: #FF5599',
    'ice': 'background-color: #66CCFF',
    'dragon': 'background-color: #7766EE',
    'dark': 'background-color: #775544',
    'fairy': 'background-color: #FDB9E9',
    'unknown': 'background-color: #AAAA99',
    'shadow': 'background-color: #AAAA99'
  }

  return COLORS[type];
}
</script>

<template>
  <div
    v-if="pokemonDetails.value"
    class="details-container"
  >
    <div class="backdrop" @click="emit('close')"/>
    <div class="details slide-in">
      <span class="close-btn" @click="emit('close')">X</span>
      <div class="name">{{ pokemonDetails.value.name }}</div>
      <div class="image">
        <img
          :src="pokemonDetails.value.sprites.front_default"
          :alt="pokemonDetails.value.name"
        >
      </div>
      <div class="type">
        <div
          class="type-item"
          v-for="type in pokemonDetails.value.types"
          :key="type.slot"
          :style="typeColor(type.type.name)"
        >
          {{ type.type.name}}
        </div>
      </div>
      <div style="display: flex">
        <div class="stats">
          <div class="title">Stats</div>
          <div
            class="stats-item"
            v-for="stats in pokemonDetails.value.stats" :key="stats"
          >
            <div class="stats-name">{{ stats.stat.name }}</div>
            <span>{{ stats.base_stat }}</span>
          </div>
          <div class="stats-item">
            <div class="stats-name">Height</div>
            <span>{{ pokemonDetails.value.height }}</span>
          </div>
          <div class="stats-item">
            <div class="stats-name">Weight</div>
            <span>{{ pokemonDetails.value.weight }}</span>
          </div>
        </div>
        <div class="ability">
          <div class="title">Abilities</div>
          <div
            class="ability-item"
            v-for="ability in pokemonDetails.value.abilities"
            :key="ability"
          >
            {{ ability.ability.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
}

.backdrop {
  height: 100vh;
  width: 50vw;
  background-color: #7F7F7F;
  opacity: 0.4;
}

.details {
  height: 100vh;
  width: 50vw;
  background-color: white;
  text-transform: capitalize;
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
}

.slide-in {
  animation: slide-in 0.5s forwards;
  -webkit-animation: slide-in 0.5s forwards;
}

@keyframes slide-in {
  100% { transform: translateX(0%); }
}

@-webkit-keyframes slide-in {
  100% { -webkit-transform: translateX(0%);}
}

.name {
  margin-top: 20px;
  width: 100%;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
}

.image {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}

.type {
  display: flex;
  width: 100%;
  margin-top: 10px;
  align-content: center;
  justify-content: center;
}

.type-item {
  margin: 0 5px;
  padding: 3px 10px;
  border-radius: 3px;
  color: white;
}

.stats {
  margin-top: 20px;
  width: 50vw;
}

.stats-item {
  display: flex;
  padding: 0 30px;
}

.stats-name {
  width: 60%;
  margin: 0 20px 10px 0;
  text-align: right;
  color: gray;
}

.ability {
  margin-top: 20px;
  width: 50vw;
}

.ability-item {
  margin-bottom: 10px;
  font-size: 16px;
}

.title {
  margin-bottom: 10px;
  padding: 0 30px;
  font-size: 24px;
  font-weight: bold;
}

.close-btn {
  position: relative;
  top: 10px;
  margin: 20px;
  font-family: 'Comic Sans MS', sans-serif;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}

@media (max-width: 846px) {
  .details {
    width: 100vw;
  }
}
</style>