<template>
  <div class="lang">
    <div class="lang__item">Russian</div>
    <div class="lang__item">English</div>
  </div>
</template>

<script>
export default {
  name: 'language'
}
</script>

<style scoped lang="scss">
@import "../../views/styles/main";
.lang {
  &__item {
    padding: 10px 20px;

    &:last-child {
      &:hover {
        border-radius: 0 0 5px 5px;
      }
    }
    &:first-child {
      border-radius: 5px 5px 0 0;
    }
    &:hover {
      background-color: $gray-light;
    }
   }
}
</style>
