import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Userlist from '../views/Userlist'
import Contact from '../views/Contact'
import Navbar from '../views/Navbar'
import Login from '../views/Login'
import Register from '../views/Register'
import Sidemenu from '../views/Sidemenu'
import Firstpage from '../views/Firstpage'
import Introduction from '../views/Introduction'
import Bisidebar from '../views/Bsidebar'
import Loader from '../views/Loader'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'firstpage',
    component: Firstpage,
  },
  {
    path: '/sidemenu',
    name: 'sidemenu',
    component: Sidemenu,
  },
  {
    path: '/loader',
    name: 'loader',
    component: Loader,
  },
  {
    path: '/bisidebar',
    name: 'bisidebar',
    component: Bisidebar,
  },
  {
    path: '/introduction',
    name: 'introduction',
    component: Introduction,
    beforeEnter: (to, from, next) => {
      let local = localStorage.getItem("userid");
      if (local != '' && local != null) {
        next();
      } else {
        next('/');
      }
    }
  },
  // {
  //   path: '/firstpage',
  //   name: 'firstpage',
  //   component: Firstpage,
  // },
  {
    path: '/navbar',
    name: 'navbar',
    component: Navbar,
    beforeEnter: (to, from, next) => {
      let local = localStorage.getItem("userid");
      if (local != '' && local != null) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      let local = localStorage.getItem("userid");
      if (local != '' && local != null) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/userlist',
    name: 'user',
    component: Userlist,
    beforeEnter: (to, from, next) => {
      let local = localStorage.getItem("userid");
      if (local != '' && local != null) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
    beforeEnter: (to, from, next) => {
      let local = localStorage.getItem("userid");
      console.log(local)
      if (local != '' && local != null) {
        next();
      } else {
        next('/');
      }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register,

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
