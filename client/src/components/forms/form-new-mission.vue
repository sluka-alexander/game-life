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
      <div class="input-title">Сложность</div>
      <select v-model="difficulty">
        <option value="1">Сложность: 1</option>
        <option value="2">Сложность: 2</option>
        <option value="3">Сложность: 3</option>
        <option value="4">Сложность: 4</option>
        <option value="5">Сложность: 5</option>
      </select>
      <div class="input-title">XP: {{ 100 * difficulty }}</div>
    </div>
    <div class="form__widget">
      <div class="input-title">Tags</div>
      <div class="tags">
        <input id="sport" type="checkbox" name="option2" value="a2">
        <label for="sport">Sport</label><br>
        <input id="outdoors" type="checkbox" name="option3" value="a3">
        <label for="outdoors">OutDoors</label><br>
        <input type="checkbox" name="option4" value="a4">
        <label>Culture</label><br>
        <input type="checkbox" name="option5" value="a5">
        <label>Windows 2000</label><br></div>
    </div>
    <button type="submit" class="form__button"
            :class="{'button__no-active': $v.$invalid }">Create</button>
  </form>
</template>

<script>
import {
  required, maxLength, minLength
} from 'vuelidate/lib/validators'

export default {
  name: 'formNewMission',
  data () {
    return {
      name: null,
      desc: null,
      difficulty: 1
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
      const newUser = {
        name: this.name,
        desc: this.desc
      }
      this.$store.dispatch('createTask', newUser)
        .then(() => {
          console.log('good')
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>
