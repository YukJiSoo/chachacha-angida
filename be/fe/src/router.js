import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('./views/notice.vue')
    },
    {
      path: '/Q&A',
      name: 'Q&A',
      component: () => import('./views/Q&A.vue')
    },
    {
      path: '/writing',
      name: 'writing',
      component: () => import('./views/writing.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('./views/setting.vue')
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/user.vue')
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import('./views/reservation.vue')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404.vue')
    }
  ]
})
