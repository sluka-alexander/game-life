<template>
  <div class="left-menu">
    <div class="left-menu__top-part">
      <div class="menu-btn" @click="changeStateOfLeftMenu()">
        <div class="menu-btn__burger" :class="{ 'menu-btn__burger_active': isActiveLeftMenu }"></div>
      </div>
    </div>
    <div class="left-menu__items">
      <div v-for="item in items" v-bind:key="item">
        <left-menu-item :item="item"></left-menu-item>
      </div>
    </div>
    <div class="left-menu__down-part">
      <left-menu-item :item="'logout'"></left-menu-item>
    </div>
  </div>
</template>

<script>
import leftMenuItem from './left-menu-item.vue'
export default {
  name: 'left-menu',
  components: {
    leftMenuItem
  },
  data () {
    return {
      items: ['tasks', 'adventure', 'rules', 'progress', 'achievement']
    }
  },
  methods: {
    changeStateOfLeftMenu () {
      this.$store.dispatch('changeStateOfLeftMenu')
    }
  },
  computed: {
    isActiveLeftMenu: function () {
      return this.$store.getters.IS_ACTIVE_LEFT_MENU
    }
  }

}
</script>
