import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import home from '../views/route/home.vue'
import tasks from '../views/route/tasks.vue'
import adventure from '../views/route/adventure.vue'
import rules from '../views/route/rules.vue'
import progress from '../views/route/progress.vue'
import achievement from '../views/route/achievement.vue'
import login from '../views/route/login.vue'
import register from '@/views/route/register.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: tasks
  },
  {
    path: '/adventure',
    name: 'adventure',
    component: adventure
  },
  {
    path: '/rules',
    name: 'rules',
    component: rules
  },
  {
    path: '/progress',
    name: 'progress',
    component: progress
  },
  {
    path: '/achievement',
    name: 'achievement',
    component: achievement
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
]

const router = new VueRouter({
  routes
})

export default router
