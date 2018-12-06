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
        <v-btn color="error" class="medium" @click="writingQnA('enroll')">문의하기</v-btn>
      </v-flex>

      <!-- QnA목록 -->
      <v-flex xs12 sm12>
        <v-expansion-panel class="pa-0 ma-0">
          <v-expansion-panel-content
            v-for="(qna, index) in qnaItems"
          >
            <div slot="header" class="medium">{{qna.question}}</div>
            <v-card>
              <v-card-text class="medium">{{qna.answer}}</v-card-text>
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
        qna_category:'',
        question:'',
        answer:'',
        customer_code:'',
        manager_code:'',
        qna_code:'',
        qnaItems: []
      }
    },
    mounted() {
      this.qna_code = this.$route.query.qna_code
      this.question = this.$route.query.question
      // console.log("review store_code:", this.store_code, ", ", this.store_name)
      this.getQna()
    },
    methods:{
      goToMypage() {
        this.$router.push('/mypage')
      },
      writingQnA(type){
        this.$router.push({path:'/writingQnA', query: {type: type}})
      },
      getQna () {
        var data = {};
        data.qna_code = this.qna_code;
        this.$axios.get(`http://localhost:3000/api/Q&A`, {
          params: data
        })
        .then((r) => {
          console.log(r.data)
          this.qnaItems = r.data
        })
        .catch((e) => {
          this.pop(e.message)
        })
      }
    }
  }
</script>
<style scoped>
</style>
