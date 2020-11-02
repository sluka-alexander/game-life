<template>
  <div class="create-task">
    <form class="form" @submit="onSubmit">
      <div class="form__title" v-if="nameActiveModal ==='daily'">Create Daily Chores</div>
      <div class="form__title" v-if="nameActiveModal ==='awards'">Create Award</div>
      <formTask v-if="nameActiveModal ==='tasks'"></formTask>
      <form-task-update :task="task" v-if="nameActiveModal ==='updateTask'"></form-task-update>
      <delete-modal :task="task" v-if="nameActiveModal ==='deleteTask'"></delete-modal>
      <create-habit class="form__title" v-if="nameActiveModal.name ==='habit'"></create-habit>
      <level-modal v-if="nameActiveModal.name ==='level'"></level-modal>
      <mission-modal v-if="nameActiveModal.name ==='mission'"></mission-modal>
    </form>
  </div>
</template>

<script>
import {
  required, maxLength, email
} from 'vuelidate/lib/validators'
import formTask from '../forms/form-task'
import formTaskUpdate from '../forms/form-task-update'
import deleteModal from '../modals/delete-modal'
import createHabit from '../forms/habit-modal'
import levelModal from '../modals/level-modal'
import MissionModal from '@/components/modals/mission-modal'
export default {
  name: 'create-task-modal',
  components: {
    MissionModal,
    formTask,
    formTaskUpdate,
    createHabit,
    levelModal
  },
  props: {
    task: String
  },
  data () {
    return {
      email: null
    }
  },
  validations: {
    email: {
      required,
      maxLength: maxLength(50),
      email
    }
  },
  computed: {
    nameActiveModal () {
      return this.$store.getters.NAME_ACTIVE_MODAL
    },
    updateElementData () {
      return this.$store.getters.NAME_ACTIVE_MODAL
    }
  },
  methods: {
    onSubmit () {
      console.log('send send')
    }
  }
}
</script>
