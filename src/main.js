import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios';
import AxiosPlugin from 'vue-axios-cors';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Vuelidate from 'vuelidate'
import JWT from 'jwt-simple'
import VueSidebarMenu from 'vue-sidebar-menu'
import BootstrapSidebar from 'vue-bootstrap-sidebar'
// import moment from 'moment'
// Vue.use(moment)
Vue.use(BootstrapSidebar)
Vue.use(VueSidebarMenu)
Vue.use(JWT)
Vue.use(Vuelidate)
Vue.use(Loading);
Vue.use(VueSweetalert2);
Vue.use(VueMaterial)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(AxiosPlugin)
Vue.use(VueRouter)
Vue.use(VueAxios, axios);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
