<template>
    <div class="addProduct_panel">
      <!--表单开始-->
      <el-form label-position="right"
               label-width="80px"
               :model="product_data"
               :rules="product_rules">
        <!--名称开始-->
        <el-form-item label="名称" prop="name" class="item">
          <el-input v-model="product_data.name"></el-input>
        </el-form-item>
        <!--名称结束-->

        <!--底价开始-->
        <el-form-item label="底价"  prop="basePrice" class="item">
          <el-input v-model="product_data.basePrice"></el-input>
        </el-form-item>
        <!--底价结束-->

        <!--详细描述开始-->
        <el-form-item label="详细描述" prop="description" class="item">
          <el-input v-model="product_data.description"></el-input>
        </el-form-item>
        <!--详细描述结束-->
      </el-form>
      <!--表单结束-->

      <!--按钮组开始-->
      <el-button-group class="group">
        <el-button @click="$router.back()" type="primary" icon="arrow-left">返回上层</el-button>
        <el-button @click="" type="success">新增商品 <i class="el-icon-plus"></i> </el-button>
      </el-button-group>
      <!--按钮组结束-->
    </div>
</template>

<script>
  export default {
    data () {
      return {
        product_data: {
          name: null
        },
        product_rules: {
          name: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请输入商品状态', trigger: 'blur' }
          ],
          basePrice: [
            { required: true, message: '请输入商品底价', trigger: 'blur' },
            { max: 4, message: '不超过一万元', trigger: 'blur' },
            {
              pattern: /^\d+(?:\.\d+)?$/,
              message: '只能由数字组成'
            }
          ],
          description: [

          ]
        }
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
