<template>
  <div id="app">
    <h1 class="font-bold text-3xl text-primary-400">Plantjes</h1>
    <Suspense>
      <template #default>
        <PlantList />
      </template>
      <template #fallback>
        <p>Loading Plants...</p>
      </template>
    </Suspense>
  </div>
</template>

<script>
import PlantList from "@/components/PlantList.vue";

export default {
  components: {
    PlantList
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
