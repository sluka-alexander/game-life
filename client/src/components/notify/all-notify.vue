<template>
  <div>
    <transition name="notify">
      <div v-if="nameNotify === 'created'"
           class="notify notify_green">{{$t('notify.createdElement')}}</div>
      <div v-if="nameNotify === 'updated'"
           class="notify notify_green">{{$t('notify.updatedElement')}}</div>
      <div v-if="nameNotify === 'removed'"
           class="notify notify_green">{{$t('notify.removedElement')}}</div>
      <div v-if="nameNotify === 'completeIncrease'"
           class="notify notify_green">{{$t('notify.completedElement.increase')}}</div>
      <div v-if="nameNotify === 'completeDecrease'"
           class="notify notify_red">{{$t('notify.completedElement.decrease')}}</div>
      <div v-if="nameNotify === 'noMoney'"
           class="notify notify_red">{{$t('notify.noMoney')}}</div>
      <div v-if="nameNotify === 'buy'"
           class="notify notify_green">{{$t('notify.buy')}}</div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'notify',
  computed: {
    nameNotify: function () {
      return this.$store.getters.NAME_NOTIFY
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../views/styles/main";

.notify-enter-active, .notify-leave-active {
  transition: opacity .5s;
}
.notify-enter, .notify-leave-to{
  opacity: 0;
}
.notify {
  &_green {
    background-color: $green;
  }
  &_red {
    background-color: $red;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: white;
  position: fixed;
  top: 50px;
  left:50%;
  margin-left:-200px;
  width: 400px;
  height: 50px;
  border-radius: 3px;
  z-index: 9999;
  transition: 0.3s;
}
</style>
