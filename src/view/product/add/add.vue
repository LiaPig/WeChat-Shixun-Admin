<template>
  <div class="addProduct_panel">
    <!--表单开始-->
    <el-form label-position="right"
             label-width="80px"
             :model="product_data"
             :rules="product_rules">
      <!--名称开始-->
      <el-form-item label="名称" prop="name" class="item">
        <el-input v-model="product_data.name"></el-input>
      </el-form-item>
      <!--名称结束-->

      <!--底价开始-->
      <el-form-item label="底价" prop="basePrice" class="item">
        <el-input v-model="product_data.basePrice"></el-input>
      </el-form-item>
      <!--底价结束-->

      <!--详细描述开始-->
      <el-form-item label="详细描述" prop="description" class="item">
        <el-input v-model="product_data.description"></el-input>
      </el-form-item>
      <!--详细描述结束-->

      <!--商品标签开始-->
      <el-form-item label="商品标签" prop="productTags" class="item">
        <el-tag
          v-for="tag in checkOptions"
          :key="tag.id"
          type="success"
          :closable="true"
          @close="onCloseTag(tag)"
        >
          {{tag.name}}
        </el-tag>
        <el-button type="success" size="small" @click="onClickedToAddTag">添加标签</el-button>
        <div>
          <el-dialog title="商品标签" :visible.sync="dialogFormVisible">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkOptions" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="tag in this.productTags" :label="tag" :key="tag.id">{{tag.name}}</el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="onConfirmCheck">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-form-item>
      <!--商品标签结束-->

      <!--上传图片开始-->
      <el-form-item label="商品图片" class="item">
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
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <!--上传图片结束-->
      <!--按钮组开始-->
      <el-button-group class="group">
        <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
        <el-button @click="submitForm" type="success">新增商品 <i class="el-icon-plus"></i></el-button>
      </el-button-group>
      <!--按钮组结束-->
    </el-form>
    <!--表单结束-->

  </div>

</template>

<script>
  export default {
    data () {
      return {
        checkAll: true,
        checkOptions: [],
        isIndeterminate: true,
        dialogFormVisible: false,
        resourceUrl: '',
        fileList: [],
        fileInfo: {
          key: '',
          token: ''
        },
        product_data: {
          name: '',
          status: 1,
          basePrice: 0.00,
          productTags: [],
          productImages: []
        },
        product_rules: {
          name: [
            {required: true, message: '请输入商品名称', trigger: 'blur'}
          ],
          status: [
            {required: true, message: '请输入商品状态', trigger: 'blur'}
          ],
          basePrice: [
            {required: true, message: '请输入商品底价', trigger: 'blur'},
            {max: 4, message: '不超过一万元', trigger: 'blur'},
            {
              pattern: /^\d+(?:\.\d+)?$/,
              message: '只能由数字组成'
            }
          ],
          description: []
        },
        productTags: []
      }
    },
    methods: {
      beforeUpload (file) {
        console.log(file)
        return this.$http.get('/api/oss/imageToken').then(function (data) {
          this.resourceUrl = data.body.data.resourceUrl
          this.fileInfo.token = data.body.data.token
          this.fileInfo.key = 'image/product/' + file.name
        })
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
      handleSuccess (response, file, fileList) {
        this.product_data.productImages.push(response.data)
      },
      submitForm () {
        this.product_data.productTags = this.checkOptions
        console.log(this.product_data)
        this.$http.post('/api/products', this.product_data)
          .then(function (response) {
            if (response.body.success) {
              this.$message.success('新增成功咯')
              setTimeout(this.$router.push('/product'), 2000)
            } else {
              this.$message.error(response.body.message)
              console.log(response.body)
            }
          })
      },
      onClickedToAddTag () {
        this.dialogFormVisible = true
        this.getProductTags()
      },
      getProductTags () {
        if (this.productTags.length === 0) {
          console.log('我是空的,我要开始加载数据了')
          console.log('嘟嘟嘟,加载中......')
          this.$http.get('/api/tags')
            .then(function (res) {
              this.productTags = res.body.data.content
            })
        } else {
          console.log('我不是空的,我要直接开始展示了')
          console.log(this.productTags)
        }
      },
      onConfirmCheck () {
        console.log(this.checkOptions)
        this.dialogFormVisible = false
      },
      handleCheckAllChange (event) {
        this.checkOptions = event.target.checked ? this.productTags : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.productTags.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.productTags.length
      },
      onCloseTag (tag) {
        this.checkOptions.splice(this.checkOptions.indexOf(tag), 1)
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
