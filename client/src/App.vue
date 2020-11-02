<template>
  <div v-if="loadedData">
    <div v-if="isLoading" class="loading-bgc">
      <div class="lds-ring ">
        <div></div>
      </div>
    </div>
    <modal v-if="isActiveModal">
      <all-modal></all-modal>
    </modal>
    <welcome v-if="!isLoggedIn"></welcome>
    <page v-else></page>
  </div>
</template>

<script>
import welcome from './views/route/welcome.vue'
import Page from '@/views/page.vue'
import * as level from '@/methods/xp'
import modal from '@/components/modal'
import allModal from '@/components/modals/all-modals'

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
    welcome,
    modal,
    allModal
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.IS_LOGGED_IN
    },
    userXp: function () {
      return this.$store.getters.USER_DATA.xp
    },
    isActiveModal () {
      return this.$store.getters.IS_ACTIVE_MODAL
    },
    isLoading: function () {
      return this.$store.getters.IS_LOADING
    }
  },
  mounted () {
    if (this.isLoggedIn) {
      this.$store.commit('loading')
      this.$store.dispatch('getDataUser').then(() => {
        this.$store.commit('updateLevel', level.xpMethod(this.userXp))
        this.loadedData = true
        this.$store.commit('loading')
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
