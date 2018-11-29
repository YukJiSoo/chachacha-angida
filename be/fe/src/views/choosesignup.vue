<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout row wrap class="mb-0">
      <v-flex xs12 sm12>
        <!-- toolbar -->
        <v-toolbar
          app
          dark
          class="angida-gradiation">
          <v-icon
          @click="goBack"
          >keyboard_backspace</v-icon>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <router-link :to="mainPath" class="text-decoration-none">
                  <span class="font-weight-bold caption white--text">음식이 나에게</span>
                </router-link>
              </v-flex>
              <v-flex xs8 sm12 class="pl-5">
                <router-link :to="mainPath" class="text-decoration-none">
                  <span class="font-weight-bold title white--text">안기다</span>
                  <span class="font-weight-bold caption white--text">린다</span>
                </router-link>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
        <!-- toolbar end-->
        </v-flex>
    </v-layout>
    <v-layout justify-center row wrap>
      <v-flex xs12 sm12>
        <v-card
        :to="userSignup">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>
          <v-layout justify-center>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0" >손님 가입</h3>
            </div>
          </v-card-title>
          </v-layout>
        </v-card>
        <v-card
        class="mt-5"
        :to="ownerSignup">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>
          <v-layout justify-center>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">점주 가입</h3>
            </div>
          </v-card-title>
        </v-layout>
        </v-card></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'ownerDefault',
  data () {
    return {
      mainPath: '/',
      userSignup: '/userSignup',
      ownerSignup: '/ownerSignup',
      info:{
        role:undefined
      }
    }
  },
  methods: {
    goBack(){
      window.history.back();
    }
  }
}
</script>

<style scoped>
.angida-gradiation{
   background: #fc8e53;
   background: -moz-linear-gradient(left, #fc8e53 0%, #f17432 0%, #fc8e53 0%, #fc8e53 17%, #ea5507 55%, #f70000 100%);
   background: -webkit-linear-gradient(left, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
   background: linear-gradient(to right, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fc8e53', endColorstr='#f70000',GradientType=1 );
}
</style>
