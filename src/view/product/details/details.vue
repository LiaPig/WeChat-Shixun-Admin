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
        <el-input v-model="product_data.name" :disabled="true"></el-input>
      </el-form-item>
      <!--名称结束-->

      <!--状态开始-->
      <el-form-item label="状态" class="item">
        <el-input v-model="product_data.status" :disabled="true"></el-input>
      </el-form-item>
      <!--状态结束-->

      <!--底价开始-->
      <el-form-item label="底价" class="item">
        <el-input v-model="product_data.basePrice" :disabled="true"></el-input>
      </el-form-item>
      <!--底价结束-->

      <!--详细描述开始-->
      <el-form-item label="详细描述" class="item">
        <el-input v-model="product_data.description" :disabled="true"></el-input>
      </el-form-item>
      <!--详细描述结束-->

      <!--标签开始-->
      <el-form-item label="商品标签" prop="productTags" class="item">
        <el-tag v-if="product_data.productTags.length > 0"
                v-for="tag in product_data.productTags"
                :key="tag.id"
                type="success"
                :closable="false"
                style="margin-right: 2px;">
          {{tag.name}}
        </el-tag>
        <div class="content" v-if="product_data.productTags.length == 0">
          此商品无属性标签
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
          <el-popover
            placement="top-start"
            width="200"
            trigger="hover">
            <div style="display: inline-block;width: 200px;word-break:break-all;">
              <img :src="item.url" style="width: auto; height: 150px;"/>
            </div>
            <el-input :disabled="true" v-model="item.url" slot="reference"></el-input>
          </el-popover>
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
        <el-button type="primary">
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
        route_id: this.$route.params.id,
        product_data: {
          productImages: [],
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
