<template>
  <div class="register">
    <form class="form" @submit="onSubmit">
      <div class="form__title">Register</div>
      <div class="form__widget">
        <div class="input-title">Enter your email</div>
        <input
          type="email "
          class="input-form"
          v-model.trim="email"
          @blur="$v.email.$touch()"
          :class="{ 'input-form__invalid': $v.email.$error }"
               >
        <div class="form__error"
             v-if="!$v.email.email && $v.email.$dirty">
          {{ $t('form.error.email') }}
        </div>
        <div class="form__error"
             v-if="!$v.email.maxLength && $v.email.$dirty">
          <i18n path="form.error.maxLength">
            <span place="action">{{ $v.email.$params.maxLength.max}}</span>
          </i18n>
        </div>
        <div class="form__error"
             v-if="!$v.email.required && $v.email.$dirty">
          {{ $t('form.error.required') }}
        </div>
      </div>
      <div class="form__widget">
        <div class="input-title">Enter your password</div>
        <input type="password" class="input-form">
      </div>
      <div class="form__widget">
        <div class="input-title">Confirm your password</div>
        <input type="password" class="input-form">
      </div>
      <div class="form__widget">
        <div class="input-title">Enter your name</div>
        <input type="text" class="input-form">
      </div>
      <button type="submit" class="button"
      :class="{'button__no-active': $v.$invalid }">Register</button>
    </form>
  </div>
</template>

<script>
import {
  required, maxLength, email
} from 'vuelidate/lib/validators'

export default {
  name: 'register',
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
  methods: {
    onSubmit () {
      console.log('send send')
    }
  }
}
</script>
