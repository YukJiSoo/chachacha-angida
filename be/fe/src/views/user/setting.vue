<template>
  <v-container grid-list-md align-center class="py-0">
    <!-- 상단 -->
    <v-layout align-end column>
      <v-flex xs12 sm12>
        <v-toolbar
          app
          dark
          height="40"
          class="angida-gradiation">
          <v-btn icon @click="$goBack()">
            <v-icon>keyboard_arrow_left</v-icon>
          </v-btn>
          <v-container class="pa-0">
            <v-layout align-center column>
              <v-flex xs12 sm12>
                <span class="font-weight-bold subheading">환경설정</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-toolbar>
      </v-flex>
    </v-layout>
    
    <!-- 한칸 -->
    <v-layout align-start justify-end column fill-height>
      <v-flex xs12 sm10 class="pl-3 pt-3">
        <v-switch v-for="i in 3" v-model="switchMe" class="mt-1">
          <template slot="label">
            <div class="ml-3 subheading">
              이벤트 혜택 알림
            </div>
          </template>
        </v-switch>
      </v-flex>
    </v-layout>
    <!-- 끝 -->
  </v-container>
</template>


<script>
export default {
  name: 'default',
  data () {
    return {
      mypagePath:'/mypage',
    }
  },
  methods: {}
}
</script>

<style scoped>
</style>
