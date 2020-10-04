<template>
  <div class="task-page" id="task-page">
    <div class="title">{{ $t('items.tasks') }}</div>
    <div class="top-part">
      <search></search>
      <modal v-if="isActiveModal">
        <create-task-modal></create-task-modal>
      </modal>
      <dropdown-create-tasks></dropdown-create-tasks>
      <tabs></tabs>
    </div>
    <tasks-panel></tasks-panel>
  </div>
</template>

<script>
import search from '@/components/search'
import dropdownCreateTasks from '@/components/dropdown-create-tasks'
import tasksPanel from '@/components/tasks-panel.vue'
import modal from '@/components/modal'
import tabs from '@/components/tabs'

import createTaskModal from '@/components/modals/create-task-modal.vue'

export default {
  name: 'tasks',
  data () {
    return {
      showModal: true
    }
  },
  components: {
    search,
    dropdownCreateTasks,
    tasksPanel,
    modal,
    createTaskModal,
    tabs
  },

  computed: {
    isActiveModal () {
      return this.$store.getters.IS_ACTIVE_MODAL
    }
  }
}
</script>

<style lang="scss">
  @import "../styles/main";
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
