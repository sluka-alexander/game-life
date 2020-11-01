<template>
  <div class="tabs">
    <div class="tabs__item" @click="activeTabMethod('Habits')"
         :class="{ 'tabs__item_active': activeTab === 'Habits' }">{{ $t('main.tabs.habits') }}</div>
    <div class="tabs__item" @click="activeTabMethod('Tasks')"
         :class="{ 'tabs__item_active': activeTab === 'Tasks' }">{{ $t('main.tabs.tasks') }}</div>
    <div class="tabs__item" @click="activeTabMethod('Daily')"
         :class="{ 'tabs__item_active': activeTab === 'Daily' }">{{ $t('main.tabs.daily') }}</div>
    <div class="tabs__item" @click="activeTabMethod('Awards')"
         :class="{ 'tabs__item_active': activeTab === 'Awards' }">{{ $t('main.tabs.awards') }}</div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      activeTab: 'Habits'
    }
  },
  methods: {
    activeTabMethod (tab) {
      this.$emit('activeTabMethods', tab)
      this.activeTab = tab
    }
  }
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";
  .tabs {
    @extend %flex;

    @include size(100%, 50px);
    border-radius: 3px;
    background-color: $gray-light;
    margin:0 auto 10px;
    font-size: $font-size-XS;

    &__item {
      @extend %flex-center;
      @include size(25%, 100%);

      position: relative;
      cursor: pointer;
      transition: 0.3s;
      border-bottom: 3px solid $gray;
      &:last-child {
        border-radius: 0 3px 3px 0;
      }
      &:first-child {
        border-radius: 3px 0 0 3px;
      }
      &:hover {
        background-color: $gray;
      }
      &_active {
        transition: 0s;
        border-bottom: 3px solid $color-main;

        &:hover {
          background-color: $gray;
        }
      }
    }
  }
</style>
