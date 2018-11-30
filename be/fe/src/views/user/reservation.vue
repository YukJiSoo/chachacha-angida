<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <!-- 상단 -->
        <v-layout align-center justify-space-between row>
          <v-flex xs7 sm12>
            <div class="pt-3 pl-3 pb-2 large">
            {{name}}
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
                    " 언제 도착 하시나요?
                    </div>
                    <div class="font-weight-black xlarge mt-5 pt-5">
                      <v-layout align-center justify-center class="pl-2">
                        <v-flex xs3>
                          <v-combobox
                            v-model="hour"
                            :items="items"
                            suffix="시"
                          ></v-combobox>
                        </v-flex>
                        <v-flex xs3>
                          <v-combobox
                            v-model="minute"
                            :items="items2"
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
                    " 방문 인원을 선택해주세요
                    </div>
                    <div class="font-weight-black xlarge mt-5 pt-5">
                      <v-layout align-center justify-center class="pl-2">
                        <v-flex xs3 >
                          <v-combobox
                            v-model="peopleNum"
                            :items="items3"
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
                              :src="`${menu.image}`"
                              aspect-ratio="1"
                              @click="choiceMenu(menu)"
                              :class="{'v-card--reveal': menu.selected}"
                            >
                            <!-- 메뉴이름 -->
                            </v-img>
                            <v-card-text class="pa-1" @click="menuDialog = true">
                              <v-layout justify-space-between column>
                                <v-flex xs12 class="pt-1 pb-0">
                                  <div class="py-0 medium font-weight-bold">{{menu.name}}</div>
                                </v-flex>
                                <v-flex xs12 class="pt-0 pb-1">
                                  <div class="py-0 mx-5 small">{{menu.price}}</div>
                                </v-flex>
                              </v-layout>
                            </v-card-text>
                          </v-card>
                          <v-dialog
                            v-model="menuDialog"
                            max-width="290"
                          >
                            <v-card>
                              <v-card-title class="large">{{menu.name}}</v-card-title>
                              <v-img
                                :src="`${menu.image}`"
                                aspect-ratio="1"
                                width="100%"
                                height="100%"
                              >
                              </v-img>
                              <v-card-text class="medium">
                                {{menu.explain}}
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
                                <span>10000원</span>
                              </div>
                            </v-flex>
                            <v-flex xs6 sm6>
                              <div class="medium text--darken-2">
                                <span>현재합계금액 : </span>
                                <span>{{allPrice}}원</span>
                              </div>
                            </v-flex>
                          </v-layout>

                          <v-container v-for="menu in cart" class="px-0">
                            <v-layout align-center justify-center row fill-height>
                              <v-flex xs6 sm6>
                                <div class="xlarge text--darken-2">
                                  <span>{{menu.name}}</span>
                                </div>
                              </v-flex>

                              <v-layout text-xs-center align-center justify-space-arround row fill-height class="ml-5 mb-1">
                                <v-flex xs3 sm6 class="pa-0 mr-2">
                                  <v-btn icon small dark color="orange" @click="countDown(menu)">
                                    <v-icon dark>remove</v-icon>
                                  </v-btn>
                                </v-flex>
                                <v-flex xs3 sm6 class="pa-0">
                                  <div class="large text--darken-2">
                                    <span>{{menu.num}}</span>
                                  </div>
                                </v-flex>
                                <v-flex xs3 sm6 class="pa-0">
                                  <v-btn icon small dark color="orange" @click="countUp(menu)">
                                    <v-icon dark>add</v-icon>
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-layout>

                            <v-layout align-end justify-end row fill-height>
                              <v-flex xs3 sm6>
                                <div class="grey--text small text--darken-2">
                                  <span>{{menu.price*menu.num}}원</span>
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
                          <span>10000원</span>
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
                      color="deep-orange lighten-1 "
                      class="xlarge white--text px-5"
                      @click="pay"
                    >
                      결제하기
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
        hour: 0,
        minute: 0,
        peopleNum: 0,
        allPrice:0,
        storeId: 0,
        hour: 0,
        minute: 0,
        peopleNum: 0,

        storeId: '',
        name: '토끼정',

        menuNum: 9,
        menuItems: [],
        cart: [
          // {
          //   code: 1
          //   name: '날치알 파스타',
          //   price: 10000,
          //   num: 2
          // }
        ],

        items: [
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
        items2: [
          '00',
          '10',
          '20',
          '30',
          '40',
          '50'
        ],
        items3: [
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
    mounted() {
      this.storeId = this.$route.query.storeId
      this.name = this.$route.query.name
      this.getMenu()
    },
    methods : {
      next () {
        this.onboarding = this.onboarding + 1 === length
          ? 0
          : this.onboarding + 1
      },
      prev () {
        this.onboarding = this.onboarding - 1 < 0
          ? this.length - 1
          : this.onboarding - 1
      },
      getMenu () {
        this.$axios.get(`http://localhost:3000/api/store/menu/${this.storeId}`)
        .then((r) => {
          console.log(r.data)
          this.menuItems = r.data
          this.menuItems.forEach((v,i) => { v.selected = false })
        })
        .catch((e) => {
        this.pop(e.message)
        })
      },
      choiceMenu(menu){
        if(menu.selected) {
          menu.selected = false

          var menuName = menu.name
          this.cart.forEach((v,i) => {
            if(menuName === v.name) {
              this.allPrice -= (v.num * v.price)
              this.cart.splice(i,1)
            }
          });
        }
        else {
          menu.selected = true
          var newMenu = {
            code: menu.code,
            name: menu.name,
            price: menu.price,
            num: 1
          }

          this.cart.push(newMenu)
          this.allPrice += menu.price
        }

      },
      removeCart(menuName){
        this.cart.forEach((v,i) => {
          if(menuName === v.name) this.cart.splice(i,1)
        });
        this.menuItems.forEach((v,i) => {
          if(menuName === v.name) v.selected = false
        });
      },
      countUp(menu){
        menu.num = menu.num + 1
        this.allPrice += menu.price
      },
      countDown(menu){
        if(menu.num === 1) this.removeCart(menu.name)
        else if(menu.num <= 0) return

        menu.num = menu.num - 1
        this.allPrice -= menu.price
      },
      pay(){
        this.$router.push({name:'payment', params: {
          cart: this.cart,
          storeId: this.storeId,
          hour: this.hour,
          minute: this.minute,
          peopleNum: this.peopleNum,
          allPrice: this.allPrice,
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
