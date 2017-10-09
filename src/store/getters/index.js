/**
 * Created by MINT on 2017/9/29.
 */
// getters里放获取states里的数据的方法
import * as type from './type.js'

export default {
  [type.GET_TOKEN_INFO]: state => {
    return state.Token
  },
  [type.GET_USER_INFO]: state => {
    return state.User
  },
  test: state => {
    return state.a
  }
}
