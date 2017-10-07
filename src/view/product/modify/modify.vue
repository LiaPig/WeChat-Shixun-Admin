<template>
  <div class="detail_panel">
    <!--表单开始-->
    <el-form label-position="right" label-width="80px" :model="product_data">
      <!--id开始-->
      <el-form-item label="id" class="item">
        <el-input :disabled="true" :value="product_data.id"></el-input>
      </el-form-item>
      <!--id结束-->

      <!--名称开始-->
      <el-form-item label="名称" class="item">
        <el-input v-model="product_data.name"></el-input>
      </el-form-item>
      <!--名称结束-->

      <!--状态开始-->
      <el-form-item label="状态" class="item">
        <el-input v-model="product_data.status"></el-input>
      </el-form-item>
      <!--状态结束-->

      <!--底价开始-->
      <el-form-item label="底价" class="item">
        <el-input v-model="product_data.basePrice"></el-input>
      </el-form-item>
      <!--底价结束-->

      <!--详细描述开始-->
      <el-form-item label="详细描述" class="item">
        <el-input v-model="product_data.description"></el-input>
      </el-form-item>
      <!--详细描述结束-->

      <!--标签开始-->
      <el-form-item label="商品标签" prop="productTags" class="item">
        <el-tag
          v-for="tag in this.product_data.productTags"
          :key="tag.id"
          :label="tag"
          type="success"
          :close-tranfer="false"
          :closable="true"
          @close="closeTag(tag)"
        >
          {{tag.name}}
        </el-tag>
        <el-button type="success" size="small" @click="onClickedToAddTag">添加标签</el-button>
        <div>
          <el-dialog title="商品标签" :visible.sync="dialogFormVisible">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
            </el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group @change="handleCheckedChange" v-model="checkOptions">
              <el-checkbox v-for="tag in productTags" :label="tag" :key="tag.id">{{tag.name}}
              </el-checkbox>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="clickToAdd">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-form-item>
      <!--标签结束-->

      <!--图片开始-->
      <el-form-item label="图片" class="item" v-if="product_data.productImages == 0">
        <div class="content" v-if="product_data.productImages.length == 0">
          此商品无图片
        </div>
      </el-form-item>

      <div v-for="(item, index) in product_data.productImages" v-if="product_data.productImages.length > 0">
        <el-form-item :label="'图片' + (index + 1)" class="item">
          <el-input v-model="item.url"></el-input>
        </el-form-item>
      </div>
      <!--图片结束-->

    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
      <router-link :to="{
                                name: 'productModify',
                                params: {id: this.product_data.id}
                              }">
        <el-button type="primary" @click="submitForm">
          修改信息<i class="el-icon-arrow-right el-icon--right"></i>
        </el-button>
      </router-link>
    </el-button-group>
    <!--按钮组结束-->
  </div>
</template>

<script>
  import ElButtonGroup from '../../../../node_modules/element-ui/packages/button/src/button-group'

  export default {
    components: {ElButtonGroup},
    created () {
      const that = this
      this.route_id = this.$route.params.id
      that.get_product_data(that.route_id)
    },
    data () {
      return {
        checkAll: false,
        checkOptions: [],
        isIndeterminate: true,
        dialogFormVisible: false,
        route_id: this.$route.params.id,
        productTags: [],
        product_data: {
          productTags: []
        }
      }
    },
    methods: {
      //   根据上一页面传过来的id获取整个商品信息
      get_product_data: function (id) {
        const that = this
        that.load_data = true
        that.$http.get('/api/products/' + id)
          .then((response) => {
            that.product_data = response.body.data
            that.load_data = false
            console.log(this.product_data)
          })
          .catch(function (error) {
            console.error(error)
            that.load_data = false
          })
      },
      getProductTags () {
        if (this.productTags.length === 0) {
          this.$http.get('/api/tags')
            .then(function (res) {
              this.$message.info('加载标签成功')
              this.productTags = res.body.data.content
              this.initCheckOptions(this.product_data.productTags, this.productTags)
            })
        } else {
          this.initCheckOptions(this.product_data.productTags, this.productTags)
        }
      },
      handleCheckAllChange (event) {
        this.checkOptions = event.target.checked ? this.productTags : []
        this.isIndeterminate = false
      },
      handleCheckedChange (value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.productTags.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.productTags.length
      },
      onClickedToAddTag () {
        this.dialogFormVisible = true
        this.getProductTags()
      },
      clickToAdd () {
        console.log(this.checkOptions)
        this.product_data.productTags = this.checkOptions
        console.log(this.product_data.productTags)
        this.dialogFormVisible = false
      },
      initCheckOptions (tags, productTags) {
        this.checkOptions = []
        for (var i = 0; i < tags.length; i++) {
          for (var j = 0; j < productTags.length; j++) {
            if (productTags[j].id === tags[i].id) {
              this.checkOptions.push(productTags[j])
              continue
            }
          }
        }
      },
      closeTag (tag) {
        console.log(tag)
        console.log(this.product_data.productTags.indexOf(tag))
        this.product_data.productTags.splice(this.product_data.productTags.indexOf(tag), 1)
      },
      submitForm () {
        this.$http.post('/api/products', this.product_data)
          .then(function (response) {
            if (response.body.success) {
              this.$message.success('修改成功咯')
              setTimeout(this.$router.push('/product'), 2000)
            } else {
              this.$message.error(response.body.message)
              console.log(response.body)
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

  .productTags {
    float: left;
    margin-left: 18.5%;
    width: 40%;
    padding-right: 40%;
    padding-bottom: 20px;
  }

  .productTags .title {
    float: left;
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-top: 0;
    padding-left: 30px;
  }

  .group {
    display: inline-block;
    width: 67%;
    padding-left: 33%;
  }

  .productImages {
    float: left;
    margin-left: 18.5%;
    width: 40%;
    padding-right: 40%;
    padding-bottom: 20px;
  }

  .productImages .title {
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

  .productImages button {
    display: inline-block;
    float: left;
  }
</style>
