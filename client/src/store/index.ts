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
    userData: {},
    isActiveLeftMenu: false,
    isActiveRightBlock: true,
    isActiveModal: false,
    nameActiveModal: null
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
      state.userData = {}
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

    createTask ({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.NEW_TASK}`, data, {
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
    }
  }
})
