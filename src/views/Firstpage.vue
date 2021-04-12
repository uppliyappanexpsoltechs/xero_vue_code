<template>
  <div>
    <div class="circle"></div>
    <div class="container">
      <div class="main">
        <div class="signup">
          <div class="logo">
            <img
              src="@/assets/user.png"
              width="100%"
              height="100%"
              alt="login_user"
            />
          </div>
        </div>
        <div class="signin">
          <div class="card">
            <div v-if="signuppage">
              <h4 style="margin-left: 30%">Sign Up</h4>
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
                ><br />
                <a style="margin-left: 45%; cursor:pointer" v-on:click="login">Login page</a>
              </form>
            </div>
            <div v-if="loginpage">
              <h4 style="margin-left: 30%">Login</h4>
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
                ><br />
                <!-- <a style="margin-left:47%" v-on:click="SignUppage">SignUp</a> -->
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="register">
        <div style="padding: 2%">
          <h3>
            <span>Don't have an account?</span>
          </h3>
          <a v-on:click="SignUppage" style="cursor:pointer">Register Here</a>
        </div>
      </div>
    </div>
    <!-- <div class="bottomcircle"></div> -->
    <!-- <div class="lastdev">.</div> -->
  </div>
</template>
<script>
import Swal from "sweetalert2";
// import jwt from 'jwt-simple'
// import bars from '../components/globalcomponent';
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      loginpage: true,
      signuppage: false,
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
    SignUppage() {
      this.loginpage = false;
      this.signuppage = true;
    },
    login() {
      this.loginpage = true;
      this.signuppage = false;
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
            });
            // this.$router.push("/login");
          }
        })
        .catch((err) => console.log(err))
        .finally(() => (this.loading = false));
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
            // this.$router.go()
          if (res.data.status == "success") {
            localStorage.setItem("userid", res.data.data);
            this.$router.push("/introduction");
            this.$router.go()
            // Swal.fire({
            //   title: "You Are Loged In",
            //   icon: "success",
            //   showCancelButton: false,
            //   confirmButtonColor: "green",
            //   cancelButtonColor: "#d33",
            //   confirmButtonText: "Ok",
            // }).then((result) => {
            //   if (result.isConfirmed) {
            //     this.$router.push("/introduction");
                
            //   }
            // });
            //  Swal.fire("Success!", "You Are Loged In", "success");
            
            
          } else {
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
.circle {
  position: absolute;
  background: -moz-linear-gradient(top, #24a486 0%, #33a981 100%);
  background: -webkit-linear-gradient(top, #24a486 0%, #33a981 100%);
  background: linear-gradient(to bottom, #24a486 0%, #33a981 100%);
  width: 700px;
  height: 480px;
  border-radius: 50%;
  transform: rotate(-30deg);
  top: -150px;
  left: -200px;
}
.bottomcircle {
  position: absolute;
  background: -moz-linear-gradient(top, #24a486 0%, #33a981 100%);
  background: -webkit-linear-gradient(top, #24a486 0%, #33a981 100%);
  background: linear-gradient(to bottom, #24a486 0%, #33a981 100%);
  width: 70px;
  height: 48px;
  border-radius: 50%;
  transform: rotate(-230deg);
  bottom: -150px;
  right: -200px;
}
.container {
  max-width: 100% !important;
}

.container {
  width: 100%;
  height: 100%;
}

.lastdev {
  /* margin-bottom: 0; */
  /* background-color: #ffffff; */
  font-family: "Montserrat", sans-serif;
  margin-right: 1px;
  width: 80%;
  height: 70%;
  background-image: radial-gradient(circle, #31a881, #ffff 15%);
  /* background: radial-gradient(circle, #31a881, #ffff 15%); */
}

.card {
  background-color: #fafafa;
  padding: 1.5rem;
  max-width: 520px;
  max-height: 630px;
  border-radius: 0px;
  box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 20%);
  min-width: 270px;
  margin: 2%;
  margin-top: 15%;
  background-color: #f1f3ec;
}

.logo {
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 250px;
  height: 250px;
  box-shadow: 1px 2px 2px 2px rgb(155 155 155 / 30%);
}

.signup,
.signin {
  width: 100%;
  height: 100%;
  /* position: relative;
        padding: 8rem 0rem 5rem 6rem; */
}

.signup {
  position: relative;
  padding: 8rem 0rem 5rem 6rem;
}

.main {
  position: relative;
  display: flex;
  /* width: 100%;
    height: 100%; */
  align-items: flex-start;
}

@media (max-width: 900px) {
  .logo{
    width: 46%;
    height: 10%;
  }
  .signin {
    margin-left: -72%;
  }
  .card{
    background-color: #fafafa;
    padding: 1.5rem;
    max-width: initial;
    max-height: -webkit-fill-available;
    border-radius: 0px;
    box-shadow: 2px 2px 10px 1px rgb(0 0 0 / 20%);
    min-width: fit-content;
    /* margin: auto; */
    margin-top: 60%;
    margin-left: -20%;
}
  .signup{
    padding: 0%;
    position: unset;
  }
  .circle{
    width: 100%;
    height: 50%;
  }
  .register {
    position: fixed;
    width: 100%;
    left: 0;
    cursor: pointer;
    bottom: 0;
    /* text-align: center; */
    margin: 3px auto;
  }
}
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
