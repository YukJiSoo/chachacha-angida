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
      path: '/choosesignup',
      name: 'choosesignup',
      component: () => import('./views/choosesignup.vue')
    },
    {
      path: '/userSignup',
      name: 'userSignup',
      component: () => import('./views/userSignup.vue')
    },
    {
      path: '/ownerSignup',
      name: 'ownerSignup',
      component: () => import('./views/ownerSignup.vue')
    },
    {
      path: '/ownerReviewManage',
      name: 'ownerReviewManage',
      component: () => import('./views/owner/ownerReviewManage.vue')
    },
    {
      path: '/ownerRestaurantRegister',
      name: 'ownerRestaurantRegister',
      component: () => import('./views/ownerRestaurantRegister')
    },
    {
      path: '/ownerNoRestaurant',
      name: 'ownerNoRestaurant',
      component: () => import('./views/owner/ownerNoRestaurant.vue')
    },
    {
      path: '/ownerHome',
      name: 'ownerHome',
      component: () => import('./views/owner/ownerHome.vue')
    },
    {
      path: '/ownerInfo',
      name: 'ownerInfo',
      component: () => import('./views/owner/ownerInfo.vue')
    },
    {
      path: '/ownerInfoEdit',
      name: 'ownerInfoEdit',
      component: () => import('./views/owner/ownerInfoEdit.vue')
    },
    {
      path: '/menuEdit',
      name: 'menuEdit',
      component: () => import('./views/owner/menuEdit.vue')
    },
    {
      path: '/ownerMenuManage',
      name: 'ownerMenuManage',
      component: () => import('./views/owner/ownerMenuManage.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('./views/user/Home.vue')
    },
    {
      path: '/ownerSetting',
      name: 'ownerSetting',
      component: () => import('./views/owner/ownerSetting.vue')
    },
    {
      path: '/ownerSaleManage',
      name: 'ownerSaleManage',
      component: () => import('./views/owner/ownerSaleManage.vue')
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
    {
      path: '/restaurantInfo',
      name: 'restaurnantInfo',
      component: () => import('./views/restaurantInfo.vue')
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
