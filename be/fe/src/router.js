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
      path: '/restaurantList',
      name: 'restaurantList',
      component: () => import('./views/user/restaurantList.vue')
    },
    {
      path: '/restaurantDetail',
      name: 'restaurantDetail',
      component: () => import('./views/user/restaurantDetail.vue')
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('./views/user/mypage.vue')
    },
    {
      path: '/choosesignup',
      name: 'choosesignup',
      component: () => import('./views/choosesignup.vue')
    },
    {
      path: '/ownersignup',
      name: 'ownersignup',
      component: () => import('./views/ownersignup.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/user/Home.vue')
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('./views/user/notice.vue')
    },
    {
      path: '/Q&A',
      name: 'Q&A',
      component: () => import('./views/user/Q&A.vue')
    },
    {
      path: '/writing',
      name: 'writing',
      component: () => import('./views/user/writing.vue')
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: () => import('./views/user/coupon.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('./views/user/setting.vue')
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
      component: () => import('./views/user/user.vue')
    },
    {
      path: '/reservation',
      name: 'reservation',
      component: () => import('./views/user/reservation.vue')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404.vue')
    }
  ]
})
