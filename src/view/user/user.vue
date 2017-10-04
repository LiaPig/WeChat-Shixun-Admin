<template>
  <div class="user_panel">
    <!--顶部的 刷新 以及 新增用户 按钮组开始-->
    <el-button-group class="group">
      <el-button @click.stop="on_refresh" size="small" type="primary" icon="loading">刷新</el-button>
      <router-link :to="{name: 'userAdd'}" tag="span">
        <el-button type="primary" size="small" icon="plus">新增用户</el-button>
      </router-link>
    </el-button-group>
    <!--顶部的 刷新 以及 新增用户 按钮组结束-->

    <!--用户表开始-->
    <div>
      <el-table
        stripe
        border
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        style="width: 100%">
        <!--用户ID开始-->
        <el-table-column
          sortable
          label="用户ID"
          prop="id"
          width="200px">
        </el-table-column>
        <!--用户ID结束-->

        <!--用户名称开始-->
        <el-table-column
          sortable
          label="用户名称"
          prop="username"
          width="150px">
        </el-table-column>
        <!--用户名称结束-->

        <!--性别开始-->
        <el-table-column
          sortable
          label="性别"
          prop="gender"
          width="100px">
        </el-table-column>
        <!--性别结束-->

        <!--电话号码开始-->
        <el-table-column
          label="电话号码 "
          prop="mobilePhone">
        </el-table-column>
        <!--电话号码结束-->

        <!--用户状态开始-->
        <el-table-column
          sortable
          prop="status"
          label="状态"
          width="100px">
        </el-table-column>
        <!--用户状态结束-->

        <!--电子邮箱开始-->
        <el-table-column
          width="200px"
          label="电子邮箱 "
          prop="email">
        </el-table-column>
        <!--电子邮箱结束-->


        <!--操作按钮组开始-->
        <el-table-column
          label="操作"
          width="200">
          <template scope="props">
            <!--查看详情按钮开始-->
            <router-link :to="{ name: 'userDetails',
                                params: {id: props.row.id}
                              }">
              <el-button type="success" size="small" icon="search">
                查看详情
              </el-button>
            </router-link>
            <!--查看详情按钮结束-->
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
    <!--用户表结束-->
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
      //  与后台获取用户数据
      get_table_data: function () {
        const that = this
        that.load_data = true
        that.$http.get('/api/users')
          .then((response) => {
            that.table_data = response.body.data.content
            that.load_data = false
          })
          .catch(function (error) {
            console.error(error)
          })
      },
      //  刷新数据
      on_refresh: function () {
        const that = this
        that.get_table_data()
      },
      //  删除指定用户
      delete_data: function (user) {
        const that = this
        that.$http.delete('/api/users/' + user.id)
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
