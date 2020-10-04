<template>
  <div class="avatar-block">
    <div class="avatar-block__avatar">
      {{ userName.slice(0, 2).toUpperCase() }}
    </div>
    <div class="avatar-block__name">{{ userName }}</div>
  </div>
</template>

<script>
export default {
  name: 'avatar',
  computed: {
    userName: function () {
      return this.$store.getters.USER_DATA.name
    }
  }
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";

  .avatar-block {
    font-size: $font-size-S;

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
      font-weight: $weight-extra-bold;
      margin: 0 auto;
      text-align: center;
    }
  }
</style>
