<template>
  <div class="tasks-panel">
    <div class="tasks-panel__column">
      <input class="tasks-panel__input" placeholder="Add Task">
      <div class="tasks-panel__item">
        <checkbox :isActiveCheckbox="isActiveCheckbox"
        v-on:click.native="isActiveCheckbox = !isActiveCheckbox"></checkbox>
        <div class="tasks-panel__item-icon-level icon-fire"></div>
        <div class="tasks-panel__item-name-and-desc">
          <div class="tasks-panel__item-name">Task 1</div>
          <div class="tasks-panel__item-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, a
            ssumenda sint. Eos libero minus porro.</div>
        </div>
      </div>
    </div>
    <div class="tasks-panel__column">
      <input class="tasks-panel__input">
    </div>
    <div class="tasks-panel__column">
      <input class="tasks-panel__input">
    </div>
    <div class="tasks-panel__column">
      <input class="tasks-panel__input">
    </div>
  </div>
</template>

<script>
import checkbox from '@/components/checkbox'
export default {
  name: 'tasks-panel',
  components: {
    checkbox
  },
  data () {
    return {
      isActiveCheckbox: true
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../views/styles/main";

  .tasks-panel {
    @extend %flex-space-between;

    width: 100%;

    &__column {
      width: 25%;
      margin-right: 30px;
      background-color: $white;
      border-radius: 15px;
      padding: 10px;
      margin-bottom: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
    &__input {
      @include size(100%, 40px);

      background-color: $gray-lightest;
      border-radius: 10px;
      padding: 0 10px;
      margin-bottom: 10px;
    }
    &__item-name {
      font-size: $font-size-S;
      margin-bottom: 5px;
    }
    &__item-desc {
      font-size: $font-size-XS;
      color: $gray-dark;
    }
    &__item {
      @extend %flex;

      padding: 10px;
      transition: 0.2s;
      cursor: pointer;
      border-radius: 10px;

      &:hover {
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
      }
    }
    &__item-icon-level {
      color: $red;
      padding: 0 10px;
      font-size: $font-size-S;
    }
  }
</style>
