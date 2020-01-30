import $log from 'logger';
import api from '../interfaces/apiInterface';

const state = {
    all: {}
}

const actions = {
    getAllUsers({commit}){
        api.get('/user/list')
        .then(response => {
            commit('getAllUsersSuccess', response.data)
        }, error => {
            $log.debug(error)
        })
    }
}

const mutations = {
    getAllUsersSuccess(state, users){
        state.all = users
    }
}
export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};