<template>
  <form class="form">
    <div class="title">{{ $t('form.name.createDaily')}}</div>
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
      <div class="input-title">{{ $t('form.inputName.difficulty')}}</div>
      <select v-model="difficulty">
        <option value="1">{{ $t('main.difficulty')}} 1</option>
        <option value="2">{{ $t('main.difficulty')}} 2</option>
        <option value="3">{{ $t('main.difficulty')}} 3</option>
        <option value="4">{{ $t('main.difficulty')}} 4</option>
        <option value="5">{{ $t('main.difficulty')}} 5</option>
      </select>
    </div>
    <div class="form__widget">
      <div class="input-title">{{ $t('form.inputName.category')}}</div>
      <select class="categories" v-model="category">
        <option v-for="category in categories" v-bind:key="category" :value="category">{{ $t('categories.' + category) }}</option>>
      </select>
    </div>
    <button v-if="nameActiveModal.action === 'create'" @click="createElement"  class="form__button"
            :class="{'button__no-active': $v.$invalid }">{{ $t('form.btn.create')}}</button>
    <button v-if="nameActiveModal.action === 'update'" @click="updateElement" class="form__button"
            :class="{'button__no-active': $v.$invalid ||
            this.name === this.oldData.name &&
            this.desc === this.oldData.description &&
            this.difficulty === this.oldData.difficulty &&
            this.category === this.oldData.category}">{{ $t('form.btn.update')}}</button>
  </form>
</template>

<script>
import * as skills from '@/methods/skills'
import * as categories from '@/const/categories'

import {
  required, maxLength, minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'dailyModal',
  data () {
    return {
      name: null,
      desc: null,
      difficulty: 3,
      category: 'not',
      categories: [],
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
    }
  },
  methods: {
    createElement () {
      const newTask = {
        name: this.name,
        desc: this.desc,
        difficulty: this.difficulty,
        category: this.category,
        price: 20 * this.difficulty,
        xp: 100 * this.difficulty,
        skills: skills.calculatedSkill(this.category, this.difficulty),
        type: 'Daily'
      }
      this.$store.dispatch('create', newTask)
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
        difficulty: this.difficulty,
        category: this.category,
        price: 20 * this.difficulty,
        xp: 100 * this.difficulty,
        skills: skills.calculatedSkill(this.category, this.difficulty),
        type: 'Daily',
        taskId: this.oldData.task_id
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
      this.difficulty = this.updateElementData.difficulty
      this.category = this.updateElementData.category

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
