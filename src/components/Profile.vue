<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-8 text-center">Pokemon Type Selector</h1>
    <div class="max-w-md mx-auto">
      <label for="pokemonType" class="block mb-2">Select a Pokemon Type:</label>
      <select id="pokemonType" v-model="selectedType" @change="resetAndFetchPokemonByType" class="block w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:border-blue-500">
        <option value="">Select Type</option>
        <option v-for="(type, index) in pokemonTypes" :key="index" :value="type">{{ type }}</option>
      </select>
    </div>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="paginatedPokemonList.length === 0" class="text-center">No Pokemon found for selected type.</div>
    <div v-else>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
            v-for="(pokemon, index) in paginatedPokemonList"
            :key="index"
            class="pokemon-card bg-white rounded-lg shadow-lg p-4 cursor-pointer"
            @click="selectedPokemon = pokemon"
        >
          <div class="flex justify-center mb-4">
            <img :src="pokemon.sprites.front_default" alt="Pokemon Image" class="w-32 h-32 object-contain" />
          </div>
          <h2 class="text-xl font-semibold mt-4 text-center capitalize">{{ pokemon.name }}</h2>
          <p class="text-center"><strong>Height:</strong> {{ pokemon.height }}</p>
          <p class="text-center"><strong>Weight:</strong> {{ pokemon.weight }}</p>
        </div>
      </div>
      <div class="flex justify-center mt-4 space-x-2">
        <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{'bg-blue-500 text-white': page === currentPage, 'bg-gray-200': page !== currentPage}" class="px-4 py-2 rounded">{{ page }}</button>
      </div>
    </div>
    <div v-if="selectedPokemon" @click.self="closePopup" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <div class="absolute top-2 right-2">
          <button @click="selectedPokemon = null" class="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div class="text-center">
          <h2 class="text-2xl font-semibold mb-4 capitalize">{{ selectedPokemon.name }}</h2>
          <img :src="selectedPokemon.sprites.front_default" alt="Pokemon Image" class="w-32 h-32 mx-auto mb-4 object-contain" />
          <p class="mb-2"><strong>Height:</strong> {{ selectedPokemon.height }}</p>
          <p class="mb-2"><strong>Weight:</strong> {{ selectedPokemon.weight }}</p>
          <p class="mb-2"><strong>Base Experience:</strong> {{ selectedPokemon.base_experience }}</p>
          <p class="mb-2"><strong>Types:</strong> <span v-for="(type, index) in selectedPokemon.types" :key="index">{{ type.type.name }}<span v-if="index < selectedPokemon.types.length - 1">, </span></span></p>
          <p class="mb-2"><strong>Abilities:</strong> <span v-for="(ability, index) in selectedPokemon.abilities" :key="index">{{ ability.ability.name }}<span v-if="index < selectedPokemon.abilities.length - 1">, </span></span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedType: '',
      pokemonTypes: [
        'normal', 'fire', 'water', 'grass', 'flying', 'fighting',
        'poison', 'electric', 'ground', 'rock', 'psychic', 'ice',
        'bug', 'ghost', 'steel', 'dragon', 'dark', 'fairy'
      ],
      pokemonList: [],
      paginatedPokemonList: [],
      selectedPokemon: null,
      loading: false,
      currentPage: 1,
      itemsPerPage: 20,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.pokemonList.length / this.itemsPerPage);
    },
  },
  methods: {
    async fetchPokemonByType() {
      if (!this.selectedType) {
        this.pokemonList = [];
        return;
      }
      this.loading = true;
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${this.selectedType}`);
        const data = await response.json();
        this.pokemonList = data.pokemon.map(p => p.pokemon);
        this.updatePaginatedList();
      } catch (error) {
        console.error('Error fetching Pokemon data by type:', error);
      } finally {
        this.loading = false;
      }
    },
    async fetchPokemon(name) {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return await response.json();
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
      }
    },
    async updatePaginatedList() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      const pagePokemons = this.pokemonList.slice(start, end);
      this.paginatedPokemonList = await Promise.all(pagePokemons.map(p => this.fetchPokemon(p.name)));
    },
    goToPage(page) {
      this.currentPage = page;
      this.updatePaginatedList();
    },
    resetAndFetchPokemonByType() {
      this.currentPage = 1;
      this.fetchPokemonByType();
    },
    closePopup() {
      this.selectedPokemon = null;
    }
  }
};
</script>

<style scoped>
.pokemon-card {
  transition: box-shadow 0.3s ease-in-out;
}
.pokemon-card:hover {
  box-shadow: 0 0 0 2px #3b82f6;
}
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>