<template>
  <div id="app">
    <div class="container">
      <!--页面左边内容开始-->
      <div class="left">
        <!--导航栏开始-->
        <left-nav></left-nav>
        <!--导航栏结束-->
      </div>
      <!--页面左边内容结束-->

      <!--页面右边内容开始-->
      <div class="right">
        <!--顶部导航栏开始-->
        <top-nav></top-nav>
        <!--顶部导航栏结束-->

        <!--中间面板开始-->
        <div class="product_panel">
          <!--面板标题开始-->
          <panel-title :title="this.$route.meta.name">
          </panel-title>
          <!--面板标题结束-->

          <!--面板中的内容开始-->
          <div class="panel_body">
            <router-view></router-view>
          </div>

          <!--面板中的内容结束-->
        </div>
        <!--中间面板结束-->
      </div>
      <!--页面右边内容结束-->
    </div>
  </div>
</template>

<script>
  import leftNav from 'Components/leftNav/leftNav.vue'
  import topNav from 'Components/topNav/topNav.vue'
  import panelTitle from 'Components/panelTitle/panelTitle.vue'
  export default {
    name: 'app',
    components: {
      leftNav,
      topNav,
      panelTitle
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    position: absolute;
    width: 100%;
    height: 100%;
    margin-top: -8px;
    margin-left: -8px;
    overflow: hidden;
  }
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    margin-top: 0;
    margin-left: 0;
    background-color: #EFF2F7;
  }

  .right {
    float: left;
    padding-left: 100px;
    display: inline-block;
    width: calc(100% - 200px);
    height: 100%;
  }

  .product_panel {
    display: inline-block;
    height: 100%;
    width: 100%;
  }

  .right .product_panel .panel_body {
    position: fixed;
    left: 200px;
    top: 100px;
    height: 500px;
    width: calc(100% - 200px - 5px);
    text-align: left;
    background-color: #fff;
    padding-left: 5px;
    overflow-y: auto;
  }
</style>
