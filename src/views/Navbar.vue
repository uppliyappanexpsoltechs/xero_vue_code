<template>
  <div>
    <md-card md-with-hover >
      <md-ripple>
        <md-card-header>
          <div class="md-title">Xero Application</div>
          <a
        style="
          float: right;
          cursor: pointer;
        "
        v-on:click="Logout"
        >Logout</a
      >
        </md-card-header>
        <md-card-content>
          <div>
          <md-list class="md-double-line">
            <!-- <md-list-item @click="routerpage('userlist')">
              <div class="md-list-item-text">
                <span>Xero Application userlist Here</span>
              </div>
            </md-list-item> -->
            <md-list-item @click="routerpage('contact')">
              <div class="md-list-item-text">
                <span>Xero contact page here</span>
              </div>
            </md-list-item>
          </md-list>
          </div>
        </md-card-content>
      </md-ripple>
    </md-card>
  </div>
  <!--  -->
</template>

<script>
// import jwt from 'jwt-simple'
export default {
  data() {
    return {
      welcome: true,
    };
  },
  name: "Home",
  created()
     {
        this.axios
        .put(
          "http://localhost:5000/xero/userCredentialUpdate",
          {
            params: this.$route.query.params,
            userId:localStorage.getItem("userid")
          },
        )
        // .then(res=>{
        //   console.log(res)
        // })
        .catch((err) => console.log(err))
        .finally(() => (this.loading = false));
     },
  methods: {
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    routerpage(page){
       this.$router.push("/"+page);
    }
  },
};
</script>
