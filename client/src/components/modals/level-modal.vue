<template>
  <div class="level-modal">
      <div v-if="nameActiveModal.action === 'up'" class="level-modal_up">
        <div class="level-modal__img level-modal__img_up"></div>
        <div class="level-modal__container">
          <div class="bold">
            {{$t('main.modal.level.new') }} {{ userLevel }} <br>
          </div>
          {{$t('main.modal.level.up') }}
        </div>
      </div>
      <div v-if="nameActiveModal.action === 'down'" class="
      level-modal_up">
        <div class="level-modal__img level-modal__img_down"></div>
        <div class="level-modal__container">
          <div class="bold">
            {{$t('main.modal.level.new') }} {{ userLevel }} <br>
          </div>
          {{$t('main.modal.level.down') }}
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'level-modal',
  computed: {
    nameActiveModal () {
      return this.$store.getters.NAME_ACTIVE_MODAL
    },
    userLevel () {
      return this.$store.getters.USER_DATA.level
    }
  }
}
</script>

<style scoped lang="scss">
  .level-modal {
    display: flex;
    align-items: center;
    flex-direction: column;
    font-size: 13px;
    text-align: center;

    .bold {
      font-size: 18px;
      margin-bottom: 16px;
      font-style: normal;
      font-weight: 900;
    }

    &__container {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    &__img {
      margin: 0 auto;
      height: 70px;
      width: 70px;
      margin-bottom: 16px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      &_up {
        background-image: url('../../views/img/level-up.svg');
      }
      &_down{
        background-image: url('../../views/img/level-down.svg');
      }

    }
  }

</style>
