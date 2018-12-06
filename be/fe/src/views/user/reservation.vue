<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <!-- 상단 -->
        <v-layout align-center justify-space-between row>
          <v-flex xs7 sm12>
            <div class="pt-3 pl-3 pb-2 large">
            {{this.storeInfo.store_name}}
            </div>
          </v-flex>
          <v-flex xs4 sm12>
            <v-btn
              round color="grey"
              class="xlarge white--text"
              :to="mainPath">
              <div>취소</div>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

          <v-window v-model="onboarding">
            <!-- 몇시? -->
            <v-window-item>
              <v-container grid-list-md text-xs-center align-center>
                <v-layout align-center justify-center row fill-height>
                  <v-flex xs12 sm6>
                    <div class="grey--text text--darken-0 xlarge mt-5 pt-5">
                    " 언제 도착 하시나요? "
                    </div>
                    <div class="font-weight-black xlarge mt-5 pt-5">
                      <v-layout align-center justify-center class="pl-2">
                        <v-flex xs3>
                          <v-combobox
                            v-model="selected_hour"
                            :items="hoursItems"
                            suffix="시"
                          ></v-combobox>
                        </v-flex>
                        <v-flex xs3>
                          <v-combobox
                            v-model="selected_min"
                            :items="minItems"
                            suffix="분"
                          ></v-combobox>
                        </v-flex>
                        <v-flex xs6>
                          에 도착합니다.
                        </v-flex>
                     </v-layout>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-window-item>

            <!-- 몇 명? -->
            <v-window-item>
              <v-container grid-list-md align-center>
                <v-layout align-center  row fill-height>
                  <v-flex xs12 sm6>
                    <div class="grey--text text--darken-0 xlarge mt-5 pt-5">
                    " 방문 인원을 선택해주세요 "
                    </div>
                    <div class="font-weight-black xlarge mt-5 pt-5">
                      <v-layout align-center justify-center class="pl-2">
                        <v-flex xs3 >
                          <v-combobox
                            v-model="peopleNum"
                            :items="peopleItems"
                            suffix="명"
                          ></v-combobox>
                        </v-flex>
                        <v-flex xs3>
                          입니다.
                        </v-flex>
                      </v-layout>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-window-item>

            <!-- 메뉴? -->
            <v-window-item>
              <v-container grid-list-md text-xs-center align-center class="pa-2">
                <v-layout align-center justify-center row fill-height>
                  <v-flex xs12 sm6>
                    <!-- 메뉴사진 -->
                    <v-container grid-list-sm fluid class="pa-0">
                      <v-layout row wrap>
                        <v-flex
                          v-for="menu in menuItems"
                          xs6 sm4 md2
                        >
                          <v-card>
                            <v-img
                              :menuSelected="`${menu.selected}`"
                              :src="`${menu.menu_img_url}`"
                              aspect-ratio="1"
                              @click="choiceMenu(menu)"
                              :class="{'v-card--reveal': menu.selected}"
                            >
                            <!-- 메뉴이름 -->
                            </v-img>
                            <v-card-text class="pa-1" @click="menuDialog = true">
                              <v-layout justify-space-between column>
                                <v-flex xs12 class="pt-1 pb-0">
                                  <div class="py-0 medium font-weight-bold">{{menu.menu_name}}</div>
                                </v-flex>
                                <v-flex xs12 class="pt-0 pb-1">
                                  <div class="py-0 mx-5 small">{{menu.menu_price}}</div>
                                </v-flex>
                              </v-layout>
                            </v-card-text>
                          </v-card>
                          <v-dialog
                            v-model="menuDialog"
                            max-width="290"
                          >
                            <v-card>
                              <v-card-title class="large">{{menu.menu_name}}</v-card-title>
                              <v-img
                                :src="`${menu.menu_img_url}`"
                                aspect-ratio="1"
                                width="100%"
                                height="100%"
                              >
                              </v-img>
                              <v-card-text class="medium">
                                {{menu.menu_desc}}
                              </v-card-text>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                  color="orange darken-1"
                                  flat="flat"
                                  @click="menuDialog = false"
                                  class="font-use"
                                >
                                  장바구니에 담기
                                </v-btn>
                                <v-btn
                                  color="orange darken-1"
                                  flat="flat"
                                  @click="menuDialog = false"
                                  class="font-use"
                                >
                                  닫기
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-flex>
                </v-layout>
              </v-container>

            </v-window-item>
          </v-window>


            <!-- 다음바닥 -->
            <v-footer
              v-if="onboarding !== 2"
              :fixed="false"
              app
              color="transparent"
            >
              <v-layout align-center justify-center row fill-height>
                <v-btn
                  color="deep-orange lighten-1"
                  class="xlarge white--text px-5"
                  @click="next"
                  block
                >
                  다음
                </v-btn>
              </v-layout>
            </v-footer>

            <!-- 결제바닥 -->
            <v-footer
              v-if="onboarding === 2"
              :fixed="false"
              app
              height="auto"
              color="grey lighten-3 footer-style"
            >
              <v-container class="pt-2">
                <v-layout align-space-around justify-center column fill-height>
                  <v-flex xs12 class="pa-0">
                    <!-- 장바구니 목록 -->
                    <v-bottom-sheet v-model="sheet">
                      <v-icon slot="activator" color="grey">keyboard_arrow_up</v-icon>
                      <v-list class="pt-0">
                        <v-container grid-list-xl class="pt-0">
                          <v-layout align-center justify-center column fill-height>
                            <v-flex xs12 sm12 class="pa-1">
                              <div class="grey--text small text--darken-2">장바구니</div>
                            </v-flex>
                          </v-layout>
                          <v-divider></v-divider>
                          <v-layout align-center justify-center row fill-height>
                            <v-flex xs6 sm6>
                              <div class="medium text--darken-2">
                                <span>최소결제금액 : </span>
                                <span>{{ minimun_price }}원</span>
                              </div>
                            </v-flex>
                            <v-flex xs6 sm6>
                              <div class="medium text--darken-2">
                                <span>현재합계금액 : </span>
                                <span>{{allPrice}}원</span>
                              </div>
                            </v-flex>
                          </v-layout>

                          <v-container v-for="menu_in_cart in cart" class="px-0">
                            <v-layout align-center justify-center row fill-height>
                              <v-flex xs6 sm6>
                                <div class="xlarge text--darken-2">
                                  <span>{{menu_in_cart.menu_name}}</span>
                                </div>
                              </v-flex>

                              <v-layout text-xs-center align-center justify-space-arround row fill-height class="ml-5 mb-1">
                                <v-flex xs3 sm6 class="pa-0 mr-2">
                                  <v-btn icon small dark color="orange" @click="countDown(menu_in_cart)">
                                    <v-icon dark>remove</v-icon>
                                  </v-btn>
                                </v-flex>
                                <v-flex xs3 sm6 class="pa-0">
                                  <div class="large text--darken-2">
                                    <span>{{menu_in_cart.menu_num}}</span>
                                  </div>
                                </v-flex>
                                <v-flex xs3 sm6 class="pa-0">
                                  <v-btn icon small dark color="orange" @click="countUp(menu_in_cart)">
                                    <v-icon dark>add</v-icon>
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-layout>

                            <v-layout align-end justify-end row fill-height>
                              <v-flex xs3 sm6>
                                <div class="grey--text small text--darken-2">
                                  <span>{{menu_in_cart.menu_price*menu_in_cart.menu_num}}원</span>
                                </div>
                              </v-flex>
                            </v-layout>
                          </v-container>

                        </v-container>
                      </v-list>
                    </v-bottom-sheet>

                  </v-flex>

                  <!-- 장바구니 제목 -->
                  <v-flex xs12 class="pa-0">
                    <div class="grey--text small text--darken-2">
                      <span>장바구니</span>
                    </div>
                  </v-flex>

                  <!-- 금액창 -->
                  <v-flex xs12 class="pt-2">
                    <v-layout align-center row fill-height>
                      <v-flex xs3 sm6 class="px-0">
                        <div class="medium text--darken-2">
                          <span>최소결제금액 </span>
                        </div>
                      </v-flex>
                      <v-flex xs3 sm6 class="px-0">
                        <div class="medium text--darken-2">
                          <span>{{ minimun_price }}원</span>
                        </div>
                      </v-flex>
                      <v-flex xs3 sm6 class="px-0">
                        <div class="medium text--darken-2">
                          <span>현재합계금액 </span>
                        </div>
                      </v-flex>
                      <v-flex xs3 sm6 class="px-0">
                        <div class="medium text--darken-2">
                          <span>{{allPrice}}원</span>
                        </div>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <!-- 결제버튼 -->
                  <v-flex class="pb-0 pt-0">
                    <v-btn
                      v-if="minimun_price <= allPrice"
                      color="deep-orange lighten-1 "
                      class="xlarge white--text px-5"
                      @click="pay"
                      block
                    >
                      결제하기
                    </v-btn>
                    <v-btn
                      v-else
                      color="deep-orange lighten-1 "
                      class="xlarge white--text px-5"
                      block
                      disabled
                    >
                      최소결제금액을 채워주세요!
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-footer>

      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
  export default {
    name: 'reservation',
    data () {
      return {
        cur_time: {},
        peopleNum: 0,
        allPrice:0,
        selected_hour: 0,
        selected_min: 0,
        peopleNum: 0,
        minimun_price: 10000,

        menuNum: 9,
        storeInfo:{},
        menuItems: [],
        cart: [],
        hoursItems: [
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22'
        ],
        minItems: [
          '00',
          '10',
          '20',
          '30',
          '40',
          '50'
        ],
        peopleItems: [
          '1',
          '2',
          '3',
          '4',
          '5'
        ],

        mainPath: '/home',

        sheet: false,
        dialog : true,
        length: 3,
        onboarding: 0,
        menuDialog: false
      }
    },
    created() {


    },
    mounted() {
      this.cur_time = new Date(Date.now())
      this.selected_hour = this.cur_time.getHours()
      this.selected_min = this.cur_time.getMinutes()

      this.storeInfo = this.$route.params.storeInfo
      this.menuItems = this.$route.params.menuItems
      console.log("passed storeInfo:", this.storeInfo)
      console.log("passed menuItems:", this.menuItems)
      //this.getStore()
      //this.getMenu()


      //this.selected_hour =
    },
    methods : {
      getStore () {
        var data = {};
        data.store_code = this.storeInfo.store_code;
        this.$axios.get(`http://localhost:3000/api/store`, {
          params: data
        })
        .then((r) => {
          console.log(r.data)
          this.storeInfo = r.data
          this.reviewPath.query.store_code = this.storeInfo.store_code
          this.reviewPath.query.store_name = this.storeInfo.store_name
        })
        .catch((e) => {
          this.pop(e.message)
        })
      },
      // 메뉴 정보 받아오기
      getMenu () {
        var data = {};
        data.store_code = this.storeInfo.store_code;
        this.$axios.get(`http://localhost:3000/api/menu`, {
          params: data
        })
        .then((r) => {
          console.log(r.data)
          this.menuItems = r.data
        })
        .catch((e) => {
        this.pop(e.message)
        })
      },
      next () {
        this.onboarding = this.onboarding + 1 === this.length
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
      },
      choiceMenu(menu){
        if(menu.selected) {
          menu.selected = false

          var menuName = menu.menu_name
          this.cart.forEach((v,i) => {
            if(menuName === v.menu_name) {
              this.allPrice -= (v.menu_num * v.menu_price)
              this.cart.splice(i,1)
            }
          });
        }
        else {
          menu.selected = true
          var newMenu = {
            store_code:this.storeInfo.store_code,
            menu_code: menu.menu_code,
            menu_name: menu.menu_name,
            menu_price: menu.menu_price,
            menu_num: 1
          }

          this.cart.push(newMenu)
          this.allPrice += menu.menu_price
        }

      },
      removeCart(menuName){
        this.cart.forEach((v,i) => {
          if(menuName === v.menu_name) this.cart.splice(i,1)
        });
        this.menuItems.forEach((v,i) => {
          if(menuName === v.menu_name) v.selected = false
        });
      },
      countUp(menu){
        menu.menu_num = menu.menu_num + 1
        this.allPrice += menu.menu_price
      },
      countDown(menu){
        if(menu.menu_num === 1) this.removeCart(menu.menu_name)
        else if(menu.menu_num <= 0) return

        menu.menu_num = menu.menu_num - 1
        this.allPrice -= menu.menu_price
      },
      pay(){
        console.log("cart:", this.cart,
        "store_code:", this.storeInfo.store_code,
        "selected_hour", this.selected_hour,
        "selected_min", this.selected_min,
        "peopleNum", this.peopleNum,
        "allPrice", this.allPrice)


        this.$router.push({name:'payment', params: {
          cart: this.cart,
          storeInfo: this.storeInfo,
          selected_hour: this.selected_hour,
          selected_min: this.selected_min,
          no_of_people: this.peopleNum,
          total_price: this.allPrice,

        }})
      }
    }
  }
</script>

<style>
.v-card--reveal {
  opacity: .5;
}
.footer-style {
  box-shadow: 3px 3px 3px 3px #000808;
}
</style>
