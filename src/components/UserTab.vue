<template>
    <div class="container">
        <md-button @click="retrieveAllUsers()" class="md-raised md-primary">Retrieve all users</md-button>
        <md-table :value="users.all" md-card md-sort="name" md-sort-order="asc">
           <md-table-row slot="md-table-row" slot-scope="{ item }">
               <md-table-cell md-label="ID" md-sort-by="id">{{item._id}}</md-table-cell>
               <md-table-cell md-label="Username" md-sort-by="username">{{item.username}}</md-table-cell>
               <md-table-cell md-label="Actions"></md-table-cell>
           </md-table-row>
        </md-table>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: "UserTab",
        computed: {
            ...mapState({
            users: state => state.users,
            races: state => state.races,
        }),
        },
        created(){
            
        },
        methods: {
            ...mapActions('users', {
              getAllUsers: 'getAllUsers'
            }),
            retrieveAllUsers(){
                console.log('test')
                this.getAllUsers()
            }
        }
    }
</script>

<style scoped>
    .md-table{
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }
</style>