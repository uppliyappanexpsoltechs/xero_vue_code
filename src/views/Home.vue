<template>
  <div>
    <md-card md-with-hover >
      <md-ripple>
        <md-card-header>
          <div class="md-title">Welcome To Xero Application    <a
        style="
          float: right;
          cursor: pointer;
        "
        v-on:click="Logout"
        >Logout</a
      ></div>
       
        </md-card-header>

        <md-card-content>
          Xero is easy to use online accounting software that's designed
          specifically for small businesses. Xero has all you need to run your
          business – including invoicing, paying bills, sales tax returns,
          reporting and much more. Create compelling visualizations based on
          your Xero financials with this Power BI template app.
        </md-card-content>

        <md-card-actions>
          <md-button v-on:click="xero">Click Here</md-button>
        </md-card-actions>
      </md-ripple>
    </md-card>
    
  </div>
  <!--  -->
</template>

<script>
export default {
  data() {
    return {
      welcome: true,
    };
  },
  name: "Home",
  methods: {
    xero() {
      this.axios
        .get("http://localhost:5000/xero/")
        .then((res) => {
          window.location.href=res.data.data;
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
