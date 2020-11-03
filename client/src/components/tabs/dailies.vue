<template>
  <div>
    <div class="cards-container">
      <div class="card" v-for="daily in userDailies" v-bind:key="daily.daily_id" :id="'daily_' + daily.daily_id">
        <div class="card__content">

          <div class="card__tools">
            <div :id="daily.daily_id" class="icon icon-edit" :daily="daily" @click="openModal({ name: 'daily', action: 'update' }, daily)"
                 :class="{'card__content_disable': daily.isActive}"></div>
            <div :id="daily.daily_id" class="icon icon-delete" @click="deleteElement(daily.daily_id)"></div>
          </div>
          <div class="card__container">
            <div class="card__left-part">
              <input v-if="daily.isActive" checked="checked" type="checkbox" @click="complete(daily)"
                     :class="{'no-event': daily.isActive}">
              <input v-else type="checkbox" @click="complete(daily)">
            </div>
            <div class="card__right-part" :class="{'card__content_disable': daily.isActive}">
              <div class="card__name item"> {{ daily.name }} </div>
              <div CLASS="card__desc item">{{ daily.description }}</div>
              <div v-if="daily.category !== 'not'" class="item">{{ $t('main.categories')}} {{ $t('categories.' + daily.category)}}</div>
              <div class="card__dpx item">
                <div class="card__dif card__dpx--item">{{ $t('main.difficulty')}}
                  <div class="card__dif--stars">
                    <div class="icon icon-star-filled" v-for="dif in Number(daily.difficulty)" v-bind:key="dif">
                    </div>
                    <div class="icon icon-star" v-for="dif in 5 - Number(daily.difficulty)" v-bind:key="dif + 'border'">
                    </div>
                  </div>
                </div>
                <div class="card__price card__dpx--item">
                  <div class="icon icon-money"></div>
                  {{ daily.price }}</div>
                <div class="card__price card__dpx--item">XP: {{ daily.xp }}</div>

              </div>
              <div class="flex skills">
                <div> {{ $t('main.skillsId.str')}} {{ daily.skills.str }}</div>
                <div>{{ $t('main.skillsId.int')}} {{ daily.skills.int }}</div>
                <div>{{ $t('main.skillsId.cul')}} {{ daily.skills.cul }}</div>
                <div>{{ $t('main.skillsId.cha')}} {{ daily.skills.cha }}</div>
                <div>{{ $t('main.skillsId.hum')}} {{ daily.skills.hum }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="missing" v-if="!userDailies.length">{{ $t('main.missing.dailies')}}</div>
    </div>
  </div>
</template>

<script>
import * as level from '@/methods/xp'

export default {
  name: 'dailiesTabs',
  showModal: true,
  computed: {
    userDailies: function () {
      return this.$store.getters.USER_DATA.daily
    },
    userXp: function () {
      return this.$store.getters.USER_DATA.xp
    }
  },
  methods: {
    assignNameModal (nameModal) {
      this.$store.commit('assignNameModal', nameModal)
    },
    openModal (nameModal, data) {
      this.assignNameModal(nameModal)
      this.$store.dispatch('openModal')
      this.$store.commit('modalUpdateDataTask', data)
    },
    deleteElement (idEl) {
      const confirmModal = confirm('Are you sure?')
      if (confirmModal) {
        this.$store.commit('loading')
        const elementData = {
          type: 'Daily',
          idElement: idEl
        }
        this.$store.dispatch('delete', elementData)
          .then(() => {
            this.$store.dispatch('getDataUser')
            this.$store.commit('loading')
          })
          .catch(err => {
            console.error(err)
          })
      }
    },
    complete (dataEl) {
      this.$store.commit('loading')
      const data = {
        xp: dataEl.xp,
        skills: dataEl.skills,
        money: dataEl.price,
        dailyId: dataEl.daily_id,
        isActive: dataEl.isActive,
        type: 'daily'
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
  },
  mounted () {
    this.$store.dispatch('checkDailyDate').then(() => {
      this.$store.dispatch('getDataUser')
    })
  }
}
</script>

<style scoped lang="scss">
  @import "../../views/styles/main";
</style>
