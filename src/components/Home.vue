<template>
  <div class="container mx-auto p-4 text-center">
    <h1 class="text-4xl font-bold mb-8">Welcome to the Pokemon Center</h1>
    <p class="text-lg mb-8">Explore the world of Pokemon and learn more about your favorite characters!</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="pokemon-card bg-white rounded-lg shadow-lg p-4">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" alt="Bulbasaur" class="w-32 h-32 mx-auto">
        <h2 class="text-2xl font-semibold mt-4">Bulbasaur</h2>
      </div>
      <div class="pokemon-card bg-white rounded-lg shadow-lg p-4">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" alt="Charmander" class="w-32 h-32 mx-auto">
        <h2 class="text-2xl font-semibold mt-4">Charmander</h2>
      </div>
      <div class="pokemon-card bg-white rounded-lg shadow-lg p-4">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" alt="Squirtle" class="w-32 h-32 mx-auto">
        <h2 class="text-2xl font-semibold mt-4">Squirtle</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
</style>