<template>
  <div>
    <div id="mySidebar" class="sidebar">
      <div>
        <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">xero xpm</div>
            </md-card-header>
            <md-card-content>
              <img src="@/assets/xero.png" alt="xero" />
              <span v-if="active=='true'">
                <img
                  src="@/assets/active.png"
                  alt="active"
                  width="25%"
                  height="25%"
                />Xero Activated</span
              >
              <br />
              <span v-if="active!='true'">
                <img
                  src="@/assets/inactive.png"
                  alt="active"
                  width="15%"
                  height="15%"
                />Xero inactive</span
              >
            </md-card-content>
            <md-card-actions>
              <md-button v-on:click="xero">Conenct to xero</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </div>
      <div>
          <md-card md-with-hover>
          <md-ripple>
            <md-card-header>
              <div class="md-title">3CX</div>
            </md-card-header>
            <md-card-content>
              <img src="@/assets/3cx.png" alt="3cx" />
              <span>
                <img
                  src="@/assets/inactive.png"
                  alt="active"
                  width="15%"
                  height="15%"
                />3CX inactive</span
              >
            </md-card-content>
            <md-card-actions>
              <md-button >Connect to 3CX</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            active:localStorage.getItem("xerostatus")
        }
    },
  name: "App",
  created() {
      console.log(this.active)
      if (this.$route.query.params != undefined) {
        // console.log('this.$route.query.params != undefined',this.$route.query.params != undefined);
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
    Logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script> 
<style scoped>
.sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(46, 45, 88);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidebar div {
  padding: 2%;
}

/* .sidebar div:hover {
  color: #f1f1f1;
} */

.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

.openbtn {
  font-size: 20px;
  cursor: pointer;
  background-color: rgb(175, 171, 228);
  color: white;
  padding: 10px 15px;
  border: none;
}

.openbtn:hover {
  background-color: #444;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
  margin-left: 250px;
}

#mySidebar {
  width: 250px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}
</style> 