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
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>  
    
    <!-- toolbar -->
    <v-toolbar 
      app
      dark color="deep-orange lighten-1">
      <v-toolbar-side-icon icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-img
        :src="require('./assets/mlogoWhite.png')"
        contain
        height="150%"
      ></v-img>
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

    <!-- footer -->
    <v-footer :fixed="fixed" app color="transparent" grid-list-md text-xs-center align-center>
      <v-btn>
        <v-icon x-large>keyboard_arrow_up</v-icon>
        <span>내 위치 : {{myLocation}}</span> 
      </v-btn>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      myLocation: '강남역 11번 출구',
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
          path: '/help'
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
  method : {
    goToMain () {
      window.location.href = 'http://localhost:8080/home';
    }
  }
}
</script>