<template>
  <v-container grid-list-md text-xs-center align-center>
    <v-layout>
      <v-flex xs12 sm12>
        <v-card>
          <v-list two-line>
            <v-subheader><p>
              coupon : {{count}}
            </p></v-subheader>
            <v-divider></v-divider>
    <template v-for="item in items">


      <v-list-tile
        v-if
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
      <v-divider></v-divider>
    </template>
  </v-list>
</v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        count: '쿠폰수',
        items: [
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
            title: 'Brunch this weekend?',
            subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
            title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
            subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
          },
          {
            avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
            title: 'Oui oui',
            subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
          }
        ]
      }
    }
  }
</script>

<style scoped>
</style>
