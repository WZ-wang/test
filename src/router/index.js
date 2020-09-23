import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Main from '../components/Main.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/main",
    children: [{
      path: '/main',
      name: 'main',
      component: Main,
    }]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../components/About.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../components/Test.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router