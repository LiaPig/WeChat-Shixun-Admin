<template>
  <div>
    <!--顶部的 刷新 以及 新增商品 按钮组开始-->
    <el-button-group class="group">
      <el-button @click.stop="on_refresh" size="small" type="primary" icon="loading">刷新</el-button>
      <router-link :to="{name: 'productAdd'}" tag="span">
        <el-button type="primary" size="small" icon="plus">新增商品</el-button>
      </router-link>
    </el-button-group>
    <!--顶部的 刷新 以及 新增商品 按钮组结束-->

    <!--商品表开始-->
    <div>
      <el-table
        stripe
        border
        :data="table_data"
        style="width: 100%">
        <!--商品ID开始-->
        <el-table-column
          sortable
          label="商品ID"
          prop="id"
          width="220px">
        </el-table-column>
        <!--商品ID结束-->

        <!--商品名称开始-->
        <el-table-column
          sortable
          label="商品名称"
          prop="name"
          width="180px">
        </el-table-column>
        <!--商品名称结束-->

        <!--底价开始-->
        <el-table-column
          sortable
          label="底价 "
          prop="basePrice"
          width="100px">
        </el-table-column>
        <!--底价结束-->

        <!--详细描述开始-->
        <el-table-column
          label="详细描述 "
          prop="description">
        </el-table-column>
        <!--详细描述结束-->

        <!--商品状态开始-->
        <el-table-column
          sortable
          prop="status"
          label="商品状态"
          width="150px">
        </el-table-column>
        <!--商品状态结束-->

        <!--操作按钮组开始-->
        <el-table-column
          label="操作"
          width="200">
          <template scope="props">
            <!--查看详情按钮开始-->
            <router-link :to="{ name: 'productDetails',
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
    <!--商品表结束-->
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
                url: 'http://ow3x2qqiz.bkt.clouddn.com/image/product/1.png',
                type: 'product',
                description: '商品',
                create_time: '2017-09-25 11:49:09',
                update_time: '2017-09-25 11:49:09'
              }
            ],
            create_time: '2017-09-25 13:04:04',
            update_time: '2017-09-27 23:56:00'
          },
          {
            id: 430469984917917696,
            status: 1,
            name: '浴帽可爱猪崽们',
            basePrice: 0.03,
            description: '刚洗完白白的香香猪',
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
                url: 'http://ow3x2qqiz.bkt.clouddn.com/image/product/1.png',
                type: 'product',
                description: '商品',
                create_time: '2017-09-25 11:49:09',
                update_time: '2017-09-25 11:49:09'
              }
            ],
            create_time: '2017-09-25 13:04:04',
            update_time: '2017-09-27 23:56:00'
          }
        ],
        load_data: true
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
