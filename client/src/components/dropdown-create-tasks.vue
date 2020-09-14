<template>
    <div class="dropdown-create-tasks" @mouseleave = "isActiveDropdown = false">
      <div class="dropdown-create-tasks__btn-plus icon-plus"
           @mouseover = "isActiveDropdown = true"
           :class="{ 'dropdown-create-tasks__btn-plus_active': isActiveDropdown }">
      </div>
      <div class="dropdown-create-tasks__items"
           :class="{ 'dropdown-create-tasks__items_active': isActiveDropdown }">
        <div class="dropdown-create-tasks__items_left"
             :class="{ 'dropdown-create-tasks__items_left_active': isActiveDropdown }">
          <div class="dropdown-create-tasks__item icon-habits"
               data-tooltip="Habits"></div>
          <div class="dropdown-create-tasks__item icon-check-tasks"
               data-tooltip="Tasks"></div>
        </div>
        <div class="dropdown-create-tasks__items_right"
             :class="{ 'dropdown-create-tasks__items_right_active': isActiveDropdown }">
          <div class="dropdown-create-tasks__item icon-daily"
               data-tooltip="Daily chores"></div>
          <div class="dropdown-create-tasks__item icon-achievement-create"
               data-tooltip="Achievement"></div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'btn-create-tasks',
  data () {
    return {
      isActiveDropdown: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";
  .dropdown-create-tasks {
    @extend %flex-center;

    position: relative;
    margin: 0 auto 10px;
    max-width: 250px;

    &__items {
      @extend %flex-space-between;

      @include size(250px, 50px);

      background-color: $white;
      border-radius: 15px;
      transition: 0.3s;
      max-width: 0;

      &_active {
        max-width: 250px;
      }

      &_right,
      &_left {
        @extend %flex;

        font-size: $icon-size-M;
        max-width: 0;
        opacity: 0;
        transition: 0.1s;
        &_active {
          opacity: 100;
          max-width: 100px;
        }
      }
    }

    &__item {
      @extend %flex-center;

      @include size(30px, 30px);
      margin: 10px;
      cursor: pointer;
      &:hover {
        color: $color-main;
      }
      &:hover {
        background-color: $gray-light;
        border-radius: 50px;
      }
    }

    &__btn-plus {
      @extend %flex-center;

      @include size(50px, 50px);

      position: absolute;
      font-size: $icon-size-M;
      color: $white;
      border-radius: 15px;
      background-color: $color-main;
      z-index: 1;
      transition: 0.3s;

      &_active {
        background-color: $gray-dark;
        transform: rotate(45deg);
      }
    }
  }
</style>
