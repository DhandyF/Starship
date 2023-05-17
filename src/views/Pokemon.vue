<script setup>
import { ref, reactive, onMounted, computed, defineAsyncComponent } from 'vue';

const Details = defineAsyncComponent(() => import('../components/DetailsPokemon.vue'));

const baseUrl = 'https://pokeapi.co/api/v2/pokemon/'
const data = reactive({});
const pokemonList = ref([]);
const pokemonName = ref('');

const isFound = computed(() => {
  return pokemonList.value.length > 0;
})

onMounted( async() => {
  await getPokemon(baseUrl);
});

async function getPokemon(url) {
  await fetch(url, {
    method: 'GET'
  }).then( async(res) => {
    data.value = await res.json();
    data.value.results.forEach(pokemon => {
      pokemonList.value.push(pokemon);
    });

    if (hasSpace()) {
      getOtherPokemon();
    }
  }).catch((err) => {
    pokemonList.value = [];
  })
}

function hasSpace() {
  return document.body.scrollHeight <= window.innerHeight;
}

function getOtherPokemon() {
  let isHasNext = data.value.next !== null;
  if (isHasNext) {
    getPokemon(data.value.next);
  }
}

window.onscroll = () => {
  let reachBottom = document.documentElement.scrollTop + window.innerHeight
    >= document.documentElement.offsetHeight - 10;

  if (reachBottom) {
    getOtherPokemon();
  }
}

const isShowDetail = ref(false);
const selectedPokemon = reactive({});

function getDetail(pokemon) {
  isShowDetail.value = true;
  selectedPokemon.value = pokemon;
}

function hideDetail() {
  isShowDetail.value = false;
}

async function searchPokemon() {
  if (pokemonName.value === '') {
    pokemonList.value = [];
    await getPokemon(baseUrl);
  } else {
    await fetch(`${baseUrl}${pokemonName.value.toLocaleLowerCase()}/`, {
      method: 'GET'
    }).then( async(res) => {
      const response = await res.json();
      pokemonList.value = [];
      pokemonList.value.push(response);
    }).catch((err) => {
      pokemonList.value = [];
    })
  }
}

function eventEnter(event) {
  if (event.key === 'Enter') {
    searchPokemon();
  }
}
</script>

<template>
  <div class="container">
    <div class="search">
      <input
        class="search-field"
        type="text"
        v-model="pokemonName"
        placeholder="Find your pokemon"
        @keyup="eventEnter"
      >
      <button
        class="search-btn"
        @click="searchPokemon"
      >
        Search
      </button>
    </div>
    <div class="content">
      <div
        class="items"
        v-for="(pokemon) in pokemonList"
        :key="pokemon"
        @click="getDetail(pokemon)"
      >
        <div>{{ pokemon.name }}</div>
      </div>
    </div>
    <div
      v-if="!isFound"
      class="not-found"
    >
      &#9888; Pokemon Not Found &#9888;
    </div>

    <Details
      v-if="isShowDetail"
      :pokemon="selectedPokemon.value"
      @close="hideDetail"
    />
  </div>
</template>

<style scoped>
.container {
  margin: 40px 60px;
  font-family: 'Trebuchet MS', sans-serif;
  font-size: 14px;
}

.search {
  width: 100%;
  margin-bottom: 30px;
}

.search-field {
  height: 20px;
  width: 30%;
  min-width: 150px;
  margin: 0 10px 0 20px;
  padding: 5px 10px;
  border: 2px solid #bff5d4;
  border-radius: 5px;
  outline: none;
  font-family: 'Trebuchet MS', sans-serif;
}

.search-field:focus {
  border: 2px solid #5CC6D0;
}

.search-btn {
  height: 30px;
  width: fit-content;
  padding: 0 20px;
  font-weight: bold;
  color: #1a8791;
  border: 1px solid #5CC6D0;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.search-btn:hover {
  color: white;
  background-color: #5CC6D0;
}

.content {
  display: flex;
  flex-wrap: wrap;
}

.items {
  display: flex;
  height: 40px;
  width: 18%;
  min-width: 150px;
  margin: 10px;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  border: 2px solid #bff5d4;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.not-found {
  display: flex;
  width: 100vw;
  margin-top: 50px;
  font-size: 20px;
  color: rgb(252, 86, 86);
  justify-content: center;
}

.items:hover {
  background-color: #BFF0F5;
  box-shadow: 0px 0px 15px 2px rgba(191,240,245,1);
  -webkit-box-shadow: 0px 0px 15px 2px rgba(191,240,245,1);
  -moz-box-shadow: 0px 0px 15px 2px rgba(191,240,245,1);
}

@media (max-width: 485px) {
  .container {
    margin: 40px 30px;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .content {
    justify-content: center;
  }
}

@media (max-width: 368px) {
  .search-field {
    margin-bottom: 10px;
  }
}
</style>