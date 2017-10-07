<template>
  <div class="modifyRole_panel">
    <!--表单开始-->
    <el-form label-position="right"
             label-width="80px"
             :model="form"
             :rules="role_rules"
             v-loading="load_data"
             element-loading-text="拼命加载中">

      <!--id开始-->
      <el-form-item label="id" prop="id" class="item">
        <el-input v-model="form.id" :disabled="true"></el-input>
      </el-form-item>
      <!--id结束-->

      <!--角色名开始-->
      <el-form-item label="角色名" prop="name" class="item">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!--角色名结束-->

      <!--roleKey开始-->
      <el-form-item label="rolKey " class="item">
        <el-input v-model="form.roleKey"></el-input>
      </el-form-item>
      <!--roleKey结束-->

      <!--类型描述开始-->
      <el-form-item label="类型描述" prop="description" class="item">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <!--类型描述结束-->

    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <router-link to="/role">
        <el-button type="primary" icon="arrow-left">返回角色列表</el-button>
      </router-link>
      <el-button @click="on_submit_form" :loading="on_submit_loading" type="success">
        确认修改 <i class="el-icon-edit"></i>
      </el-button>
    </el-button-group>
    <!--按钮组结束-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {},
        role_rules: {
          name: [
            {required: true, message: '请输入角色名', trigger: 'blur'}
          ],
          roleKey: [
            {required: true, message: '请输入roleKey', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入角色类型描述', trigger: 'blur'}
          ]
        },
        on_submit_loading: false,
        load_data: false
      }
    },
    created () {
      const that = this
      that.route_id = that.$route.params.id
      that.get_role_data(that.route_id)
    },
    methods: {
      // 根据上一页面传过来的id获取整个用户信息
      get_role_data: function (id) {
        const that = this
        that.load_data = true
        that.$http.get('/api/roles/' + id)
          .then((response) => {
            that.form = response.body.data
            that.load_data = false
          })
          .catch(function (error) {
            console.error(error)
            that.load_data = false
          })
      },
      // 提交修改后的表单
      on_submit_form: function () {
        const that = this
        that.on_submit_loading = true
        that.$http.post('/api/roles/', that.form)
          .then((response) => {
            if (response.body.success) {
              that.$message.success('修改成功！')
              that.on_submit_loading = false
              setTimeout(() =>
                this.$router.push('/role')
              , 2000)
            } else {
              that.$message.error(response.body.message)
              console.log(response.body)
              that.on_submit_loading = false
            }
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
  .group {
    display: inline-block;
    width: 67%;
    padding-left: 33%;
  }

</style>
