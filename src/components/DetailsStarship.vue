<script setup>
import { ref, reactive, defineEmits, defineProps, onMounted } from 'vue';

const emit = defineEmits(['close']);
const props = defineProps(['starship']);

const starshipDetails = props.starship;
</script>

<template>
  <div class="details-container">
    <div class="backdrop" @click="emit('close')"/>
    <div class="details slide-in">
      <span class="close-btn" @click="emit('close')">X</span>
      <div class="name">{{ starshipDetails.name }}</div>

      <div class="attributes">
        <div class="title">Details</div>

        <div class="attribute-item">
          <div class="attribute-name">Model</div>
          <span>{{ starshipDetails.model }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Starship Class</div>
          <span>{{ starshipDetails.starship_class }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Manufacturer</div>
          <span>{{ starshipDetails.manufacturer }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">MGLT</div>
          <span>{{ starshipDetails.MGLT }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Max Atmosphering Speed</div>
          <span>{{ starshipDetails.max_atmosphering_speed }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Crew</div>
          <span>{{ starshipDetails.crew }} Personel</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Passengers</div>
          <span>{{ starshipDetails.passengers }} People</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Cargo Capacity</div>
          <span>{{ starshipDetails.cargo_capacity }} Kilograms</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Hyperdrive Rating</div>
          <span>{{ starshipDetails.hyperdrive_rating }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Length</div>
          <span>{{ starshipDetails.length }} meters</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name">Consumables</div>
          <span>{{ starshipDetails.consumables }}</span>
        </div>
        <div class="attribute-item">
          <div class="attribute-name"><b>Cost</b></div>
          <span><b>{{ starshipDetails.cost_in_credits }}</b> Galactic credits</span>
        </div>
      </div>

      <div class="other-info">
        <div class="film">
          <div class="title">Films</div>
          <div
            class="film-item"
            v-for="film in starshipDetails.films_detail"
            :key="film.url"
          >
            {{ film.title }}
          </div>
          <div v-if="starshipDetails.films_detail.length === 0">
            <span class="film-item">No Film</span>
          </div>
        </div>
        <div class="pilot">
          <div class="title">Pilots</div>
          <div
            class="pilot-item"
            v-for="pilot in starshipDetails.pilots_detail"
            :key="pilot.url"
          >
            {{ pilot.name }}
          </div>
          <div v-if="starshipDetails.pilots_detail.length === 0">
            <span class="pilot-item">No Pilot</span>
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