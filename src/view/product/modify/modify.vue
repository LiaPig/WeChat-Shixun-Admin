<template>
    <div>
        <h1>修改信息商品的id为：{{route_id}}</h1>
    </div>
</template>

<script>
  export default {
    created () {
      this.route_id = this.$route.params.id
    },
    data () {
      return {
        route_id: this.$route.params.id,
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
