<template>
  <div>
    <router-link
      v-on:click.native="closeLeftMenu()"
      :to="item" class="left-menu-item" replace v-if="item !== 'logout'">
      <div class="left-menu-item__icon">
        <div :class="{
          'icon-tasks': item === 'tasks',
          'icon-adventure': item === 'adventure',
          'icon-rules': item === 'rules',
          'icon-progress': item === 'progress',
          'icon-achievement': item === 'achievement',
        }"></div>
      </div>
      <div class="left-menu-item__text"
           :class="{ 'left-menu-item__text_active': isActiveLeftMenu }">{{ item }}
      </div>
    </router-link>
    <div :to="item" class="left-menu-item" v-if="item === 'logout'">
      <div class="left-menu-item__icon">
        <div :class="{
          'icon-logout': item === 'logout',
        }"></div>
      </div>
      <div class="left-menu-item__text"
           :class="{ 'left-menu-item__text_active': isActiveLeftMenu }">{{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'left-menu-item',
  props: {
    item: String
  },
  methods: {
    closeLeftMenu () {
      this.$store.dispatch('closeOfLeftMenu')
    }
  },
  computed: {
    isActiveLeftMenu: function () {
      return this.$store.getters.IS_ACTIVE_LEFT_MENU
    }
  }
}
</script>
