<template>
    <div class="container">
    <md-tabs class="md-primary" md-alignment="centered" md-sync-route>
      <md-tab id="tab-home" to="/" md-label="Home" exact>
          Test
      </md-tab>
      <md-tab id="tab-users" to="/users" md-label="Users">
          <UserTab/>
      </md-tab>
      <md-tab id="tab-races" to="/races" md-label="Races">
          <RaceTab/>
      </md-tab>
    </md-tabs>
    </div>
</template>

<script>
    import UserTab from '../components/UserTab.vue'
    import RaceTab from '../components/RaceTab.vue'

    export default {
        name: "Home",
        components: {UserTab, RaceTab},
        created(){

        }
    }
</script>

<style scoped>
    .container{
        display: block;
        position: relative;
        min-width: 100%;
        min-height: 100%;
        height: 100%;
        width: 100%;
    }
</style>
