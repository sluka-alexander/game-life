<template>
  <div class="task-page">
    <div class="task-page__img">
    </div>
    <search></search>
    <dropdown-create-tasks></dropdown-create-tasks>
    <tabs></tabs>
    <tasks-panel></tasks-panel>
  </div>
</template>

<script>
import search from '@/components/search'
import dropdownCreateTasks from '@/components/dropdown-create-tasks'
import tasksPanel from '@/components/tasks-panel.vue'
import tabs from '@/components/tabs'

export default {
  name: 'tasks',
  components: {
    search,
    dropdownCreateTasks,
    tasksPanel,
    tabs
  }
}
</script>

<style lang="scss">
  @import "../styles/main";
  .task-page {
    @include size(100%);
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
