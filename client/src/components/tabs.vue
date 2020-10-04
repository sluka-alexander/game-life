<template>
  <div class="tabs">
    <div class="tabs__item" @click="activeTab = 'Habits'"
         :class="{ 'tabs__item_active': activeTab === 'Habits' }">Habits</div>
    <div class="tabs__item" @click="activeTab = 'Tasks'"
         :class="{ 'tabs__item_active': activeTab === 'Tasks' }">Tasks</div>
    <div class="tabs__item" @click="activeTab = 'Daily'"
         :class="{ 'tabs__item_active': activeTab === 'Daily' }">Daily chores</div>
    <div class="tabs__item" @click="activeTab = 'Awards'"
         :class="{ 'tabs__item_active': activeTab === 'Awards' }">Awards</div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      activeTab: 'Habits'
    }
  }
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";
  .tabs {
    @extend %flex;

    @include size(100%, 50px);
    max-width: 400px;
    border-radius: 3px;
    border: 1px solid $gray-border;
    background-color: $white;
    margin:0 auto 10px;
    font-size: $font-size-XS;

    &__item {
      @extend %flex-center;
      @include size(25%, 100%);

      position: relative;
      cursor: pointer;
      transition: 0.3s;
      &:last-child {
        border-radius: 0 3px 3px 0;
      }
      &:first-child {
        border-radius: 3px 0 0 3px;
      }
      &:hover {
        background-color: $gray-light;
      }
      &_active {
        background-color: $gray-border;

        &:hover {
          background-color: $gray-border;
        }
      }
    }
  }
</style>
