<template>
    <div class="container">
        <md-button @click="retrieveAllUsers()" class="md-raised md-primary"><md-icon>refresh</md-icon> Refresh User list</md-button>
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
           </md-table-row>
        </md-table>
        <div class="userSelectedContainer" v-if="selectedUser !== null && selectedUser !== undefined">
           <md-card>
                <md-card-header>
                  <div class="md-title">{{selectedUser.username}}</div>
                  <div v-if="selectedUser.isAdmin === true" class="md-subhead">Administrator</div>
                  <div v-else class="md-subhead">User</div>
                </md-card-header>

                <md-card-expand>
                    <md-card-actions md-alignment="space-between">
                      <div>
                        <md-button @click="removeUser(selectedUser)" class="md-raised md-accent">Supprimer</md-button>
                        <md-button @click="showNewForm" class="md-raised md-primary">Editer</md-button>
                      </div>

                      <md-card-expand-trigger  v-if="selectedUser.isAdmin !== true">
                        <md-button class="md-icon-button">
                          <md-icon>keyboard_arrow_down</md-icon>
                        </md-button>
                      </md-card-expand-trigger>
                    </md-card-actions>

                    <md-card-expand-content>
                        <md-card-content>
                            <span>Races</span>
                            <div v-for="race in selectedUser.races" :key="race._id">
                                {{race.name}}
                            </div>
                        </md-card-content>
                    </md-card-expand-content>
                </md-card-expand>
            </md-card>
        </div>
        <div class="newUserContainer" v-if="displayNewForm === true">
            <form @submit.prevent="saveNewUser">
                <span class="formUsersTitle">New/Edit user</span>
                <md-field>
                    <label>Username</label>
                    <md-input v-model="newUser.username"></md-input>
                </md-field>
                <md-field>
                    <label>Password</label>
                    <md-input type="password" v-model="newUser.password"></md-input>
                </md-field>
                <md-checkbox v-model="newUser.isAdmin">Administrateur</md-checkbox>
                <md-button @click="displayNewForm = false; newUser._id = null;" class="md-accent md-raised">Cancel</md-button>
                <md-button type="submit" class="md-primary md-raised">Save</md-button>
            </form>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import $log from 'logger'
    import Swal from 'sweetalert2'
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
            selected: state => state.users.selected
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
                displayRaces: false,
                newUser: {
                    username: null,
                    password: null,
                    isAdmin: false,
                    _id: null
                },
                isAdmin: null
            }
        },
        methods: {
            ...mapActions('users', {
              getAllUsers: 'getAllUsers',
              updateUser: 'updateUser',
              addUser: 'addUser',
              deleteUser: 'deleteUser',
            }),
            searchOnTable () {
              this.searched = searchByName(this.users, this.search)
            },
            upgradeUser(user){
                user.toChange = {isAdmin: true}
                this.updateUser(user)
                .then(() => {
                    this.retrieveAllUsers()
                })
            },
            retrieveAllUsers(){
                this.selectedUser = null
                this.getAllUsers()
                .then(() => {
                    this.searched = this.users
                }, error => {
                    $log.info(error)
                })
            },
            onSelect (item) {
                this.displayNewForm = false
                this.selectedUser = item
            },
            showNewForm(user = null){
                if(user === null){
                    this.selectedUser = null
                }
                else{
                    this.newUser._id = this.selectedUser._id
                    this.newUser.username = this.selectedUser.username
                }
                this.displayNewForm = true
            },
            saveNewUser(){
                if(this.newUser._id === null){
                    this.addUser(this.newUser)
                    .then(() => {
                        Swal.fire({
                            title: "Success",
                            text: " The user has been created",
                            icon: "success",
                        })
                    })
                }
                else{
                    this.updateUser(this.newUser)
                    .then(() => {
                        this.retrieveAllUsers()
                    })
                }
            },
            removeUser(user){
                Swal.fire({
                    title: "Warning",
                    text: "Do you really want to remove this user ?",
                    icon: "warning",
                    showCancelButton: true,
                })
                .then((result) => {
                    if(result.value){
                        this.deleteUser(user)
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .md-table{
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }
    .userSelectedContainer, .newUserContainer{
        width: 50%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 3%;
    }
    .newUserContainer{
        display: block;
        position: absolute;
        top: 10%;
        padding: 15px;
        left: 25%;
        background-color: white;
        box-shadow: 5px 5px 10px;
        z-index: 2;

        .formUsersTitle{
            font-size: 1.3rem;
        }
    }
    .racesContainer{
        position: relative;
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }
</style>