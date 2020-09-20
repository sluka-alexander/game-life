import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isActiveLeftMenu: false,
    isActiveRightBlock: false,
    isActiveModal: false,
    nameActiveModal: null,
    dataUser: {
      firstName: 'Alexander',
      lastName: 'Sluka',
      skills: {
        strength: 100,
        intellect: 150,
        culture: 10
      }
    }
  },
  mutations: {
    changeStateOfLeftMenu (state) {
      state.isActiveLeftMenu = !state.isActiveLeftMenu
    },
    closeOfLeftMenu (state) {
      state.isActiveLeftMenu = false
    },
    closeModal (state) {
      state.isActiveModal = false
    },
    openModal (state) {
      state.isActiveModal = true
    },
    assignNameModal (state, nameModal) {
      state.nameActiveModal = nameModal
    },
    changeStateOfRightBlock (state) {
      state.isActiveRightBlock = !state.isActiveRightBlock
    }
  },
  actions: {
    changeStateOfLeftMenu (context) {
      context.commit('changeStateOfLeftMenu')
    },
    closeOfLeftMenu (context) {
      context.commit('closeOfLeftMenu')
    },
    closeModal (context) {
      context.commit('closeModal')
    },
    openModal (context) {
      context.commit('openModal')
    },
    changeStateOfRightBlock (context) {
      context.commit('changeStateOfRightBlock')
    }
  },
  modules: {
  },
  getters: {
    IS_ACTIVE_LEFT_MENU (state) {
      return state.isActiveLeftMenu
    },
    IS_ACTIVE_RIGHT_BLOCK (state) {
      return state.isActiveRightBlock
    },
    IS_ACTIVE_MODAL (state) {
      return state.isActiveModal
    },
    NAME_ACTIVE_MODAL (state) {
      return state.nameActiveModal
    }
  }
})
