<template>
  <div class="home">
    
    <h1>Races</h1>
    <div :key="race._id" v-for="race in selected.races">
        {{race.name}}
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'userRaces',
    components: {
    },
    computed: {
        ...mapState({
            selected: state => state.users.selected
        })
    },
    created(){
        this.getUser(this.$route.params.id)
    },
    data(){
      return{
        
      }
    },
    methods: {
      ...mapActions('users', {
          getUser: 'getUser'
      }),
    }
}
</script>
<style lang="scss">
 
</style>
