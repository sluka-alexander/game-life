<template>
  <div class="avatar-block">
    <div class="avatar-block__avatar">
      SA
    </div>
    <div class="avatar-block__name">Sluka Alexander</div>
  </div>
</template>

<script>
export default {
  name: 'avatar'
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";

  .avatar-block {
    font-size: $font-size-L;

    &__avatar {
      @extend %flex-center;

      @include size(100px);

      position: relative;
      border-radius: 50px;
      background-color: $gray-light;
      font-weight: $weight-light;
      margin: 0 auto 15px;

      &:after {
        @include size(15px);

        position: absolute;
        right: 10px;
        bottom: 10px;
        content: '';
        border-radius: 50px;
        background-color: $color-main;
      }
    }

    &__name {
      font-weight: $weight-semi-bold;
      margin: 0 auto;
      text-align: center;
    }
  }
</style>
