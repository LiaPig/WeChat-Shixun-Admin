<template>
  <div class="panel_title">
    <div v-if="title" v-text="'•(oo) • ' + title" class="aa"></div>
    <div class="orders">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    props: {
      title: {
        type: String
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .panel_title {
      position: fixed;
      top: 60px;
      left: 205px;
      height: 30px;
      width: calc(100% - 205px);
      line-height: 30px;
      font-size: 15px;
      color: #324057;
      background-color: #fff;
      z-index: 9;
    }
    .aa{
      float: left;
      width: 250px;
      text-align: left;
      padding-left: 5px;
    }
    .orders {
      float: left;
      width: calc(100% - 450px);
      margin-left: -50px;
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
</style>
