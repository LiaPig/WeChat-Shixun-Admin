<template>
  <div class="addUser_panel">
    <!--表单开始-->
    <el-form label-position="right"
             label-width="80px"
             ref="form"
             :model="form"
             :rules="user_rules">
      <!--用户名开始-->
      <el-form-item label="用户名" prop="username" class="item">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <!--用户名结束-->

      <!--密码开始-->
      <el-form-item label="密码"  prop="password" class="item">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <!--密码结束-->

      <!--确认密码开始-->
      <el-form-item label="确认密码"  prop="checkPass" class="item">
        <el-input v-model="form.checkPass" type="password"></el-input>
      </el-form-item>
      <!--确认密码结束-->

      <!--性别开始-->
      <el-form-item label="性别" prop="gender" class="item">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" value="1"></el-option>
          <el-option label="女" value="0"></el-option>
        </el-select>
      </el-form-item>
      <!--性别结束-->

      <!--电话号码开始-->
      <el-form-item label="电话号码" prop="mobilePhone" class="item">
        <el-input v-model="form.mobilePhone"></el-input>
      </el-form-item>
      <!--电话号码结束-->

      <!--邮箱地址开始-->
      <el-form-item label="邮箱地址" prop="email" class="item">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <!--邮箱地址结束-->
    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
      <el-button @click="on_submit_form" :loading="on_submit_loading" type="success">新增用户 <i class="el-icon-plus"></i> </el-button>
    </el-button-group>
    <!--按钮组结束-->
  </div>
</template>

<script>
  export default {
    data () {
      // 自定义的确认两次密码是否相同函数
      let validatePass = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        form: {
          username: null,
          password: null,
          checkPass: null,
          gender: null,
          mobilePhone: null,
          email: null
        },
        user_rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请再次输入密码', trigger: 'blur'},
            {validator: validatePass, trigger: 'blur'}
          ],
          gender: [
            {required: true, message: '请输入性别', trigger: 'blur'}
          ],
          mobilePhone: [
            {required: true, message: '请输入手机号码', trigger: 'blur'},
            {
              pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
              message: '请输入正确的手机号码'
            }
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {
              pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
              message: '请输入正确的邮箱地址'
            }
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
          that.$http.post('/api/users', that.form)
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
