/**
 * Created by MINT on 2017/9/29.
 */
import * as type from './type.js'
import {sessionStorage} from 'Common/storage'
// mutations里放修改state里的数据的方法
export default {
  // 设置TOKEN信息
  SET_TOKEN_INFO (state, tokeninfo) {
    console.log('hi')
    state.Token = tokeninfo || {}
    if (tokeninfo === null) {
      sessionStorage.remove('token_info')
    } else {
      sessionStorage.set('token_info', tokeninfo)
      console.log(tokeninfo)
    }
  },
  // 设置USER信息
  [type.SET_USER_INFO] (state, userinfo) {
    state.User = userinfo || {}
    if (userinfo === null) {
      sessionStorage.remove('user_info')
    } else {
      sessionStorage.set('user_info', userinfo)
    }
  }
}
