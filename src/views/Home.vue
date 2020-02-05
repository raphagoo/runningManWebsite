<template>
    <div class="container">
        <Header/>
        <md-tabs class="md-primary" md-alignment="centered" md-sync-route>
          <md-tab id="tab-home" to="/" md-label="Home" md-icon="home" exact>
              Test
          </md-tab>
          <md-tab id="tab-users" to="/users" md-label="Users" md-icon="group">
              <UserTab/>
          </md-tab>
          <md-tab id="tab-races" to="/races" md-label="Races" md-icon="bar_chart">
              <RaceTab/>
          </md-tab>
        </md-tabs>
        <Footer/>
    </div>
</template>

<script>
    import UserTab from '../components/UserTab.vue'
    import RaceTab from '../components/RaceTab.vue'
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    export default {
        name: "Home",
        components: {Header, Footer, UserTab, RaceTab}
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
    .md-tabs, .md-content{
        min-height: 100vh;
    }
</style>
