<template>
  <div class="level">
    <div class="level__title">level 6</div>
    <div class="level__subtitle">300{{ $t('level.xp')}}</div>
    <div class="level-scale">
      <div class="level-scale__full">
        <div class="level-scale level-scale__full level-scale__full_user"></div>
      </div>
    </div>
    <div class="level-scale__experience">300XP / 2000XP</div>
  </div>
</template>

<script>
export default {
  name: 'level'
  // computed: {
  //   userXP: function () {
  //     return Object.values(this.$store.getters.USER_DATA.skills).reduce((accumulator, currentValue) => accumulator + currentValue)
  //   }
  // }
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

    &__full {
      @include size(100%, 100%);

      background-color: $gray-light;
      border-radius: 50px;

      &_user {
        @include size(40%, 100%);

        background-color: $color-main;
      }
    }

    &__experience {
      font-size: $font-size-XXS;
      text-align: center;
    };
  }
</style>
