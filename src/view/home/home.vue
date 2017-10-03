<template>
  <!--面板中的内容开始-->
  <div>
    <!--内容头部开始-->
    <div class="header">
      ✿欢迎使用卖猪管理系统后台✿
    </div>
    <!--内容头部结束-->

    <!--正式内容开始-->
    <div class="content">
      <!--左边照片开始-->
      <div>
        <img class="content_left" src="./sell.jpg"/>
      </div>
      <!--左边照片结束-->

      <!--右边照片开始-->
      <div>
        <img  class="content_right" src="./1.jpg"/>
      </div>
      <!--右边照片结束-->
    </div>
    <!--正式内容结束-->
  </div>
  <!--面板中的内容结束-->
</template>

<script>
  export default {
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header {
    display: inline-block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-left: -100px;
    color: pink;
    background-color: #fff;
  }
  .content {
    display: inline-block;
    width: 100%;
    height: 400px;
    background-color: pink;
  }
  .content .content_left {
    float: left;
    display: inline-block;
    width: 75%;
    height: 400px;
  }
  .content .content_right {
    float: left;
    display: inline-block;
    margin-left: 5px;
    width: calc(25% - 5px);
    height: 400px;
  }
</style>
