<template>
  <welcome-page>
    <form-login></form-login>
  </welcome-page>
</template>

<script>
import welcomePage from '@/components/welcome-page.vue'
import formLogin from '@/components/forms/form-login.vue'

export default {
  name: 'login',
  components: {
    welcomePage,
    formLogin
  }
}
</script>

<style scoped>

</style>
