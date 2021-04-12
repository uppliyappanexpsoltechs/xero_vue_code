<template>
    <div>
        <sidebar/>
        <!-- <div style="background-color: #563d7c; padding: 3%; margin-left: -11px">
          <span
            style="color: white; float: right; margin-top: -1%; cursor: pointer"
            v-on:click="Logout"
            >Logout</span
          >
        </div> -->
        <div class="intro">
            
            <img
              src="@/assets/Integration.png"
              width="100%"
              height="100%"
              alt="login_user"
            />
            <div>
                <h2>Xero Xpm</h2>
                <p>You can configure tasks in the workflow, job statuses, job categories and job templates. ... Use the Xero Practice Manager app for access to your account, anytime, anywhere. Record time and manage your jobs and tasks, and view your clients all from your phone.</p>
            </div><br>
            <div>
                <h2>3CX</h2>
                <p>3CX is a software-based private branch exchange (PBX) based on the SIP (Session Initiation Protocol) standard. It enables extensions to make calls via the public switched telephone network (PSTN) or via Voice over Internet Protocol (VoIP) services.</p>
            </div><br>
            <!-- <button v-on:click="clicked"></button> -->
            <div><img src="@/assets/datashare.gif"></div>
        </div>
    </div>
</template>
<script>
import global from '../components/globalcomponent'
import sidebar from '../views/Bsidebar'
export default {
    name: 'App',
    // created(){
    //     this.$router.go(0);
    // }
components: {
    sidebar
  },
  created(){
      // global.sidebars=true
      console.log('global',global.sidebars)
      
    },
  methods:{
      Logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    clicked(){
      console.log('global.is_loadingIntroduction',global.is_loading)
    }
  }
}
</script>
<style scoped>
  @media only screen and (max-width: 600px) {
  .intro{
      margin-left:5%  !important;
      margin-top:2%
    }
  }
  .intro{
    margin-left:25%;
    margin-top:2%
  }
  
</style>