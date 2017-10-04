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
            此商品无标签
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
                <img :src="item.url" style="width: 200px;height: 200px;"/>
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
      this.route_id = this.$route.params.id
    },
    data () {
      return {
        route_id: this.$route.params.id,
        product_data: {
          id: 429754044903329792,
          status: 1,
          name: '卖萌猪崽',
          basePrice: 0.02,
          description: '可爱的猪崽x4',
          productTags: [
            {
              id: 429772384753422336,
              sort: 100,
              status: 1,
              name: '热销推荐',
              tagOptions: [],
              type: 'productCategory',
              create_time: '2017-09-25 14:16:56',
              update_time: '2017-09-25 15:56:35'
            },
            {
              id: 429763550097969152,
              sort: 100,
              status: 1,
              name: '体重',
              tagOptions: [
                {
                  id: 429763550307684352,
                  sort: 0,
                  status: 1,
                  optionName: '1kg',
                  value: 0.01,
                  type: 'addPoint',
                  defaultOption: true,
                  create_time: '2017-09-25 13:41:50',
                  update_time: '2017-09-25 13:41:50'
                },
                {
                  id: 429763550416736256,
                  sort: 0,
                  status: 1,
                  optionName: '2kg',
                  value: 0.02,
                  type: 'addPoint',
                  defaultOption: false,
                  create_time: '2017-09-25 13:41:50',
                  update_time: '2017-09-25 13:41:50'
                }
              ],
              type: 'product',
              create_time: '2017-09-25 13:41:50',
              update_time: '2017-09-25 13:41:50'
            },
            {
              id: 430642557748252672,
              sort: 100,
              status: 1,
              name: '颜色',
              tagOptions: [
                {
                  id: 430642561791561728,
                  sort: 99,
                  status: 1,
                  optionName: '粉色',
                  value: 0,
                  type: 'addPoint',
                  defaultOption: false,
                  create_time: '2017-09-27 23:54:42',
                  update_time: '2017-09-27 23:54:42'
                },
                {
                  id: 430642562114523136,
                  sort: 100,
                  status: 1,
                  optionName: '白色',
                  value: 0,
                  type: 'addPoint',
                  defaultOption: true,
                  create_time: '2017-09-27 23:54:43',
                  update_time: '2017-09-27 23:54:43'
                }
              ],
              type: 'product',
              create_time: '2017-09-27 23:54:43',
              update_time: '2017-09-27 23:54:43'
            },
            {
              id: 430468081542762496,
              sort: 99,
              status: 1,
              name: '单品区',
              tagOptions: [],
              type: 'productCategory',
              create_time: '2017-09-27 12:21:23',
              update_time: '2017-09-27 12:22:17'
            }
          ],
          productImages: [
            {
              id: 429735194702909440,
              sort: 100,
              status: 1,
              url: 'http://cache.lovethispic.com/uploaded_images/230359-Cute-Little-Piggy.jpg',
              type: 'product',
              description: '商品',
              create_time: '2017-09-25 11:49:09',
              update_time: '2017-09-25 11:49:09'
            },
            {
              id: 429735194702909441,
              sort: 100,
              status: 1,
              url: 'http://n1image.hjfile.cn/mh/2016/09/13/da743d475266415cf27945aa06095c41.jpg',
              type: 'product',
              description: '商品',
              create_time: '2017-09-25 11:49:09',
              update_time: '2017-09-25 11:49:09'
            }
          ],
          create_time: '2017-09-25 13:04:04',
          update_time: '2017-09-27 23:56:00'
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
