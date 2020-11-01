<template>
  <div class="skills">
    <div class="skills__title">{{$t('skills.title')}}</div>
    <div class="skills__items">
      <div class="skills__item">
        <div class="skills__icon icon-strength"></div>
        <div class="skills__item-text"><div class="item-text-after">{{$t('skills.str')}}</div> {{ userSkills.str }}</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-intellect"></div>
        <div class="skills__item-text"><div class="item-text-after">{{$t('skills.int')}}</div> {{ userSkills.int }}</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-culture"></div>
        <div class="skills__item-text"><div class="item-text-after">{{$t('skills.cul')}}</div> {{ userSkills.cul }}</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-charisma"></div>
        <div class="skills__item-text"><div class="item-text-after">{{$t('skills.cha')}}</div> {{ userSkills.cha }}</div>
      </div>
      <div class="skills__item">
        <div class="skills__icon icon-humanity"></div>
        <div class="skills__item-text"><div class="item-text-after">{{$t('skills.hum')}}</div> {{ userSkills.hum }}</div>
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
      @extend %flex;
      .item-text-after {
        margin-right: 5px;
        &:after {
          content: ':';
        }
      }
      /*&:first-child {*/
      /*  &:after {*/
      /*    content: ':';*/
      /*  }*/
      /*}*/
    }
  }

</style>
