import $log from 'logger';
import api from '../interfaces/apiInterface';

const state = {
    all: {}
}

const actions = {
    
    getAllUsers({commit}){
        return new Promise((resolve, reject) => {
            api.get('/user/list')
            .then(response => {
                commit('getAllUsersSuccess', response.data)
                resolve(response)
            }, error => {
                $log.info(error)
                reject(error)
            })
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