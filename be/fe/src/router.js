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
      path: '/payment',
      name: 'payment',
      component: () => import('./views/user/payment.vue')
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
      path: '/myInfoChange',
      name: 'myInfoChange',
      component: () => import('./views/user/myInfoChange.vue')
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
      path: '/writingQnA',
      name: 'writingQnA',
      component: () => import('./views/user/writingQnA.vue')
    },
    {
      path: '/writingReview',
      name: 'writingReview',
      component: () => import('./views/user/writingReview.vue')
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
      path: '/point',
      name: 'point',
      component: () => import('./views/user/point.vue')
    },
    {
      path: '/review',
      name: 'review',
      component: () => import('./views/user/review.vue')
    },
    {
      path: '/reviewManage',
      name: 'reviewManage',
      component: () => import('./views/user/reviewManage.vue')
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
      path: '/reservationHistory',
      name: 'reservationHistory',
      component: () => import('./views/user/reservationHistory.vue')
    },
    {
      path: '*',
      name: 'e404',
      component: () => import('./views/e404.vue')
    }
  ]
})
