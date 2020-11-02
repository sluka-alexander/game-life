import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import home from '../views/route/home.vue'
import tasks from '../views/route/tasks.vue'
import adventure from '../views/route/standings.vue'
import rules from '../views/route/rules.vue'
import progress from '../views/route/progress.vue'
import achievement from '../views/route/achievement.vue'
import login from '../components/forms/form-login.vue'
import register from '../components/forms/form-register.vue'
import store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    meta: {
      auth: true
    },
    component: home
  },
  {
    path: '/tasks',
    name: 'tasks',
    meta: {
      auth: true
    },
    component: tasks
  },
  {
    path: '/adventure',
    name: 'adventure',
    meta: {
      auth: true
    },
    component: adventure
  },
  {
    path: '/rules',
    name: 'rules',
    meta: {
      auth: true
    },
    component: rules
  },
  {
    path: '/progress',
    name: 'progress',
    meta: {
      auth: true
    },
    component: progress
  },
  {
    path: '/achievement',
    name: 'achievement',
    meta: {
      auth: true
    },
    component: achievement
  },
  {
    path: '/user/login',
    name: 'login',
    meta: {
      notAuth: true
    },
    component: login
  },
  {
    path: '/user/register',
    name: 'register',
    meta: {
      notAuth: true
    },
    component: register
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    if (store.getters.IS_LOGGED_IN) {
      next()
      return
    }
    next({ name: 'login' })
  }
  if (to.matched.some((record) => record.meta.notAuth)) {
    if (store.getters.IS_LOGGED_IN) {
      next({ name: 'home' })
      return
    }
    next()
  } else {
    next()
  }
})

export default router
