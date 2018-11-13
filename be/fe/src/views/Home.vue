<template>
  <v-container class="pa-0">
    <v-layout>
      <v-flex xs12 sm12>
        <v-text-field
            solo
            label="찾고싶은 가게를 입력하세요"
            append-icon="place"
            color="deep-orange lighten-1"
            class="mt-3 mb-0 mx-2"
          ></v-text-field>

        <!-- advertisement -->
        <v-subheader class="mt-0 mb-0">Event</v-subheader>
        <v-carousel 
          hide-delimiters
          app
        >
          <v-carousel-item
            v-for="(item,i) in ad_items"
            :key="i"
            :src="item.src"
          ></v-carousel-item>
        </v-carousel>

        <!-- category -->
        <v-subheader>Category</v-subheader>
        <v-carousel 
          hide-controls
          hide-delimiters
          app
          :cycle = "false"
        >
          <v-carousel-item
            v-for="(item,i) in ad_items"
            :key="i"
            :src="item.src"
            class="mx-1"
          ></v-carousel-item>
        </v-carousel>

        <!-- hot place -->
        <v-subheader>이 달의 인기 식당!</v-subheader>
        <v-container class="pa-0">
          <v-layout row>
            <v-flex xs12 sm4>
              <v-hover v-for="n in 3" class="mb-2">
                <v-card
                  slot-scope="{ hover }"
                  :class="`elevation-${hover ? 12 : 2}`"
                  class="mx-auto"
                >
                  <v-img
                    :aspect-ratio="16/9"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                  ></v-img>
                  <v-card-title>
                    <div>
                      <span class="headline">토끼정 강남점</span>
                      <div class="d-flex">
                        <v-rating
                          :value="4.5"
                          :full-icon="favorite"
                          color="amber"
                          dense
                          half-increments
                          readonly
                          size="14"
                        ></v-rating>
                        <div class="ml-2 grey--text text--darken-2">
                          <span>4.5</span>
                          <span>(413)</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <v-btn 
                        outline color="deep-orange lighten-1"
                        class="ml-2"
                        large
                      >안아주기</v-btn>
                    </div>
                  </v-card-title>
                </v-card>
              </v-hover>
            </v-flex>
          </v-layout>
        </v-container>
        

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        size: 'sm',
        ad_items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
          }
        ],
        reviews: 413,
        value: 4.5,
      }
    }
  }
</script>
