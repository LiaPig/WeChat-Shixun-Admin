<template>
  <div class="addRole_panel">
    <!--表单开始-->
    <el-form label-position="right"
             label-width="80px"
             ref="form"
             :model="form"
             :rules="role_rules">
      <!--角色名开始-->
      <el-form-item label="角色名" prop="name" class="item">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <!--角色名结束-->

      <!--roleKey开始-->
      <el-form-item label="roleKey" prop="roleKey" class="item">
        <el-input v-model="form.roleKey"></el-input>
      </el-form-item>
      <!--roleKey结束-->

      <!--详情描述开始-->
      <el-form-item label="详情描述" prop="description" class="item">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <!--详情描述结束-->
    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
      <el-button @click="on_submit_form" :loading="on_submit_loading" type="success">新增角色 <i class="el-icon-plus"></i> </el-button>
    </el-button-group>
    <!--按钮组结束-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          name: null,
          roleKey: null,
          description: null
        },
        role_rules: {
          name: [
            {required: true, message: '请输入角色名', trigger: 'blur'}
          ],
          roleKey: [
            {required: true, message: '请输入roleKey', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入详情描述', trigger: 'blur'}
          ]
        },
        on_submit_loading: false
      }
    },
    methods: {
      on_submit_form: function () {
        const that = this
        that.$refs.form.validate((valid) => {
          if (!valid) return false
          that.on_submit_loading = true
          that.form.status = 1
          that.$http.post('/api/roles', that.form)
            .then((response) => {
              if (response.body.success) {
                that.$message.success('创建成功！')
                that.on_submit_loading = false
                setTimeout(this.$router.back(), 2000)
              }
              else {
                that.$message.error(response.body.message)
                console.log(response.body)
                that.on_submit_loading = false
              }
            })
            .catch(() => {
              this.on_submit_loading = false
            })
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
