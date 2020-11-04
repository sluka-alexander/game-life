<template>
  <div class="lang">
    <div class="lang__item" @click="setLocale('ru')">{{ $t('lang.ru') }}</div>
    <div class="lang__item" @click="setLocale('en')">{{ $t('lang.en') }}</div>
  </div>
</template>

<script>
export default {
  name: 'language',
  methods: {
    setLocale (locale) {
      this.$i18n.locale = locale
      this.$store.dispatch('changeLang', locale)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../views/styles/main";
.lang {
  &__item {
    padding: 10px 20px;

    &:last-child {
      &:hover {
        border-radius: 0 0 5px 5px;
      }
    }
    &:first-child {
      border-radius: 5px 5px 0 0;
    }
    &:hover {
      background-color: $gray-light;
    }
   }
}
</style>
