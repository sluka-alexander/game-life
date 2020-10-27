<template>
  <div class="create-task">
    <form class="form" @submit="onSubmit">
      <div class="form__title" v-if="nameActiveModal ==='habits'">Create Habit</div>
      <div class="form__title" v-if="nameActiveModal ==='tasks'">Create Task</div>
      <div class="form__title" v-if="nameActiveModal ==='daily'">Create Daily Chores</div>
      <div class="form__title" v-if="nameActiveModal ==='awards'">Create Award</div>
      <formTask v-if="nameActiveModal ==='tasks'"></formTask>
      <form-task-update :task="task" v-if="nameActiveModal ==='updateTask'"></form-task-update>
    </form>
  </div>
</template>

<script>
import {
  required, maxLength, email
} from 'vuelidate/lib/validators'
import formTask from '../forms/form-task'
import formTaskUpdate from '../forms/form-task-update'

export default {
  name: 'create-task-modal',
  components: {
    formTask,
    formTaskUpdate
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
    }
  },
  methods: {
    onSubmit () {
      console.log('send send')
    }
  }
}
</script>
