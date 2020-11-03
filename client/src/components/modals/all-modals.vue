<template>
  <div class="create-task">
    <form class="form" @submit="onSubmit">
      <formTask v-if="nameActiveModal.name ==='task'"></formTask>
      <delete-modal :task="task" v-if="nameActiveModal ==='deleteTask'"></delete-modal>
      <create-habit class="form__title" v-if="nameActiveModal.name ==='habit'"></create-habit>
      <level-modal v-if="nameActiveModal.name ==='level'"></level-modal>
      <daily-modal v-if="nameActiveModal.name ==='daily'"></daily-modal>
      <award-modal v-if="nameActiveModal.name ==='awards'"></award-modal>
    </form>
  </div>
</template>

<script>
import {
  required, maxLength, email
} from 'vuelidate/lib/validators'
import formTask from '../forms/task-modal'
import createHabit from '../forms/habit-modal'
import levelModal from '../modals/level-modal'
import dailyModal from '../forms/daily-modal'
import awardModal from '../forms/award-modal'

export default {
  name: 'create-task-modal',
  components: {
    formTask,
    createHabit,
    levelModal,
    dailyModal,
    awardModal
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
