<template>
  <div class="banner"
       :class="{ 'banner_home': text === 'home' }">
  </div>
</template>

<script>
export default {
  name: 'banner',
  props: {
    text: String
  }
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";
  .banner {
    @include size(100%, 200px);
    @extend %img;
    margin-bottom: 15px;

    &_home {
      background-image: url('../views/img/welcome.svg');
    }
  }
</style>
