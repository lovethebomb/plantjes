<template>
  <ul
    class="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <Plant v-for="plant in plants" :key="plant.id" :plant="plant" />
  </ul>
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

async function fetchPlants() {
  const request = await fetch(sheetUrl);
  const data = await request.json();
  return parseData(data);
}

function parseData(data) {
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
}

export default {
  components: {
    Plant
  },
  async setup() {
    const plants = await fetchPlants();
    return {
      plants
    };
  }
};
</script>
