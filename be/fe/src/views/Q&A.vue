<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>

      <v-flex xs12 sm12>
        <div>
          <!-- 글 작성 버튼-->
          <p class="text-xs-right">
          <v-btn color="error" @click="goToWriting">글 작성</v-btn></p>
        </div>
        <v-card>
        <v-list two-line>
          <!--item 수만큼 자동적으로 tile수 증가-->
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :inset="item.inset"
              :key="index"
            ></v-divider>
<!--각 Q&A 타일 -->
            <v-list-tile
              v-else
              :key="item.title"
              avatar
              @click=""
            >
            <!--tile 의 사용자 사진-->
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>
              <!--tile의 내용들-->
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
      <div class="text-xs-center">
        <!--페이지 수 label-->
    <v-pagination
      v-model="page"
      :length="5"
      circle
    ></v-pagination>
  </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        page:1,
        items: [
          { header: 'Q&A' },
          {
            avatar: 'https://image.flaticon.com/icons/svg/74/74472.svg',
            title: 'Q&A 1',
            subtitle: "<span class='text--primary'>Q&A"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://image.flaticon.com/icons/svg/74/74472.svg',
            title: 'Q&A 2',
            subtitle: "<span class='text--primary'>Q&A"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://image.flaticon.com/icons/svg/74/74472.svg',
            title: 'Q&A 3',
            subtitle: "<span class='text--primary'>Q&A"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://image.flaticon.com/icons/svg/74/74472.svg',
            title: 'Q&A 4',
            subtitle: "<span class='text--primary'>Q&A"
          }
        ]
      }
    },
    methods:{
      goToWriting(){
          window.location.href = 'http://localhost:8080/writing';
      },
      changePage(){

      }
    }
  }
</script>
<style scoped>
</style>
