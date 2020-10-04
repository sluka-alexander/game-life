<template>
  <form class="form" @submit="onSubmit">
    <div class="form__title">{{ $t('items.login') }}</div>
    <div class="form__widget">
      <div class="input-title">{{ $t('form.inputName.email') }}</div>
      <input
        type="email "
        class="input"
        v-model.trim="email"
        @blur="$v.email.$touch()"
        :class="{ 'input__invalid': $v.email.$error }"
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
      <div class="input-title">{{ $t('form.inputName.password') }}</div>
      <div class="password">
        <input
          type="password"
          class="input"
          ref="password"
          v-model.trim="password"
          @blur="$v.password.$touch()"
          :class="{ 'input__invalid': $v.password.$error }"
        >
        <div class="password__control icon-view"
             :class="{ 'password__control_active': isShowPassword }"
        @click="showPassword"></div>
      </div>
      <div class="form__error"
           v-if="!$v.password.required && $v.password.$dirty">
        {{ $t('form.error.required') }}
      </div>
      <div class="form__error"
           v-if="!$v.password.maxLength && $v.password.$dirty">
        <i18n path="form.error.maxLength">
          <span place="action">{{ $v.password.$params.maxLength.max}}</span>
        </i18n>
      </div>
      <div class="form__error"
           v-if="!$v.password.minLength && $v.password.$dirty">
        <i18n path="form.error.minLength">
          <span place="action">{{ $v.password.$params.minLength.min}}</span>
        </i18n>
      </div>
    </div>
    <div class="form__error"
         v-if="isValidateCorrect">
      {{ $t('form.error.required') }}
    </div>
    <button type="submit" class="form__button"
            :class="{'button__no-active': $v.$invalid }">{{ $t('items.login') }}</button>
    <div class="form__link">
      {{ $t('form.link.notAccount') }}
      <router-link to="./register">
        {{ $t('form.link.signUp') }}
      </router-link>
    </div>
  </form>
</template>

<script>
import {
  required, maxLength, minLength, email
} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data () {
    return {
      email: null,
      password: null,
      isShowPassword: false,
      isValidateCorrect: false
    }
  },
  validations: {
    email: {
      required,
      maxLength: maxLength(50),
      email
    },
    password: {
      required,
      maxLength: maxLength(25),
      minLength: minLength(8)
    }
  },
  methods: {
    onSubmit () {
      const data = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', data)
        .then(() => {
          this.$router.push({ name: 'home' })
        })
        .catch(err => {
          this.isValidateCorrect = true
          console.error(err)
        })
    },
    showPassword () {
      if (this.isShowPassword) {
        this.$refs.password.type = 'password'
      } else this.$refs.password.type = 'text'
      this.isShowPassword = !this.isShowPassword
    }
  }
}
</script>
