<template>
    <div>
        <router-view></router-view>
        <!-- <div v-if="navbarpage!=null"><sidebar/></div>
        <div v-if="navbarpage==null"></div> -->
      </div>
      <!-- <div v-if="navbarpage!=null">
        <sidebar/>
        <div style="margin-left:250px;">
          <router-view></router-view>
        </div>
      </div>
      <div v-if="navbarpage==null">
        <router-view></router-view>
      </div>
    </div> -->
</template>

<script>
//  import sidebar from '../src/views/Bsidebar'
export default {
  name: 'App',
  components: {
    // sidebar
  },
  data(){
    return{
      navbarpage:localStorage.getItem("userid")
    }
  },
  created(){
    // console.log(localStorage.getItem("userid")!=null)
  }
}
</script>

<style>
</style>
