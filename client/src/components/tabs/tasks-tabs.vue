<template>
  <div>
    <div class="cards-container">
      <div class="card" v-for="task in userTasks" v-bind:key="task.task_id" :id="'tasks_' + task.task_id">
          <div class="card__content">
            <div class="card__tools">
              <div :id="task.task_id" class="icon icon-edit" :task="task" @click="openModal('updateTask', task)"></div>
              <div :id="task.task_id" class="icon icon-delete" @click="deleteTask(task.task_id)"></div>
            </div>
            <div class="card__name item"> {{ task.name }} </div>
            <div CLASS="card__desc item">{{ task.description }}</div>
            <div v-if="task.category !== 'not'" class="item">{{ $t('main.categories')}} {{ $t('categories.' + task.category)}}</div>
            <div class="card__dpx item">
              <div class="card__dif card__dpx--item">{{ $t('main.difficulty')}}
                <div class="card__dif--stars">
                  <div class="icon icon-star-filled" v-for="dif in Number(task.difficulty)" v-bind:key="dif">
                  </div>
                  <div class="icon icon-star" v-for="dif in 5 - Number(task.difficulty)" v-bind:key="dif + 'border'">
                  </div>
                </div>
              </div>
              <div class="card__price card__dpx--item">
                <div class="icon icon-money"></div>
                {{ task.price }}</div>
              <div class="card__price card__dpx--item">XP: {{ task.xp }}</div>

            </div>
            <div class="flex skills">
              <div> {{ $t('main.skillsId.str')}} {{ task.skills.str }}</div>
              <div>{{ $t('main.skillsId.int')}} {{ task.skills.int }}</div>
              <div>{{ $t('main.skillsId.cul')}} {{ task.skills.cul }}</div>
              <div>{{ $t('main.skillsId.cha')}} {{ task.skills.cha }}</div>
              <div>{{ $t('main.skillsId.hum')}} {{ task.skills.hum }}</div>
            </div>
          </div>
        </div>
      <div class="missing" v-if="!userTasks.length">{{ $t('main.missing.tasks')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tasksTabs',
  showModal: true,
  computed: {
    userTasks: function () {
      return this.$store.getters.USER_DATA.tasks
    }
  },
  methods: {
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
    },
    deleteTask (idEl) {
      const confirmModal = confirm('Are you sure?')
      if (confirmModal) {
        const taskData = {
          type: 'Task',
          idElement: idEl
        }
        this.$store.dispatch('delete', taskData)
          .then(() => {
            this.$store.dispatch('getDataUser')
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../views/styles/main";
</style>
