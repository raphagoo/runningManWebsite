import $log from 'logger';
import api from '../interfaces/apiInterface';
import router from '../router';

const user = JSON.parse(sessionStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    //Connexion
    login({dispatch, commit}, user){// eslint-disable-line no-unused-vars
        commit('loginRequest', user);
        console.log(user)
        api.post('/user/login', user, { headers:{"Content-Type": "application/json"}})
            .then(
                response => {
                    sessionStorage.setItem('token', (`${response.data.token_type} ${response.data.access_token}`))
                    commit('loginSuccess', response.data)
                    router.push({path: '/'})
                },
                error => {
                    $log.info('Erreur : ', error)
                }
            );
    },

    logout(){
        sessionStorage.removeItem('token');
        router.push('/')
    }
}

const mutations = {
    loginRequest(){
        $log.info('account.module.login.request')
    },
    loginSuccess(state, token){
        $log.info('account.module.login.success')
        state.token = token
    }
}

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};