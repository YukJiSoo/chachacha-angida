<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <!-- 상단 -->
        <v-layout justify-space-between row>
          <v-flex xs7 sm12>
            <div class="pt-3 pl-3 pb-2 font-weight-black headline">
            토끼정 강남점
            </div>
          </v-flex>
          <v-flex xs4 sm12>
            <v-btn
              round color="grey"
              class="font-weight-bold title white--text"
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
                    <div class="grey--text text--darken-0 headline mt-5 pt-5">
                    " 언제 도착 하시나요?
                    </div>
                    <div class="font-weight-black headline mt-5 pt-5">
                      <v-layout>
                        <v-combobox
                          v-model="select"
                          :items="items"
                          suffix="시"
                        ></v-combobox>
                        <v-combobox
                          v-model="select"
                          :items="items2"
                          suffix="분"
                        ></v-combobox>
                     </v-layout>
                     에 도착합니다.
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
                    <div class="grey--text text--darken-0 headline mt-5 pt-5">
                    " 방문 인원을 선택해주세요
                    </div>
                    <div class="font-weight-black headline mt-5 pt-5">
                      <v-layout>
                        <v-flex xs5>
                          <v-combobox
                            v-model="select"
                            :items="items3"
                            suffix="명"
                          ></v-combobox>
                        </v-flex>
                        <v-flex xs5>
                          <br>
                          <h4>입니다.</h4>
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
                          v-for="n in menuNum"
                          :key="n"
                          xs6 sm4 md2
                        >
                          <v-card>
                            <v-img
                              :menuSelected="menuSelected"
                              :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                              aspect-ratio="1"
                              @click="menuClick"
                              :class="{'v-card--reveal': menuSelected}"
                            >
                            <!-- 메뉴이름 -->
                            </v-img>
                            <v-card-text class="pa-1">
                              <v-layout justify-space-between column>
                                <v-flex xs12 class="pt-1 pb-0">
                                  <div class="py-0 subheading font-weight-bold">메뉴 이름</div>
                                </v-flex>
                                <v-flex xs12 class="pt-0 pb-1">
                                  <div class="py-0 mx-5 body-1">가격</div>
                                </v-flex>
                              </v-layout>
                            </v-card-text>
                          </v-card>
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
                    <!-- 장바구니 목록 -->
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
                                    <v-icon dark>remove</v-icon>
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

                  <!-- 장바구니 제목 -->
                  <v-flex class="pa-0">
                    <div class="grey--text caption text--darken-2">
                      <span>장바구니</span>
                    </div>
                  </v-flex>

                  <!-- 금액창 -->
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

                  <!-- 결제버튼 -->
                  <v-flex class="pb-0 pt-0">
                    <v-btn
                      color="deep-orange lighten-1 "
                      class="font-weight-bold headline white--text px-5"
                      :to="paymentPath"
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
        mainPath: '/home',
        paymentPath: '/payment',
        sheet: false,
        dialog : true,
        length: 3,
        onboarding: 0,
        menuNum: 9,
        menuSelected: false,
        menu: [],
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
        ]
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
      menuClick() {
        if(this.menuSelected === false) this.menuSelected = true;
        else this.menuSelected = false;
      }
    }
  }
</script>

<style>
.v-card--reveal {
  opacity: .5;
}
.footer-style {
  border-radius: 20px;
  bottom: -30px;
  box-shadow: 0px 0px 2px 0px #000808;
}
</style>
