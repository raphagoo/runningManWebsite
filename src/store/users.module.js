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

    addUser({commit}, user){
        return new Promise((resolve, reject) => {
            api.post('/user/register', user)
            .then(response => {
                commit('addUserSuccess', response.data)
                resolve(response)
            }, error => {
                reject(error)
            })
        })
    },

    updateUser({commit}, user){
        return new Promise((resolve, reject) => {
            api.put('/user/' + user._id, {
                username: user.username,
                isAdmin: user.isAdmin
            })
                .then(response => {
                    commit('updateUserSuccess', response.data)
                    resolve(response)
                }, error => {
                    reject(error)
                })
        })
    },

    deleteUser({commit}, user){
        api.delete('/user/'+ user._id)
        .then(response => {
            commit('deleteUserSuccess', response.data)
        })
    }
}

const mutations = {
    getAllUsersSuccess(state, users){
        state.all = users
        state.selected = null
    },
    updateUserSuccess(state, user){
        let index = state.all.findIndex(x => x._id === user._id)
        state.all[index] = user
    },
    getUserSuccess(state, user){
        state.selected = user
    },
    addUserSuccess(state, user){
        state.all.push(user)
    },
    deleteUserSuccess(state, user){
        state.all = state.all.filter(function( obj ) {
            return obj._id !== user._id;
        });
    }
}
export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};