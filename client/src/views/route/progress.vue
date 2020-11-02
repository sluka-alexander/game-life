<template>
  <div class="progress-page">
    <div class="title">{{$t('items.progress')}}</div>
    <apexchart class="center" width="400" type="donut" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
export default {
  name: 'progressPage',
  data: function () {
    return {
      options: {},
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        labels: ['Strength', 'Intellect', 'Culture', 'Charisma', 'Humanity']
      }
    }
  },
  computed: {
    userSkills: function () {
      return this.$store.getters.USER_DATA.skills
    }
  },
  mounted () {
    this.series = Object.values(this.userSkills)
  }
}
</script>
<style lang="scss" scoped>
  @import "src/views/styles/main";
  .progress-page {
    &__img {
      @extend %img;
      width: 100%;
      height: 200px;
      background-image: url('../../views/img/rules.svg');
    }
  }
</style>
