<template>
  <div class="flex min-h-screen bg-gray-100">
    <div class="flex flex-col md:flex-row w-full">
      <div class="hidden md:flex md:w-1/2 items-center justify-center">
        <img src="@/assets/pokeball.png" alt="Pokeball" class="w-2/3 h-auto" />
      </div>
      <div class="flex items-center justify-center w-full md:w-1/2 p-8 bg-white">
        <div class="w-full max-w-md">
          <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
          <form @submit.prevent="handleLogin">
            <div class="mb-4">
              <input v-model="username" id="login" type="text" placeholder="Enter your Username" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <div class="mb-4">
              <input v-model="password" id="password" type="password" placeholder="Enter your Password" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500" />
            </div>
            <button type="submit" class="w-full p-3 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Login</button>
            <p v-if="error" class="text-red-500 mt-4 text-center">{{ error }}</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    };
  },
  methods: {
    ...mapActions(['login']),
    async handleLogin() {
      const success = await this.login({
        username: this.username,
        password: this.password
      });
      if (success) {
        this.$router.push('/profile');
      } else {
        this.error = 'The username or password you entered is incorrect';
      }
    }
  }
}
</script>

<style scoped>
</style>