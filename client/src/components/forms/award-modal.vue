<template>
  <form class="form">
    <div v-if="nameActiveModal.action === 'create'" class="title">{{ $t('form.name.createAward')}}</div>
    <div v-if="nameActiveModal.action === 'update'" class="title">{{ $t('form.name.updateAward')}}</div>
    <div class="form__widget">
      <div class="input-title">{{ $t('form.inputName.name')}}</div>
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
    <div class="form__widget">
      <div class="input-title">{{ $t('form.inputName.desc')}}</div>
      <textarea
        class="input"
        v-model.trim="desc"
        @blur="$v.desc.$touch()"
        :class="{ 'input__invalid': $v.desc.$error }"
      ></textarea>
      <div class="form__error"
           v-if="!$v.desc.maxLength && $v.desc.$dirty">
        <i18n path="form.error.maxLength">
          <span place="action">{{ $v.desc.$params.maxLength.max}}</span>
        </i18n>
      </div>
      <div class="form__error"
           v-if="!$v.desc.minLength && $v.desc.$dirty">
        <i18n path="form.error.minLength">
          <span place="action">{{ $v.desc.$params.minLength.min}}</span>
        </i18n>
      </div>
      <div class="form__error"
           v-if="!$v.desc.required && $v.desc.$dirty">
        {{ $t('form.error.required') }}
      </div>
    </div>
    <div class="form__widget">
      <div class="input-title">{{ $t('form.inputName.price')}}</div>
      <input
        type="number"
        class="input"
        v-model.trim="price"
        @blur="$v.price.$touch()"
        :class="{ 'input__invalid': $v.price.$error }"
      >
      <div class="form__error"
           v-if="!$v.price.maxLength && $v.price.$dirty">
        <i18n path="form.error.maxLength">
          <span place="action">{{ $v.price.$params.maxLength.max}}</span>
        </i18n>
      </div>
      <div class="form__error"
           v-if="!$v.price.minLength && $v.price.$dirty">
        <i18n path="form.error.minLength">
          <span place="action">{{ $v.price.$params.minLength.min}}</span>
        </i18n>
      </div>
      <div class="form__error"
           v-if="!$v.price.required && $v.price.$dirty">
        {{ $t('form.error.required') }}
      </div>
    </div>

    <button v-if="nameActiveModal.action === 'create'" @click="createElement"  class="form__button"
            :class="{'button__no-active': $v.$invalid }">{{ $t('form.btn.create')}}</button>
    <button v-if="nameActiveModal.action === 'update'" @click="updateElement" class="form__button"
            :class="{'button__no-active': $v.$invalid ||
            this.name === this.oldData.name &&
            this.desc === this.oldData.description &&
            this.price === this.oldData.price}">{{ $t('form.btn.update')}}</button>
  </form>
</template>

<script>
import * as skills from '@/methods/skills'
import * as categories from '@/const/categories'

import {
  required, maxLength, minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'awardTask',
  data () {
    return {
      name: null,
      desc: null,
      price: null,
      oldData: []
    }
  },
  validations: {
    name: {
      required,
      maxLength: maxLength(25),
      minLength: minLength(4)
    },
    desc: {
      required,
      maxLength: maxLength(100),
      minLength: minLength(4)
    },
    price: {
      required,
      maxLength: maxLength(4),
      minLength: minLength(1)
    }
  },
  methods: {
    createElement () {
      const newAward = {
        name: this.name,
        desc: this.desc,
        price: this.price,
        type: 'Award'
      }
      this.$store.dispatch('create', newAward)
        .then(() => {
          this.$store.dispatch('getDataUser')
          this.$store.dispatch('closeModal')
        })
        .catch(err => {
          console.error(err)
        })
    },
    updateElement () {
      const updateData = {
        name: this.name,
        desc: this.desc,
        price: this.price,
        type: 'Award',
        taskId: this.oldData.award_id
      }
      this.$store.dispatch('update', updateData)
        .then(() => {
          this.$store.dispatch('getDataUser')
          this.$store.dispatch('closeModal')
        })
        .catch(err => {
          console.error(err)
        })
    },
    getData () {
      this.name = this.updateElementData.name
      this.desc = this.updateElementData.description
      this.price = this.updateElementData.price

      this.oldData = this.updateElementData
    },
    getCategories () {
      this.categories = categories.categories
    }
  },
  computed: {
    nameActiveModal () {
      return this.$store.getters.NAME_ACTIVE_MODAL
    },
    updateElementData () {
      return this.$store.getters.UPDATE_ELEMENT_DATA
    }
  },
  mounted () {
    if (this.nameActiveModal.action === 'update') {
      this.getData()
    }
    this.getCategories()
  }
}
</script>
