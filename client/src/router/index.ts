import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import tasks from '../views/route/tasks.vue'
import adventure from '../views/route/adventure.vue'
import rules from '../views/route/rules.vue'
import progress from '../views/route/progress.vue'
import achievement from '../views/route/achievement.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
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
  }
]

const router = new VueRouter({
  routes
})

export default router
