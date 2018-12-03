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
            v-for="(notice, index) in noticeItems"
          >
            <div slot="header" class="medium">{{notice.notice_name}}</div>
            <v-card>
              <v-card-text class="medium">{{notice.notice_contents}}</v-card-text>
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
        notice_code:'',
        notice_contents:'',
        manager_code:'',
        notice_name:'',
        noticeItems:[]
      }
    },
    mounted() {
      this.notice_code = this.$route.query.notice_code
      this.notice_name = this.$route.query.notice_name
      // console.log("review store_code:", this.store_code, ", ", this.store_name)
      this.getNotice()
    },
    methods: {
      // 리뷰 정보 받아오기
      getNotice () {
        var data = {};
        data.notice_code = this.notice_code;
        this.$axios.get(`http://localhost:3000/api/notice`, {
          params: data
        })
        .then((r) => {
          console.log(r.data)
          this.noticeItems = r.data
        })
        .catch((e) => {
          this.pop(e.message)
        })
      },
    }
  }
</script>
<style scoped>
</style>
