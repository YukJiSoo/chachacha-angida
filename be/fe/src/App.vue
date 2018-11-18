<template>
  <v-app>
    <!-- navigation -->
    <v-navigation-drawer
      temporary
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >

          <v-list-tile-content>
            <v-list-tile-title 
              v-text="item.title" 
              class="title deep-orange--text">
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- toolbar -->
    <v-toolbar
      app
      dark
      class="angida-gradiation">
      <v-toolbar-side-icon icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-container class="pa-0">
        <v-layout align-center column>
          <v-flex xs12 sm12>
            <span @click="goToMain" class="font-weight-bold caption">음식이 나에게</span>
          </v-flex>
          <v-flex xs8 sm12 class="pl-5">
            <span @click="goToMain" class="font-weight-bold title">안기다</span>
            <span @click="goToMain" class="font-weight-bold caption">린다</span>
          </v-flex>
        </v-layout>
      </v-container>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- content -->
    <v-content>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      fixed: false,
      items: [
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
    goToMain () {
      window.location.href = 'http://localhost:8080/home';
    }
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
