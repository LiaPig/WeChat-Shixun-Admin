/**
 * Created by MINT on 2017/9/29.
 */

import { cookieStorage, sessionStorage } from 'Common/storage'

export default {
  SET_TOKEN (state, token) {
    state.Token = token || {}
    if (token === null) {
      cookieStorage.remove('token')
    } else {
      let expires = parseInt(token.expires_in)
      cookieStorage.set('token', token, expires)
    }
  },
  SET_USER_INFO (state, userInfo) {
    state.UserInfo = userInfo || {}
    if (userInfo === null) {
      sessionStorage.remove('userInfo')
    } else {
      sessionStorage.set('userInfo', userInfo)
    }
  }
}
