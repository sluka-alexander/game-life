<template>
  <div v-if="loadedData">
    <welcome v-if="!isLoggedIn"></welcome>
    <page v-else></page>
  </div>
</template>

<script>
import welcome from './views/route/welcome.vue'
import Page from '@/views/page.vue'

export default {
  name: 'app',
  data () {
    return {
      notAuth: true,
      loadedData: false,
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
    console.log(this.isLoggedIn)
    if (this.isLoggedIn) {
      this.$store.dispatch('getDataUser').then(() => {
        this.loadedData = true
      })
    } else {
      this.loadedData = true
    }
  }
}

</script>
<style lang="scss">
@import "views/styles/main.scss";
</style>
