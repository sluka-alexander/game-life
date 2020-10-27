<template>
  <div class="task-page" id="task-page">
    <div class="title">{{ $t('items.tasks') }}</div>
    <div class="top-part">
      <search></search>
      <modal v-if="isActiveModal">
        <create-task-modal></create-task-modal>
      </modal>
      <dropdown-create-tasks></dropdown-create-tasks>
      <div class="tasks">
        <div class="task" v-for="task in userTasks" v-bind:key="task.task_id" :id="'tasks_' + task.task_id">
          <div class="task-tools">
            <div :id="task.task_id" class="icon icon-edit" :task="task" @click="openModal('updateTask', task)"></div>
            <div :id="task.task_id" class="icon icon-delete" @click="deleteTask(task.task_id)"></div>
          </div>
          <div class="task-name item"> {{ task.name }} </div>
          <div CLASS="task-desc item">{{ task.description }}</div>
          <div class="item">category: {{ task.category }}</div>
          <div class="task-dpx item">
            <div class="task-dif task-dpx--item">Difficulty:
              <div class="task-dif--stars">
                <div class="icon icon-star-filled" v-for="dif in Number(task.difficulty)" v-bind:key="dif">
                </div>
                <div class="icon icon-star" v-for="dif in 5 - Number(task.difficulty)" v-bind:key="dif + 'border'">
                </div>
              </div>
            </div>
            <div class="task-price task-dpx--item">
              <div class="icon icon-money"></div>
              {{ task.price }}</div>
            <div class="task-price task-dpx--item">XP: {{ task.xp }}</div>

          </div>
          <div class="flex skills">
            <div>STR: {{ task.skills.str }}</div>
            <div>INT: {{ task.skills.int }}</div>
            <div>CUL: {{ task.skills.cul }}</div>
            <div>CHA: {{ task.skills.cha }}</div>
            <div>HUM: {{ task.skills.hum }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import search from '@/components/search'
import dropdownCreateTasks from '@/components/dropdown-create-tasks'
import modal from '@/components/modal'

import createTaskModal from '@/components/modals/all-modals.vue'

export default {
  name: 'tasks',
  data () {
    return {
      showModal: true,
      isActiveItemTools: false
    }
  },
  components: {
    search,
    dropdownCreateTasks,
    modal,
    createTaskModal
  },

  computed: {
    isActiveModal () {
      return this.$store.getters.IS_ACTIVE_MODAL
    },
    userTasks: function () {
      return this.$store.getters.USER_DATA.tasks
    },
    updateDataTask: function () {
      return this.$store.getters.UPDATE_TASK
    }
  },
  methods: {
    deleteTask (id) {
      let idTask = 0
      idTask = { id }
      this.$store.dispatch('deleteTask', idTask)
        .then(() => {
          this.$store.dispatch('getDataUser')
        })
        .catch(err => {
          console.error(err)
        })
    },
    assignNameModal (nameModal) {
      this.$store.commit('assignNameModal', nameModal)
    },
    openModal (nameModal, data) {
      this.assignNameModal(nameModal)
      this.$store.dispatch('openModal')
      this.$store.commit('modalUpdateDataTask', data)
      // let idTask = 0
      // idTask = { id }
      // this.$store.dispatch('getDataUpdateTask', idTask).then(() => {
      //   console.log(this.updateDataTask)
      //   this.$store.dispatch('openModal')
      // })
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
  .tasks {
    font-size: 13px;
    display: flex;
    width: 100%;
    align-items: center;
    flex-direction: column;
    .skills {
      flex-wrap: wrap;
      div {
        margin-right: 20px;
      }
    }
  }
  .task-price {
    display: flex;
    align-items: center;
    .icon {
      margin-right: 6px;
    }
  }
  .task-dif {
    display: flex;
    align-items: center;
    font-weight: $weight-bold;
  }
  .icon-star-filled{
    color: $yellow;
  }
  .task-dif--stars {
    margin-left: 3px;
    display: flex;
    .icon {
      margin-right: 6px;
    }
  }
  .task-dpx {
    display: flex;
    flex-wrap: wrap;

    .task-dpx--item {
      margin-right: 20px;
    }
  }
  .task {
    max-width: 540px;
    width: 100%;
    border-radius: 3px;
    border: 1px solid $gray-border;
    margin-bottom: 10px;
    padding: 10px 20px;
    position: relative;
    .task-name {
      font-size: 18px;
      font-weight: $weight-bold;
    }
    .task-desc {
    }
    .item {
      margin-bottom: 8px;
    }
  }
  .task-tools {
    position: absolute;
    right: 20px;
    top: 10px;
    display: flex;
    font-size: 16px;

    .icon {
      @extend %flex-center;
      height: 30px;
      width: 30px;
      border-radius: 50px;
      &:hover {
        border: 1px solid $gray-border;
      }
    }
    .icon-delete {
      color: $red;
      cursor: pointer;
      margin-left: 5px;
    }
    .icon-edit {
      cursor: pointer;
    }
  }

</style>
