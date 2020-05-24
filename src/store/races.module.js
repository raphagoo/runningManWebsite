import api from "../interfaces/apiInterface";

const state = {}
const actions = {
    listRaces({commit}){
        api.get('/race')
        .then(response => {
            commit('listRacesSuccess', response.data)
        })
    },
    getRacesStats({commit}){
        api.get('/race/all/stats')
        .then(response => {
            commit('getRacesStatsSuccess', response.data)
        })
    },
    getCountryStats({commit}){
        api.get('/race/country/stats')
        .then(response => {
            commit('getCountryStatsSuccess', response.data)
        })
    },
    getDistancesStats({commit}){
        api.get('/race/distances/stats')
        .then(response => {
            commit('getDistancesStatsSuccess', response.data)
        })
    }
}
const mutations = {
    listRacesSuccess(state, data){
        state.racesNumber = data.length
        state.totalDistance = 0
        data.forEach(race => {
            if(race.distance !== undefined){
                state.totalDistance = state.totalDistance + race.distance
            }
        })
        state.averageDistance = state.totalDistance / state.racesNumber
        state.averageDistance = state.averageDistance.toFixed(1)
        state.totalDistance = state.totalDistance.toFixed(1)
    },
    getRacesStatsSuccess(state, data){
        state.lastRaces = {}
        data.stats.forEach(stat => {
            let splittedDate = stat.date.split('T')
            state.lastRaces[splittedDate[0]] = stat.count
        })
    },
    getCountryStatsSuccess(state, data){
        state.countryData = data
    },
    getDistancesStatsSuccess(state, data){
        state.distancesData = data
    }
}

export const races = {
    namespaced: true,
    state,
    actions,
    mutations
};
