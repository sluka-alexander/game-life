<template>
  <div class="skills">
    <div class="skills__title">Skills</div>
    <div class="skills__items">
      <div class="skills__item">
        <div class="skills__icon icon-strength"></div>
        <div class="skills__item-text">Strength: {{ userSkills.strength }}</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-intellect"></div>
        <div class="skills__item-text">Intellect: {{ userSkills.intellect }}</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-culture"></div>
        <div class="skills__item-text">Culture: {{ userSkills.culture }}</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-charisma"></div>
        <div class="skills__item-text">Charisma: {{ userSkills.charisma }}</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-humanity"></div>
        <div class="skills__item-text">Humanity: {{ userSkills.humanity }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skills',
  computed: {
    userSkills: function () {
      return this.$store.getters.USER_DATA.skills
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../views/styles/main";

  .skills {
    &__title {
      font-size: $font-size-S;
      font-weight: $weight-extra-bold;
      text-align: center;
      margin-bottom: 15px;

      &:after {
        content: ':';
      }
    }

    &__item {
      @extend %flex;

      margin-bottom: 15px;
      font-size: $font-size-XS;
      font-weight: $weight-light;
    }

    &__icon {
      font-size: $icon-size-M;
      margin-right: 15px;
    }
    &__item-text {
      &:after {
        content: ':';
      }
    }
  }

</style>
