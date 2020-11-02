<template>
  <div class="task-page" id="task-page">
    <div class="title">{{ $t('items.tasks') }}</div>
    <div class="top-part">
      <search></search>
      <dropdown-create-tasks></dropdown-create-tasks>
      <tabs @activeTabMethods ='activeTabMethods'></tabs>
      <habits v-if="activeTab === 'Habits'"></habits>
      <tasks-tabs v-if="activeTab === 'Tasks'"></tasks-tabs>
      <dailies v-if="activeTab === 'Daily'"></dailies>
      <awards v-if="activeTab === 'Awards'"></awards>
    </div>
  </div>
</template>

<script>
import search from '@/components/search'
import dropdownCreateTasks from '@/components/dropdown-create-tasks'
import tasksTabs from '@/components/tabs/tasks-tabs'
import awards from '@/components/tabs/awards'
import habits from '@/components/tabs/habits'
import dailies from '@/components/tabs/dailies'

import tabs from '@/components/tabs'

export default {
  name: 'tasks',
  data () {
    return {
      isActiveItemTools: false,
      activeTab: 'Habits'
    }
  },
  components: {
    tabs,
    search,
    dropdownCreateTasks,
    habits,
    awards,
    dailies,
    tasksTabs
  },

  computed: {
    isActiveModal () {
      return this.$store.getters.IS_ACTIVE_MODAL
    }
  },
  methods: {
    activeTabMethods (tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style lang="scss">
  @import "../styles/main";
  .flex {
    display: flex;
  }
  .task-page {
    @extend %flex;

    @include size(100%);
    position: relative;

    flex-direction: column;
    flex: 0 auto;

    &__img {
      background-size: contain;
      background-position:  50% 100%;
      background-repeat: no-repeat;
      display: block;
      height: 150px;
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
      background-image: url('../img/tasks.png');
    }
  }
</style>
