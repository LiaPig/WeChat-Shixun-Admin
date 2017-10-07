<template>
    <div class="leftNav">
      <!--导航顶部的logo图开始-->
      <div >
        <img src="./cutepig.png" alt="可爱猪崽哼" class="logoPic"/>
      </div>
      <!--导航顶部的logo图结束-->

      <!--正式的导航内容开始-->
      <div class="content">
        <el-menu
          theme = "dark"
          router
          :default-active = "$route.path" >
          <div v-for = "(item, index) in nav_menu_data" :key="index">
            <el-menu-item :index="item.path" class="content_item">
              <i class="" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
      <!--正式的导航内容结束-->
    </div>
</template>

<script>
  import ElMenu from '../../../node_modules/element-ui/packages/menu/src/menu'
  import ElMenuItem from '../../../node_modules/element-ui/packages/menu/src/menu-item'
  export default {
    components: {
      ElMenuItem,
      ElMenu},
    data () {
      return {
        nav_menu_data: [
          {
            title: '主页',
            path: '/home',
            icon: 'el-icon-menu'
          },
          {
            title: '商品管理',
            path: '/product',
            icon: 'el-icon-star-on'
          },
          {
            title: '图片管理',
            path: '/picture',
            icon: 'el-icon-picture'
          },
          {
            title: '订单管理',
            path: '/order',
            icon: 'el-icon-document'
          },
          {
            title: '标签管理',
            path: '/tag',
            icon: 'el-icon-star-off'
          },
          {
            title: '用户管理',
            path: '/user',
            icon: 'el-icon-setting'
          },
          {
            title: '角色管理',
            path: '/role',
            icon: 'el-icon-information'
          }
        ]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .leftNav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    height: 100%;
    overflow-y: auto;
    background-color: #424f63;
    z-index: 999;
  }
  .logoPic {
    display: inline-block;
    width: 100%;
    height: 100px;
  }
  .content {
    display: inline-block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: pink;
  }
  .content_item {
    display: inline-block;
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
</style>
