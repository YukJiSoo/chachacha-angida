<template>
  <v-app>
    <!-- content -->
    <v-content class="grey lighten-4">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {

      items: [
        {
        icon: 'alert',
        title: '공지사항',
        to: {
          path: '/notice'
          }
        },
        {
        icon: 'coupon',
        title: '쿠폰함',
        to: {
          path: '/coupon'
          }
        },
        {
        icon: 'question',
        title: 'Q&A',
        to: {
          path: '/Q&A'
          }
        },
        {
        icon: 'setting',
        title: 'setting',
        to: {
          path: '/setting'
          }
        },
        {
        icon: 'bubble_chart',
        title: '위치로 찾기',
        to: {
          path: '/login'
          }
        },
        {
        icon: 'help',
        title: '카테고리',
        to: {
          path: '/reservation'
        }
        },
        {
        icon: 'account_box',
        title: '마이페이지',
        to: {
          path: '/user'
        }
        }
      ],
      title: '안기다',
    }
  },
  methods : {
  }
}
</script>
<style>
 .angida-gradiation{
    background: #fc8e53;
    background: -moz-linear-gradient(left, #fc8e53 0%, #f17432 0%, #fc8e53 0%, #fc8e53 17%, #ea5507 55%, #f70000 100%);
    background: -webkit-linear-gradient(left, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
    background: linear-gradient(to right, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fc8e53', endColorstr='#f70000',GradientType=1 );
 }
</style>
