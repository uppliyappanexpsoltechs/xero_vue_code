<template>
  <div>
    <md-card md-with-hover>
      <md-ripple>
        <md-card-header>
          <h3 class="text-center">Login</h3>
        </md-card-header>
        <div class="row">
          <div class="col-md-12">
            <md-card-content>
              <form @submit.prevent="signIn" class="container">
                <div class="form-group">
                  <label>UserName</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="user.username"
                    :class="{
                      'is-invalid': submitted && $v.user.username.$error,
                    }"
                  />
                  <div
                    v-if="submitted && !$v.user.username.required"
                    class="invalid-feedback"
                  >
                    Name is required
                  </div>
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.password"
                    :class="{
                      'is-invalid': submitted && $v.user.password.$error,
                    }"
                  />
                  <div
                    v-if="submitted && !$v.user.password.required"
                    class="invalid-feedback"
                  >
                    password is required
                  </div>
                </div>
                <md-button type="submit" class="md-dense md-raised md-primary"
                  >Login</md-button
                ><br>
               <a style="margin-left:47%" v-on:click="SignUp">SignUp</a>
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
// import jwt from 'jwt-simple'
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      submitted: false,
    };
  },
  validations: {
    user: {
      username: { required },
      password: { required, minLength: minLength(10) },
    },
  },
  methods: {
    SignUp(){
      this.$router.push("/register");
    },
    signIn() {
      
      this.axios
        .post(
          "http://localhost:5000/xero/signIn",
          {
            username: this.user.username,
            password: this.user.password,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET, POST, PATCH, PUT, DELETE, OPTIONS",
              "Access-Control-Allow-Headers":
                "Origin, Content-Type, X-Auth-Token",
            },
          }
        )
        .then((res) => {
           if (res.data.status == "success") {
             Swal.fire("Success!", "You Are Loged In", "success");
             localStorage.setItem("userid",res.data.data);
             this.$router.push("/home");
           }else{
             Swal.fire("Failure", "Invalid Username or password", "warning");
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