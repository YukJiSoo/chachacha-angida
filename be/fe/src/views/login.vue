<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card dark color="deep-orange lighten-1">
            <v-img
              :src="require('../assets/mlogoWhite.png')"
              contain
              height="400"
            ></v-img>
               <v-container grid-list-md text-xs-center align-center>
                <v-layout align-center justify-space-around fill-height>
                  <v-flex xs12 sm6>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="id"
                        label="ID"
                        required
                        color="white"
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        label="Password"
                        required
                        color="white"
                      ></v-text-field>
                      <v-btn flat large color="white" @click="goToHome">
                        Login
                      </v-btn>
                      <v-btn flat large color="white" @click="submit">
                        SignUp
                      </v-btn>
                    </v-form>
                </v-flex>
              </v-layout>
            </v-container>
                
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      dialog : true
    }
  },
  methods: {
    goToHome () {
      window.location.href = 'http://localhost:8080/home';
    },

  }
}
</script>

<style>
</style>