<template>
  <v-container class="pa-0">
    <v-layout align-end column>
      <!-- 상단 -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          height="40"
          class="angida-gradiation">
          <v-btn icon @click="goToMypage()">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">Q&A</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <!-- 문의하기 버튼-->
      <v-flex xs12 sm12 class="pa-2">
        <v-btn color="error" :to="writingQnA" class="medium">문의하기</v-btn>
      </v-flex>

      <!-- QnA목록 -->
      <v-flex xs12 sm12>
        <v-expansion-panel class="pa-0 ma-0">
          <v-expansion-panel-content
            v-for="(item, index) in items"
          >
            <div slot="header" class="medium">{{item.title}}</div>
            <v-card>
              <v-card-text class="medium">{{item.content}}</v-card-text>
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
        writingQnA:'writingQnA',
        items: []
      }
    },
    methods:{
      goToMypage() {
        this.$router.push('/mypage')
      }
    },
    mounted() {
      axios.get('http://localhost:3000/api/Q&A')
      .then((r) => {
        this.items = r.data.QnA
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
