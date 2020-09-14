<template>
  <div class="blackout"></div>
</template>

<script>
export default {
  name: 'blackout'
}
</script>

<style scoped lang="scss">
  @import "../views/styles/common/index";
  .blackout {
    @include size(100%);

    position: fixed;
    z-index: 5;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(32, 37, 59, 0.4);
  }

</style>
