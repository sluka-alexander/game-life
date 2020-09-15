<template>
  <div class="main-right-block" :class="{ 'main-right-block_close': isActiveRightBlock }">
    <div class="main-right-block__top-navbar">
      <div class="main-right-block__top-navbar-icon ">
        <div class="icon-dark-theme">
        </div>
      </div>
      <div class="main-right-block__top-navbar-icon ">
        <div class="icon-rus">
          <details-menu>
            <language></language>
          </details-menu>
        </div>
      </div>
      <div class="main-right-block__top-navbar-icon ">
        <div class="icon-user">
        </div>
      </div>
    </div>
    <avatar></avatar>
    <level></level>
    <skills></skills>
  </div>
</template>

<script>
import avatar from '@/components/avatar'
import level from '@/components/level'
import skills from '@/components/skills'
import detailsMenu from '@/components/details-menu'
import language from '@/components/details/language'

export default {
  name: 'main-right-block',
  components: {
    avatar,
    level,
    skills,
    detailsMenu,
    language
  },
  computed: {
    isActiveRightBlock: function () {
      return this.$store.getters.IS_ACTIVE_RIGHT_BLOCK
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../views/styles/main";

.icon-rus {
  @extend %img;

  @include size(20px);
  background-image: url('../views/img/rus.svg');
}

.main-right-block {
  @include size(250px, 100vh);

  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  background-color: $white;
  padding: 30px;
  transition: 0.3s;
  z-index: 5;

  &_close {
    transform: translateX(250px);
  }

  &__top-navbar {
    @extend %flex-space-between;

    width: 100%;
    margin-bottom: 80px;
  }

  &__top-navbar-icon {
    position: relative;
    font-size: $icon-size-L;
    color: $lilac;
    cursor: pointer;
  }
}
</style>
