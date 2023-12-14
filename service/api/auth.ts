import { md5 } from 'js-md5';
import request from '../request';
/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(params: Auth.LoginParams) {
  return request.post<Auth.LoginRes>(
    '/auth/login',
    {...params, password: md5(params.password)},
  );
}

/**
 * 获取用户信息
 */
export function fetchUserInfo() {
  return request.get<Auth.UserInfo>('/users/fineOne');
}
