<template>
  <header class="bg-blue-500 text-white p-4">
    <nav class="flex flex-col sm:flex-row justify-between items-center">
      <div class="text-lg font-semibold mb-4 sm:mb-0">
        <router-link to="/">Pokemon Center</router-link>
      </div>
      <div class="flex space-x-4 items-center">
        <router-link class="hover:underline" to="/">Home</router-link>
        <router-link class="hover:underline" to="/pokemon">Pokemon</router-link>
        <router-link class="hover:underline" to="/profile">Profile</router-link>
        <button v-if="isAuthenticated" @click="handleLogout" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
</style>