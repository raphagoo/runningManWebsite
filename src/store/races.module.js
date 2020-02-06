import api from "../interfaces/apiInterface";

const state = {}
const actions = {
    getRacesStats({commit}){
        api.get('/race/all/stats')
        .then(response => {
            commit('getRacesStatsSuccess', response.data)
        })
    }
}
const mutations = {
    getRacesStatsSuccess(state, data){
        console.log(data)
        state.racesNumber = data.races.length
        state.totalDistance = 0
        data.races.forEach(race => {
            if(race.distance !== undefined){
                state.totalDistance = state.totalDistance + race.distance
            }
        })
        state.totalDistance = state.totalDistance / 1000
        state.averageDistance = state.totalDistance / state.racesNumber
        state.lastRaces = {}
        data.stats.forEach(stat => {
            let splittedDate = stat.date.split('T')
            state.lastRaces[splittedDate[0]] = stat.count
        })
    }
}

export const races = {
    namespaced: true,
    state,
    actions,
    mutations
};
