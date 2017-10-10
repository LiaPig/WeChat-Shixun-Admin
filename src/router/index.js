import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import Login from 'Components/login/login.vue'
import App from 'View/App.vue'
import Home from 'View/home/home.vue'
import Product from 'View/product/product.vue'
import ProductDetails from 'View/product/details/details.vue'
import ProductAdd from 'View/product/add/add.vue'
import ProductModify from 'View/product/modify/modify.vue'
import Picture from 'View/picture/picture.vue'
import PictureDetails from 'View/picture/details/details.vue'
import PictureAdd from 'View/picture/add/add.vue'
import PictureModify from 'View/picture/modify/modify.vue'
import Order from 'View/order/order.vue'
import OrderDetails from 'View/order/details/details.vue'
import OrderModify from 'View/order/modify/modify.vue'
import Tag from 'View/tag/tag.vue'
import TagDetails from 'View/tag/details/details.vue'
import TagAdd from 'View/tag/add/add.vue'
import TagModify from 'View/tag/modify/modify.vue'
import User from 'View/user/user.vue'
import UserAdd from 'View/user/add/add.vue'
import UserDetails from 'View/user/details/details.vue'
import UserModify from 'View/user/modify/modify.vue'
import Role from 'View/role/role.vue'
import RoleAdd from 'View/role/add/add.vue'
import RoleDetails from 'View/role/details/details.vue'
import RoleModify from 'View/role/modify/modify.vue'

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
          name: '首页',
          auth: true
        }
      },
      // 商品页面
      {
        path: '/product',
        name: 'product',
        component: Product,
        meta: {
          name: '商品管理',
          auth: true
        }
      },
      {
        path: '/product/details',
        name: 'productDetails',
        meta: {
          name: '商品详情页面',
          auth: true
        },
        component: ProductDetails
      },
      {
        path: '/product/add',
        name: 'productAdd',
        meta: {
          name: '新增商品页面',
          auth: true
        },
        component: ProductAdd
      },
      {
        path: '/product/modify',
        name: 'productModify',
        meta: {
          name: '修改商品信息页面',
          auth: true
        },
        component: ProductModify
      },
      // 图片页面
      {
        path: '/picture',
        name: 'picture',
        component: Picture,
        meta: {
          name: '商品管理',
          auth: true
        }
      },
      {
        path: '/picture/details',
        name: 'pictureDetails',
        meta: {
          name: '商品详情页面',
          auth: true
        },
        component: PictureDetails
      },
      {
        path: '/picture/add',
        name: 'pictureAdd',
        meta: {
          name: '新增商品页面',
          auth: true
        },
        component: PictureAdd
      },
      {
        path: '/picture/modify',
        name: 'pictureModify',
        meta: {
          name: '修改商品信息页面',
          auth: true
        },
        component: PictureModify
      },
      // 订单页面
      {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
          name: '订单管理',
          auth: true
        }
      },
      {
        path: '/order/details',
        name: 'orderDetails',
        meta: {
          name: '订单详情页面',
          auth: true
        },
        component: OrderDetails
      },
      {
        path: '/order/modify',
        name: 'orderModify',
        meta: {
          name: '修改订单信息页面',
          auth: true
        },
        component: OrderModify
      },
      // 标签页面
      {
        path: '/tag',
        name: 'tag',
        component: Tag,
        meta: {
          name: '标签管理',
          auth: true
        }
      },
      {
        path: '/tag/details',
        name: 'tagDetails',
        meta: {
          name: '标签详情页面',
          auth: true
        },
        component: TagDetails
      },
      {
        path: '/tag/add',
        name: 'tagAdd',
        meta: {
          name: '新增标签页面',
          auth: true
        },
        component: TagAdd
      },
      {
        path: '/tag/modify',
        name: 'tagModify',
        meta: {
          name: '修改标签信息页面',
          auth: true
        },
        component: TagModify
      },
      // 用户页面
      {
        path: '/user',
        name: 'user',
        component: User,
        meta: {
          name: '用户管理',
          auth: true
        }
      },
      {
        path: '/user/details',
        name: 'userDetails',
        meta: {
          name: '用户详情页面',
          auth: true
        },
        component: UserDetails
      },
      {
        path: '/user/add',
        name: 'userAdd',
        meta: {
          name: '新增用户页面',
          auth: true
        },
        component: UserAdd
      },
      {
        path: '/user/modify',
        name: 'userModify',
        meta: {
          name: '修改用户信息页面',
          auth: true
        },
        component: UserModify
      },
      // 角色页面
      {
        path: '/role',
        name: 'role',
        component: Role,
        meta: {
          name: '角色管理',
          auth: true
        }
      },
      {
        path: '/role/details',
        name: 'roleDetails',
        meta: {
          name: '角色详情页面',
          auth: true
        },
        component: RoleDetails
      },
      {
        path: '/role/add',
        name: 'roleAdd',
        meta: {
          name: '新增角色页面',
          auth: true
        },
        component: RoleAdd
      },
      {
        path: '/role/modify',
        name: 'roleModify',
        meta: {
          name: '修改角色信息页面',
          auth: true
        },
        component: RoleModify
      }
    ]
  }
]

const router = new Router({
  routes // （缩写）相当于 routes: routes
})

const clearInfo = () => {
  store.dispatch('LOGOUT')
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.auth)) {
    let auth = store.state.UserInfo.id
    if (auth !== null && auth !== {} && auth !== undefined) {
      next()
    } else {
      next({
        name: 'login'
      })
      clearInfo()
    }
  } else {
    next()
  }
})

export default router

