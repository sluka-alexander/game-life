import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import VueApexCharts from 'vue-apexcharts'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueApexCharts)
Vue.component('v-select', vSelect)

Vue.component('apexchart', VueApexCharts)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
