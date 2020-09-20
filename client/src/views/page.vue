<template>
  <div class="page">
    <transition name=" smooth">
      <blackout v-if="isActiveLeftMenu" v-on:click.native="closeLeftMenu"></blackout>
    </transition>
    <left-menu></left-menu>
    <top-menu></top-menu>
    <div class="content" :class="{ 'content_active': isActiveRightBlock }">
      <router-view></router-view>
    </div>
    <main-right-block></main-right-block>
  </div>
</template>

<script>
import leftMenu from '@/components/left-menu.vue'
import topMenu from '@/components/top-menu.vue'
import blackout from '@/components/blackout'
import mainRightBlock from '@/components/main-right-block.vue'

export default {
  name: 'page',
  components: {
    leftMenu,
    mainRightBlock,
    topMenu,
    blackout
  },
  methods: {
    closeLeftMenu () {
      this.$store.dispatch('closeOfLeftMenu')
    }
  },
  computed: {
    isActiveRightBlock: function () {
      return this.$store.getters.IS_ACTIVE_RIGHT_BLOCK
    },
    isActiveLeftMenu: function () {
      return this.$store.getters.IS_ACTIVE_LEFT_MENU
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "styles/main";

  .page {
    &__top-menu {
      @extend %flex;
      justify-content: flex-end;
      align-items: flex-end;
     }
  }
</style>
