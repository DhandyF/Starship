<script setup>
import { ref, reactive, onMounted, computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import Loader from '../components/Loader.vue';
import NotFound from '../components/NotFound.vue';
import helpers from './helpers';

const Details = defineAsyncComponent(() => import('../components/DetailsStarship.vue'));

const store = useStore();
const baseUrl = 'https://swapi.dev/api/starships/'
const data = reactive({});
const starshipList = ref([]);
const isFetch = ref(false);
const isNotFound = ref(false);
const headerList = ['Name', 'Model', 'Starship Class', 'MGLT', 'Cost (Galactic credits)'];

onMounted( async() => {
  await getStarship(baseUrl);
});

async function getStarship(url) {
  isFetch.value = true;
  isNotFound.value = false;

  await fetch(url, {
    method: 'GET'
  }).then( async(res) => {
    isFetch.value = false;
    data.value = await res.json();
    data.value.results.forEach(starship => {
      starshipList.value.push(starship);
    });

    if (data.value.results.length === 0) {
      isNotFound.value = true;
    } else {
      if (helpers.hasSpace()) {
        getOtherStarship();
      }
    }
  }).catch((err) => {
    isFetch.value = false;
    alert('Failed to load data!');
  })
}

function getOtherStarship() {
  let isHasNext = data.value.next !== null;
  if (isHasNext) {
    getStarship(data.value.next);
  }
}

const starshipName = ref('');

async function searchStarship() {
  if (starshipName.value === '') {
    starshipList.value = [];
    await getStarship(baseUrl);
  } else {
    store.dispatch('addStarshipHistory', starshipName.value);
    isFetch.value = true;
    isNotFound.value = false;

    await fetch(`${baseUrl}?search=${starshipName.value}`, {
      method: 'GET'
    }).then( async(res) => {
      isFetch.value = false;
      const response = await res.json();
      starshipList.value = [];
      
      response.results.forEach(starship => {
        starshipList.value.push(starship);
      });
      
      if (response.results.length === 0) {
        isNotFound.value = true;
      }
    }).catch((err) => {
      isFetch.value = false;
      console.log(err);
      alert('Failed to load data!');
    })
  }
}

const isShowDetail = ref(false);
const starshipDetails = reactive({});

async function getDetail(starship) {
  await fetch(`${starship.url}`, {
    method: 'GET'
  }).then( async(res) => {
    const response = await res.json();
    starshipDetails.value = response;

    let pilots = [];
    if (starshipDetails.value.pilots.length > 0) {
      pilots = await getPilots(starshipDetails.value.pilots);
    }

    let films = [];
    if (starshipDetails.value.films.length > 0) {
      films = await getFilms(starshipDetails.value.films);
    }

    starshipDetails.value = {
      ...starshipDetails.value,
      pilots_detail: pilots,
      films_detail: films
    }

    isShowDetail.value = true;
  }).catch(() => {
    alert('Failed to get details starship!');
  });
}

const isFetchFilms = ref(false);

async function getFilms(arrayFilm) {
  let films = [];
  isFetchFilms.value = true;
  arrayFilm.forEach(async (url) => {
    await fetch(url, {
      method: 'GET'
    }).then( async(res) => {
      let response = await res.json();
      films.push(response);

      if (films.length === arrayFilm.length) {
        isFetchFilms.value = false;
      }
    }).catch(() => {
      alert('Failed to get films!');
    });
  });

  return films;
}

const isFetchPilots = ref(false);

async function getPilots(arrayPilot) {
  let pilots = [];
  isFetchPilots.value = true;

  arrayPilot.forEach(async (url) => {
    await fetch(url, {
      method: 'GET'
    }).then( async(res) => {
      let response = await res.json();
      pilots.push(response);

      if (pilots.length === arrayPilot.length) {
        isFetchPilots.value = false;
      }
    }).catch(() => {
      alert('Failed to get pilots!');
    });
  });

  return pilots;
}

function hideDetail() {
  isShowDetail.value = false;
}

function eventEnter(event) {
  if (event.key === 'Enter') {
    searchStarship();
    let elInput = document.getElementById('search-id');
    elInput.blur();
  }
}

window.onscroll = () => {
  let reachBottom = document.documentElement.scrollTop + window.innerHeight
    >= document.documentElement.offsetHeight;

  if (reachBottom) {
    getOtherStarship();
  }
}

function showHistory(e) {
  const elInput = document.getElementById('input-starship');
  let searchHistory = store.getters.getStarshipHistory;

  let elHistory = document.createElement('DIV');
  elHistory.setAttribute('id', 'history-list');
  elHistory.setAttribute('class', 'history-items');
  elHistory.style.position = 'absolute';
  elHistory.style.border = '1px solid grey';
  elHistory.style.width = '30%';
  elHistory.style.minWidth = '150px';

  elInput.appendChild(elHistory);
  searchHistory.forEach(history => {
    let elHisItem = document.createElement('DIV');
    elHisItem.setAttribute('class', 'history');
    elHisItem.style.height = '30px';
    elHisItem.style.minWidth = '150px';
    elHisItem.style.padding = '5px 10px';
    elHisItem.style.cursor = 'pointer';
    elHisItem.style.backgroundColor = 'white';
    elHisItem.innerHTML = history;
    elHisItem.innerHTML += "<input type='hidden' value='" + history + "'>";

    elHistory.appendChild(elHisItem);
  });
}

function closeHistory(e) {
  let elInput = document.getElementById('input-starship');
  let elHistory = document.getElementById("history-list");
  
  elInput.removeChild(elHistory)
}
</script>

<template>
  <div class="container">
    <div id="input-starship" class="search">
      <input
        id="search-id"
        class="search-field"
        type="text"
        v-model="starshipName"
        placeholder="Find your Starship"
        @keyup="eventEnter"
        @focus="showHistory"
        @blur="closeHistory"
      >
      <button
        class="search-btn"
        @click="searchStarship"
      >
        Search
      </button>
    </div>
    <div>
      <div class="header">
        <div
          class="col"
          v-for="header in headerList"
          :key="header"
        >
          {{ header }}
        </div>
      </div>
      <div
        v-for="starship in starshipList"
        :key="starship.name"
        class="items"
        @click="getDetail(starship)"
      >
        <div class="col">{{ starship.name }}</div>
        <div class="col">{{ starship.model}}</div>
        <div class="col">{{ starship.starship_class}}</div>
        <div class="col">{{ starship.MGLT }}</div>
        <div class="col">{{ starship.cost_in_credits}}</div>
      </div>
    </div>

    <Loader v-if="isFetch" />
    
    <NotFound
      v-if="isNotFound"
      api="Starship"
    />

    <Details
      v-if="isShowDetail && !isFetchFilms && !isFetchPilots"
      :starship="starshipDetails.value"
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
  min-width: 320px;
  margin-bottom: 30px;
}

.search-field {
  height: 20px;
  width: 30%;
  min-width: 150px;
  margin: 0 10px 0 0;
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

.header {
  display: flex;
  margin-bottom: 10px;
  padding: 0 20px;
  font-weight: bold;
}

.items {
  display: flex;
  height: 50px;
  min-width: 620px;
  margin-bottom: 15px;
  padding: 0 20px;
  align-items: center;
  border: 2px solid #bff5d4;
  background-color: white;
  cursor: pointer;
}
  
.col {
  width: 20%;
  min-width: 118px;
  padding: 0 5px;
}

.items:hover {
  background-color: #BFF0F5;
  box-shadow: 0px 0px 15px 2px rgba(191,240,245,1);
  -webkit-box-shadow: 0px 0px 15px 2px rgba(191,240,245,1);
  -moz-box-shadow: 0px 0px 15px 2px rgba(191,240,245,1);
}
</style>