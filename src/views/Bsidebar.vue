<template>
  <div>
    <!-- {{bars.sidebar}} -->
    <!-- v-if="sidebarvalue" -->
    <Loader/>
    <div >
      <b-sidebar
      v-if="sidenav"
      visible
      id="sidebar-no-header"
      title="Sidebar"
      bg-variant="dark"
      text-variant="light"
      no-header
    >
      <template>
        <div class="closebutton">
          <button
            type="button"
            v-on:click="closenav"
            class="close"
            aria-label="Close"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <br /><br />
        <b-card
          bg-variant="primary"
          text-variant="white"
          header="Xero xpm"
          class="text-center"
        >
          <b-card-text>
            <img
              src="@/assets/xero_logo.png"
              width="40%"
              height="40%"
              alt="xero"
            /><br /><br />
            <span v-if="active == 'true'">
              <img
                src="@/assets/active_state.png"
                alt="active"
                width="10%"
                height="10%"
              />&nbsp;&nbsp;<b> Xero Activated</b></span
            >
            <br />
            <span v-if="active != 'true'">
              <img
                src="@/assets/inactive_state.png"
                alt="active"
                width="10%"
                height="10%"
              />&nbsp;&nbsp;<b>Xero inactive</b>
            </span>
          </b-card-text>
          <b-button variant="success" v-on:click="xero">Connect to Xero</b-button> </b-card
        ><br />
        <b-card
          bg-variant="secondary"
          text-variant="white"
          header="3CX"
          class="text-center"
        >
          <b-card-text>
            <img
              src="@/assets/3cx_logo.png"
              width="40%"
              height="40%"
              alt="3cx"
            /><br /><br />
            <span>
              <img
                src="@/assets/inactive_state.png"
                alt="active"
                width="10%"
                height="10%"
              />&nbsp;&nbsp;<b>3CX inactive</b></span
            >
          </b-card-text>
          <!-- <button v-on:click="clicked"></button> -->
          <b-button variant="success">Connect to 3CX</b-button>
        </b-card>
      </template>
    </b-sidebar>
    </div>
    
    <div class="routerdiv">
      <!-- v-if="sidebarvalue" -->
      <b-navbar  toggleable type="dark" variant="dark">
        <b-navbar-brand
          ><div class="menuicon" v-on:click="openvav" v-if="menushow">
            <md-icon style="color: white">menu</md-icon>
            <!-- <b-icon icon="menu-down" aria-hidden="true"></b-icon> -->
          </div></b-navbar-brand
        >
        <b-navbar-brand style="cursor:pointer" right  v-on:click="Logout"
          >Logout</b-navbar-brand
        >
      </b-navbar>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import bars from '../components/globalcomponent'
import Loader from '../views/Loader'
export default {
  data() {
    return {
      sidenav: true,
      menushow: false,
      active: localStorage.getItem("xerostatus"),
      sidebarvalue:bars.sidebars
    };
  },
  components:{
    Loader
  },
  methods: {
    xero() {
      this.axios
        .get("http://localhost:5000/xero/")
        .then((res) => {
          window.location.href = res.data.data;
          this.welcome = false;
          //  this.$router.push("/navbar");
        })
        .catch((err) => console.log(err));
    },
    closenav() {
      this.sidenav = false;
      this.menushow = true;
    },
    clicked(){
      bars.is_loading=true
      console.log('global.is_loadingsidebar',bars.is_loading)
    },
    openvav() {
      this.sidenav = true;
      this.menushow = false;
    },
    Logout() {
      localStorage.clear();
      this.$router.push("/");
      // this.$router.go();
    },
  },
  created(){
      if (this.$route.query.params != undefined) {
        bars.is_loading=true
      this.axios
        .put("http://localhost:5000/xero/userCredentialUpdate", {
          params: this.$route.query.params,
          userId: localStorage.getItem("userid"),
        })
        .then(localStorage.setItem("xerostatus", true
        ),this.$router.push('/contact'))
        .catch((err) => console.log(err))
        .finally(() => (this.loading = false));
      }
        // console.log('this.$route.query.params != undefined',this.$route.query.params != undefined);
    }
};
</script>

<style scoped>
.closebutton {
  visibility: hidden;
}
.menuicon {
  visibility: hidden;
}
.routerdiv {
  margin-left: 8%;
}
/* .navbar{
    margin-left: -2%;
} */
/* .b-sidebar > .b-sidebar-body {
    overflow-y: unset !important;
} */
@media only screen and (max-width: 600px) {
  .closebutton {
    visibility: visible;
    margin-right: 5%;
    color: rgb(248, 244, 244);
  }
  .menuicon {
    visibility: visible;
  }
  .close {
    color: #f9efef;
  }

/* .navbar {
    margin-left: 5%;
} */
  .routerdiv {
    margin-left:-5%;
  }
}
</style>