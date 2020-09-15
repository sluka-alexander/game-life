<template>
  <div class="tasks-panel">
    <div class="tasks-panel__column">
      <input class="tasks-panel__input" placeholder="Add Task">
      <div class="tasks-panel__item">
        <div class="tasks-panel__item-main-part">
          <checkbox :isActiveCheckbox="isActiveCheckbox"
                    v-on:click.native="isActiveCheckbox = !isActiveCheckbox"></checkbox>
          <div class="tasks-panel__item-icon-level icon-fire"></div>
            <div class="tasks-panel__item-name-and-desc">
              <div class="tasks-panel__item-name">Task 1
              </div>
              <div class="tasks-panel__item-desc">FFFFFFFFFFF SSSSddddddddddddddddddfffffffff
                ffffffffffffffffffff
              </div>
          </div>
        </div>
        <div class="details-block details-more">
          <div class="tasks-panel__item-more icon-more"
               :class="{ 'tasks-panel__item-more_active': isActiveItemTools}"
               @click="isActiveItemTools = !isActiveItemTools">
          </div>
          <details-menu v-if="isActiveItemTools">
            <task-tools></task-tools>
          </details-menu>
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
import detailsMenu from '@/components/details-menu'
import taskTools from '@/components/details/task-tools'

export default {
  name: 'tasks-panel',
  components: {
    checkbox,
    detailsMenu,
    taskTools
  },
  data () {
    return {
      isActiveCheckbox: true,
      isActiveItemTools: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../views/styles/main";

  .tasks-panel {
    @extend %flex-space-between;

    width: 100%;
    overflow-x: auto;
    padding-bottom: 150px;

    &__item-main-part {
      @extend %flex;
    }

    &__column {
      min-width: 270px;
      width: 100%;
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
    &__item-name-and-more {
      @extend %flex-space-between;
    }
    &__item-name {
      max-width: 170px;
      font-size: $font-size-XS;
      margin-bottom: 5px;
      word-wrap: break-word;
    }
    &__item-desc {
      width: 170px;
      font-size: $font-size-XS;
      color: $gray-dark;
      word-wrap: break-word;
    }
    &__item {
      @extend %flex-space-between;

      padding: 10px;
      transition: 0.2s;
      border-radius: 10px;
      margin-bottom: 10px;

      &:hover {
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.15);
      }
    }

    &__item-icon-level {
      color: $red;
      padding: 0 10px;
      font-size: $font-size-XS;
    }
    &__item-more {
      color: $gray-dark;
      font-size: $font-size-XS;
      cursor: pointer;
      &:hover {
        color: $black;
      }
      &_active {
        color: $color-main;
        &:hover {
          color: $color-main;
        }
      }
    }
    .details-more {
      top: 0;
      right: 0;
    }
  }
</style>
