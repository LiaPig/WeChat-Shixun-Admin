/**
 * Created by MINT on 2017/9/29.
 */
import { cookieStorage } from 'Common/storage'

export default {
  Token: cookieStorage.get('token'),
  UserInfo: cookieStorage.get('user_info')
}
