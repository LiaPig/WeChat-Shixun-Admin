<template>
  <div class="top_side">
    <div>
      <img :src="getUserInfo.avatarUrl" class="userAva"/>
    </div>
    <el-menu theme="dark" mode="horizontal" class="username" router>
      <el-submenu index="1">
        <template slot="title">{{getUserInfo.username}}</template>
        <el-menu-item index="1-1" class="username_item">
          <a href="javascript:" class="dropdown-btn" @click="user_logout">
            <i class="el-icon-minus"></i>
            退出登录
          </a>
        </el-menu-item>
      </el-submenu>
    </el-menu>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'

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
    },
    methods: {
      ...mapActions({
        clearLoginInfo: 'LOGOUT'
      }),
      user_logout () {
        this.clearLoginInfo()
        setTimeout(this.$router.replace({name: 'login'}, 500))
      }
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
