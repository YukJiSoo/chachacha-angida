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
          <v-btn icon>
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">리뷰작성</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <v-layout align-center row>
        <v-flex xs4 sm12>
          <div class="subheading pt-1">
            <span>별점</span>
          </div>
        </v-flex>
        <v-flex xs8 sm12>
          <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="black"
            empty-icon="$vuetify.icons.ratingFull"
            half-increments
            hover
          ></v-rating>
        </v-flex>
      </v-layout>

      <v-flex xs12 sm12 class="mt-3">
        <v-form v-model="valid">
          <!-- 리뷰내용-->
          <v-textarea
            outline
            name="review"
            label="리뷰를 작성해주세요"
            color="orange"
            value=""
            height="300"
          ></v-textarea>
        </v-form>
        <!-- 완료, 취소 버튼-->
        <div>
          <v-btn color="primary" @click="complete">완료</v-btn>
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
      rating: 3,
    }
  },
  methods: {
    complete () { //완료 method
      alert("등록되었습니다.")
      window.location.href = 'http://localhost:8080/home';
    },
    goBack () { //취소 method
      window.location.href = 'http://localhost:8080/home';
    }
  }
}
</script>

<style scoped>
</style>
