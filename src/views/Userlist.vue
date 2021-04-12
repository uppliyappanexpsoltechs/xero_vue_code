<template>
  <div>
    <!-- <h1>UserList</h1>
    <button v-on:click="getToken">Get UserList</button> -->
    
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <div class="md-title">Xero Users List <a
      style="
        float: right;
        
        cursor: pointer;
      "
      v-on:click="Logout"
      >Logout</a
    ></div>
        </md-card-header>

        <md-card-content>
          <md-table v-model="users" md-card>
            <md-table-toolbar>
              <h1 class="md-title">Users</h1>
            </md-table-toolbar>
            <md-table-row slot="md-table-row" slot-scope="{ item }">
              <md-table-cell md-label="FirstName" md-sort-by="firstName">{{
                item.firstName
              }}</md-table-cell>
              <md-table-cell md-label="LastName" md-sort-by="lastName">{{
                item.lastName
              }}</md-table-cell>
              <md-table-cell md-label="Email" md-sort-by="emailAddress">{{
                item.emailAddress
              }}</md-table-cell>
              <md-table-cell md-label="UserID" md-sort-by="id">{{
                item.userID
              }}</md-table-cell>
            </md-table-row>
          </md-table>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-raised md-accent" v-on:click="getToken"
            >Get UserList</md-button
          >
        </md-card-actions>
      </md-ripple>
    </md-card>
    <div></div>
  </div>
</template>
<style scoped>
.md-table-head-container {
  color: black;
  background-color: #e0dddb;
}
</style>
<script>
export default {
  data() {
    return {
      users: [],
      // status
    };
  },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    getToken() {
      this.axios
        .post("http://localhost:5000/xero/getUser",{userId:localStorage.getItem("userid")})
        .then((res) => {
          // console.log(res)
          console.log("Users", res.data.body.users);
          this.users = res.data.body.users;
        })
        .catch((err) => console.log(err))
        .finally(() => (this.loading = false));
    },
  },
};
</script>
