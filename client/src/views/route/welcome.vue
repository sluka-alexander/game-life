<template>
  <welcome-page>
    <router-view></router-view>
  </welcome-page>
</template>

<script>
import welcomePage from '@/components/welcome-page.vue'
import formRegister from '@/components/forms/form-register.vue'

export default {
  name: 'welcome',
  data () {
    return {
      email: null
    }
  },
  components: {
    welcomePage
  }
}
</script>
