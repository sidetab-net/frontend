import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/send-content',
    name: 'SendContent',
    component: () => import("@/views/SendContent")
  },
  {
    path: '/:id/:link',
    name: 'BlogDetail',
    component: () => import("@/views/BlogDetail")
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import("@/views/Home")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach(() => {
  window.scrollTo(0, 0);
});


export default router
