import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key:'AIzaSyBXFrZJqgTE4OSbcv_ewXkpHro-P9dfg80',
    libraries: 'places',
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
