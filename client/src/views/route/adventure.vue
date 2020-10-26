<template>
  <div class="adventure-page">
    <modal v-if="isActiveModal">
      <form-new-mission></form-new-mission>
    </modal>
    <div class="title">Adventures</div>
    <div class="adventure-page__newTask icon-plus"
         :class="{ 'adventure-page__newTask_active-right-block': isActiveRightBlock }"
         @click="openModal('newMission')"></div>
    <div class="adventure-page__tasks">
      <div class="adventure-page__task">
        <div class="adventure-page__task-name">Купить хлеба</div>
        <div class="adventure-page__task-desc">Lorem excepturi exercitationem maiores necessitatibus sint.
        </div>
        <div style="display: flex">
          <div class="adventure-page__task-XP">
            XP: 300
          </div>
          <div class="adventure-page__task-XP">Сложность: 3 / 5</div>
        </div>
        <div class="adventure-page__task-tags">
          <div class="adventure-page__task-tag">Sport</div>
          <div class="adventure-page__task-tag">OutDoor</div>
        </div>
        <div class="adventure-page__task-bottom">
          <div class="adventure-page__comments">Комментарии: 16</div>
          <div class="adventure-page__users-done">Выполнили: 8 </div>
          <div class="adventure-page__users-added">Добавили: 9 </div>
        </div>
        <div class="adventure-page__buttons">
          <button class="adventure-page__button-add">Добавить</button>
          <button class="adventure-page__button-done">Выполнил</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from '@/components/modal'
import formNewMission from '@/components/forms/form-new-mission'

export default {
  name: 'adventure',
  components: {
    modal,
    formNewMission
  },
  methods: {
    assignNameModal (nameModal) {
      this.$store.commit('assignNameModal', nameModal)
    },
    openModal (nameModal) {
      this.assignNameModal(nameModal)
      this.$store.dispatch('openModal')
    }
  },
  computed: {
    isActiveRightBlock: function () {
      return this.$store.getters.IS_ACTIVE_RIGHT_BLOCK
    },
    isActiveModal () {
      return this.$store.getters.IS_ACTIVE_MODAL
    }
  }

}
</script>

<style lang="scss">
  @import "../styles/main";

  .adventure-page {
    &__tasks {
      @extend %flex-center;
      width: 100%;
    }
    &__task {
      @include size(100%, auto);
      padding: 15px 20px;
      border: 1px solid $gray-border;
      border-radius: 3px;
      max-width: 500px;
      margin-bottom: 20px;
    }

    &__task-name {
      font-size: $font-size-S;
      font-weight: $weight-bold;
      margin-bottom: 10px;
    }

    &__task-desc {
      font-size: 14px;
      font-weight: $weight-light;
      color: $gray-dark;
      word-wrap: break-word;
      margin-bottom: 10px;
    }
    &__task-XP {
      font-size: 12px;
      font-weight: $weight-bold;
      margin: 0 20px 10px 0;
    }
    &__task-tags {
      margin-bottom: 4px;
    }
    &__task-tag {
      display: inline-block;
      padding: 2px 12px;
      border-radius: 30px;
      font-size: 12px;
      line-height: 20px;
      border: 1px solid black;
      margin: 0 6px 6px 0;
    }
    &__task-bottom {
      margin-bottom: 10px;
    }
    &__comments {
      color: $gray-darkest;
      display: inline-block;
      cursor: pointer;
      font-size: 12px;
      margin-right: 20px;
      &:hover {
        color: black;
      }
    }
    &__users-done {
      color: $gray-darkest;
      display: inline-block;
      cursor: pointer;
      font-size: 12px;
      margin-right: 20px;
      &:hover {
        color: black;
      }
    }

    &__users-added {
      color: $gray-darkest;
      display: inline-block;
      cursor: pointer;
      font-size: 12px;
      &:hover {
        color: black;
      }
    }
    &__buttons {
      @extend %flex;
      justify-content: flex-end;
      flex-wrap: wrap;
    }
    &__button-done {
      display: flex;
      justify-content: center;
      max-width: 300px;
      padding: 10px 15px;
      background-color: $black;
      font-size: 14px;
      color: $white;
      border-radius: 4px;
      font-weight: $weight-semi-bold;
      cursor: pointer;
      vertical-align: middle;
      transition: 0.2s;
      margin-left: 6px;

      &:hover {
        opacity: 0.8;
      }

      &__no-active {
        background-color: $gray;
        pointer-events: none;
        color: $gray-dark;
      }
      &:active {
        background-color: $blue-dark;
      }
    }
    &__button-add {
      display: flex;
      justify-content: center;
      max-width: 300px;
      padding: 10px 15px;
      background-color: $color-main;
      font-size: 14px;
      color: $white;
      border-radius: 4px;
      font-weight: $weight-semi-bold;
      cursor: pointer;
      vertical-align: middle;
      transition: 0.2s;

      &:hover {
        opacity: 0.8;
      }

      &__no-active {
        background-color: $gray;
        pointer-events: none;
        color: $gray-dark;
      }
      &:active {
        background-color: $blue-dark;
      }
    }
    &__newTask {
      @extend %flex-center;
      @include size(50px);

      position: fixed;
      bottom: 50px;
      right: 50px;
      cursor: pointer;
      border-radius: 100px;
      background-color: $color-main;
      color: white;
      font-size: 16px;
      transition: 0.3s;
      z-index: 2;
      &:hover {
        background-color: $black;
      }
      &_active-right-block {
        right: 300px;
      }
    }
  }
</style>
