<template>
  <transition name="modal">
    <div class="modal__mask">
      <div class="modal__container" ref="container">
        <div class="modal__close icon-close" @mouseup="closeModal"></div>
          <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  computed: {
    isActiveModal () {
      return this.$store.getters.IS_ACTIVE_MODAL
    }
  },
  methods: {
    closeModalOutside (e) {
      if (!this.$refs.container.contains(e.target)) {
        this.$store.dispatch('closeModal')
      }
    },
    closeModal () {
      this.$store.dispatch('closeModal')
    }
  },
  created () {
    setTimeout(() => {
      document.addEventListener('mousedown', this.closeModalOutside)
    }, 300)
  },
  destroyed () {
    document.removeEventListener('mousedown', this.closeModalOutside)
  }

}
</script>

<style scoped lang="scss">
  @import "../views/styles/common/index";
  .modal {
    &__mask {
      @extend %flex-center;

      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $blackout;
      transition: opacity 0.3s ease;
    }

    &__container {
      z-index: 9999;
      max-width: 362px;
      width: 100%;
      overflow-y: auto;
      max-height: 80vh;
      position: relative;
      padding: 16px;
      margin: 0 30px;
      background-color: $white;
      border-radius: 5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
    }
    &__close {
      z-index: 4;
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
      font-size: $icon-size-S * 1.2;

      &:hover {
        color: $color-main;
      }
    }
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>
