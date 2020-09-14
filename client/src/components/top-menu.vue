<template>
    <div class="top-menu" :class="{ 'top-menu_active': isActiveRightBlock }">
      <div class="left-menu__top-part">
        <div class="menu-btn" @click="changeStateOfRightBlock()">
          <div class="menu-btn__burger">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'top-menu',
  methods: {
    changeStateOfRightBlock () {
      this.$store.dispatch('changeStateOfRightBlock')
    }
  },
  computed: {
    isActiveRightBlock: function () {
      return this.$store.getters.IS_ACTIVE_RIGHT_BLOCK
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../views/styles/main";

  .top-menu {
    @extend %flex;

    @include size(100%, 80px);
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    padding: 0 280px 0 130px;
    top: 0;
    z-index: 2;
    transition: 0.3s;

    &_active {
      padding: 0 30px 0 130px;
    }
  }
</style>
