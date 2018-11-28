<template>
  <v-container class="pa-0">
    <v-layout column>
      <!-- 상단 -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          height="40"
          class="angida-gradiation">
          <v-btn icon @click="$goBack()">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">공지사항</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <v-flex xs12 sm12>
        <v-expansion-panel class="pa-0 ma-0">
          <v-expansion-panel-content
            v-for="(item, index) in items"
          >
            <div slot="header">{{item.title}}</div>
            <v-card>
              <v-card-text>{{item.content}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        mypagePath:'/mypage',
        items:[]
        // items: [
        //   //공지사항 각각 정보
        //   {
        //     title: '공지사항 1', //제목
        //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        //   },
        //   {
        //     title: '공지사항 2',
        //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        //   },
        //   {
        //     title: '공지사항 3',
        //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        //   },
        //   {
        //     title: '공지사항 4',
        //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        //   }
        // ]
      }
    },
    methods: {
    },
    mounted() {
      axios.get('http://localhost:3000/api/notice')
      .then((r) => {
        this.items = r.data.notice
        console.log(r)
      })
      .catch((e) => {
        console.error(e.message)
      })
    }
  }
</script>
<style scoped>
</style>
