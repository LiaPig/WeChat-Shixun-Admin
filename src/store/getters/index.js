/**
 * Created by MINT on 2017/9/29.
 */
// getters里放获取states里的数据的方法

export default {
  GET_TOKEN: state => {
    return state.Token
  },
  GET_USER_INFO: state => {
    return state.UserInfo
  }
}
