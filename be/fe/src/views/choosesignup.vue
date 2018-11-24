<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12 >
        <!--점주 가입 카드-->
        <v-card @click.native="goToOwnerLogin" class="mb-5">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 align="center" class="headline mb-0">점주 가입</h3>
            </div>
          </v-card-title>
        </v-card>
        <!--끝-->
        <!--손님 가입 카드-->
        <v-card @click.native="goToOwnerLogin" >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 align="center" class="headline mb-0">손님 가입</h3>
            </div>
          </v-card-title>
        </v-card>
        <!--끝-->
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
    goToOwnerLogin(){
      window.location.href = 'http://localhost:8080/ownersignup';
    }
  }
}
</script>

<style scoped>
</style>
