<template>
  <div id="app">
    <h1 class="font-bold text-3xl text-primary-400">Plantjes</h1>
    <ul
      class="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <Plant v-for="plant in plants" :key="plant.id" :plant="plant" />
    </ul>
  </div>
</template>

<script>
import Plant from "@/components/Plant.vue";

const sheetUrl =
  "https://spreadsheets.google.com/feeds/list/1A0mt7xerzwWJN-PVhBhtDTdBIDQzn5sJex_sI7Hp2gw/1/public/values?alt=json";

const cols = [
  "name",
  "nickname",
  "scientificname",
  "sun",
  "water",
  "humidity",
  "care",
  "notes",
  "joinedat",
  "image"
];

const parseData = function(data) {
  console.debug("parseData", data);
  return data.feed.entry.map((entry, index) => {
    const obj = {
      id: index
    };
    cols.map(col => {
      obj[col] = entry[`gsx$${col}`].$t;
    });
    return obj;
  });
};

export default {
  name: "App",
  components: {
    Plant
  },
  data() {
    return {
      plants: []
    };
  },
  methods: {
    async fetchPlants() {
      const request = await fetch(sheetUrl);
      const data = await request.json();
      this.plants = parseData(data);
    }
  },
  mounted() {
    this.fetchPlants();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
