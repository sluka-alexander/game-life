<template>
  <div class="home">
    <div class="title">Home</div>
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
import banner from '@/components/banner'
export default {
  name: 'home',
  components: {
    banner
  }
}
</script>

<style scoped lang="scss">
@import "../styles/main";

.home {
  width: 100%;
}
</style>
