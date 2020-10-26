import Vue from 'vue'
import VueI18n from 'vue-i18n'
import en from './en'
import ru from './ru'

Vue.use(VueI18n)

export default {
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    en,
    ru
  }
}
