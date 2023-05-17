<script setup>
import { ref, reactive, defineEmits, defineProps, onMounted } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps(['starship']);

onMounted(() => {
  fetchDetail();
});

const starshipDetails = reactive({});

async function fetchDetail() {
  console.log('url', props.starship.url);
  await fetch(`${props.starship.url}`, {
    method: 'GET'
  }).then( async(res) => {
    const response = await res.json();
    starshipDetails.value = response;
    console.log('detail', response);
  })

  if (starshipDetails.value.pilots.length > 0) {
    getPilots(starshipDetails.value.pilots);
  }

  if (starshipDetails.value.films.length > 0) {
    getFilms(starshipDetails.value.films);
  }
}

const pilots = ref([]);

async function getPilots(arrayPilot) {
  pilots.value = [];

  arrayPilot.forEach(async (url) => {
    await fetch(url, {
      method: 'GET'
    }).then( async(res) => {
      let response = await res.json();
      pilots.value.push(response);
    }).catch((err) => console.log(err));
  });
  console.log('pilots', pilots.value);
}

const films = ref([]);

async function getFilms(arrayFilm) {
  films.value = [];

  arrayFilm.forEach(async (url) => {
    await fetch(url, {
      method: 'GET'
    }).then( async(res) => {
      let response = await res.json();
      films.value.push(response);
    }).catch((err) => console.log(err));
  });

  console.log('films', films.value);
}
</script>

<template>
  <div
    v-if="starshipDetails.value"
    class="details-container"
  >
    <div class="backdrop" @click="emit('close')"/>
    <div class="details slide-in">
      <span class="close-btn" @click="emit('close')">X</span>
      <div class="name">{{ starshipDetails.value.name }}</div>

      <div class="attributes">
        <div class="title">Details</div>

        <div class="attribute-item">
          <div class="attribute-name">Model</div>
          <span>{{ starshipDetails.value.model }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Starship Class</div>
          <span>{{ starshipDetails.value.starship_class }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Manufacturer</div>
          <span>{{ starshipDetails.value.manufacturer }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">MGLT</div>
          <span>{{ starshipDetails.value.MGLT }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Max Atmosphering Speed</div>
          <span>{{ starshipDetails.value.max_atmosphering_speed }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Crew</div>
          <span>{{ starshipDetails.value.crew }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Passengers</div>
          <span>{{ starshipDetails.value.passengers }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Cargo Capacity</div>
          <span>{{ starshipDetails.value.cargo_capacity }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Hyperdrive Rating</div>
          <span>{{ starshipDetails.value.hyperdrive_rating }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Length</div>
          <span>{{ starshipDetails.value.length }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Consumables</div>
          <span>{{ starshipDetails.value.consumables }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name"><b>Cost</b></div>
          <span><b>{{ starshipDetails.value.cost_in_credits }}</b></span>
        </div>
      </div>

      <div class="other-info">
        <div class="pilot">
          <div class="title">Pilots</div>
          <div
            class="pilot-item"
            v-for="pilot in pilots"
            :key="pilot.url"
          >
            {{ pilot.name }}
          </div>
        </div>
        <div class="film">
          <div class="title">Films</div>
          <div
            class="film-item"
            v-for="film in films"
            :key="film.url"
          >
            {{ film.title }}
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
  margin: 20px 0;
  width: 100%;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
}

.cost {
  width: 100%;
  margin-top: 20px;
  text-align: center;
  color: gray;
}

.attributes {
  margin-top: 20px;
  width: 100%;
}

.attribute-item {
  display: flex;
  padding: 0 30px;
}

.attribute-name {
  width: 40%;
  min-width: 200px;
  margin: 0 20px 10px 0;
  text-align: right;
  color: gray;
}

.other-info {
  display: flex;
}

.pilot {
  margin-top: 40px;
  width: 50vw;
}

.pilot-item {
  margin-bottom: 10px;
  padding-left: 50px;
  font-size: 16px;
}

.film {
  margin-top: 40px;
  width: 50vw;
}

.film-item {
  margin-bottom: 10px;
  padding-left: 50px;
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