<template>
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
</template>
<style lang="scss" scoped>

</style>
<script>
import UserTab from '../components/UserTab.vue'
import RaceTab from '../components/RaceTab.vue'
export default {
    name: 'Header',
    components: {UserTab, RaceTab}
}
</script>