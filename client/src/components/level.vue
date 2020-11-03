<template>
  <div class="level">
    <div class="level__title">{{ $t('level.title')}} {{ userData.level }}</div>
    <div class="level__subtitle">{{ userData.xp }}{{ $t('level.xp')}}</div>
    <div class="level-scale">
      <div class="level-scale__full">
        <div id="levelScale" class="level-scale level-scale__full level-scale__full_user"></div>
      </div>
    </div>
    <div class="level-scale__experience">{{ userData.xp }}{{ $t('level.xp')}} / {{ levelData.from }}{{ $t('level.xp')}}</div>
  </div>
</template>

<script>
export default {
  name: 'level',
  computed: {
    userData: function () {
      return this.$store.getters.USER_DATA
    },
    levelData: function () {
      return this.$store.getters.LEVEL_DATA
    }
  },
  methods: {

  },
  mounted () {
    this.$store.dispatch('calcLevelScale')
  }
}
</script>

<style scoped lang="scss">
  @import "../views/styles/main";

  .level {
    @extend %flex-center;

    flex-direction: column;
    padding: $margin-standard 0;

    &__title {
      font-size: $font-size-XS;
      text-align: center;
      margin-bottom: 5px;
    };

    &__subtitle {
      font-size: $font-size-XS;
      text-align: center;
      margin-bottom: $margin-standard;
    };
  };
  .level-scale {
    @extend %flex-center;

    @include size(200px, 30px);

    border-radius: 50px;
    margin-bottom: 10px;
    transition: 0.3s;

    &__full {
      @include size(100%, 100%);

      background-color: $gray-light;
      border-radius: 50px;

      &_user {
        height: 100%;
        background-color: $color-main;
      }
    }

    &__experience {
      font-size: $font-size-XXS;
      text-align: center;
    };
  }
</style>
