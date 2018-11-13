<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">시간 선택</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">인원 선택</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">메뉴 선택</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-5"
          color="white"
          height="490px"
        >
          <v-card-text>
            <h1 class="text-lg-left">언제 도착하시나요?</h1>
          </v-card-text>

      </v-card>

        <v-btn
          color="gray"
          >
          취소
        </v-btn>

        <v-btn
          color="deep-orange lighten-1"
          @click="e1 = 2"
        >
          다음
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-5"
          color="white"
          height="490px"
        >
        <v-container fluid grid-list-xl>
           <v-layout wrap align-center>
             <v-flex xs12 sm6 d-flex>
               <v-select
                 :items="items"
                 label="Standard"
               ></v-select>
             </v-flex>

             <v-flex xs12 sm6 d-flex>
               <v-select
                 :items="items"
                 box
                 label="Box style"
               ></v-select>
             </v-flex>

             <v-flex xs12 sm6 d-flex>
               <v-select
                 :items="items"
                 label="Outline style"
                 outline
               ></v-select>
             </v-flex>

             <v-flex xs12 sm6 d-flex>
               <v-select
                 :items="items"
                 label="Solo field"
                 solo
               ></v-select>
             </v-flex>
           </v-layout>
         </v-container>

      </v-card>

        <v-btn
          color="gray"
          @click="e1 = 1"
        >
          이전
        </v-btn>

        <v-btn
          color="deep-orange lighten-1"
          @click="e1 = 3"
        >
          다음
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-5"
          color="white"
          height="490px"
        ></v-card>

        <v-btn
          color="gray"
          @click="e1 = 2"
        >
          이전
        </v-btn>

        <v-btn
          color="deep-orange lighten-1"
          @click="e1 = 1"
        >
          결제하기
        </v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
  export default {
    data () {
      return {
        e1: 0,
        picker: null,
        landscape: false
      }
    }
  }
</script>
