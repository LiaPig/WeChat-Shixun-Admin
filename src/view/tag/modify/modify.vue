<template>
  <div class="detail_panel">

    <!--表单开始-->
    <el-form label-position="right" label-width="120px" :model="tag_data">
      <!--id开始-->
      <el-form-item label="id" class="item">
        <el-input v-model="tag_data.id" :disabled="true"></el-input>
      </el-form-item>
      <!--id结束-->

      <!--标签名称开始-->
      <el-form-item label="标签名称" class="item">
        <el-input v-model="tag_data.name"></el-input>
      </el-form-item>
      <!--标签名称结束-->

      <!--类型开始-->
      <el-form-item label="类型" class="item">
        <!--<el-input v-model="tag_data.type"></el-input>-->
        <el-select v-model="tag_data.type">
          <el-option
            v-for="item in tagTypes"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <!--类型结束-->

      <!--选项开始-->
      <el-form-item label="标签选项" class="item" v-if="tag_data.type != 'productCategory'">
        <el-tag v-if="tag_data.tagOptions.length > 0"
                v-for="option in tag_data.tagOptions"
                :key="option.id"
                type="primary"
                :closable="true"
                @click="console.log(option)"
                @close="handleCloseTag(option)"
                style="margin-right: 2px;">
          {{option.optionName}}
        </el-tag>
        <div class="content" v-if="tag_data.tagOptions.length == 0">
          此标签无选项
        </div>
        <el-button type="success" size="small" @click="showForm">添加标签</el-button>
        <div class="modal">
          <el-dialog title="新增标签选项" :visible.sync="dialogFormVisible" :modalAppendToBody="false">
            <el-form
              :model="tagOption"
              ref="tagOption"
            >
              <el-form-item
                prop="optionName"
                label="选项名称:"
              >
                <el-input size="small" v-model="tagOption.optionName" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item
                prop="value"
                label="选 项 值:"
              >
                <el-input size="small" v-model="tagOption.value" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item
                prop="type"
                label="选项类型:"
              >
                <el-select v-model="tagOption.type" class="el-input--small">
                  <el-option
                    v-for="item in tagOptionTypes"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="handleAddTag">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-form-item>
      <!--选项结束-->

      <!--状态开始-->
      <el-form-item label="状态" class="item">
        <!--<el-input v-model="tag_data.status"></el-input>-->
        <el-select v-model="tag_data.status">
          <el-option
            v-for="item in status"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
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
        <el-button type="primary" @click="submitForm">
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
      that.initTagTypes()
      that.initStatus()
      that.initTagOptionTypes()
      that.get_tag_data(that.route_id)
    },
    data () {
      return {
        route_id: this.$route.params.id,
        tag_data: {
          tagOptions: []
        },
        tagTypes: [],
        tagOptionTypes: [],
        status: [],
        dialogFormVisible: false,
        tagOption: {
          optionName: '',
          value: '',
          type: ''
        }
      }
    },
    methods: {
      //   根据上一页面传过来的id获取整个商品信息
      get_tag_data: function (id) {
        const that = this
        that.load_data = true
        that.$http.get('/api/tags/' + id)
          .then((response) => {
            that.tag_data = response.body.data
            that.load_data = false
          })
          .catch(function (error) {
            console.error(error)
            that.load_data = false
          })
      },
      initTagTypes () {
        const that = this
        that.load_data = true
        that.$http.get('/api/tags/types')
          .then((res) => {
            if (res.body.success) {
              const data = res.body.data
              for (var a in data) {
                that.tagTypes.push({
                  name: a,
                  value: data[a]
                })
              }
              that.$message.success('加载成功')
              that.load_data = false
              console.log(that.tagTypes)
            } else {
              console.log(res)
              this.$message.error('加载失败!')
            }
          })
          .catch((res) => {
            that.$message.error(res)
            that.load_data = false
          })
      },
      initStatus () {
        const that = this
        that.load_data = true
        that.$http.get('/api/meta/status')
          .then((res) => {
            if (res.body.success) {
              const data = res.body.data
              for (var a in data) {
                that.status.push({
                  name: a,
                  value: data[a]
                })
              }
              that.$message.success('加载成功')
              that.load_data = false
              console.log(that.status)
            } else {
              console.log(res)
              this.$message.error('加载失败!')
            }
          })
          .catch((res) => {
            that.$message.error(res)
            that.load_data = false
          })
      },
      submitForm () {
        if (this.tag_data.type === 'productCategory') {
          this.tag_data.tagOptions = []
        }
        this.$http.post('/api/tags', this.tag_data)
          .then(function (response) {
            if (response.body.success) {
              this.$message.success('修改成功咯')
              setTimeout(this.$router.push('/tag'), 2000)
            } else {
              this.$message.error(response.body.message)
              console.log(response.body)
            }
          })
      },
      initTagOptionTypes () {
        const that = this
        that.load_data = true
        that.$http.get('/api/meta/tagOptionTypes')
          .then((res) => {
            if (res.body.success) {
              const data = res.body.data
              for (var a in data) {
                that.tagOptionTypes.push({
                  name: a,
                  value: data[a]
                })
              }
              that.$message.success('加载成功')
              that.load_data = false
              console.log(that.tagOptionTypes)
            } else {
              console.log(res)
              this.$message.error('加载失败!')
            }
          })
          .catch((res) => {
            that.$message.error(res)
            that.load_data = false
          })
      },
      handleCloseTag (tag) {
        this.tag_data.tagOptions.splice(this.tag_data.tagOptions.indexOf(tag), 1)
        console.log(this.tag_data.tagOptions)
      },
      handleAddTag () {
        const form = {
          optionName: this.tagOption.optionName,
          type: this.tagOption.type,
          value: this.tagOption.value
        }
        this.tag_data.tagOptions.push(form)
        this.dialogFormVisible = false
      },
      showForm () {
        this.resetTagOption()
        this.dialogFormVisible = true
        console.log(this.tag_data)
      },
      resetTagOption () {
        this.tagOption.optionName = ''
        this.tagOption.type = ''
        this.tagOption.value = ''
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
