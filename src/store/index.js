import { createStore } from 'vuex';

export default createStore({
    state: {
        isAuthenticated: localStorage.getItem('isAuthenticated') === 'true'
    },
    mutations: {
        login(state) {
            state.isAuthenticated = true;
            localStorage.setItem('isAuthenticated', 'true');
        },
        logout(state) {
            state.isAuthenticated = false;
            localStorage.removeItem('isAuthenticated');
        }
    },
    actions: {
        login({ commit }, credentials) {
            if (credentials.username === 'admin' && credentials.password === '12345') {
                commit('login');
                return true;
            } else {
                return false;
            }
        },
        logout({ commit }) {
            commit('logout');
        }
    },
    getters: {
        isAuthenticated: state => state.isAuthenticated
    }
});