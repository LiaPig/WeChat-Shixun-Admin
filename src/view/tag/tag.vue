<template>
  <div class="tag_panel">
    <!--顶部的 刷新 以及 新增标签 按钮组开始-->
    <el-button-group class="group">
      <el-button @click.stop="on_refresh" size="small" type="primary" icon="loading">刷新</el-button>
      <router-link :to="{name: 'tagAdd'}" tag="span">
        <el-button type="primary" size="small" icon="plus">新增标签</el-button>
      </router-link>
    </el-button-group>
    <!--顶部的 刷新 以及 新增标签 按钮组结束-->

    <!--标签表开始-->
    <div>
      <el-table
        stripe
        border
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        style="width: 100%">
        <!--标签ID开始-->
        <el-table-column
          sortable
          label="标签ID"
          prop="id">
        </el-table-column>
        <!--标签ID结束-->

        <!--标签名称开始-->
        <el-table-column
          sortable
          label="标签名称"
          prop="name"
          width="200px">
        </el-table-column>
        <!--标签名称结束-->

        <!--类型开始-->
        <el-table-column
          label="类型">
          <template scope="props">
            <div v-if="props.row.type === 'product'">商品</div>
            <div v-if="props.row.type === 'productCategory'">商品分类</div>
          </template>
        </el-table-column>
        <!--类型结束-->

        <!--图片状态开始-->
        <el-table-column
          label="图片状态">
          <template scope="props">
            <div v-if="props.row.status"> 正常 </div>
            <div v-if="props.row.status === 0"> 下架 </div>
          </template>
        </el-table-column>
        <!--图片状态结束-->

        <!--操作按钮组开始-->
        <el-table-column
          label="操作"
          width="200">
          <template scope="props">
            <!--查看详情按钮开始-->
            <router-link :to="{ name: 'tagDetails',
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
    <!--标签表结束-->
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
      //  与后台获取标签数据
      get_table_data: function () {
        const that = this
        that.load_data = true
        that.$http.get('/api/tags')
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
      //  删除指定标签
      delete_data: function (tag) {
        const that = this
        that.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          that.$http.delete('/api/tags/' + tag.id)
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
