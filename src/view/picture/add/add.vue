<template>
  <div class="modifyPicture_panel">
    <!--表单开始-->
    <el-form label-position="right"
             label-width="80px"
             :model="form"
             :rules="picture_rules"
             v-loading="load_data"
             element-loading-text="拼命加载中"
             style="margin-top: 20px"
    >
      <!--url开始-->
      <el-form-item label="url" prop="url" class="item">
        <el-input type="textarea" autosize v-model="form.url" :disabled="true"></el-input>
      </el-form-item>
      <!--用户名结束-->

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

      <!--图片预览开始-->
      <el-form-item label="图片预览" class="item">
        <img :src="form.url" style="width: 150px;height: 150px;"/>
      </el-form-item>
      <!--图片预览结束-->
      <!--上传图片开始-->
      <el-form-item label="上传" class="item">
        <!--<el-input v-model="product_data.productImages"></el-input>-->
        <el-upload
          class="upload-demo"
          action="//up-z2.qiniu.com"
          :on-preview="handlePreview"
          :on-success="handleSuccess"
          :on-remove="handleRemove"
          :file-list="fileList"
          :before-upload="beforeUpload"
          :data="fileInfo"
          list-type="picture">
          <div v-if="this.fileList.length == 0">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </div>
        </el-upload>
      </el-form-item>
      <!--上传图片结束-->

    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <router-link to="/picture">
        <el-button type="primary" icon="arrow-left">返回图片列表</el-button>
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
        picture_rules: {
          type: [
            {required: true, message: '请输入图片类型', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入图片类型描述', trigger: 'blur'}
          ]
        },
        on_submit_loading: false,
        load_data: false,
        fileList: [],
        fileInfo: {
          key: '',
          token: ''
        }
      }
    },
    methods: {
      // 提交修改后的表单
      on_submit_form: function () {
//        console.log(this.form)
        const that = this
        that.on_submit_loading = true
        that.$http.post('/api/images/', that.form)
          .then((response) => {
            if (response.body.success) {
              that.$message.success('修改成功！')
              that.on_submit_loading = false
              setTimeout(this.$router.push('/picture'), 2000)
            } else {
              that.$message.error(response.body.message)
              console.log(response.body)
              that.on_submit_loading = false
            }
          })
      },
      beforeUpload (file) {
        console.log(file)
        return this.$http.get('/api/oss/imageToken?isCreate=true').then(function (data) {
          this.resourceUrl = data.body.data.resourceUrl
          this.fileInfo.token = data.body.data.token
          this.fileInfo.key = 'image/' + file.name
        })
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleSuccess (response, file, fileList) {
        console.log(response)
        if (response.success) {
          this.$notify({
            title: '成功',
            message: response.message,
            type: 'success'
          })
          this.form = response.data
        }
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
