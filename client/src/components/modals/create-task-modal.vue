<template>
  <div class="register">
    <form class="form" @submit="onSubmit">
      <div class="form__title" v-if="nameActiveModal ==='habits'">Create Habit</div>
      <div class="form__title" v-if="nameActiveModal ==='tasks'">Create Task</div>
      <div class="form__title" v-if="nameActiveModal ==='daily'">Create Daily Chores</div>
      <div class="form__title" v-if="nameActiveModal ==='awards'">Create Award</div>
      <div class="form__widget">
        <div class="input-title">Name</div>
        <input type="password" class="input-form" placeholder="Name">
      </div>
      <button type="submit" class="button"
              :class="{'button__no-active': $v.$invalid }">Create</button>
    </form>
  </div>
</template>

<script>
import {
  required, maxLength, email
} from 'vuelidate/lib/validators'

export default {
  name: 'create-task-modal',
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
