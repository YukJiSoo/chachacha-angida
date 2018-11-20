<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <v-card>


        <v-list two-line>
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

            <v-list-tile
              v-else
              :key="item.title"
              avatar
              @click=""
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
      <div class="text-xs-center">
    <v-pagination
      v-model="page"
      :length="5"
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
        items: [
          { header: '공지사항' },
          {
            avatar: 'https://image.flaticon.com/icons/svg/74/74472.svg',
            title: '공지사항 1',
            subtitle: "<span class='text--primary'>공지"
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
