<template>
  <div class="loginForm">
    <!--图片和标题开始-->
    <div class="logo">
      <img src="./pig.png">
      <h2>卖猪后台管理系统</h2>
    </div>
    <!--图片和标题结束-->

    <!--登陆表单开始-->
    <div class="loginForm_item"
         v-loading="load_data"
         element-loading-text="正在登陆中..."
         @keyup.enter="submitForm('form')">
      <el-form ref="form" :model="form" :rules="rules">
        <!--用户名开始-->
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" :autofocus="true"></el-input>
        </el-form-item>
        <!--用户名结束-->

        <!--密码开始-->
        <el-form-item prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!--密码结束-->

        <!--提交按钮开始-->
        <div class="login-item">
          <el-form-item>
            <el-button size="large" icon="check" class="form-submit" @click="submitForm('form')">提交</el-button>
          </el-form-item>
        </div>
        <!--提交按钮结束-->
      </el-form>
    </div>
    <!--登录表单结束-->
  </div>
</template>

<script>
  export default{
    data () {
      return {
        form: {
          username: null,
          password: null
        },
        rules: {
          username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空！', trigger: 'blur'}]
        },
        load_data: false
      }
    },
    methods: {
      // 提交
      submitForm (formName) {
        const that = this
        // 表单验证
        that.$refs[formName].validate((valid) => {
          if (!valid) {
            return false
          }
          that.load_data = true
          // 向后台发送数据 验证
          that.$http.post('/api/login', that.form)
            .then((response) => {
              if (response.body.success) {
                // 设置token
                console.log(1)
                const tokenInfo = response.body.data
                this.$notify({
                  title: '登录成功',
                  message: '欢迎你, 臭猪杂',
                  type: 'success'
                })
                // 跳转到首页
//                setTimeout(function () {
//                  this.$router.push('/picture')
//                }, 1000)
              } else {
                that.load_data = false
                this.$notify.error({
                  title: '登录失败',
                  message: '请检查您的账号密码是否正确'
                })
              }
            })
            // 登录失败
            .catch((response) => {
              that.$message.error(response.statusText)
              that.load_data = false
            })
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .loginForm{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(./bg.jpg);
    background-repeat: no-repeat;
    background-position: center;
  }
  .logo{
    padding-top: 50px;
  }
  .logo img{
    height: 200px;
    width: 200px;
  }
  .loginForm_item{
    padding-top: 50px;
    width: 40%;
    margin:0 auto;
  }
  .form-submit {
    width: 100%;
    color: #fff;
    border-color: #6bc5a4;
    background: #6bc5a4;
  }
</style>
