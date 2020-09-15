<template>
    <div class="dropdown-menu">
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'details-menu'
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";

.dropdown-menu {
  font-size: 14px;
  font-family: 'Source Sans Pro', sans-serif;
  position: absolute;
  top: 100%;
  margin-top: 5px;
  right: 0;
  left: auto;
  border-radius: 5px;
  box-shadow: 0 1px 8px rgba(0,0,0,.25);
  z-index: 15;
  background-color: $white;
  user-select: none;
}
</style>
