<template>
  <div class="home">
    <form class="formLogin" @submit.prevent="loginForm">
      <h1>Running Man : Login Back-Office</h1>
      <md-field>
        <label for="username">Username</label>
        <md-input name="username" v-model="user.username"  />
      </md-field> 
      <md-field>
        <label for="password">Password</label>
        <md-input type="password" name="password" v-model="user.password" />
      </md-field> 
      <md-button type="submit" class="md-primary md-raised">Login</md-button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'home',
    components: {
    },
    data(){
      return{
        user: {
          username: null,
          password: null
        }
      }
    },
    methods: {
      ...mapActions('account', {
        login: 'login'
      }),
      loginForm(){
        this.login(this.user)
      }
    }
}
</script>
<style lang="scss">
  .formLogin{
  position: relative;
  width: 50%;
  margin-top: 15%;
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 768px){
    margin-top: 40%;
  }
    h1{
      text-align: center;
      @media (max-width: 768px){
        font-size: 20px;
      }
    }
    .md-button{
      text-align: center;
    }
  }
</style>
