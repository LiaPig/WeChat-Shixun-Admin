<template>
  <div>
    <!--顶部的 刷新 以及 新增角色 按钮组开始-->
    <el-button-group class="group">
      <el-button @click.stop="on_refresh" size="small" type="primary" icon="loading">刷新</el-button>
      <router-link :to="{name: 'roleAdd'}" tag="span">
        <el-button type="primary" size="small" icon="plus">新增角色</el-button>
      </router-link>
    </el-button-group>
    <!--顶部的 刷新 以及 新增角色 按钮组结束-->

    <!--角色表开始-->
    <div>
      <el-table
        stripe
        border
        :data="table_data"
        style="width: 100%"
        v-loading="load_data"
        element-loading-text="拼命加载中">
        <!--角色ID开始-->
        <el-table-column
          sortable
          label="角色ID"
          prop="id"
          width="220px">
        </el-table-column>
        <!--角色ID结束-->

        <!--角色名称开始-->
        <el-table-column
          sortable
          label="角色名称"
          prop="name"
          width="180px">
        </el-table-column>
        <!--角色名称结束-->

        <!--roleKey开始-->
        <el-table-column
          sortable
          label="roleKey "
          prop="roleKey"
          width="200px">
        </el-table-column>
        <!--roleKey结束-->

        <!--详细描述开始-->
        <el-table-column
          label="详细描述 "
          prop="description">
        </el-table-column>
        <!--详细描述结束-->

        <!--角色状态开始-->
        <el-table-column
          label="角色状态"
          width="100px">
          <template scope="props">
            <div v-if="props.row.status"> 正常 </div>
            <div v-if="props.row.status === 0"> 下架 </div>
          </template>
        </el-table-column>
        <!--角色状态结束-->

        <!--操作按钮组开始-->
        <el-table-column
          label="操作"
          width="200">
          <template scope="props">
            <!--查看详情按钮开始-->
            <router-link :to="{ name: 'roleDetails',
                                params: {id: props.row.id}
                              }">
              <el-button type="success" size="small" icon="search">
                查看详情
              </el-button>
            </router-link>
            <!--查看详情按钮结束-->

            <!--删除按钮开始-->
            <template v-if="props.row.id != 429732071536070656 && props.row.id != 429732003760312320">
              <el-button @click="delete_data(props.row)" type="danger" size="small" icon="delete">删除</el-button>
            </template>
            <!--删除按钮结束-->

            <!--下架按钮开始-->
            <!--<template v-if="props.row.status == 1">
              <el-button @click="" type="danger" size="small" icon="circle-cross">下架</el-button>
            </template>-->
            <!--下架按钮结束-->
            <!--恢复按钮开始-->
            <!--<template v-if="props.row.status == 0">
              <el-button @click="" type="warning" size="small" icon="upload">恢复</el-button>
            </template>-->
            <!--恢复按钮结束-->
          </template>
        </el-table-column>
        <!--操作按钮组结束-->
      </el-table>
    </div>
    <!--角色表结束-->
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
      //  与后台获取角色数据
      get_table_data: function () {
        const that = this
        that.load_data = true
        that.$http.get('/api/roles')
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
      //  删除指定角色
      delete_data: function (role) {
        const that = this
        that.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          that.$http.delete('/api/roles/' + role.id)
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
