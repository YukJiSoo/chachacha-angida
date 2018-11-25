<template>
  <v-container class="pa-0">
    <v-layout column wrap>
      <!-- 상단 -->
      <v-flex xs12 sm12>
        <v-toolbar
          app
          flat
          height="40"
          class="angida-gradiation white--text">
          <v-btn dark icon>
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">포인트</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>

      <!-- 포인트 상황 -->
      <v-flex xs12 sm12>
        <v-card flat>
          <v-layout align-center column wrap>
            <v-flex xs12>
              <div class="headline font-weight-bold pt-4">
                <span>보유포인트 1000P</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <div class="body-2 pt-1">
                <span>1000원이상 100원 단위로 사용 가능</span>
              </div>
            </v-flex>
            <v-flex xs12>
              <div class="caption grey--text py-3">
                <span>이번 달 소멸 예정포인트 0원</span>
              </div>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>

      <!-- 포인트 이용내역 -->
      <v-flex xs12 sm12 class="mt-3">
        <v-card flat>
          <v-layout column wrap class="px-3">
            <v-flex xs12>
              <div class="subheading font-weight-bold pl-1 py-3">
                <span>포인트 이용내역</span>
              </div>
            </v-flex>
            <!-- 이용내역 아이템 -->
            <v-layout v-for="i in 3" row wrap class="pt-1">
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              
              <!-- 가게이름, 예약날짜, 소멸예정날짜 -->
              <v-flex xs8>
                <v-layout column wrap>
                  <v-flex xs12>
                    <div class="body-2 ">
                      <span>강서 동국대점</span>
                    </div>
                  </v-flex>
                  <v-flex xs12>
                    <div class="caption grey--text pt-1">
                      <span>2018.10.03 (2018.12.23 소멸)</span>
                    </div>
                  </v-flex>
                </v-layout>                  
              </v-flex>

              <!-- 적립, 소멸포인트 값 -->
              <v-flex xs3>
                <div class="body-1 orange--text pt-2">
                  <span>+16원 적립</span>
                </div>
              </v-flex>
            </v-layout>

          </v-layout>
        </v-card>
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
  methods: {}
}
</script>

<style scoped>
</style>