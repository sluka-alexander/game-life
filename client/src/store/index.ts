import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isActiveLeftMenu: false
  },
  mutations: {
    changeStateOfLeftMenu (state) {
      state.isActiveLeftMenu = !state.isActiveLeftMenu
    }
  },
  actions: {
    changeStateOfLeftMenu (context) {
      context.commit('changeStateOfLeftMenu')
    }
  },
  modules: {
  },
  getters: {
    IS_ACTIVE_LEFT_MENU (state) {
      return state.isActiveLeftMenu
    }
  }
})
