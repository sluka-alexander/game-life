<template>
  <div class="standings">
    <div class="title">{{$t('items.standings')}}</div>
    <div class="standings__users">
      <div class="standings__user" v-for="(user, index) in allUsers" v-bind:key="user._id">
        <div class="standings__user-left-part">
          <div class="standings__user-number">{{ index + 1 }}</div>
        </div>
        <div class="standings__user-right-part">
          <div class="standings__user-name">{{user.name}}</div>
          <div class="standings__user-xp">{{$t('level.xp')}}: <span class="bold">{{user.xp}}</span> </div>
            <div class="standings__user-level"><span class="margin">{{$t('level.title')}}</span><span class="bold">{{user.level}}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'standings',
  computed: {
    allUsers: function () {
      return this.$store.getters.ALL_USERS
    }
  },
  components: {

  },
  methods: {
    openModal (nameModal) {
      this.$store.commit('assignNameModal', nameModal)
      this.$store.dispatch('openModal')
    }
  },
  mounted () {
    this.$store.commit('loading')
    this.$store.dispatch('getAllUsers').then(() => {
      this.$store.commit('loading')
    })
  }
}
</script>

<style lang="scss">
  @import "../styles/main";
  .standings {
    .margin {
      margin-right: 5px;
    }
    &__users {
      @extend %flex-center;
      flex-direction: column;
      width: 100%;
    }
    &__user-right-part {
      @extend %flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
    }
    &__user {
      @extend %flex;
      width: 100%;
      max-width: 480px;
      margin-bottom: 5px;
      font-size: 14px;
      background-color: $gray-light;
      &:nth-child(1) {
        .standings__user-number {
          color: $white;
          background-color: $yellow;
        }
      }
      &:nth-child(2) {
        .standings__user-number {
          color: $white;
          background-color: $bronze;
        }
      }
      &:nth-child(3) {
        .standings__user-number {
          color: $white;
          background-color: $silver;
        }
      }
    }
    &__user-number {
      @extend %flex-center;
      @include size(40px);
      background-color: $gray;
      border-radius: 3px;
      color: $black;
      font-size: 16px;
      font-weight: $weight-bold;
    }
    &__user-name {
      width: 40%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin-right: 20px;
    }
    &__user-xp,
    &__user-level {
      width: 30%;
    }
    &__user-level {
      @extend %flex;
      justify-content: flex-end;
    }
  }
</style>
