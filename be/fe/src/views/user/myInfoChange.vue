<template>
  <v-container class="pa-1">
    <v-layout column wrap>
      <!-- 상단 -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          height="40"
          class="angida-gradiation">
          <v-btn icon @click="$goBack()">
            <v-icon >keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">내정보 변경</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <v-flex xs12 sm6 md3 class="px-3 pt-3">
        <v-text-field
          label="비밀번호"
          color="orange"
          class="medium"
          v-model="password"
          :rules="[rules.password, rules.length(6)]"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md3 class="px-3">
        <v-text-field
          label="주소"
          color="orange"
          class="medium"
          v-model="address"
          :rules="[rules.required]"
        ></v-text-field>
      </v-flex>

      <v-flex xs12 sm6 md3 class="px-3">
        <v-text-field
          label="핸드폰번호"
          color="orange"
          class="medium"
          v-model="phone_no"
          :mask="phoneMask"
          :rules="[rules.required]"
        ></v-text-field>
      </v-flex>

      <v-flex align-self-center xs12 sm12 class="pa-2">
        <v-btn dark color="orange" class="medium" @click="change()">변경하기</v-btn>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      customerInfo : JSON.parse(localStorage.getItem('customerInfo')),
      password:'',
      address: '',
      phone_no: '',

      phoneMask: '(###)-####-####',
      rules: {
        email: v => (v || '').match(/@/) || '이메일형식으로 작성해 적어주세요',
        length: len => v => (v || '').length >= len || `${len}자 이상 적어주세요`,
        password: v => (v || '').match(/^(?=.*[a-z]).+$/) ||
          '숫자와 문자가 포함된 비밀번호를 작성해주세요',
        required: v => !!v || '필수입니다'
      }
      
    }
  },
  mounted() {
    this.address =  this.customerInfo.address,
    this.phone_no = this.customerInfo.phone_no
  },
  methods: {
    putMyInfo(){
      let changeInfo = {
        address : this.address,
        phone_no : this.phone_no.slice(0,3) + '-' + this.phone_no.slice(3,7) + '-' + this.phone_no.slice(7,11),
        password : this.password,
      }
      this.$axios.put(`http://localhost:3000/api/user/${this.customerInfo.customer_code}`, changeInfo)
      .then((r) => {
        console.log(r.data)

        this.customerInfo.address = changeInfo.address
        this.customerInfo.phone_no = changeInfo.phone_no
        this.customerInfo.password = changeInfo.password

        localStorage.setItem('customerInfo', JSON.stringify(this.customerInfo))

        alert("변경되었습니다.")

        this.$router.push('/mypage')

      })
      .catch((e) => {
      this.pop(e.message)
      })
    },
    change(){
      this.putMyInfo()
    }
  },
}
</script>

<style>
#fileApp {
  text-align: center;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
button {

}

.filebox label { display: inline-block; padding: .5em .75em; color: #999; font-size: inherit; line-height: normal; vertical-align: middle; background-color: #fdfdfd; cursor: pointer; border: 1px solid #ebebeb; border-bottom-color: #e2e2e2; border-radius: .25em; } .filebox input[type="file"] { /* 파일 필드 숨기기 */ position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip:rect(0,0,0,0); border: 0; }
</style>
