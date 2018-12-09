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
            v-model="question"
            outline
            label="Quection"
            color="orange"
            value=""
            height="300"
            class="medium"
          >
            {{question}}
          </v-textarea>
        </v-form>
        <!-- 완료, 취소 버튼-->
        <div>
          <v-btn color="primary"  @click="qnaRegister" :to="mainPath" class="medium">완료</v-btn>
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
      customerInfo : JSON.parse(localStorage.getItem('customerInfo')),
      qnaPath:'/Q&A',
      drawer: null,
      mainPath: '/Home',
      qna: {},
      qna_code : 0,
      question: ''
    }
  },
  mounted() {
  },
  methods: {
    complete () { //완료 method
      var data = {};
      // data.qna_category = this.qna_category;
      data.question = this.question;
      // data.answer = this.answer;
      data.customer_code = this.customerInfo.customer_code;
      data.qna_code = this.qna_code;
      // data.manager_code = this.manager_code;
      // data.qna_code = this.qna_code;

      this.$axios.post('http://localhost:3000/api/Q&A/', data)
      .then((r) => {
        console.log(r);
        alert("접수되었습니다")
        //this.$router.push({path: '/mypage', query: {}});
      })
      .catch((e) => {
        this.pop(e.message)
        alert("QnA 등록에 실패했습니다.")
      });
    },
    qnaRegister () {
        this.complete();
    }
  }
}
</script>

<style scoped>
</style>
