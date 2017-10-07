<template>
  <div class="order_panel">
    <!--顶部的 刷新 以及 新增订单 按钮组开始-->
    <el-button-group class="group">
      <el-button @click.stop="on_refresh" size="small" type="primary" icon="loading">刷新</el-button>
      <router-link :to="{name: 'orderAdd'}" order="span">
        <el-button type="primary" size="small" icon="plus">新增订单</el-button>
      </router-link>
    </el-button-group>
    <!--顶部的 刷新 以及 新增订单 按钮组结束-->

    <!--订单表开始-->
    <div>
      <el-table
        stripe
        border
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        style="width: 100%">
        <!--订单ID开始-->
        <el-table-column
          sortable
          label="订单ID"
          prop="id"
          width="200px">
        </el-table-column>
        <!--订单ID结束-->

        <!--客户姓名开始-->
        <el-table-column
          sortable
          label="客户姓名"
          prop="owner.username"
          width="150px">
        </el-table-column>
        <!--客户姓名结束-->

        <!--总价开始-->
        <el-table-column
          sortable
          label="总价"
          prop="price"
          width="100px">
        </el-table-column>
        <!--总价结束-->

        <!--订单备注开始-->
        <el-table-column
          label="订单备注"
          prop="description">
        </el-table-column>
        <!--订单备注结束-->

        <!--处理人姓名开始-->
        <el-table-column
          sortable
          label="处理人姓名"
          prop="processor"
          width="150px">
        </el-table-column>
        <!--处理人姓名结束-->

        <!--图片状态开始-->
        <el-table-column
          label="图片状态">
          <template scope="props">
            <div v-if="props.row.status == 1"> 已关闭 </div>
            <div v-if="props.row.status == 10"> 待支付 </div>
            <div v-if="props.row.status == 20"> 待确认 </div>
            <div v-if="props.row.status == 30"> 正在处理 </div>
            <div v-if="props.row.status == 40"> 已完成 </div>
          </template>
        </el-table-column>
        <!--图片状态结束-->

        <!--操作按钮组开始-->
        <el-table-column
          label="操作"
          width="300">
          <template scope="props">
            <!--查看详情按钮开始-->
            <router-link :to="{ name: 'orderDetails',
                                params: {id: props.row.id}
                              }">
              <el-button type="success" size="small" icon="search">
                查看详情
              </el-button>
            </router-link>
            <!--查看详情按钮结束-->
            <!--处理按钮开始-->
            <router-link :to="{
                                name: 'orderModify',
                                params: {id: props.row.id}
                              }">
              <el-button type="warning" size="small" icon="edit">
                处理订单
              </el-button>
            </router-link>
            <!--处理按钮结束-->
            <!--删除按钮开始-->
            <el-button @click="delete_data(props.row)" type="danger" size="small" icon="close">
              删除
            </el-button>
            <!--删除按钮结束-->
          </template>
        </el-table-column>
        <!--操作按钮组结束-->
      </el-table>
    </div>
    <!--订单表结束-->
  </div>
</template>

<script>
  import leftNav from 'Components/leftNav/leftNav.vue'
  import topNav from 'Components/topNav/topNav.vue'
  import panelTitle from 'Components/panelTitle/panelTitle.vue'
  import ElButton from '../../../node_modules/element-ui/packages/button/src/button'
  import ElButtonGroup from '../../../node_modules/element-ui/packages/button/src/button-group'
  export default {
    created () {
      const that = this
      that.get_table_data()
    },
    data () {
      return {
        table_data: [],
        load_data: false
      }
    },
    components: {
      ElButtonGroup,
      ElButton,
      leftNav,
      topNav,
      panelTitle
    },
    methods: {
      //  与后台获取订单数据
      get_table_data: function () {
        const that = this
        that.load_data = true
        that.$http.get('/api/orders')
          .then((response) => {
            that.table_data = response.body.data.content
            that.load_data = false
          })
          .catch(function (error) {
            console.error(error)
            that.load_data = false
          })
      },
      //  刷新数据
      on_refresh: function () {
        const that = this
        that.get_table_data()
      },
      //  删除指定订单
      delete_data: function (order) {
        const that = this
        that.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          that.$http.delete('/api/orders/' + order.id)
            .then((response) => {
              if (response.body.success) {
                that.$message.success('删除成功！')
                that.on_submit_loading = false
                setTimeout(that.on_refresh(), 2000)
              }
              else {
                that.$message.error(response.body.message)
                console.log(response.body)
                that.on_submit_loading = false
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<!-- Add scoped attribute to limit CSS to this component only -->
<style scoped>
  .group {
    display: inline-block;
    width: 60%;
    padding: 5px 0 5px 40%;
  }
</style>
