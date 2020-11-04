<template>
  <div class="main-right-block" :class="{ 'main-right-block_close': !isActiveRightBlock }">
    <div class="main-right-block__top-navbar">
      <div class="main-right-block__top-navbar-icon ">
        <div class="icon-moon" @click="darkTheme">
        </div>
      </div>
      <div class="main-right-block__top-navbar-icon ">
        <div class="icon-rus" @click="changeLang" :class="{'icon-eng': lang === 'en'}">
          <details-menu v-if="isActiveDropdown">
            <language></language>
          </details-menu>
        </div>
      </div>
      <div class="main-right-block__top-navbar-icon ">
        <div class="icon-profile">
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
  data () {
    return {
      isActiveDropdown: false
    }
  },
  components: {
    avatar,
    level,
    skills,
    detailsMenu,
    language
  },
  methods: {
    changeLang () {
      this.isActiveDropdown = !this.isActiveDropdown
    },
    darkTheme () {
      this.$store.dispatch('darkTheme', 'clicked')
    }
  },
  computed: {
    isActiveRightBlock: function () {
      return this.$store.getters.IS_ACTIVE_RIGHT_BLOCK
    },
    lang: function () {
      return this.$store.getters.LANG
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../views/styles/main";

.icon-rus {
  @extend %img;

  @include size(16px);
  background-image: url('../views/img/rus.svg');
}
.icon-eng {
  @extend %img;

  @include size(16px);
  background-image: url('../views/img/eng.svg');
}

.main-right-block {
  @include size(250px, 100vh);

  overflow-y: auto;
  position: fixed;
  border-left: 1px solid $gray-border;
  top: 0;
  right: 0;
  background-color: $white;
  padding: 30px;
  transition: 0.3s;
  z-index: 3;

  &_close {
    box-shadow: none;
    transform: translateX(250px);
  }

  &__top-navbar {
    @extend %flex-space-between;

    width: 100%;
    margin-bottom: 80px;
  }

  &__top-navbar-icon {
    position: relative;
    font-size: $icon-size-M;
    cursor: pointer;
  }
}
</style>
