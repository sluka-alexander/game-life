<template>
  <div class="search">
    <div class="search__tags-and-input">
      <div class="search__tags">
        <div class="search__tags-text">Tags</div>
        <div class="search__tags-icon_arrow icon-arrow"></div>
      </div>
      <input class="search__input" placeholder="Search..." v-model="searchValue" ref="input">
    </div>
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

    height: 50px;
    max-width: 400px;
    margin: 0 auto 10px;
    background-color: $white;
    border-radius: 15px;
    padding: 10px 15px;

    &__tags-and-input {
      @extend %flex;
    }

    &__tags {
      @extend %flex;

      @include size(70px, 100%);

      align-items: center;
      cursor: pointer;
      font-size: $font-size-S;
      margin-right: 15px;

      &:hover {
        color: $color-main;
      }
      &:after {
        @include size(1px, 30px);
        content: '';
        transform: translateX(70px);
        position: absolute;
        background-color: $gray;
      }
    }

    &__tags-text {
      margin-right: 5px;
    }

    &__tags-icon_arrow {
      font-size: 10px;
    }

    &__input {
      max-width: 215px;
      width: 50%;

      font-size: $font-size-S;
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
      font-size: 15px;
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
          background-color: $gray;
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
