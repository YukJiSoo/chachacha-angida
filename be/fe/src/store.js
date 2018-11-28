import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    id: localStorage.getItem('id') // id 초기값
  },
  mutations: {
    login: function (state, id) {
      localStorage.setItem('id', id) // 첫 로그인시 로컬스토리지에 세팅
    }
  },
  getters: {
    getId: function (state) {
      return state.id;
    }
  },
  actions: {

  }
})
