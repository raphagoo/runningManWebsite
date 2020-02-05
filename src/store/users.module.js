import $log from 'logger';
import api from '../interfaces/apiInterface';

const state = {
    all: {},
    selected: {}
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
    },

    getUser({commit}, id){
        api.get('/user/' + id)
        .then(response => {
            console.log(response)
            commit('getUserSuccess', response.data)
        })
    },

    updateUser({commit}, user){
        return new Promise((resolve, reject) => {
            api.put('/user/' + user._id, user.toChange)
                .then(response => {
                    commit('updateUserSuccess', response.data)
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    }
}

const mutations = {
    getAllUsersSuccess(state, users){
        state.all = users
    },
    updateUserSuccess(state, user){
        let index = state.all.findIndex(x => x._id === user._id)
        state.all[index] = user
    },
    getUserSuccess(state, user){
        state.selected = user
    }
}
export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};