<template>
  <div class="addPicture_panel">
    <!--表单开始-->
    <el-form label-position="right"
             label-width="80px"
             ref="form"
             :model="form"
             :rules="picture_rules">

      <!--类型开始-->
      <el-form-item label="类型" prop="type" class="item">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <!--类型结束-->

      <!--类型描述开始-->
      <el-form-item label="类型描述" prop="description" class="item">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <!--类型描述结束-->
    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
      <el-button @click="on_submit_form" :loading="on_submit_loading" type="success">新增图片 <i class="el-icon-plus"></i> </el-button>
    </el-button-group>
    <!--按钮组结束-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        form: {
          type: null,
          description: null
        },
        picture_rules: {
          type: [
            {required: true, message: '请输入图片类型', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入图片类型描述', trigger: 'blur'}
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
          that.$http.post('/api/images', that.form)
            .then((response) => {
              if (response.body.success) {
                that.$message.success('创建成功！')
                console.log(response)
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
