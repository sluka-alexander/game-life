<template>
  <form class="form" @submit="onSubmit">
    <div class="title">{{ $t('form.name.updateTask')}}</div>
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
        <option value="1">Сложность: 1</option>
        <option value="2">Сложность: 2</option>
        <option value="3">Сложность: 3</option>
        <option value="4">Сложность: 4</option>
        <option value="5">Сложность: 5</option>
      </select>
    </div>
    <div class="form__widget">
      <div class="input-title">{{ $t('form.inputName.category')}}</div>
      <select class="categories" v-model="category">
        <option v-for="category in categories" v-bind:key="category" :value="category">{{ $t('categories.' + category) }}</option>>
      </select>
    </div>
    <button type="submit" class="form__button"
            :class="{'button__no-active': $v.$invalid ||
            this.name === this.oldData.name &&
            this.desc === this.oldData.description &&
            this.difficulty === this.oldData.difficulty &&
            this.category === this.oldData.category}">Update</button>
  </form>
</template>

<script>
import * as skills from '@/methods/skills'
import * as categories from '@/const/categories'

import {
  required, maxLength, minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'formTaskUpdate',
  data () {
    return {
      name: null,
      desc: null,
      difficulty: 3,
      category: 'not',
      categories: [],
      oldData: {}
    }
  },
  computed: {
    updateData: function () {
      return this.$store.getters.UPDATE_TASK
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
    onSubmit () {
      const updateTask = {
        name: this.name,
        desc: this.desc,
        difficulty: this.difficulty,
        category: this.category,
        price: 20 * this.difficulty,
        xp: 100 * this.difficulty,
        skills: skills.calculatedSkill(this.category, this.difficulty),
        taskId: this.oldData.task_id
      }
      this.$store.dispatch('updateTask', updateTask)
        .then(() => {
          this.$store.dispatch('getDataUser')
          this.$store.dispatch('closeModal')
        })
        .catch(err => {
          console.error(err)
        })
    },
    getData () {
      this.name = this.updateData.name
      this.desc = this.updateData.description
      this.difficulty = this.updateData.difficulty
      this.category = this.updateData.category
      this.oldData = this.updateData
    },
    getCategories () {
      this.categories = categories.categories
    }
  },
  mounted () {
    this.getData()
    this.getCategories()
  }
}
</script>
