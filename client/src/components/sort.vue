<template>
    <div class="sort">
      <div class="sort__btn" @click="isActiveDropdown = !isActiveDropdown">Sort</div>
      <details-menu v-on:click.native="isActiveDropdown = !isActiveDropdown" class="sort__dropdown" v-if="isActiveDropdown">
        <div class="sort__item item" @click="sort('diffUp')">{{$t('main.sort.diffUp')}} <div class="icon-right-arrow-2 up" ></div></div>
        <div class="sort__item item"  @click="sort('diffDown')">{{$t('main.sort.diffUp')}}  <div class="icon-right-arrow-2 down"></div></div>
      </details-menu>
    </div>
</template>

<script>
import DetailsMenu from './details-menu'
export default {
  name: 'sort',
  data () {
    return {
      isActiveDropdown: false
    }
  },
  methods: {
    sort (type) {
      this.$store.dispatch('sort', type)
    }
  },
  components: {
    DetailsMenu
  }
}
</script>

<style scoped lang="scss">
@import "../views/styles/common/index";
.sort {
  position: relative;
  &__btn {
    cursor: pointer;
  }
  &__dropdown {
    min-width: 170px;
    right: 10px;
  }
  & {
    display: inline-block;
    font-size: 16px;
    padding: 5px 15px;
  }
  &__item {
    display: flex;
    .icon-right-arrow-2 {
      @extend %flex-center;
      font-size: 13px;
      width: 20px;
      height: 20px;
    }
    .up {
      transform: rotate(-90deg);
    }
    .down {
      transform: rotate(90deg);
    }
  }
}
</style>
