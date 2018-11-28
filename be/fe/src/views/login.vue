<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card dark class="angida-gradiation">
            <v-img
              :src="require('../assets/mlogoWhite.png')"
              contain
              height="400"
            ></v-img>
               <v-container grid-list-md text-xs-center align-center class="large">
                <v-layout align-center justify-space-around fill-height>
                  <v-flex xs12 sm6>
                      <v-text-field
                        v-model="id"
                        required
                        label="ID"
                        color="white"
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        required
                        label="Password"
                        color="white"
                      ></v-text-field>
                      <v-btn flat color="white" @click="signIn">
                        Login
                      </v-btn>
                      <v-btn flat color="white" :to="ownerHomePath">
                        OwnerLogin
                      </v-btn>
                      <v-btn flat color="white" :to="signUpPath">
                        SignUp
                      </v-btn>
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
import axios from 'axios'

export default {
  name: 'login',
  data () {
    return {
      dialog : true,
      id: '',
      password: '',
      homePath: {
        path:'/home'
      },
      ownerHomePath:'/ownerHome',
      signUpPath:'/choosesignup'
    }
  },
  mounted() {
  },
  methods: {
    signIn() {
      var success= true;
      
      // 디비에서 비교하는 부분 추가
      axios.post('http://localhost:3000/api/user/signIn', {
        id: this.id, password: this.password
      })
      .then((r) => {
        if(r.data.success){
          localStorage.setItem('id', this.id);
          localStorage.setItem('code', r.data.code);
          this.$router.push('/home');
        }
        else{
          alert('로그인에 실패했습니다')
        }
      })
      .catch((e) => {
        this.pop(e.message)
        alert('로그인에 실패했습니다')
      })
      
      // if(success){
      //   localStorage.setItem('id', this.id);
      //   this.$router.push('/home');
      // }
      // else{
      //   alert('로그인에 실패했습니다')
      // }
    }
  }
}
</script>

<style>
  .angida-gradiation{
    background: #fc8e53;
    background: -moz-linear-gradient(left, #fc8e53 0%, #f17432 0%, #fc8e53 0%, #fc8e53 17%, #ea5507 55%, #f70000 100%);
    background: -webkit-linear-gradient(left, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
    background: linear-gradient(to right, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fc8e53', endColorstr='#f70000',GradientType=1 );
 }
</style>
