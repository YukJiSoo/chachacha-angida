<template>
  <v-container grid-list-md text-xs-center align-center>
    <basicSet></basicSet>
    <v-layout align-center justify-end>
      <!--한칸-->
      <v-flex xs10 sm10>
        <p class="text-xs-left xlarge">알림 받기</p>
      </v-flex>
      <v-flex xs2 sm2 class="pt-0">
        <!--스위치-->
        <v-switch v-model="switch1" class="pt-0"></v-switch>
      </v-flex>
      <v-divider></v-divider>
      <!--끝-->
    </v-layout>
    <v-layout align-center justify-end class="mb-2">
        <v-divider></v-divider>
    </v-layout>
  </v-container>
</template>

<script>
import basicSet from '@/components/ownerBasic'

export default {
  components: { basicSet },
  name: 'ownerSetting',
  data () {
    return {
      
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.angida-gradiation{
   background: #fc8e53;
   background: -moz-linear-gradient(left, #fc8e53 0%, #f17432 0%, #fc8e53 0%, #fc8e53 17%, #ea5507 55%, #f70000 100%);
   background: -webkit-linear-gradient(left, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
   background: linear-gradient(to right, #fc8e53 0%,#f17432 0%,#fc8e53 0%,#fc8e53 17%,#ea5507 55%,#f70000 100%);
   filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fc8e53', endColorstr='#f70000',GradientType=1 );
}
</style>
