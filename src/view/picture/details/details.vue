<template>
  <div class="detail_panel">

    <!--表单开始-->
    <el-form label-position="right" label-width="80px" :model="picture_data">
      <!--图片预览开始-->
      <el-form-item label="图片预览" class="item">
        <img :src="picture_data.url" style="width: 150px;height: 150px;"/>
      </el-form-item>
      <!--图片预览结束-->

      <!--id开始-->
      <el-form-item label="id" class="item">
        <el-input v-model="picture_data.id"></el-input>
      </el-form-item>
      <!--id结束-->

      <!--图片url开始-->
      <el-form-item label="图片url" class="item">
        <el-input  type="textarea" autosize v-model="picture_data.url"></el-input>
      </el-form-item>
      <!--图片url结束-->

      <!--状态开始-->
      <el-form-item label="状态" class="item">
        <el-input v-model="picture_data.status"></el-input>
      </el-form-item>
      <!--状态结束-->

      <!--类型开始-->
      <el-form-item label="类型" class="item">
        <el-input v-model="picture_data.type"></el-input>
      </el-form-item>
      <!--类型结束-->

      <!--详细描述开始-->
      <el-form-item label="详细描述" class="item">
        <el-input v-model="picture_data.description"></el-input>
      </el-form-item>
      <!--详细描述结束-->
    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
      <router-link :to="{
                                name: 'pictureModify',
                                params: {id: this.picture_data.id}
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
      that.get_picture_data(that.route_id)
    },
    data () {
      return {
        route_id: this.$route.params.id,
        picture_data: {}
      }
    },
    methods: {
      //   根据上一页面传过来的id获取整个商品信息
      get_picture_data: function (id) {
        const that = this
        that.load_data = true
        that.$http.get('/api/images/' + id )
          .then((response) => {
            that.picture_data = response.body.data
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
  .group {
    display: inline-block;
    width: 67%;
    padding-left: 33%;
  }
</style>
