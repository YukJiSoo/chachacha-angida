<template>
  <v-container text-xs-center align-center>
    <v-layout align-space-around column>
      <!-- 상단 -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          height="40"
          class="angida-gradiation">
          <v-btn dark icon :to="qnaPath">
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
      <v-flex xs12 sm12>
        <v-form v-model="valid">
          <!-- Q&A내용-->
          <v-textarea
            outline
            name="Question"
            label="Quection"
            color="orange"
            value=""
            height="300"
            class="medium"
          ></v-textarea>
        </v-form>
        <!-- 완료, 취소 버튼-->
        <div>
          <v-btn color="primary"  @click="postQnaItem()" :to="mainPath" class="medium">완료</v-btn>
          <v-btn color="error" :to="qnaPath" class="medium">취소</v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'writingQnA',
  data () {
    return {
      qnaPath:'/Q&A',
      drawer: null,
      mainPath: '/Home',
      qna: {}
    }
  },
  mounted() {
      this.qna =  {
        qna_code : 0,
        question: ''
      }
  },
  methods: {
    postQnaItem(){
      this.$axios.post(`http://localhost:3000/api/Q&A/${this.customer_code}`,this.qna)
      .then((r) => {
         console.log(this.qnaInfo.customer_code)
      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    complete () { //완료 method
      alert("등록되었습니다.")
    }
  }
}
</script>

<style scoped>
</style>
