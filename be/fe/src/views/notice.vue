<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
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
<!--공지사항 각각 tile-->
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
          { header: '공지사항' },
          //공지사항 각각 정보
          {
            avatar: 'https://image.flaticon.com/icons/svg/74/74472.svg', //사용자 사진
            title: '공지사항 1', //제목
            subtitle: "<span class='text--primary'>공지" //공지내용
          },
          { divider: true, inset: true },
          {
            avatar: 'https://image.flaticon.com/icons/svg/74/74472.svg',
            title: '공지사항 2',
            subtitle: "<span class='text--primary'>공지"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://image.flaticon.com/icons/svg/74/74472.svg',
            title: '공지사항 3',
            subtitle: "<span class='text--primary'>공지"
          },
          { divider: true, inset: true },
          {
            avatar: 'https://image.flaticon.com/icons/svg/74/74472.svg',
            title: '공지사항 4',
            subtitle: "<span class='text--primary'>공지"
          }
        ]
      }
    }
  }
</script>
<style scoped>
</style>
