import $log from 'logger';
import api from '../interfaces/apiInterface';
import {router} from '../router';

const user = JSON.parse(sessionStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    //Connexion
    login({dispatch, commit}, user){// eslint-disable-line no-unused-vars
        return new Promise((resolve, reject) => {
            commit('loginRequest', user);
            api.post('/user/login', user, { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        sessionStorage.setItem('user', response.data)
                        commit('loginSuccess', response.data)
                        resolve(response)
                    },
                    error => {
                        $log.info('Erreur : ', error)
                        reject(error)
                    }
                );
        })
    },

    logout(){
        sessionStorage.removeItem('user');
        router.push('/')
    }
}

const mutations = {
    loginRequest(){
        $log.info('account.module.login.request')
    },
    loginSuccess(state, data){
        $log.info('account.module.login.success')
        state.user = data
    }
}

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
