/**
 * Created by MINT on 2017/9/29.
 */
import * as actions from './type'
import * as mutations from '../mutations/type'

export default {
  // 提交mutations中的SET_TOKEN_INFO事件
  SET_TOKEN_INFO ({commit}, tokeninfo) {
    console.log(tokeninfo)
  },
  // 提交mutations中的SET_USER_INFO事件
  [actions.SET_USER_INFO] ({commit}, userinfo) {
    return new Promise((resolve, reject) => {
      if (userinfo !== null && userinfo.privileges !== null) {
        let access = false
        let privileges = userinfo.privileges
        for (let i in privileges) {
          if (privileges[i].name == 'CONSOLE_LOGIN_PRIVILEGE') {
            access = true
          }
        }
        if (access) {
          console.log('可以访问后台')
          commit(mutations.SET_USER_INFO, userinfo)
          resolve()
        } else {
          console.log('不可以访问后台')
          reject()
        }
      } else {
        commit(mutations.SET_USER_INFO, null)
      }
    })
  }
}
