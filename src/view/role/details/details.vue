<template>
  <div class="detail_panel">
    <!--表单开始-->
    <el-form label-position="right"
             label-width="80px"
             :model="role_data"
             v-loading="load_data"
             element-loading-text="拼命加载中">
      <!--角色名开始-->
      <el-form-item label="角色名" class="item">
        <el-input v-model="role_data.name" :disabled="true"></el-input>
      </el-form-item>
      <!--角色名结束-->

      <!--id开始-->
      <el-form-item label="id" class="item">
        <el-input v-model="role_data.id" :disabled="true"></el-input>
      </el-form-item>
      <!--id结束-->

      <!--roleKey开始-->
      <el-form-item label="rolKey " class="item">
        <el-input v-model="role_data.roleKey" :disabled="true"></el-input>
      </el-form-item>
      <!--roleKey结束-->

      <!--状态开始-->
      <el-form-item label="状态" class="item">
        <el-input v-model="role_data.status" :disabled="true"></el-input>
      </el-form-item>
      <!--状态结束-->

    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
      <template v-if="role_data.id != 429732003760312320 && role_data.id != 429732071536070656">
        <router-link :to="{
                                  name: 'roleModify',
                                  params: {id: this.role_data.id}
                                }">
            <el-button type="primary">
              修改信息<i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
        </router-link>
      </template>
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
      that.get_role_data(that.route_id)
    },
    data () {
      return {
        route_id: this.$route.params.id,
        role_data: {},
        load_data: false
      }
    },
    methods: {
      //   根据上一页面传过来的id获取整个角色信息
      get_role_data: function (id) {
        const that = this
        that.load_data = true
        that.$http.get('/api/roles/' + id )
          .then((response) => {
            that.role_data = response.body.data
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
  .roleRoles {
    float: left;
    margin-left: 18.5%;
    width: 40%;
    padding-right: 40%;
    padding-bottom: 20px;
  }
  .roleRoles .title {
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
