import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import environment from './environment'
import endpoints from './endpoints.const'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    error: '',
    token: localStorage.getItem('token') || null,
    isAdmin: false,
    isActiveLeftMenu: false,
    isActiveRightBlock: true,
    isActiveModal: false,
    isLoading: false,
    nameActiveModal: null,
    userData: {
      xp: 0,
      money: 0,
      skills: {
        str: 0,
        int: 0,
        cul: 0,
        cha: 0,
        hum: 0
      }
    },
    updateElementData: {}
  },
  mutations: {
    errorAuth (state) {
      state.status = 'ErrorAuth'
    },
    successAuth (state, token) {
      state.status = 'Success Auth'
      state.token = token
    },
    success (state) {
      state.status = 'Success'
    },
    // complete (state, data) {
    //   if (data.action === 'increase') {
    //     state.userData.xp += data.xp
    //     state.userData.money += data.money
    //     state.userData.skills.str += data.skills.str
    //     state.userData.skills.int += data.skills.int
    //     state.userData.skills.cul += data.skills.cul
    //     state.userData.skills.cha += data.skills.cha
    //     state.userData.skills.hum += data.skills.hum
    //   } else {
    //     state.userData.xp -= data.xp
    //     state.userData.money -= data.money
    //     state.userData.skills.str -= data.skills.str
    //     state.userData.skills.int -= data.skills.int
    //     state.userData.skills.cul -= data.skills.cul
    //     state.userData.skills.cha -= data.skills.cha
    //     state.userData.skills.hum -= data.skills.hum
    //     if (state.userData.money < 0) {
    //       state.userData.money = 0
    //     }
    //     if (state.userData.xp < 0) {
    //       state.userData.xp = 0
    //     }
    //     if (state.userData.skills.str < 0) {
    //       state.userData.skills.str = 0
    //     }
    //     if (state.userData.skills.int < 0) {
    //       state.userData.skills.int = 0
    //     }
    //     if (state.userData.skills.cul < 0) {
    //       state.userData.skills.cul = 0
    //     }
    //     if (state.userData.skills.cha < 0) {
    //       state.userData.skills.cha = 0
    //     }
    //     if (state.userData.skills.hum < 0) {
    //       state.userData.skills.hum = 0
    //     }
    //   }
    // },
    changeStateOfLeftMenu (state) {
      state.isActiveLeftMenu = !state.isActiveLeftMenu
    },
    closeOfLeftMenu (state) {
      state.isActiveLeftMenu = false
    },
    logout (state) {
      state.status = ''
      state.token = null
      state.isAdmin = false
      state.userData = {
        str: 0,
        int: 0,
        cul: 0,
        cha: 0,
        hum: 0
      }
    },
    closeModal (state) {
      state.isActiveModal = false
    },
    openModal (state) {
      state.isActiveModal = true
    },
    loading (state) {
      state.isLoading = !state.isLoading
    },
    assignNameModal (state, nameModal) {
      state.nameActiveModal = nameModal
    },
    modalUpdateDataTask (state, data) {
      state.updateElementData = data
    },
    changeStateOfRightBlock (state) {
      state.isActiveRightBlock = !state.isActiveRightBlock
    }
  },
  actions: {
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post(`${environment.baseUrl}${endpoints.REGISTER}`, user)
          .then((res: unknown) => {
            commit('success')
            resolve(res)
          }).catch((err: any) => {
            commit('errorAuth', err)
            reject(err)
          })
      })
    },
    login ({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post(`${environment.baseUrl}${endpoints.LOGIN}`, user)
          .then(res => {
            localStorage.setItem('token', res.data.token)
            this.state.userData = res.data.user
            commit('successAuth', res.data.token)
            console.log('норм')
            resolve(res)
          })
          .catch(err => {
            commit('errorAuth', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      commit('logout')
      localStorage.removeItem('token')
    },
    getDataUser ({ commit }) {
      return axios.post(`${environment.baseUrl}${endpoints.USERDATA}`, null,
        { headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` } })
        .then(res => {
          localStorage.setItem('token', res.data.token)
          commit('success')
          this.state.userData = res.data.user
        }).catch(() => {
          commit('error')
        })
    },
    create ({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.NEW}`, data, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` }
      }).then(() => {
        commit('success')
      }).catch(() => {
        commit('error')
      })
    },
    update ({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.UPDATE}`, data, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` }
      }).then(() => {
        commit('success')
      }).catch(() => {
        commit('error')
      })
    },
    delete ({ commit }, element) {
      return axios.put(`${environment.baseUrl}${endpoints.DELETE}`, element, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` }
      }).then(() => {
        commit('success')
      }).catch(() => {
        commit('error')
      })
    },
    complete ({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.COMPLETE}`, data, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` }
      }).then(() => {
        commit('success')
      }).catch(() => {
        commit('error')
      })
    },

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
    USER_DATA: (state) => {
      return state.userData
    },
    IS_LOGGED_IN: (state) => {
      return !!state.token
    },
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
    },
    UPDATE_ELEMENT_DATA (state) {
      return state.updateElementData
    },
    IS_LOADING (state) {
      return state.isLoading
    }
  }
})
