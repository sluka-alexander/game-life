<template>
    <div class="welcome">
      <div class="welcome__left-part">
        <slot></slot>
      </div>
      <div class="welcome__right-part">
        <div class="welcome__img"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'welcome-page'
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";

.welcome {
  @extend %flex;

  @include size(100%);

  flex: 1 1;
  position: fixed;

  &__right-part,
  &__left-part {
    @include size(100%);

    justify-content: center;
  }

  &__left-part {
    @extend %flex;

    background-color: $white;
    padding: 130px 30px 0 30px;
  }

  &__right-part {
    display: none;
    align-items: center;
    padding: 0 30px;
    border-left: 1px solid $gray-border;
    background-color: #FDFDFD;

    @include media(tablet) {
      display: flex;
    }
  }

  &__img {
    @extend %img;

    width: 100%;
    height: 30%;
    background-image: url('../views/img/login.svg');
  }
}

</style>
