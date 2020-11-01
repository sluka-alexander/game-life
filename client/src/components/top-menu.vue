<template>
    <div class="top-menu" :class="{ 'top-menu_active': isActiveRightBlock }">
      <div class="left-menu__top-part">
        <div class="money">
          <div class="icon-money"></div>
          {{ userMoney }}
        </div>
        <resize-menu-btn v-on:click.native="changeStateOfRightBlock"></resize-menu-btn>
      </div>
    </div>
</template>

<script>
import resizeMenuBtn from '@/components/resize-menu-btn.vue'
export default {
  name: 'top-menu',
  components: {
    resizeMenuBtn
  },
  methods: {
    changeStateOfRightBlock () {
      this.$store.dispatch('changeStateOfRightBlock')
    }
  },
  computed: {
    isActiveRightBlock: function () {
      return this.$store.getters.IS_ACTIVE_RIGHT_BLOCK
    },
    userMoney: function () {
      return this.$store.getters.USER_DATA.money
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../views/styles/main";

  .top-menu {
    @extend %flex;

    @include size(100%, 80px);
    background-color: $white;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    padding: 0 30px 0 130px;
    top: 0;
    z-index: 2;
    transition: 0.3s;
    border-bottom: 1px solid $gray-border;

    &_active {
      padding: 0 280px 0 130px;
    }
    .left-menu {
      &__top-part {
        font-size: 14px;
        @extend %flex;
        .money {
          @extend %flex-center;
          margin-right: 10px;
          .icon-money {
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
