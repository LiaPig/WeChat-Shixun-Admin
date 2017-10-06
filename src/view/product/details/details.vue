<template>
    <div class="detail_panel">
      <!--表单开始-->
      <el-form label-position="right" label-width="80px" :model="product_data">
        <!--名称开始-->
        <el-form-item label="名称" class="item">
          <el-input v-model="product_data.name"></el-input>
        </el-form-item>
        <!--名称结束-->

        <!--id开始-->
        <el-form-item label="id" class="item">
          <el-input v-model="product_data.id"></el-input>
        </el-form-item>
        <!--id结束-->

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

        <!--属性标签开始-->
        <div class="productTags">
          <div class="title">属性标签</div>
          <div class="content" v-if="product_data.productTags.length > 0">
            <el-checkbox-group v-model="product_data.productTags" fill="#324057" text-color="#a4aebd">
              <el-checkbox-button v-for="(item, index) in product_data.productTags" :label="'标签'+ index" :key="index" v-if="item.type=='product'">{{item.name}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="content" v-if="product_data.productTags.length == 0">
            此商品无属性标签
          </div>
        </div>
        <!--属性标签结束-->

        <!--分类标签开始-->
        <div class="productTags">
          <div class="title">分类标签</div>
          <div class="content">
            <el-checkbox-group v-model="product_data.productTags" fill="#324057" text-color="#a4aebd">
              <el-checkbox-button v-for="(item, index) in product_data.productTags" :label="'标签'+ index" :key="index" v-if="item.type=='productCategory'">{{item.name}}</el-checkbox-button>
            </el-checkbox-group>
          </div>
          <div class="content" v-if="product_data.productTags.length == 0">
            此商品无分类标签
          </div>
        </div>
        <!--分类标签结束-->

        <!--图片开始-->
        <div class="productImages">
          <div class="title">图片</div>
          <div class="content" v-for="(item, index) in product_data.productImages">
            <el-popover
              title="url为:"
              placement="top-start"
              width="200"
              trigger="hover">
              <div style="display: inline-block;width: 200px;word-break:break-all;">
                <p>{{item.url}}</p>
                <img :src="item.url" style="width: 150px;height: 150px;"/>
              </div>
              <el-button  slot="reference">查看图片{{index+1}}</el-button>
            </el-popover>
          </div>
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
        }
      }
    },
    methods: {
      //   根据上一页面传过来的id获取整个商品信息
      get_product_data: function (id) {
        const that = this
        that.load_data = true
        that.$http.get('/api/products/' + id )
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
