<template>
  <div>
    <div class="cards-container">
      <div class="card" v-for="habit in userHabits" v-bind:key="habit.habit_id" :id="'habit_' + habit.habit_id">
        <div>
          <div class="card__habit card__habit_plus" @click="complete(habit, 'increase')"
               :class="{ card__habit_disable: habit.typeHabit === 'bad'}">
            <div class="icon-plus-2"></div>
          </div>
        </div>
        <div class="card__content">
          <div class="card__tools">
            <div :id="habit.habit_id" class="icon icon-edit" :habit="habit" @click="openModal({ name: 'habit', action: 'update' }, habit)"></div>
            <div :id="habit.habit_id" class="icon icon-delete" @click="deleteElement(habit.habit_id)"></div>
          </div>
          <div class="card__name item"> {{ habit.name }} </div>
          <div class="card__desc item">{{ habit.description }}</div>
          <div v-if="habit.category !== 'not'" class="item">{{ $t('main.categories')}} {{ $t('categories.' + habit.category)}}</div>
          <div class="card__dpx item">
            <div class="card__dif card__dpx--item">{{ $t('main.difficulty')}}
              <div class="card__dif--stars">
                <div class="icon icon-star-filled" v-for="dif in Number(habit.difficulty)" v-bind:key="dif">
                </div>
                <div class="icon icon-star" v-for="dif in 5 - Number(habit.difficulty)" v-bind:key="dif + 'border'">
                </div>
              </div>
            </div>
            <div class="card__price card__dpx--item">
              <div class="icon icon-money"></div>
              {{ habit.price }}</div>
            <div class="card__price card__dpx--item">XP: {{ habit.xp }}</div>

          </div>
          <div class="flex skills">
            <div> {{ $t('main.skillsId.str')}} {{ habit.skills.str }}</div>
            <div>{{ $t('main.skillsId.int')}} {{ habit.skills.int }}</div>
            <div>{{ $t('main.skillsId.cul')}} {{ habit.skills.cul }}</div>
            <div>{{ $t('main.skillsId.cha')}} {{ habit.skills.cha }}</div>
            <div>{{ $t('main.skillsId.hum')}} {{ habit.skills.hum }}</div>
          </div>
        </div>
        <div>
          <div class="card__habit card__habit_minus" @click="complete(habit, 'decrease')"
               :class="{ card__habit_disable: habit.typeHabit === 'good'}">
            <div class="icon-minus"></div>
          </div>
        </div>
      </div>
      <div class="missing" v-if="!userHabits.length">{{ $t('main.missing.habits')}}</div>
    </div>
  </div>
</template>
<script>
import * as level from '@/methods/xp'

export default {
  name: 'Habits',
  data () {
    return {
      showModal: true
    }
  },

  computed: {
    searchFilter: function () {
      return this.$store.getters.SEARCH_FILTER
    },
    userHabits: function () {
      return this.$store.getters.USER_DATA_HABITS
    },
    isLoading: function () {
      return this.$store.getters.IS_LOADING
    },
    userXp: function () {
      return this.$store.getters.USER_DATA.xp
    }
  },
  methods: {
    openModal (nameModal, data) {
      this.$store.commit('assignNameModal', nameModal)
      this.$store.dispatch('openModal')
      this.$store.commit('modalUpdateDataTask', data)
    },
    deleteElement (idEl) {
      const confirmModal = confirm('Are you sure?')
      if (confirmModal) {
        this.$store.commit('loading')
        const habitData = {
          type: 'Habit',
          idElement: idEl
        }
        this.$store.dispatch('delete', habitData)
          .then(() => {
            this.$store.dispatch('getDataUser').then(() => {
              this.$store.commit('loading')
            })
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    complete (dataEl, action) {
      this.$store.commit('loading')
      let actionElement = ''
      if (action === 'increase') actionElement = 'increase'
      else actionElement = 'decrease'
      const data = {
        xp: dataEl.xp,
        skills: dataEl.skills,
        money: dataEl.price,
        action: actionElement,
        type: 'habit'
      }
      this.$store.dispatch('complete', data)
        .then(() => {
          this.$store.dispatch('getDataUser').then(() => {
            this.$store.commit('loading')
            if (level.xpMethod !== level.xpMethod(this.userXp)) {
              this.$store.dispatch('updateLevel', level.xpMethod(this.userXp)).then(() => {
                this.$store.dispatch('calcLevelScale')
              })
            }
          })
        })
        .catch(err => {
          console.error(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../views/styles/main";
</style>
