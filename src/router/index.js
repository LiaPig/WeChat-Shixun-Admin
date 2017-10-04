import Vue from 'vue'
import Router from 'vue-router'
import Login from 'Components/login/login.vue'
import App from '@/App.vue'
import Home from 'View/home/home.vue'
import Product from 'View/product/product.vue'
import ProductDetails from 'View/product/details/details.vue'
import ProductAdd from 'View/product/add/add.vue'
import ProductModify from 'View/product/modify/modify.vue'

import User from 'View/user/user.vue'
import UserAdd from 'View/user/add/add.vue'
import UserDetails from 'View/user/details/details.vue'
import UserModify from 'View/user/modify/modify.vue'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home',
    component: App,
    children: [
      // 主页
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          name: '首页'
        }
      },
      // 商品页面
      {
        path: '/product',
        name: 'product',
        component: Product,
        meta: {
          name: '商品管理'
        }
      },
      {
        path: '/product/details',
        name: 'productDetails',
        meta: {
          name: '商品详情页面'
        },
        component: ProductDetails
      },
      {
        path: '/product/add',
        name: 'productAdd',
        meta: {
          name: '新增商品页面'
        },
        component: ProductAdd
      },
      {
        path: '/product/modify',
        name: 'productModify',
        meta: {
          name: '修改商品信息页面'
        },
        component: ProductModify
      },
      // 用户页面
      {
        path: '/user',
        name: 'user',
        component: User,
        meta: {
          name: '用户管理'
        }
      },
      {
        path: '/user/details',
        name: 'userDetails',
        meta: {
          name: '用户详情页面'
        },
        component: UserDetails
      },
      {
        path: '/user/add',
        name: 'userAdd',
        meta: {
          name: '新增用户页面'
        },
        component: UserAdd
      },
      {
        path: '/user/modify',
        name: 'userModify',
        meta: {
          name: '修改用户信息页面'
        },
        component: UserModify
      }
    ]
  }
]

export default new Router({
  routes: routes
})
