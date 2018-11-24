<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <v-form v-model="valid">
          <!--title text field-->
  <v-text-field
    v-model="title"
    :rules="nameRules"
    :counter="20"
    label="Title"
    required
  ></v-text-field>
  <!-- Q&A내용-->
  <v-textarea
           solo
           name="Question"
           label="질문을 작성하세요"
           value=""
         ></v-textarea>
</v-form>
<!-- 완료, 취소 버튼-->
<div>
<v-btn @click="complete">완료</v-btn>
<v-btn color="error" @click="goBack">취소</v-btn>
</div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
    }
  },
  methods: {
    complete () { //완료 method
      alert("등록되었습니다.")
      window.location.href = 'http://localhost:8080/Q&A';
    },
    goBack () { //취소 method
      window.location.href = 'http://localhost:8080/Q&A';
    }
  }
}
</script>

<style scoped>
</style>
