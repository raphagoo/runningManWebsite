<template>
    <div class="homeContainer">
        <p class="md-display-2">Running Man - BackOffice</p>
        <p class="md-display-1"><span class="statNumber">{{races.totalDistance}}</span> km parcourus au total</p>
        <p class="md-display-1">Un total de <span class="statNumber">{{races.racesNumber}}</span> courses réalisées</p>
        <p class="md-display-1">Une moyenne de <span class="statNumber">{{races.averageDistance}}</span> km par course</p>
        <router-link to="/races"><md-button class="md-raised md-primary">Voir les stats</md-button></router-link>
    </div>
</template>
<style lang="scss" scoped>
    .homeContainer{
        text-align: center;
        .md-display-2{
            color: black;
        }
        .md-display-1{
            margin-bottom: 10vh;
            color: black;
            .statNumber{
                text-decoration: underline;
                font-weight: bold;
            }
        }
    }
</style>
<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'HomeTab',
    computed: {
        ...mapState({
            races: state => state.races
        })
    },
    created(){
        this.listRaces()
    },
    methods: {
    ...mapActions('races', {
        listRaces: 'listRaces',
    })
    }
}
</script>