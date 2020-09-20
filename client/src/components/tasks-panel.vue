<template>
  <div class="tasks-panel">
    <div class="tasks-panel__columns">
      <div class="tasks-panel__column">
        <div class="tasks-panel__top-part">
          <div class="tasks-panel__column-name">{{ scrollPosition }}</div>
          <input class="tasks-panel__input" placeholder="Add Task">
        </div>
        <div class="tasks-panel__tasks">
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
    taskTools,
    detailsMenu
  },
  data () {
    return {
      isActiveCheckbox: true,
      isActiveItemTools: false,
      scrollPosition: null
    }
  },
  methods: {
    updateScroll () {
      this.scrollPosition = window.scrollY
    }
  },
  mounted () {
    window.addEventListener('scroll', this.updateScroll)
  }
}
</script>

<style scoped lang="scss">
  @import "../views/styles/main";

  .tasks-panel {
    @extend %flex;
    height: 100%;
    position: relative;
    overflow-x: hidden;
    overflow-y: hidden;
    width: 100%;

    &__column-name {
      text-align: center;
      font-size: $font-size-M;
      margin-bottom: 10px;
      font-weight: $weight-semi-bold;
    }

    &__tasks {
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
    }

    &__item-main-part {
      @extend %flex;
    }

    &__columns {
      @extend %flex;

      @include size(100%);

      overflow-x: auto;
      position: relative;
    }

    &__column {
      @extend %flex;

      flex-direction: column;
      flex: 0 auto;
      min-width: 280px;
      width: 100%;
      background-color: $white;
      border-radius: 5px;
      padding: 10px;
      margin: 0 10px 10px 0;
      max-height: 100%;
      &:last-child {
        margin-right: 0;
      }
    }
    &__empty {
      min-width: 1px;
      width: 30px;
      background-color: transparent;
      max-height: 100%;
    }
    &__input {
      @include size(100%, 40px);

      background-color: $gray-lightest;
      border-radius: 5px;
      padding: 0 10px;
      margin-bottom: 10px;
    }
    &__item-name-and-more {
      @extend %flex-space-between;
    }
    &__item-name {
      max-width: 170px;
      font-size: $font-size-XS;
      font-weight: $weight-semi-bold;
      margin-bottom: 5px;
      word-wrap: break-word;
    }
    &__item-desc {
      width: 170px;
      font-size: $font-size-XXS;
      font-weight: $weight-light;
      color: $gray-dark;
      word-wrap: break-word;
    }
    &__item {
      @extend %flex-space-between;

      padding: 10px;
      transition: 0.2s;
      border-radius: 5px;
      margin-bottom: 10px;
      cursor: pointer;

      &:hover {
        background-color: $gray-lightest;
        /*box-shadow: 0 1px 8px rgba(0, 0, 0, 0.15);*/
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
    .shadow {
      width: 10px;
      height: 100%;
      position: absolute;
      z-index: 2;
      background-color: $color-bgc;
      &_right {
        right: 0;
        box-shadow: rgb(255, 255, 255) 0 80px 0, rgba(9, 30, 66, 0.08) -5px -2px 7px;
      }
      &_left {
        left: 0;
        box-shadow: rgb(255, 255, 255) 0 80px 0, rgba(9, 30, 66, 0.08) 5px -2px 7px;
      }

      &_active {
        box-shadow: none;
      }
    }
  }
</style>
