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
          label="性别 "
          width="100px">
            <template scope="props">
              <div v-if="props.row.gender == 1">
                男
              </div>
              <div v-else>
                女
              </div>
            </template>
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
          width="150">
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
    data () {
      return {
        table_data: [
          {
            id: '432428031852679168',
            status: 1,
            username: 'LeeWaiHo',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoH73h1X5HwGDKediaEtxEE99eRUicH3doUBQlatW2ibGulG0Cm6PiaM0a1B95LR66PwwS3RuS9n3IdDg/0',
            gender: 1,
            mobilePhone: '15521079794',
            email: null,
            roles: [
              {
                id: '429732071536070656',
                name: '普通用户',
                roleKey: 'ROLE_USER',
                description: '普通用户哦',
                create_time: '2017-09-25 11:36:45',
                update_time: '2017-09-25 11:36:45'
              }
            ],
            create_time: '2017-10-02 22:09:32',
            update_time: '2017-10-02 22:09:32'
          },
          {
            id: '429731646577577984',
            status: 1,
            username: 'Lia',
            avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoH73h1X5HwGDKediaEtxEE99eRUicH3doUBQlatW2ibGulG0Cm6PiaM0a1B95LR66PwwS3RuS9n3IdDg/0',
            gender: 0,
            mobilePhone: '13246825048',
            email: '418607528@qq.com',
            roles: [
              {
                id: '429732071536070656',
                name: '普通用户',
                roleKey: 'ROLE_USER',
                description: '普通用户哦',
                create_time: '2017-09-25 11:36:45',
                update_time: '2017-09-25 11:36:45'
              }
            ],
            create_time: '2017-09-25 11:35:03',
            update_time: '2017-09-25 11:37:43'
          }
        ],
        load_data: false
      }
    },
    components: {
      ElButtonGroup,
      ElButton,
      leftNav,
      topNav,
      panelTitle
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
