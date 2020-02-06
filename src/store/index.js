import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import { account } from './account.module';
import { users } from './users.module';
import { races } from './races.module';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        account,
        users,
        races
    },
    plugins: [createPersistedState()]
});