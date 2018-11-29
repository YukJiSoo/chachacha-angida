<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout align-center justify-center column>
      <v-flex xs12 sm12>
        <!--점주 가입 카드-->
        <v-card width="300" flat @click.native="goToOwnerLogin" class="my-3 orange lighten-3">
          <v-layout align-center justify-center row>
            <v-flex xs12 sm12>
              <div>
                <v-icon size="200" class="white--text">store</v-icon>
              </div>
              <div class="large white--text">
                점주 회원가입
              </div>
            </v-flex>
          </v-layout>
        </v-card>
        <!--끝-->
        <!--손님 가입 카드-->
        <v-card width="300" flat @click.native="goToUserLogin" class="mt-5 blue lighten-3">
          <v-layout align-center justify-center row>
            <v-flex xs12 sm12>
              <div>
                <v-icon size="200" class="white--text">people</v-icon>
              </div>
              <div class="large white--text">
                손님 회원가입
              </div>
            </v-flex>
          </v-layout>
        </v-card>
        <!--끝-->
      </v-flex>
      <v-flex xs12 sm12 class="mt-3">
        <v-btn block class="black white--text px-5 xlarge" dark @click="$goBack()">
          뒤로가기
        </v-btn>
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
    goToUserLogin(){
      this.$router.push('/userSignUp')
    },
    goToOwnerLogin(){
      this.$router.push('/ownerSignUp')
    },
  }
}
</script>

<style scoped>
</style>
