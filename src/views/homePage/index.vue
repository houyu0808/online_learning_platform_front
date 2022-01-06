<template>
  <div class="homePage">
    <el-button type="primary" icon="el-icon-switch-button" circle @click="exit"></el-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  methods: {
    exit () {
      this.$router.replace('/')
      localStorage.removeItem('token')
    }
  },
  created () {

  }
}
</script>

<style scoped>

</style>
