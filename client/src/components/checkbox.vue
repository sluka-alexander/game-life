<template>
    <div class="checkbox" :class="{ 'checkbox_active': isActiveCheckbox}">
    </div>
</template>

<script>
export default {
  name: 'checkbox',
  props: {
    isActiveCheckbox: Boolean
  }
}
</script>

<style scoped lang="scss">
  @import "../views/styles/main";

  .checkbox {
    @extend %flex-center;

    @include size(14px);
    position: relative;
    background-color: $gray-light;
    border-radius: 5px;
    padding: 5px;
    color: $gray-light;
    font-size: 9px;

    &:before {
      font-family: 'icomoon' !important;
      content: "\e917";
    }

    &:hover {
      background-color: $gray-dark;

      &:before {
        color: $gray-dark;
      }
    }

    &_active {
      background-color: $color-main;
      &:hover {
        background-color: $color-main;
        box-shadow: 0 0 4px #4745CB;
        &:before {
          color: $white;
        }
      }
    }
  }
</style>
