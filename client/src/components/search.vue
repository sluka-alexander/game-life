<template>
  <div class="search">
      <div class="search__tags">
        <div class="search__tags-text">Tags</div>
        <div class="search__tags-icon_arrow icon-right-arrow"></div>
      </div>
      <input class="search__input" placeholder="Search..." v-model="searchValue" ref="input">
      <div class="search__icons" :class="{'search__icons_active' : searchValue}">
        <div class="search__icon search__icon_clear icon-close"
        :class="{ 'search__icon_clear_active' : searchValue }" @click="clearInput()"></div>
        <div class="search__icon search__icon_search icon-search"></div>
      </div>
  </div>
</template>

<script lang="js">
export default {
  name: 'search',
  data () {
    return {
      searchValue: null
    }
  },
  methods: {
    clearInput () {
      this.searchValue = null
      this.$refs.input.focus()
    }
  }
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";
  .search {
    @extend %flex-space-between;

    flex: 0 1 0;
    height: 50px;
    max-width: 400px;
    margin: 0 auto 10px;
    background-color: $gray-light;
    border-radius: 3px;
    padding: 10px 15px;

    &__tags {
      @extend %flex;

      @include size(70px, 100%);

      font-size: $font-size-S;
      align-items: center;
      cursor: pointer;
      margin-right: 15px;

      &:hover {
        color: $color-main;
      }
      &:after {
        @include size(1px, 30px);
        content: '';
        pointer-events: none;
        transform: translateX(70px);
        position: absolute;
        background-color: $gray-dark;
      }
    }

    &__tags-text {
      margin-right: 5px;
    }

    &__tags-icon_arrow {
      font-size: 10px;
      transform: rotate(90deg);
    }

    &__input {
      font-size: $font-size-S;
      padding: 0 35px;
      width: 100%;
      background-color: $gray-light;
    }

    &__icons {
      @extend %flex;

      @include size(70px, 100%);

      justify-content: flex-end;
      align-items: center;

      &_active {
        justify-content: space-between;

        .search__icons:after {
          @include size(1px, 30px);
          content: '';
          transform: translateX(35px);
          position: absolute;
          background-color: $gray;
          transition: 0.3s;
        }
      }
    }

    &__icon {
      @include size(35px, 20px);
      font-size: 16px;
      transition: 0.3s;

      &_clear {
        @extend %flex;

        align-items: center;
        color: $lilac;
        opacity: 0;

        &:hover {
          color: $black;
        }

        &:after {
          @include size(1px, 30px);
          content: '';
          transform: translateX(35px);
          position: absolute;
          background-color: $gray-dark;
        }

        &_active {
          opacity: 100%;
          cursor: pointer;
        }
      }
      &_search {
        @extend %flex;

        align-items: center;
        justify-content: flex-end;
      }
    }
  }
</style>
