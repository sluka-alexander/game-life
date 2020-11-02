<template>
  <div class="home">
    <div class="title">{{ $t('items.home') }}</div>
    <div class="center">
      <banner :text="'home'"></banner>
      <router-link to="./tasks"
                   class="button" style="margin-bottom: 15px">
        {{ $t('home.btn') }}</router-link>
      <router-link class="subtitle" to="./rules">
        {{ $t('home.rules') }}</router-link>
    </div>
  </div>
</template>

<script>
import * as level from '@/methods/xp'
import banner from '@/components/banner'
export default {
  name: 'home',
  components: {
    banner
  },
  computed: {
    userXp: function () {
      return this.$store.getters.USER_DATA.xp
    }
  },
  mounted () {
    this.$store.commit('updateLevel', level.xpMethod(this.userXp))
    this.$store.dispatch('calcLevelScale')
  }
}
</script>

<style scoped lang="scss">
@import "../styles/main";

.home {
  width: 100%;
}
</style>
