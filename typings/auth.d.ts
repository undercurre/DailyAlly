declare namespace ApiAuth {
  /** 返回的token和刷新token */
  interface Token {
    jwt: string;
    user: Auth.UserInfo;
  }
  /** 返回的用户信息 */
  type UserInfo = User.UserInfo;
}
