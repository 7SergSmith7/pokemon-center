<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8 text-center">Random Pokemon</h1>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else>
      <div class="pokemon bg-white rounded-lg shadow-lg p-6 mx-auto max-w-md">
        <h2 class="text-2xl font-semibold mb-4 text-center capitalize">{{ pokemon.name }}</h2>
        <div class="flex justify-center mb-4">
          <img :src="pokemon.sprites.front_default" alt="Pokemon Image" class="w-32 h-32 object-contain" />
        </div>
        <div class="text-center">
          <p class="mb-2"><strong>Height:</strong> {{ pokemon.height }}</p>
          <p class="mb-2"><strong>Weight:</strong> {{ pokemon.weight }}</p>
          <p class="mb-2"><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>
          <p class="mb-2"><strong>Types:</strong> <span v-for="(type, index) in pokemon.types" :key="index">{{ type.type.name }}<span v-if="index < pokemon.types.length - 1">, </span></span></p>
          <p class="mb-2"><strong>Abilities:</strong> <span v-for="(ability, index) in pokemon.abilities" :key="index">{{ ability.ability.name }}<span v-if="index < pokemon.abilities.length - 1">, </span></span></p>
        </div>
        <div class="flex justify-center mt-4">
          <button @click="fetchPokemon" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Show Another Pokemon
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pokemon: null,
      loading: true,
    };
  },
  methods: {
    getRandomPokemonId() {
      const min = 1;
      const max = 898;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    async fetchPokemon() {
      this.loading = true;
      const randomId = this.getRandomPokemonId();
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        this.pokemon = await response.json();
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchPokemon();
  },
};
</script>

<style scoped>
</style>