<template>
  <div>
    <div class="cards-container">
      <div class="card" v-for="award in userAwards" v-bind:key="award.award_id" :id="'award_' + award.award_id">
        <div class="card__content">
          <div class="card__tools">
            <div :id="award.award_id" class="icon icon-edit" :award="award" @click="openModal({ name: 'awards', action: 'update' }, award)"></div>
            <div :id="award.award_id" class="icon icon-delete" @click="deleteElement(award.award_id)"></div>
          </div>
          <div class="card__btn" @click="complete(award)">{{ $t('form.btn.buy') }}</div>
          <div class="card__name item"> {{ award.name }} </div>
          <div class="card__desc item">{{ award.description }}</div>
          <div class="card__dpx item">
            <div class="card__price card__dpx--item">
              <div class="icon icon-money"></div>
              {{ award.price }}
            </div>
          </div>
        </div>
      </div>
      <div class="missing" v-if="!userAwards.length">{{ $t('main.missing.awards')}}</div>
    </div>
  </div>
</template>
<script>
import * as level from '@/methods/xp'

export default {
  name: 'Awards',
  data () {
    return {
      showModal: true
    }
  },

  computed: {
    userAwards: function () {
      return this.$store.getters.USER_DATA.awards
    },
    isLoading: function () {
      return this.$store.getters.IS_LOADING
    },
    userXp: function () {
      return this.$store.getters.USER_DATA.xp
    },
    userMoney: function () {
      return this.$store.getters.USER_DATA.money
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
          type: 'Award',
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
    complete (dataEl) {
      const data = {
        price: dataEl.price,
        type: 'award'
      }
      if (this.userMoney > dataEl.price) {
        this.$store.commit('loading')
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
      } else {
        this.$store.commit('openNotify', 'noMoney')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../views/styles/main";
</style>
