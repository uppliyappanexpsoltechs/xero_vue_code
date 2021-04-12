<template>
  <div>
    <br />
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <h3 class="text-center">Sign Up</h3>
        </md-card-header>
        <div class="row">
          <div class="col-md-12">
            <md-card-content>
              <form @submit.prevent="signUp" class="container">
                <div class="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.username"
                  />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.password"
                  />
                </div>
                <md-button type="submit" class="md-dense md-raised md-primary"
                  >Register</md-button
                ><br>
                 <a style="margin-left:45%" v-on:click="signIn">Login page</a>
              </form>
            </md-card-content>
          </div>
        </div>
      </md-ripple>
    </md-card>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      user: {},
      submitted: false,
    };
  },
  methods: {
    signIn(){
      this.$router.push('/login')
    },
    signUp() {
      this.axios
        .post("http://localhost:5000/xero/signUp", {
          username: this.user.username,
          password: this.user.password,
        })
        .then((res) => {
          if (res.data.status == "success") {
            Swal.fire({
              title: "New user registerd",
              icon: "success",
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "ok",
            })
            this.$router.push("/login");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => (this.loading = false));
    },
  },
};
</script>
<style scoped>
select.form-group {
  width: 100%;
  height: 44px;
}
textarea.form-group {
  width: 100%;
  height: 64px;
}
button.md-button.md-dense.md-raised.md-primary.md-theme-default {
  margin-left: 45%;
}
</style>