<template>
<div>
    <div class="lastRacesContainer">
        <h1 class="md-headline">Courses des 7 derniers jours</h1>
        <line-chart :messages="{empty: 'No data'}" :colors="['blue', 'blue']" xtitle="Date" ytitle="Courses" :data="races.lastRaces"></line-chart>
    </div>
    <div class="geoChart">
        <h1 class="md-headline">Carte des courses</h1>
        <geo-chart :data="races.countryData"></geo-chart>
    </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
    export default {
        name: "RaceTab",
        computed: {
        ...mapState({
            races: state => state.races
        })
    },
    created(){
        this.getRacesStats()
        this.getCountryStats()
    },
    methods: {
    ...mapActions('races', {
        getRacesStats: 'getRacesStats',
        getCountryStats: 'getCountryStats'
    })
    }
    }
</script>

<style lang="scss" scoped>
h1{
    text-align: center;
    padding-bottom: 10px;
}
.lastRacesContainer{
        width: 70%;
        position: relative;
        margin-left: auto;
        margin-right: auto;
    }
</style>