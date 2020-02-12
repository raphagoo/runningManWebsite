<template>
    <div class="container">
        <Header/>
        <md-tabs class="md-primary" md-alignment="centered" md-sync-route>
          <md-tab id="tab-home" to="/" md-label="Home" md-icon="home" exact>
                  <vue-particles
                color="#dedede"
                :particleOpacity="0.7"
                :particlesNumber="80"
                shapeType="circle"
                :particleSize="4"
                linesColor="#dedede"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
              >
              </vue-particles>
              <HomeTab/>
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
    import HomeTab from '../components/HomeTab.vue'
    import UserTab from '../components/UserTab.vue'
    import RaceTab from '../components/RaceTab.vue'
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    export default {
        name: "Home",
        components: {Header, Footer, UserTab, RaceTab, HomeTab}
    }
</script>

<style scoped>
.md-tab{
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 93vh;
}
    #particles-js{
          position: absolute;
          width: 100%;
          height: 100%;
          z-index: 0;
    }
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
