<template>
  <div class="skills">
    <div class="skills__title">Skills</div>
    <div class="skills__items">
      <div class="skills__item">
        <div class="skills__icon icon-strength"></div>
        <div class="skills__item-text">Strength</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-intellect"></div>
        <div class="skills__item-text">Intellect</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-culture"></div>
        <div class="skills__item-text">Culture</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-charisma"></div>
        <div class="skills__item-text">Charisma</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-humanity"></div>
        <div class="skills__item-text">Humanity</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'skills'
}
</script>

<style scoped lang="scss">
  @import "../views/styles/main";

  .skills {
    &__title {
      font-size: $font-size-S;
      text-align: center;
      margin-bottom: 15px;

      &:after {
        content: ':';
      }
    }

    &__item {
      @extend %flex;

      color: $lilac;
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
