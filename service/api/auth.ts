import request from '../request';
/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(userName: string, password: string) {
  return request.post<Auth.Token>('/api/auth/local', {
    identifier: userName,
    password,
  });
}

/** 获取用户信息 */
export function fetchUserInfo() {
  return request.get<Auth.UserInfo>('/api/users/me');
}
