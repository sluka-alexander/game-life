<template>
  <div class="rules">
    <div class="title">{{$t('items.rules')}}</div>
    <div class="rules__container">
      <div class="rules__items">
        <div class="rules__item">
          <div>
            <div class="rules__number">1</div>
          </div>
          <div class="rules__text">{{$t('rules.1')}}</div>
        </div>
        <div class="rules__item">
          <div>
            <div class="rules__number">2</div>
          </div>
          <div class="rules__text">{{$t('rules.2')}}</div>
        </div>
        <div class="rules__item">
          <div>
            <div class="rules__number">3</div>
          </div>
          <div class="rules__text">{{$t('rules.3')}}</div>
        </div>
        <div class="rules__item">
          <div>
            <div class="rules__number">4</div>
          </div>
          <div class="rules__text">{{$t('rules.4')}}</div>
        </div>
        <div class="rules__item">
          <div>
            <div class="rules__number">5</div>
          </div>
          <div class="rules__text">{{$t('rules.5')}}</div>
        </div>
      </div>
      <div class="rules__img"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rules'
}
</script>

<style lang="scss" scoped>
  @import "src/views/styles/main";
  .rules {
    width: 100%;
    &__container {
      @extend %flex;
    }
    &__img {
      @extend %img;
      width: 100%;
      height: 200px;
      background-image: url('../../views/img/rules.svg');
    }
    &__items {
      width: 100%;
    }
    &__item {
      display: flex;
      max-width: 450px;
      width: 100%;
      margin-bottom: 10px;
    }
    &__number {
      @extend %flex-center;
      @include size(50px);

      background-color: $color-main;
      border-radius: 3px;
      color: $white;
      font-size: 24px;
      font-weight: $weight-extra-bold;
      margin-right: 16px;
    }
    &__text {
      @extend %flex-center;
      font-size: 14px;
    }
  }
</style>
