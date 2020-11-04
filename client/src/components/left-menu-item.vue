<template>
  <div>
    <router-link
      v-if="item !== 'logout' && item !== 'home'"
      v-on:click.native="closeLeftMenu()"
      :to="item" class="left-menu-item" replace>
      <div class="left-menu-item__icon">
        <div :class="{
          'icon-category-household': item === 'home',
          'icon-check-2': item === 'tasks',
          'icon-list': item === 'standings',
          'icon-rules': item === 'rules',
          'icon-progress': item === 'progress',
          'icon-achievement': item === 'achievement',
        }"></div>
      </div>
      <div class="left-menu-item__text"
           :class="{ 'left-menu-item__text_active': isActiveLeftMenu }">{{ item }}
      </div>
    </router-link>

    <router-link
      v-if="item === 'home'"
      v-on:click.native="closeLeftMenu()"
      to="/" class="left-menu-item" replace>
      <div class="left-menu-item__icon">
        <div :class="{
          'icon-home': item === 'home',
        }"></div>
      </div>
      <div class="left-menu-item__text"
           :class="{ 'left-menu-item__text_active': isActiveLeftMenu }">{{ item }}
      </div>
    </router-link>

    <div :to="item" class="left-menu-item" v-if="item === 'logout'" @click="logout">
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
    },
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ name: 'login' })
      })
    }
  },
  computed: {
    isActiveLeftMenu: function () {
      return this.$store.getters.IS_ACTIVE_LEFT_MENU
    }
  }
}
</script>
