<template>
    <div class="container">
        <md-button @click="retrieveAllUsers()" class="md-raised md-primary">Retrieve all users</md-button>
        <md-table md-fixed-header v-model="searched" md-card md-sort="username" md-sort-order="asc" @md-selected="onSelect">
            <md-table-toolbar>
                <div class="md-toolbar-section-start">
                    <h1 class="md-title">Users</h1>
                </div>
                <md-field md-clearable class="md-toolbar-section-end">
                  <md-input placeholder="Search by username..." v-model="search" @input="searchOnTable" />
                </md-field>
            </md-table-toolbar>
            <md-table-empty-state
                md-label="No users found"
                :md-description="`No user found for this query. Try a different search term or create a new user.`">
                <md-button @click="showNewForm" class="md-primary md-raised">Create New User</md-button>
           </md-table-empty-state>
           <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single">
               <md-table-cell md-label="ID" md-sort-by="id">{{item._id}}</md-table-cell>
               <md-table-cell md-label="Username" md-sort-by="username">{{item.username}}</md-table-cell>
               <md-table-cell md-label="Actions">
                   <md-button v-if="item.isAdmin === false" class="md-dense md-primary md-icon-button"><md-icon>directions_run</md-icon></md-button>
                   <md-button v-if="item.isAdmin === false" class="md-dense md-primary md-icon-button"><md-icon>arrow_upward</md-icon></md-button>
                   <md-button class="md-dense md-accent md-icon-button"><md-icon>delete</md-icon></md-button>
                </md-table-cell>
           </md-table-row>
        </md-table>
        <div class="userSelectedContainer" v-if="selectedUser !== null">
            {{selectedUser.username}}
            <div v-if="selectedUser.isAdmin === true">Administrator</div>
            <div v-else>User</div>
            <md-button class="md-raised">Voir les courses</md-button><br/>
            <md-button class="md-raised md-primary">Modifier</md-button>
            <md-button class="md-raised md-accent">Supprimer</md-button>
        </div>
        <div class="newUserContainer" v-if="displayNewForm === true">
            <form>
                <span>New user</span>
                <md-field>
                    <label>Username</label>
                    <md-input v-model="newUser.username"></md-input>
                </md-field>
                <md-field>
                    <label>Password</label>
                    <md-input type="password" v-model="newUser.password"></md-input>
                </md-field>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import $log from 'logger'
    const toLower = text => {
        return text.toString().toLowerCase()
    }

    const searchByName = (items, term) => {
        if (term) {
          return items.filter(item => toLower(item.username).includes(toLower(term)))
        }
        return items
    }

    export default {
        name: "UserTab",
        computed: {
            ...mapState({
            users: state => state.users.all,
            races: state => state.races,
            }),
        },
        created(){
            this.searched = this.users
        },
        data(){
            return {
                selectedUser: null,
                searched: [],
                search: null,
                displayNewForm: false,
                newUser: {
                    username: null,
                    password: null
                },
                isAdmin: null
            }
        },
        methods: {
            ...mapActions('users', {
              getAllUsers: 'getAllUsers'
            }),
            searchOnTable () {
              this.searched = searchByName(this.users, this.search)
            },
            retrieveAllUsers(){
                this.getAllUsers()
                .then(() => {
                    this.searched = this.users
                }, error => {
                    $log.info(error)
                })
            },
            onSelect (item) {
                this.selectedUser = item
            },
            showNewForm(){
                this.selectedUser = null
                this.displayNewForm = true
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
    .userSelectedContainer, .newUserContainer{
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 5%;
        border:1px solid black;
        border-radius: 12px;
        padding: 10px;
        text-align: center;
    }
</style>