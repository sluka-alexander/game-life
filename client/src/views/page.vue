<template>
  <div class="page">
    <left-menu></left-menu>
    <div class="content">
      <router-view></router-view>
    </div>
    <main-right-block></main-right-block>
  </div>
</template>

<script lang="ts">
import leftMenu from '../components/left-menu.vue'
import mainRightBlock from '../components/main-right-block.vue'

export default {
  name: 'page',
  components: {
    leftMenu,
    mainRightBlock
  }
}
</script>
