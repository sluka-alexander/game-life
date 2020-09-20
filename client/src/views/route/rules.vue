<template>
  <div class="rules-page">
    {{ widthBlock }}
    <div class="blocks" ref="widthBlock" v-on:scroll="scrollMeth">
      <div class="shadow"></div>
      <div class="block-1"></div>
      <div class="block-1"></div>
      <div class="block-1"></div>
      <div class="block-1"></div>
      <div class="block-1"></div>
      <div class="block-1"></div>
      <div class="shadow shadow_right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rules',
  data () {
    return {
      widthBlock: false
    }
  },
  methods: {
    scrollMeth () {
      this.widthBlock = true
    }
  },
  mounted () {
    console.log(event)
  }
}
</script>
<style lang="scss" scoped>
  .rules-page {
    display: flex;
    justify-content: space-between;
    height: 100%;
    position: relative;
    overflow: auto;
    background-color: green;
  }
  .blocks {
    display: flex;
    width: 100%;
    height: 100%;
    overflow-x: auto;
    padding-bottom: 30px;
  }
  .block-1 {
    min-width: 300px;
    overflow-x: hidden;
    overflow-y: auto;
    width: 400px;
    max-width: 350px;
    background-color: red;
    margin: 0 30px;
  }
  .block-2 {
    width: 100%;
    height: 140px;
    background-color: blue;
    margin-bottom: 20px;
  }
  .shadow {
    width: 30px;
    height: 100%;
    background-color: purple;
    position: absolute;
    z-index: 2;
    &_right {
      right: 0;
    }
  }
</style>
