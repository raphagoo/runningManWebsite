<template>
<div>
    <div class="lastRacesContainer">
        <span class="md-headline">Courses des 7 derniers jours</span>
        <line-chart :messages="{empty: 'No data'}" :colors="['blue', 'blue']" xtitle="Date" ytitle="Courses" :data="races.lastRaces"></line-chart>
    </div>
    <div class="geoChart">
        <geo-chart :data="[['United States', 44], ['Germany', 23], ['Brazil', 22]]"></geo-chart>
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
    },
    methods: {
    ...mapActions('races', {
        getRacesStats: 'getRacesStats',
    })
    }
    }
</script>

<style lang="scss" scoped>
.md-headline{
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