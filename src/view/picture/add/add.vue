<template>
  <div class="addPicture_panel">
    <!--表单开始-->
    <el-form label-position="right"
             label-width="80px"
             :model="picture_data"
             :rules="picture_rules">
      <!--上传图片开始-->
      <el-form-item label="商品图片" class="item">
        <!--<el-input v-model="picture_data.pictureImages"></el-input>-->
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
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <!--上传图片结束-->

      <!--类型开始-->
      <el-form-item label="类型" prop="type" class="item">
        <el-autocomplete
          class="inline-input"
          v-model="picture_data.type"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <!--类型结束-->

      <!--详细描述开始-->
      <el-form-item label="类型描述" prop="description" class="item">
        <el-input v-model="picture_data.description"></el-input>
      </el-form-item>
      <!--详细描述结束-->



    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
      <el-button @click="on_submit_form" type="success">新增商品 <i class="el-icon-plus"></i></el-button>
    </el-button-group>
    <!--按钮组结束-->
  </div>
</template>

<script>
  export default {
    data () {
      return {
        resourceUrl: '',
        fileList: [],
        fileInfo: {
          key: '',
          token: ''
        },
        picture_data: {
          type: '',
          description: '',
          status: 1
        },
        picture_rules: {
          type: [
            {required: true, message: '请输入图片类型', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '请输入图片类型的描述', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 提交表单 新增图片
      on_submit_form () {
        const that = this
        const formName = that.picture_data
        that.$refs[formName].validate((valid) => {
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
      },
      // 1.上传用到的函数
      beforeUpload (file) {
        console.log(file)
        return this.$http.get('/api/oss/imageToken').then(function (data) {
          this.resourceUrl = data.body.data.resourceUrl
          this.fileInfo.token = data.body.data.token
          this.fileInfo.key = 'image/picture/' + file.name
        })
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleSuccess (response, file, fileList) {
        this.picture_data.pictureImages.push(response.data)
      },
      // 2.提示输入框用到的函数
      querySearch (queryString, cb) {
        let restaurants = this.restaurants
        let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      },
      createFilter (queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0)
        }
      },
      // 2.可提供的选项
      loadAll () {
        return [
          { 'value': 'swiper'},
          { 'value': 'icon'},
          { 'value': 'product'}
        ]
      },
      // 2.把选择的加入到值当中
      handleSelect (item) {
        const that = this
        that.picture_data.type = item.value
      }
    },
    mounted () {
      this.restaurants = this.loadAll()
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
