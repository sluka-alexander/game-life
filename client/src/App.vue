<template>
  <welcome v-if="!isLoggedIn"></welcome>
  <page v-else></page>
</template>

<script>
import welcome from './views/route/welcome.vue'
import Page from '@/views/page.vue'

export default {
  name: 'app',
  data () {
    return {
      notAuth: true,
      token: localStorage.getItem('token')
    }
  },
  components: {
    Page,
    welcome
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.IS_LOGGED_IN
    }
  },
  mounted () {
    if (this.$store.getters.IS_LOGGED_IN) {
      this.$store.dispatch('getDataUser')
    }
  }
}

</script>
<style lang="scss">
@import "views/styles/main.scss";
</style>
