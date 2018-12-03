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
                      >{{ id }}</v-text-field>
                      <v-text-field
                        v-model="password"
                        required
                        label="Password"
                        color="white"
                      >{{ password }}</v-text-field>
                      <v-btn flat color="white" @click="signIn">
                        Login
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
      console.log(this.id, this.password)
      if(this.id.substring(0,3) === 'st_') {
        console.log('점주')
        axios.post(`${this.$apiRoot}user/owner/signin`, {
          id: this.id, password: this.password
        })
        .then((r) => {
          if (r.data.success) {
            // store_name	"store_name",
            // address "address",
            // coporate_no "coporate_no",
            // business_no "business_no"
            // phone_no "phone_no",
            // latitude	"latitude",
            // longitude "longitude",
            // profile_Img_Url "profile_Img_Url",
            // total_Rate "total_Rate",
            // store_Desc "store_Desc",
            // store_Tag "store_Tag",
            // store_Tag "store_Tag",
            // store_id	"store_id",
            // store_password	"store_password",
            // store_Category_Code "store_Category_Code",
            // start_Time "start_Time",
            // end_Time	"end_Time",
            // break_start_time	"break_start_time",
            // break_end_time	"break_end_time",
            // owner_Name "owner_Name"

            localStorage.setItem('ownerInfo', JSON.stringify(r.data));
            this.$router.push('/ownerHome');
          }
          else {
            alert('로그인에 실패했습니다')
          }
        })
        .catch((e) => {
          this.pop(e.message)
          alert('로그인에 실패했습니다')
        })
        
      }
      else{
        axios.post(`${this.$apiRoot}user/signin`, {
          id: this.id, password: this.password
        })
        .then((r) => {
          if (r.data.success) {
            // c.customer_code "customer_code",
            // c.grade_code "grade_code",
            // customer_name "customer_name",
            // address "address",
            // phone_no "phone_no",
            // birth_date "birth_date",
            // profile_img_url "profile_img_url",
            // grade_name "grade_name",
            // point_rate "point_rate"
            localStorage.setItem('customerInfo', JSON.stringify(r.data));

            if(r.data.mode == 'user') this.$router.push('/home');
            else this.$router.push('/ownerHome');
          }
          else {
            alert('로그인에 실패했습니다')
          }
        })
        .catch((e) => {
          this.pop(e.message)
          alert('로그인에 실패했습니다')
        })

      }

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
