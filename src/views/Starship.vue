<script setup>
import { ref, reactive, onMounted, computed, defineAsyncComponent } from 'vue';

const Details = defineAsyncComponent(() => import('../components/DetailsStarship.vue'));

const baseUrl = 'https://swapi.dev/api/starships/'
const data = reactive({});
const starshipList = ref([]);
const starshipName = ref('');

const isFound = computed(() => {
  return starshipList.value.length > 0;
})

onMounted( async() => {
  await getStarship(baseUrl);
});

async function getStarship(url) {
  await fetch(url, {
    method: 'GET'
  }).then( async(res) => {
    data.value = await res.json();
    data.value.results.forEach(starship => {
      starshipList.value.push(starship);
    });

    if (hasSpace()) {
      getOtherStarship();
    }

    console.log(data.value);
    console.log('list', starshipList.value);
  }).catch((err) => {
    starshipList.value = [];
    console.log(err);
  })
}

function hasSpace() {
  return document.body.scrollHeight <= window.innerHeight;
}

function getOtherStarship() {
  let isHasNext = data.value.next !== null;
  if (isHasNext) {
    getStarship(data.value.next);
  }
}

window.onscroll = () => {
  let reachBottom = document.documentElement.scrollTop + window.innerHeight
    >= document.documentElement.offsetHeight;

  if (reachBottom) {
    getOtherStarship();
  }
}

const isShowDetail = ref(false);
const selectedStarship = reactive({});

function getDetail(starship) {
  isShowDetail.value = true;
  selectedStarship.value = starship;
}

function hideDetail() {
  isShowDetail.value = false;
}

async function searchStarship() {
  if (starshipName.value === '') {
    starshipList.value = [];
    await getStarship(baseUrl);
  } else {
    console.log(`${baseUrl}?search=${starshipName.value}`);
    await fetch(`${baseUrl}?search=${starshipName.value}`, {
      method: 'GET'
    }).then( async(res) => {
      const response = await res.json();
      starshipList.value = [];
      
      response.results.forEach(starship => {
        starshipList.value.push(starship);
      });
      console.log(response);
    }).catch((err) => {
      starshipList.value = [];
      console.log(err);
    })
  }
}

function eventEnter(event) {
  if (event.key === 'Enter') {
    searchStarship();
  }
}
</script>

<template>
  <div class="container">
    <div class="search">
      <input
        class="search-field"
        type="text"
        v-model="starshipName"
        placeholder="Find your Starship"
        @keyup="eventEnter"
      >
      <button
        class="search-btn"
        @click="searchStarship"
      >
        Search
      </button>
    </div>
    <div class="content">
      <div class="header">
        <div class="col">Name</div>
        <div class="col">Model</div>
        <div class="col">Starship Class</div>
        <div class="col">MGLT</div>
        <div class="col">Cost</div>
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
    <div
      v-if="!isFound"
      class="not-found"
    >
      &#9888; Starship Not Found &#9888;
    </div>

    <Details
      v-if="isShowDetail"
      :starship="selectedStarship.value"
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
  /* display: flex;
  flex-wrap: wrap; */
}

.not-found {
  display: flex;
  width: 100vw;
  margin-top: 50px;
  font-size: 20px;
  color: rgb(252, 86, 86);
  justify-content: center;
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
}

.items:hover {
  background-color: #BFF0F5;
  box-shadow: 0px 0px 15px 2px rgba(191,240,245,1);
  -webkit-box-shadow: 0px 0px 15px 2px rgba(191,240,245,1);
  -moz-box-shadow: 0px 0px 15px 2px rgba(191,240,245,1);
}
</style>