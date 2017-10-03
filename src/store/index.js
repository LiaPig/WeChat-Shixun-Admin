/**
 * Created by MINT on 2017/9/29.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 引入模块
import actions from './actions/index.js'
import getters from './getters/index.js'
import mutations from './mutations/index.js'
import state from './states/index.js'

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
