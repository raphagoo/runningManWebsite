import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import { account } from './account.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        account,
    },
    plugins: [createPersistedState()]
});