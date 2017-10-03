/**
 * Created by MINT on 2017/9/29.
 * base64加密解密工具
 */

// 存储前缀
import {base64Prefix} from 'Common/config'

import base64 from 'js-base64'

export default new class Base64 {
  constructor() {
    this.prefix = base64Prefix
    this.base64 = base64.Base64
  }

  // base64加密
  encode (val) {
    return this.base64.encode(base64Prefix + val)
  }

  // base解密
  decode (val) {
    return this.base64.decode(base64Prefix + val)
  }
}
