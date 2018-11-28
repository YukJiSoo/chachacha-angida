import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps'
import Geocoder from "@pderas/vue2-geocoder"
import google_config from "../config/google.json"

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key:google_config.google_api_key,
    libraries: 'places',
  }
})
Vue.use(Geocoder, {
    googleMapsApiKey: google_config.google_api_key
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
