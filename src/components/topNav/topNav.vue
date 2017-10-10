<template>
  <div class="top_side">
    <div>
      <img :src="getUserInfo.avatarUrl" class="userAva"/>
    </div>
    <el-menu theme="dark"  mode="horizontal" class="username" router>
      <el-submenu index="1">
        <template slot="title">{{getUserInfo.username}}</template>
        <div v-for = "(item, index) in topNav_menu_data" :key="index">
          <el-menu-item :index="item.path" class="username_item">
            <i :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </div>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        username: '李猪杂',
        topNav_menu_data: [
          {
            title: '修改密码',
            path: '/test',
            icon: 'el-icon-edit'
          },
          {
            title: '退出登录',
            path: '/login',
            icon: 'el-icon-minus'
          }
        ]
      }
    },
    computed: {
      getUserInfo: function () {
        return this.$store.getters.GET_USER_INFO
      }
    },
    created () {
      console.log(this.$store.getters.GET_USER_INFO)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top_side {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #fff;
    background-color: #324057;
    z-index: 99;
  }
  .username {
    float: right;
    height: 50px;
    line-height: 50px;
    margin-top: -5px;
    width: 120px;
  }
  .username .username_item {
    display: inline-block;
    text-align: left;
  }
  .userAva {
    float: right;
    padding-top: 5px;
    padding-right: 30px;
    width: 40px;
    height: 40px;
  }
</style>
