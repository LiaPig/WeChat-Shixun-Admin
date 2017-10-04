<template>
  <div class="detail_panel">
    <!--表单开始-->
    <el-form label-position="right"
             label-width="80px"
             :model="user_data"
             v-loading="load_data"
             element-loading-text="拼命加载中">
      <!--用户名开始-->
      <el-form-item label="用户名" class="item">
        <el-input v-model="user_data.username"></el-input>
      </el-form-item>
      <!--用户名结束-->

      <!--id开始-->
      <el-form-item label="id" class="item">
        <el-input v-model="user_data.id"></el-input>
      </el-form-item>
      <!--id结束-->

      <!--性别开始-->
      <el-form-item label="性别 " class="item">
        <el-input v-model="user_data.gender"></el-input>
      </el-form-item>
      <!--性别结束-->

      <!--电话号码开始-->
      <el-form-item label="电话号码 " class="item">
        <el-input v-model="user_data.mobilePhone"></el-input>
      </el-form-item>
      <!--电话号码结束-->

      <!--邮箱地址开始-->
      <el-form-item label="邮箱地址 " class="item">
        <el-input v-model="user_data.email"></el-input>
      </el-form-item>
      <!--邮箱地址结束-->

      <!--头像开始-->
      <div class="avatar">
        <div class="title">头像</div>
        <el-popover
          title="url为:"
          placement="right"
          width="200"
          trigger="hover"
          v-if="user_data.avatarUrl">
          <div style="display: inline-block;width: 200px;word-break:break-all;">
            <p>{{ user_data.avatarUrl }}</p>
            <img :src="user_data.avatarUrl" style="width: 200px;height: 200px;"/>
          </div>
          <el-button  slot="reference">查看头像</el-button>
        </el-popover>
        <p v-if="!user_data.avatarUrl" style="color: red;">该用户暂没设置头像</p>
      </div>
      <!--头像结束-->

      <!--角色开始-->
      <div class="userRoles">
        <div class="title">角色</div>
        <div class="content">
          <el-checkbox-group v-model="user_data.roles" fill="#324057" text-color="#a4aebd">
            <el-checkbox-button v-for="(item, index) in user_data.roles" :label="'角色'+ index" :key="index">{{item.name}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
      </div>
      <!--角色结束-->

      <!--状态开始-->
      <el-form-item label="状态" class="item">
        <el-input v-model="user_data.status"></el-input>
      </el-form-item>
      <!--状态结束-->


    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
      <router-link :to="{
                                name: 'userModify',
                                params: {id: this.user_data.id}
                              }">
        <el-button type="primary">
          修改信息<i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </router-link>
    </el-button-group>
    <!--按钮组结束-->
  </div>
</template>

<script>
  import ElButtonGroup from '../../../../node_modules/element-ui/packages/button/src/button-group'
  import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item'
  export default {
    components: {
      ElFormItem,
      ElButtonGroup
    },
    created () {
      const that = this
      that.route_id = that.$route.params.id
      that.get_user_data(that.route_id)
    },
    data () {
      return {
        route_id: this.$route.params.id,
        user_data: {},
        load_data: false
      }
    },
    methods: {
      //   根据上一页面传过来的id获取整个用户信息
      get_user_data: function (id) {
        const that = this
        that.load_data = true
        that.$http.get('/api/users/' + id )
          .then((response) => {
            that.user_data = response.body.data
            that.load_data = false
          })
          .catch(function (error) {
            console.error(error)
            that.load_data = false
          })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item {
    float: left;
    padding-left: 20%;
    width: 40%;
    padding-right: 40%;
  }
  .avatar {
    float: left;
    margin-left: 18.5%;
    width: 40%;
    padding-right: 40%;
    padding-bottom: 20px;
  }
  .avatar .title {
    float: left;
    display: inline-block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-top: 0;
    padding-left: 30px;
    text-align: right;
    margin-right: 10px;
  }
  .userRoles {
    float: left;
    margin-left: 18.5%;
    width: 40%;
    padding-right: 40%;
    padding-bottom: 20px;
  }
  .userRoles .title {
    float: left;
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-top: 0;
    padding-left: 20px;
    padding-right: 10px;
    text-align: right;
  }
  .group {
    display: inline-block;
    width: 67%;
    padding-left: 33%;
  }
</style>
