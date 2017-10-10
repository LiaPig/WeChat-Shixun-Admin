/**
 * Created by MINT on 2017/9/29.
 */

import Vue from 'vue'

export default {
  LOGIN ({commit}, form) {
    return new Promise((resolve, reject) => {
      Vue.http.post('/api/login', form)
        .then((response) => {
          if (response.body.success) {
            // 设置token
            const tokenInfo = response.body.data
            console.log(tokenInfo)
            // commit('SET_TOKEN', tokenInfo)
            Vue.http.get('/api/users/me', {
              headers: {
                'Authorization': 'Bearer ' + tokenInfo.access_token
              }
            })
              .then((res) => {
                if (res.body.success) {
                  const userInfo = res.body.data
                  commit('SET_TOKEN', tokenInfo)
                  commit('SET_USER_INFO', userInfo)
                  resolve(res)
                } else {
                  reject(res)
                }
              })
              .catch((res) => {
                reject(res)
              })
          } else {
            reject(response)
          }
        })
        .catch((response) => {
          reject(response)
        })
    })
  },
  LOGOUT ({commit}) {
    commit('SET_TOKEN', null)
    commit('SET_USER_INFO', null)
  }
}
