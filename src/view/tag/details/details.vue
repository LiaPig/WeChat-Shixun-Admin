<template>
  <div class="detail_panel">

    <!--表单开始-->
    <el-form label-position="right" label-width="80px" :model="tag_data">
      <!--id开始-->
      <el-form-item label="id" class="item">
        <el-input v-model="tag_data.id"></el-input>
      </el-form-item>
      <!--id结束-->

      <!--标签名称开始-->
      <el-form-item label="标签名称" class="item">
        <el-input v-model="tag_data.name"></el-input>
      </el-form-item>
      <!--标签名称结束-->

      <!--类型开始-->
      <el-form-item label="类型" class="item">
        <el-input v-model="tag_data.type"></el-input>
      </el-form-item>
      <!--类型结束-->

      <!--状态开始-->
      <el-form-item label="状态" class="item">
        <el-input v-model="tag_data.status"></el-input>
      </el-form-item>
      <!--状态结束-->

    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
      <router-link :to="{
                                name: 'tagModify',
                                params: {id: this.tag_data.id}
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
      that.get_tag_data(that.route_id)
    },
    data () {
      return {
        route_id: this.$route.params.id,
        tag_data: {}
      }
    },
    methods: {
      //   根据上一页面传过来的id获取整个商品信息
      get_tag_data: function (id) {
        const that = this
        that.load_data = true
        that.$http.get('/api/tags/' + id )
          .then((response) => {
            that.tag_data = response.body.data
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
