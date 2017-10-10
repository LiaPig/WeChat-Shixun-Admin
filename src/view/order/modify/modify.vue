<template>
  <div class="modifyRole_panel">
    <!--表单开始-->
    <el-form label-position="right"
             label-width="80px"
             :model="form"
             :rules="role_rules"
             v-loading="load_data"
             element-loading-text="拼命加载中">

      <!--订单内容开始-->
      <el-card class="box-card">
        <span class="box-card-title">订单内容:</span>
        <div v-for="orderItem in form.orderItems" :key="" class="">
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

      <!--订单状态开始-->
      <!--1.如果状态为20（待确认）-->
      <el-form-item v-if="flag_state == 20" label="订单状态" prop="state" class="item">
        <el-select v-model="form.state" placeholder="请选择订单状态">
          <el-option v-for="state in state20" :label="state.name" :value="state.value"></el-option>
        </el-select>
      </el-form-item>
      <!--2.如果状态为30（正在处理）-->
      <el-form-item v-if="flag_state == 30" label="订单状态" prop="state" class="item">
        <el-select v-model="form.state" placeholder="请选择订单状态">
          <el-option v-for="state in state30" :label="state.name" :value="state.value"></el-option>
        </el-select>
      </el-form-item>
      <!--订单状态结束-->
    </el-form>
    <!--表单结束-->

    <!--按钮组开始-->
    <el-button-group class="group">
      <router-link to="/order">
        <el-button type="primary" icon="arrow-left">返回订单列表</el-button>
      </router-link>
      <el-button @click="on_submit_form" :loading="on_submit_loading" type="success">
        确认修改 <i class="el-icon-edit"></i>
      </el-button>
    </el-button-group>
    <!--按钮组结束-->
  </div>
</template>

<script>
  import ElFormItem from '../../../../node_modules/element-ui/packages/form/src/form-item'
  export default {
    components: {ElFormItem},
    data () {
      return {
        form: {},
        role_rules: {
          state: [
            {required: true, message: '请选择订单状态', trigger: 'blur'}
          ]
        },
        on_submit_loading: false,
        load_data: false,
        flag_state: 0,
        state20: [
          {
            name: '待确认',
            value: 20
          },
          {
            name: '正在处理',
            value: 30
          }
        ],
        state30: [
          {
            name: '正在处理',
            value: 30
          },
          {
            name: '已完成',
            value: 40
          }
        ]
      }
    },
    created () {
      const that = this
      that.route_id = that.$route.params.id
      that.get_role_data(that.route_id)
    },
    methods: {
      // 根据上一页面传过来的id获取整个用户信息
      get_role_data: function (id) {
        console.log(id)
        const that = this
        that.load_data = true
        that.$http.get('/api/orders/' + id)
          .then((response) => {
            that.form = response.body.data
            that.flag_state = that.form.state
            that.load_data = false
          })
          .catch(function (error) {
            console.error(error)
            that.load_data = false
          })
      },
      // 提交修改后的表单
      on_submit_form: function () {
        const that = this
        that.on_submit_loading = true
        that.form.processor = that.getUserInfo;
        that.$http.post('/api/orders/', that.form)
          .then((response) => {
            if (response.body.success) {
              that.$message.success('修改成功！')
              that.on_submit_loading = false
              setTimeout(() =>
                  this.$router.push('/order')
                , 1000)
            } else {
              that.$message.error(response.body.message)
              console.log(response.body)
              that.on_submit_loading = false
            }
          })
      }
    },
    computed: {
      getUserInfo: function () {
        return this.$store.getters.GET_USER_INFO
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
    width: 70%;
    padding-left: 30%;
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
