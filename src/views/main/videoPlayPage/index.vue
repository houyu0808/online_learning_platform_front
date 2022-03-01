<template>
  <div>111</div>
</template>

<script>
import api from '../../../service/mainPage';

export default {
  name: "index",
  data() {
    return {
      id: ''
    };
  },
  methods: {
    addClickTimes(id){
      api.addClickTimes({id: id});
    }
  },
  created () {
    this.id = this.$route.query.id;
    this.addClickTimes(this.id);
  }
};
</script>

<style scoped>

</style>
