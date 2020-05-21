<template>
<div>
    <md-button @click="getCountryStats();getDistancesStats();getRacesStats();" class="md-raised md-primary"><md-icon>refresh</md-icon> Refresh Stats list</md-button>
    <div class="lastRacesContainer">
        <h1 class="md-headline">Courses des 7 derniers jours</h1>
        <area-chart :messages="{empty: 'No data'}" xtitle="Date" ytitle="Courses" :data="races.lastRaces"/>
    </div>
    <div class="distancesRacesContainer">
        <h1 class="md-headline">Distances des courses</h1>
        <bar-chart :messages="{empty: 'No data'}" :data="races.distancesData"/>
    </div>
    <div class="geoChart">
        <h1 class="md-headline">Carte des courses</h1>
        <geo-chart :data="races.countryData"/>
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
        this.getRacesStats();
        this.getCountryStats();
        this.getDistancesStats()
    },
    methods: {
    ...mapActions('races', {
        getRacesStats: 'getRacesStats',
        getCountryStats: 'getCountryStats',
        getDistancesStats: 'getDistancesStats'
    })
    }
    }
</script>

<style lang="scss" scoped>
h1{
    text-align: center;
    padding-bottom: 10px;
}
.geoChart{
    margin-bottom: 5%;
}
.lastRacesContainer, .distancesRacesContainer{
        width: 70%;
        position: relative;
        margin-left: auto;
        margin-right: auto;
    }
</style>
