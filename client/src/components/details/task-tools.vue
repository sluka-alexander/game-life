<template>
  <div class="task-tools">
    <div class="task-tools__item">
      <div class="task-tools__icon icon-edit"></div>
      <div class="task-tools__text">Edit</div>
    </div>
    <div class="task-tools__item">
      <div class="task-tools__icon icon-arrow-right" style="transform: rotate(-90deg)"></div>
      <div class="task-tools__text">Up</div>
    </div>
    <div class="task-tools__item">
      <div class="task-tools__icon icon-arrow-right" style="transform: rotate(90deg)"></div>
      <div class="task-tools__text">Down</div>
    </div>
    <div class="task-tools__item">
      <div class="task-tools__icon task-tools__icon_delete icon-delete"></div>
      <div class="task-tools__text">Delete</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'task-tools'
}
</script>

<style scoped lang="scss">
@import "../../views/styles/main";
.task-tools {
  &__item {
    @extend %flex;
    padding: 10px 20px;
    cursor: pointer;

    &:last-child {
      color: $red;
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
  &__icon {
    @extend %flex-center;
    color: $lilac;
    margin-right: 20px;
    &_delete {
      color: $red;
    }
  }
  &__text {
    font-weight: $weight-light;
    margin-right: 20px;
  }
}
</style>
