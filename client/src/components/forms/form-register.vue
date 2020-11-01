<template>
  <form class="form" @submit="onSubmit">
    <div class="form__title">{{ $t('items.register') }}</div>
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
    <div class="form__widget">
      <div class="input-title">{{ $t('form.inputName.confirmPassword') }}</div>
      <div class="password">
        <input
          type="password"
          class="input"
          ref="confirmPassword"
          v-model.trim="confirmPassword"
          @blur="$v.confirmPassword.$touch()"
          :class="{ 'input__invalid': $v.confirmPassword.$error }"
        >
        <div class="password__control icon-view"
             :class="{ 'password__control_active': isShowConfirmPassword }"
             @click="showConfirmPassword"></div>
      </div>
      <div class="form__error"
           v-if="!$v.confirmPassword.required && $v.confirmPassword.$dirty">
        {{ $t('form.error.required') }}
      </div>
      <div class="form__error"
           v-if="this.password !==
           this.confirmPassword && $v.confirmPassword.$dirty">
        {{ $t('form.error.notMatch') }}
      </div>
      <div class="form__error"
           v-if="!$v.confirmPassword.maxLength && $v.confirmPassword.$dirty">
        <i18n path="form.error.maxLength">
          <span place="action">{{ $v.confirmPassword.$params.maxLength.max}}</span>
        </i18n>
      </div>
      <div class="form__error"
           v-if="!$v.confirmPassword.minLength && $v.confirmPassword.$dirty">
        <i18n path="form.error.minLength">
          <span place="action">{{ $v.password.$params.minLength.min}}</span>
        </i18n>
      </div>
    </div>
    <div class="form__widget">
      <div class="input-title">{{ $t('form.inputName.nameUser') }}</div>
      <input
        type="text"
        class="input"
        v-model.trim="name"
        @blur="$v.name.$touch()"
        :class="{ 'input__invalid': $v.name.$error }"
      >
      <div class="form__error"
           v-if="!$v.name.maxLength && $v.name.$dirty">
        <i18n path="form.error.maxLength">
          <span place="action">{{ $v.name.$params.maxLength.max}}</span>
        </i18n>
      </div>
      <div class="form__error"
           v-if="!$v.name.minLength && $v.name.$dirty">
        <i18n path="form.error.minLength">
          <span place="action">{{ $v.name.$params.minLength.min}}</span>
        </i18n>
      </div>
      <div class="form__error"
           v-if="!$v.name.required && $v.name.$dirty">
        {{ $t('form.error.required') }}
      </div>
    </div>
    <div class="form__error"
         v-if="isValidateAccAlreadyExists">
      {{ $t('form.error.alreadyExist') }}
    </div>
    <button type="submit" class="form__button"
            :class="{'button__no-active': $v.$invalid }">{{ $t('items.register') }}</button>
    <div class="form__link">
      {{ $t('form.link.haveAccount') }}
      <router-link to="./login">
        {{ $t('form.link.signIn') }}
      </router-link>
    </div>
  </form>
</template>

<script>
import {
  required, maxLength, email, minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data () {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      name: null,
      isShowConfirmPassword: false,
      isShowPassword: false,
      isValidateAccAlreadyExists: false
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
    },
    confirmPassword: {
      required,
      maxLength: maxLength(25),
      minLength: minLength(8)
    },
    name: {
      required,
      maxLength: maxLength(25),
      minLength: minLength(4)
    }
  },
  methods: {
    onSubmit () {
      const newUser = {
        email: this.email,
        password: this.password,
        name: this.name
      }
      this.$store.dispatch('register', newUser)
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        .catch(err => {
          this.isValidateAccAlreadyExists = true
          console.error(err)
        })
    },
    showPassword () {
      if (this.isShowPassword) {
        this.$refs.password.type = 'password'
      } else this.$refs.password.type = 'text'
      this.isShowPassword = !this.isShowPassword
    },
    showConfirmPassword () {
      if (this.isShowConfirmPassword) {
        this.$refs.confirmPassword.type = 'password'
      } else this.$refs.confirmPassword.type = 'text'
      this.isShowConfirmPassword = !this.isShowConfirmPassword
    }
  }
}
</script>
