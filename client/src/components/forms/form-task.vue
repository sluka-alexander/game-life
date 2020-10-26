<template>
  <form class="form" @submit="onSubmit">
    <div class="form__widget">
      <div class="input-title">Name</div>
      <input
        type="text"
        class="input"
        v-model.trim="name"
        @blur="$v.name.$touch()"
        :class="{ 'input__invalid': $v.name.$error }"
      >
      <div class="form__error"
           v-if="!$v.name.required && $v.name.$dirty">
        {{ $t('form.error.required') }}
      </div>
    </div>
    <div class="form__widget">
      <div class="input-title">Desc</div>
      <textarea
        class="input"
        v-model.trim="desc"
        @blur="$v.desc.$touch()"
        :class="{ 'input__invalid': $v.desc.$error }"
      ></textarea>
      <div class="form__error"
           v-if="!$v.desc.required && $v.desc.$dirty">
        {{ $t('form.error.required') }}
      </div>
    </div>
    <div class="form__widget">
      <div class="input-title">Difficulty</div>
      <select v-model="difficulty">
        <option value="1">Сложность: 1</option>
        <option value="2">Сложность: 2</option>
        <option value="3">Сложность: 3</option>
        <option value="4">Сложность: 4</option>
        <option value="5">Сложность: 5</option>
      </select>
      {{ difficulty }}
    </div>
    <div class="form__widget">
      <div class="input-title">Tags</div>
      <select class="categories" v-model="category">
        <option v-for="category in categories" v-bind:key="category" :value="category">{{ $t('categories.' + category) }}</option>>
      </select>
      {{ category }}
    </div>
    <button type="submit" class="form__button"
            :class="{'button__no-active': $v.$invalid }">Create</button>
  </form>
</template>

<script>
import * as skills from '@/methods/skills'

import {
  required, maxLength, minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'formTask',
  data () {
    return {
      name: null,
      desc: null,
      difficulty: 3,
      category: 'art',
      categories: ['art', 'career', 'sport', 'cooking', 'fun', 'household',
        'humanity', 'mental', 'outdoors', 'reading', 'learning', 'social', 'travel']
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
      const newTask = {
        name: this.name,
        desc: this.desc,
        difficulty: this.difficulty,
        category: this.category,
        price: 20 * this.difficulty,
        xp: 100 * this.difficulty,
        skills: skills.calculatedSkill(this.category, this.difficulty)
      }
      this.$store.dispatch('createTask', newTask)
        .then(() => {
          this.$store.dispatch('getDataUser')
          this.$store.dispatch('closeModal')
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
