<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>
            <!-- 상단 -->
            <v-toolbar flat color="white">
              <div class="pt-3 pl-3 pb-2 font-weight-black headline">
              토끼정 강남점
              </div>
              <v-spacer></v-spacer>
              <v-btn 
                round color="grey" 
                class="font-weight-bold title white--text"
                @click="goToMain">
                <div>취소</div>
              </v-btn>
            </v-toolbar>
            <v-divider class="mx-3"></v-divider>

            <!-- 몇시? -->
            <v-window v-model="onboarding">
              <v-window-item>
                <v-container grid-list-md text-xs-center align-center>
                  <v-layout align-center justify-center row fill-height>
                    <v-flex xs12 sm6>
                      <div class="grey--text text--darken-0 headline mt-5 pt-5">
                      " 언제 도착 하시나요?
                      </div>
                      <div class="font-weight-black headline mt-5 pt-5">
                      __시 &nbsp&nbsp&nbsp__분에 도착합니다.
                      </div>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-window-item>

              <!-- 몇 명? -->
              <v-window-item>
                <v-container grid-list-md text-xs-center align-center>
                  <v-layout align-center justify-center row fill-height>
                    <v-flex xs12 sm6>
                      <div class="grey--text text--darken-0 headline mt-5 pt-5">
                      " 방문 인원을 선택해주세요
                      </div>
                      <div class="font-weight-black headline mt-5 pt-5">
                      __명 입니다.
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
                      <div class="grey--text text--darken-0 body-1">
                      사진을 누르면 크게 볼 수 있어요
                      </div>
                      <!-- 메뉴사진 -->
                      <v-container grid-list-sm fluid class="pa-0">
                        <v-layout row wrap>
                          <v-flex
                            v-for="n in menuNum"
                            :key="n"
                            xs6 sm4 md2 
                            d-flex
                          >
                            <v-card flat tile class="d-flex">
                              <v-img
                                :menuSelected="menuSelected"
                                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                aspect-ratio="1"
                                class="grey lighten-2"
                                @click="menuClick"
                                :class="{'v-card--reveal': menuSelected}"
                              >
                              <!-- 메뉴이름 -->
                              <v-container fill-height fluid class="pa-0">
                                <v-layout justify-space-between column>
                                  <v-flex xs12>
                                    <div class="py-1 title white--text v-card--reveal black">메뉴 이름</div>
                                  </v-flex>
                                  <v-flex xs12>
                                    <div class="mx-5 mt-5 caption white--text v-card--reveal black font-weight-bold">가격</div>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                              </v-img>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-container>
                    </v-flex>
                  </v-layout>
                </v-container>

              </v-window-item>
            </v-window>

            <v-card-actions class="justify-space-between">
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
                    class="font-weight-bold headline white--text px-5"
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
                color="grey lighten-4"
                class="footer-style pb-3"
              >
                  <v-container grid-list-xl class="pt-2">
                    <v-layout align-center justify-center column fill-height>
                      <v-flex class="pa-0">
                        <v-bottom-sheet v-model="sheet">
                          <v-btn slot="activator" small flat icon color="grey" size="10">
                            <v-icon>keyboard_arrow_up</v-icon>
                          </v-btn>
                          <v-list class="pt-0">
                            <v-container grid-list-xl class="pt-0">
                              <v-layout align-center justify-center column fill-height>
                                <v-flex xs12 sm12 class="pa-1">
                                  <div class="grey--text caption text--darken-2">장바구니</div>
                                </v-flex>
                              </v-layout>
                              <v-divider></v-divider>
                              <v-layout align-center justify-center row fill-height>
                                <v-flex xs6 sm6>
                                  <div class="body-2 text--darken-2">
                                    <span>최소결제금액 : </span>
                                    <span>10000원</span>
                                  </div>
                                </v-flex>
                                <v-flex xs6 sm6>
                                  <div class="body-2 text--darken-2">
                                    <span>현재합계금액 : </span>
                                    <span>15000원</span>
                                  </div>
                                </v-flex>
                              </v-layout>

                              <v-container class="px-0">
                                <v-layout align-center justify-center row fill-height>
                                  <v-flex xs6 sm6>
                                    <div class="title text--darken-2">
                                      <span>날치알 크림우동</span>
                                    </div>
                                  </v-flex>

                                  <v-layout text-xs-center align-center justify-space-arround row fill-height class="ml-5 mb-1">
                                    <v-flex xs3 sm6 class="pa-0 mr-2">
                                      <v-btn icon small dark color="indigo">
                                        <v-icon dark>add</v-icon>
                                      </v-btn>
                                    </v-flex>
                                    <v-flex xs3 sm6 class="pa-0">
                                      <div class="headline text--darken-2">
                                        <span>2</span>
                                      </div>
                                    </v-flex>
                                    <v-flex xs3 sm6 class="pa-0">
                                      <v-btn icon small dark color="indigo">
                                        <v-icon dark>add</v-icon>
                                      </v-btn>
                                    </v-flex>
                                  </v-layout>
                                </v-layout>

                                <v-layout align-end justify-end row fill-height>
                                  <v-flex xs3 sm6>
                                    <div class="grey--text body-2 text--darken-2">
                                      <span>10000원</span>
                                    </div>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                              
                            </v-container>
                          </v-list>
                        </v-bottom-sheet>
                      </v-flex>
                      <v-flex class="pa-0">
                        <div class="grey--text caption text--darken-2">
                          <span>장바구니</span>
                        </div>
                      </v-flex>
                      <v-layout align-center justify-center row fill-height>
                        <v-flex xs6 sm6>
                          <div class="body-2 text--darken-2">
                            <span>최소결제금액 : </span>
                            <span>10000원</span>
                          </div>
                        </v-flex>
                        <v-flex xs6 sm6>
                          <div class="body-2 text--darken-2">
                            <span>현재합계금액 : </span>
                            <span>15000원</span>
                          </div>
                        </v-flex>
                      </v-layout>
                      <v-flex class="pb-0 pt-0">
                        <v-btn
                          color="deep-orange lighten-1 "
                          class="font-weight-bold headline white--text px-5"
                          @click="next"
                        >
                          결제하기
                        </v-btn>
                      </v-flex>
                    </v-layout>
                  </v-container>
              </v-footer>
            </v-card-actions>

          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>

</template>
<script>
  export default {
    name: 'reservation',
    data () {
      return {
        sheet: false,
        dialog : true,
        length: 3,
        onboarding: 0,
        menuNum: 9,
        menuSelected: false,
        menu: [],
      }
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
      goToMain () {
        window.location.href = 'http://localhost:8080/home';
      },
      menuClick() {
        if(this.menuSelected === false) this.menuSelected = true;
        else this.menuSelected = false;
      }
    }
  }
</script>

<style>
.v-card--reveal {
  opacity: .6;
}
.footer-style {
  border-radius: 20px;
  bottom: -20px;
  box-shadow: 0px 0px 2px 0px #000808;
}
</style>