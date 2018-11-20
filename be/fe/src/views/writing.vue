<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <v-form v-model="valid">
  <v-text-field
    v-model="name"
    :rules="nameRules"
    :counter="10"
    label="Name"
    required
  ></v-text-field>
  <v-textarea
           solo
           name="Question"
           label="질문을 작성하세요"
           value=""
         ></v-textarea>
</v-form>
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
    complete () {
      alert("등록되었습니다.")
      window.location.href = 'http://localhost:8080/Q&A';
    },
    goBack () {
      window.location.href = 'http://localhost:8080/Q&A';
    }
  }
}
</script>

<style scoped>
</style>
