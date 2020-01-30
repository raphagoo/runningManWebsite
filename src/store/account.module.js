import $log from 'logger';
import api from '../interfaces/apiInterface';
import {router} from '../router';


const token = sessionStorage.getItem('token');
const state = token
    ? { status: { loggedIn: true }, token }
    : { status: {}, user: null };

const actions = {
    //Connexion
    login({dispatch, commit}, user){// eslint-disable-line no-unused-vars
        return new Promise((resolve, reject) => {
            commit('loginRequest', user);
            api.post('/user/login', user, { headers:{"Content-Type": "application/json"}})
                .then(
                    response => {
                        sessionStorage.setItem('token', response.data.token)
                        commit('loginSuccess', response.data.user)
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
    loginSuccess(state, user){
        $log.info('account.module.login.success')
        state.user = user
    }
}

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};
