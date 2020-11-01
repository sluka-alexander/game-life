<template>
    <div class="dropdown-menu" :class="{ 'dropdown-menu_active' : isActive}">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'details-menu',
  data () {
    return {
      isActive: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";

.dropdown-menu {
  display: none;
  font-size: $font-size-XS;
  font-family: 'Open Sans', sans-serif;
  position: absolute;
  top: 100%;
  margin-top: 5px;
  right: 0;
  left: auto;
  border-radius: 3px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
  rgba(9, 30, 66, 0.31) 0px 0px 1px;
  z-index: 15;
  background-color: $white;
  user-select: none;
  &_active {
    display: block;
  }
}
</style>
