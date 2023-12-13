import request from '../request';
/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(params: Auth.LoginParams) {
  return request.post<Service.BackConfig<Auth.LoginRes>>(
    '/api/auth/local',
    params,
  );
}
