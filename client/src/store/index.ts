import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import environment from './environment'
import endpoints from './endpoints.const'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchFilter: '',
    status: '',
    error: '',
    token: localStorage.getItem('token') || null,
    lang: localStorage.getItem('lang') || 'en',
    darkTheme: localStorage.getItem('dark') || null,
    isActiveLeftMenu: false,
    isActiveRightBlock: true,
    isActiveModal: false,
    isLoading: false,
    nameActiveModal: null,
    nameActiveNotify: null,
    allUsers: [],
    userData: {
      xp: 0,
      money: 0,
      skills: {
        str: 0,
        int: 0,
        cul: 0,
        cha: 0,
        hum: 0
      },
      level: 0,
      habits: [],
      tasks: [],
      daily: []
    },
    updateElementData: {},
    levelData: {
      level: 0,
      to: 0,
      from: 0
    }
  },
  mutations: {
    search (state, data) {
      state.searchFilter = data
    },
    darkTheme (state) {
      if (localStorage.getItem('dark')) {
        localStorage.removeItem('dark')
      } else {
        localStorage.setItem('dark', 'true')
      }
    },
    changeLang (state, data) {
      state.lang = data
    },
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

    updateLevel (state, data) {
      state.userData.level = data.level
      state.levelData = data
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
      state.userData = {
        str: 0,
        int: 0,
        cul: 0,
        cha: 0,
        hum: 0
      }
      state.levelData = {
        level: 0,
        to: 0,
        from: 0
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
    },
    openNotify (state, data) {
      state.nameActiveNotify = data
      setTimeout(() => {
        state.nameActiveNotify = null
      }, 3000)
    }
  },
  actions: {
    changeLang ({ commit }, data) {
      commit('changeLang', data)
      localStorage.setItem('lang', data)
    },
    darkTheme ({ commit }, data) {
      if (data === 'clicked') {
        commit('darkTheme')
        const html = document.querySelector('html') as any
        html.classList.toggle('dark')
      } else {
        if (this.state.darkTheme) {
          const html = document.querySelector('html') as any
          html.classList.toggle('dark')
        }
      }
    },
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
    getAllUsers ({ commit }) {
      return axios.get(`${environment.baseUrl}${endpoints.ALL_USERS}`)
        .then(res => {
          this.state.allUsers = res.data.users
        }).catch(() => {
          commit('error')
        })
    },
    create ({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.NEW}`, data, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` }
      }).then(() => {
        commit('success')
        commit('openNotify', 'created')
      }).catch(() => {
        commit('error')
      })
    },
    update ({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.UPDATE}`, data, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` }
      }).then(() => {
        commit('success')
        commit('openNotify', 'updated')
      }).catch(() => {
        commit('error')
      })
    },
    delete ({ commit }, element) {
      return axios.put(`${environment.baseUrl}${endpoints.DELETE}`, element, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` }
      }).then(() => {
        commit('success')
        commit('openNotify', 'removed')
      }).catch(() => {
        commit('error')
      })
    },
    complete ({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.COMPLETE}`, data, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` }
      }).then((res) => {
        commit('success')
        if (data.type === 'habit') {
          if (data.action === 'increase') {
            commit('openNotify', 'completeIncrease')
          } else {
            commit('openNotify', 'completeDecrease')
          }
        }
        if (data.type === 'award') {
          commit('openNotify', 'buy')
        }
      }).catch(() => {
        commit('error')
      })
    },
    sort ({ commit }, data) {
      switch (data) {
        case 'diffUp':
          this.state.userData.habits = this.state.userData.habits.sort((a: any, b: any) => a.difficulty > b.difficulty ? 1 : -1)
          this.state.userData.tasks = this.state.userData.tasks.sort((a: any, b: any) => a.difficulty > b.difficulty ? 1 : -1)
          this.state.userData.daily = this.state.userData.daily.sort((a: any, b: any) => a.difficulty > b.difficulty ? 1 : -1)
          break
        case 'diffDown':
          this.state.userData.habits = this.state.userData.habits.sort((a: any, b: any) => a.difficulty > b.difficulty ? -1 : 1)
          this.state.userData.tasks = this.state.userData.tasks.sort((a: any, b: any) => a.difficulty > b.difficulty ? -1 : 1)
          this.state.userData.daily = this.state.userData.daily.sort((a: any, b: any) => a.difficulty > b.difficulty ? -1 : 1)
          break
      }
    },
    openModal (context) {
      context.commit('openModal')
    },
    updateLevel ({ commit }, data) {
      const oldLevel = this.state.levelData.level
      commit('updateLevel', data)
      return axios.put(`${environment.baseUrl}${endpoints.UPDATE_LEVEL}`, data, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` }
      }).then((res) => {
        if (oldLevel > res.data.level) {
          commit('assignNameModal', { name: 'level', action: 'down' })
          commit('openModal')
        }
        if (oldLevel < res.data.level) {
          commit('assignNameModal', { name: 'level', action: 'up' })
          commit('openModal')
        }
        this.state.userData.level = res.data.level
        commit('success')
      }).catch(() => {
        commit('error')
      })
    },
    checkDailyDate ({ commit }, data) {
      return axios.put(`${environment.baseUrl}${endpoints.CHECK_DAILY}`, data, {
        headers: { 'auth-token': `Bearer ${localStorage.getItem('token')}` }
      }).then(() => {
        commit('success')
      }).catch(() => {
        commit('error')
      })
    },
    calcLevelScale () {
      const widthLevel = 100 * (this.state.userData.xp - this.state.levelData.to) / (this.state.levelData.from - this.state.levelData.to)
      const levelScale = document.getElementById('levelScale') as HTMLElement
      if (levelScale) levelScale.style.width = widthLevel + '%'
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
    USER_DATA_HABITS: (state) => {
      return state.userData.habits.filter((habit) => habit.name.toLowerCase().match(state.searchFilter.toLowerCase()) ||
        habit.category.toLowerCase().match(state.searchFilter.toLowerCase()))
    },
    USER_DATA_TASKS: (state) => {
      return state.userData.tasks.filter((task) => task.name.toLowerCase().match(state.searchFilter.toLowerCase()) ||
        task.category.toLowerCase().match(state.searchFilter.toLowerCase()))
    },
    USER_DATA_DAILIES: (state) => {
      return state.userData.daily.filter((daily) => daily.name.toLowerCase().match(state.searchFilter.toLowerCase()) ||
        daily.category.toLowerCase().match(state.searchFilter.toLowerCase()))
    },
    ALL_USERS: (state) => {
      return state.allUsers
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
    },
    LEVEL_DATA (state) {
      return state.levelData
    },
    LANG (state) {
      return state.lang
    },
    NAME_NOTIFY (state) {
      return state.nameActiveNotify
    },
    SEARCH_FILTER (state) {
      return state.searchFilter
    }
  }
})
