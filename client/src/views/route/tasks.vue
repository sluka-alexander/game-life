<template>
  <div class="task-page">
    <div class="task-page__img">
    </div>
    <search></search>
    <dropdown-create-tasks></dropdown-create-tasks>
  </div>
</template>

<script>
import search from '@/components/search'
import dropdownCreateTasks from '@/components/dropdown-create-tasks'

export default {
  name: 'tasks',
  components: {
    search,
    dropdownCreateTasks
  }
}
</script>

<style lang="scss">
  @import "../styles/main";
  .task-page {
    @include size(100%);
    &__img {
      @extend %img;

      @include size(500px, 240.78px);
      margin: 0 auto;
      background-image: url('../img/tasks.png');
    }
  }

</style>
