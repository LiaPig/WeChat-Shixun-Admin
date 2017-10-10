<template>
  <div class="detail_panel">

    <!--表单开始-->
    <el-form label-position="right" label-width="80px" :model="order_data">
      <!--订单ID开始-->
      <el-form-item label="订单ID" class="item">
        <el-input v-model="order_data.id" :disabled="true"></el-input>
      </el-form-item>
      <!--订单ID结束-->

      <!--订单备注开始-->
      <el-form-item label="订单备注" class="item">
        <el-input v-model="order_data.description" :disabled="true"></el-input>
      </el-form-item>
      <!--订单备注结束-->

      <!--总价开始-->
      <el-form-item label="总价" class="item">
        <el-input v-model="order_data.price" :disabled="true"></el-input>
      </el-form-item>
      <!--总价结束-->

      <!--处理人开始-->
      <el-form-item label="处理人" class="item">
        <el-input v-model="order_data.processor" :disabled="true"></el-input>
      </el-form-item>
      <!--处理人结束-->

      <!--状态开始-->
      <el-form-item label="状态" class="item">
        <el-input v-model="order_data.state" :disabled="true"></el-input>
      </el-form-item>
      <!--状态结束-->

      <!--客户信息开始-->
      <el-card class="box-card">
        <span class="box-card-title">客户信息:</span>
        <span class="box-item">客户id：{{ order_data.owner.id }}</span>
        <span class="box-item">用户名：{{ order_data.owner.username }}</span>
        <span class="box-item">手机号：{{ order_data.owner.mobilePhone }}</span>
      </el-card>
      <!--客户信息结束-->

      <!--订单内容开始-->
      <el-card class="box-card">
        <span class="box-card-title">订单内容:</span>
        <div v-for="orderItem in order_data.orderItems" :key="" class="">
          <span class="box-item">商品id：{{ orderItem.id }}</span>
          <span class="box-item">商品名称：{{ orderItem.product.name }}</span>
          <span class="box-item">属性标签：
            <el-tag v-if="orderItem.tagOptions.length > 0"
                    v-for="tagOption in orderItem.tagOptions"
                    :key="tagOption.optionName"
                    type="success"
                    :closable="false"
                    style="margin-right: 2px;">
              {{ tagOption.optionName }}
            </el-tag>
          </span>
          <span class="box-item">数量：{{ orderItem.count }}</span>
          <span class="box-item">价格：{{ orderItem.price }}</span>
          <span class="box-item">-----------------------------------------------------</span>
        </div>
      </el-card>
      <!--订单内容结束-->

    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
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
      that.get_order_data(that.route_id)
    },
    data () {
      return {
        route_id: this.$route.params.id,
        order_data: {}
      }
    },
    methods: {
      //   根据上一页面传过来的id获取整个商品信息
      get_order_data: function (id) {
        const that = this
        that.load_data = true
        that.$http.get('/api/orders/' + id)
          .then((response) => {
            that.order_data = response.body.data
            that.load_data = false
            console.log(that.order_data)
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
    width: 50%;
    padding-left: 38%;
  }
  .box-card {
    float: left;
    margin-left: 20%;
    padding-left: 40px;
    width: 40%;
    margin-bottom: 20px;
  }
  .box-card-title {
    display: inline-block;
    font-size: 18px;
    color: #000;
    margin-bottom: 10px;
  }
  .box-item {
    float: left;
    width: 80%;
    padding-right: 20%;
    margin-bottom: 5px;
    font-size: 15px;
  }
</style>
