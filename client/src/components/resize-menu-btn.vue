<template>
    <div class="resize-btn">
      <div class="resize-btn__icon icon-arrow"
           :class="{ 'resize-btn__icon_active': isActiveRightBlock }"></div>
    </div>
</template>

<script>
export default {
  name: 'resize-menu-btn',
  computed: {
    isActiveRightBlock: function () {
      return this.$store.getters.IS_ACTIVE_RIGHT_BLOCK
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../views/styles/common/index";

  .resize-btn {
    @extend %flex-center;

    @include size(24px);

    font-size: 8px;
    background-color: $white;
    border-radius: 50px;
    cursor: pointer;
    transition: 0.2s;
    box-shadow: rgba(9, 30, 66, 0.08) 0 2px 4px 1px;
    color: rgb(107, 119, 140);

    &:hover {
      color: $white;
      background-color: $color-main;
    }

    &__icon {
      @extend %flex-center;

      @include size(20px);

      transform: rotate(-90deg);
      margin-left: 1px;

      &_active {
        transform: rotate(90deg);
        margin-left: -1px;
      }
    }
  }
</style>
