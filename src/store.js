import Vuex from 'vuex';
import Vue from 'vue';

import { router } from './router/index';
import Axios from 'axios';

Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        token: localStorage.getItem('accessToken') || '',
    },

    getters: {
        isLoggedIn: (state) => {
            return state.isLoggedIn;
        },

        getToken: (state) => {
            return state.token;
        },

    },

    mutations: {
        updateIsLoggedIn: (state) => {
            Axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`
            state.isLoggedIn = state.token != null;
        },

        updateToken: (state, token) => {
            state.token = token;
        },

        clearToken: (state) => {
            localStorage.removeItem("token");
            state.token = null;
        },
    },
    actions: {
        clearToken({ commit }) {
            commit('clearToken')
        },

        loginLogout({ commit }) {
            commit('updateIsLoggedIn')
        },

        logOut({ commit }) {
            commit('clearToken');
            commit('updateIsLoggedIn');
        },

        async doLogin({ commit }, loginData) {
            try {
                let token = (await Axios.post(`https://localhost:44391/users/authenticate`, { username: loginData.username, password: loginData.password }));
                if (token.response != undefined && token.response.status === 400) {
                    alert(token.response.data.message)
                } else {
                    localStorage.setItem('token', token.data);
                    commit('updateToken', token.data);
                    commit('updateIsLoggedIn')
                    Axios.defaults.headers.common["Authorization"] = `Bearer ${token.data}`
                    router.push('/');
                }

            } catch (error) {
                alert(error)
            }

        },

        async doRegister({ commit }, registerData) {
            try {
                let token = (await Axios.post(`https://localhost:44391/users/register`, { username: registerData.username, password: registerData.password })).data;
                localStorage.setItem('token', token);
                commit('updateToken', token);
                commit('updateIsLoggedIn')
                Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
                router.push('/');
            } catch (error) {
                alert("err")
            }
        },
    }
});