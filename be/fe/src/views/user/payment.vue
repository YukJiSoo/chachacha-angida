<template>
  <v-container class="pa-1">
    <!-- 상단, 결제금액 -->
    <v-layout align-space-around column>
      <v-flex xs12 sm12>
        <!-- 상단 -->
        <v-btn icon class="ma-1">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-divider class="mx-3 mt-2"></v-divider>

        <!-- 금액 -->
        <v-layout justify-space-between row class="pl-4 mt-2">
          <v-flex xs12 sm12>
            <div class="pt-3 pb-1 title">
              결제금액
            </div>
            <div class="pt-2 pb-2 font-weight-bold headline">
              28,000원
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- 결제수단 -->
    <v-layout align-center column class="mt-4">
      <v-flex xs12 sm12>
        <v-dialog v-model="dialogPayRule" fullscreen hide-overlay transition="dialog-bottom-transition">
          <!-- 선택 -->
          <v-card hover slot="activator">
            <div class="px-5 py-3 mx-5 title font-weight-bold">
              네이버페이
            </div>
          </v-card>
          <!-- 수단내역 새창출력-->
          <v-card>
            <!-- 상단 -->
            <v-list >
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-btn icon class="ma-1" @click="dialogPayRule = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <div class="subheading font-weight-bold">
                  결제수단
                </div>
              </v-list-tile>
            </v-list>

            <!-- 결제수단-라디오그룹 -->
            <v-radio-group v-model="radioGroup" class="ml-4 mt-2">
              <v-radio
                v-for="n in 3"
                :key="n"
                :value="n"
                class="mb-4"
              >
                <div slot="label" class="headline black-text font-weight-bold">네이버페이</div>
              </v-radio>
            </v-radio-group>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>

    <!-- 요청사항 -->
    <v-layout align-space-around column class="mx-2 mt-5">
      <v-flex xs12 sm12>
        <v-text-field
          label="requirement"
          placeholder="요청사항"
          solo
        ></v-text-field>
      </v-flex>
    </v-layout>

    <!-- 쿠폰 -->
    <v-layout align-center justify-space-around>
      <!-- 쿠폰-제목 -->
      <v-flex xs9 sm12 class="pa-2 mb-1">
        <div class="font-weight-black subheading">
          할인쿠폰
        </div>
      </v-flex>
      <!-- 쿠폰사용여부, 선택 -->
      <v-layout align-end column>
        <v-flex xs3 sm12 class="pa-2 mb-1">
          <v-dialog v-model="dialogCoupone" fullscreen hide-overlay transition="dialog-bottom-transition">
            <!-- 선택 -->
            <div class="body-1 grey--text text--darken-2" slot="activator">
                쿠폰사용 X
              </div>
            <v-card>
            <!-- 상단 -->
            <v-list >
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-btn icon class="ma-1" @click="dialogCoupone = false">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-list-tile-action>
                <div class="subheading font-weight-bold">
                  할인쿠폰
                </div>
              </v-list-tile>
            </v-list>
            
            <!-- 쿠폰-체크박스 -->
            <v-radio-group v-model="radioGroup" class="ml-4 mt-2">
              <v-radio
                v-for="n in 3"
                :key="n"
                :value="n"
                class="mb-4"
              >
                <div slot="label" class="title black-text font-weight-bold">생일 기념 쿠폰 5% 할인</div>
              </v-radio>
            </v-radio-group>

          </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-layout>
    <v-divider></v-divider>

    <!-- 보유포인트 -->
    <v-layout align-center justify-space-around>
      <!-- 보유포인트-제목 -->
      <v-flex xs7 sm12 class="pa-2 mb-1">
        <div class="font-weight-black subheading">
          보유 포인트
        </div>
      </v-flex>
      <!-- 보유포인트 및 적립예정 -->
      <v-flex xs5 sm12 class="pa-2 mb-1">
        <v-layout align-end column>
          <v-flex xs12>
            <div class="body-1 grey--text text--darken-2">
              1080 P
            </div>
          </v-flex>
          <v-flex xs12>
            <div class="caption grey--text text--darken-2">
              100P 적립예정
            </div>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>

    <!-- 포인트사용 -->
    <v-layout align-center justify-space-around>
      <!-- 포인트사용-제목 -->
      <v-flex xs7  sm12 class="pa-2 mb-1">
        <div class="font-weight-black subheading">
          포인트 사용
        </div>
      </v-flex>
      <!-- 포인트입력 -->
      <v-flex xs5 sm12 class="pa-2 mb-1">
        <v-layout align-end column>
          <v-flex xs6>
            <v-text-field
              label="0"
              solo
              hint="1000P 이상 사용가능"
              persistent-hint
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>

    <!-- 결제버튼 -->
    <v-layout align-center column class="mt-5">
      <v-flex xs12>
        <div>
          <v-btn class="angida-gradiation px-5" dark large @click="goToPage(paySuccessPage)">
            <div class="headline font-weight-bold px-5">
              결제하기
            </div>
          </v-btn>
        </div>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      paySuccessPage: 'http://localhost:8080/home',
      dialogPayRule: false,
      dialogCoupone: false,
    }
  },
  methods: {
    goToPage (page) {
      window.location.href = page;
    },
  }
}
</script>

<style scoped>
</style>