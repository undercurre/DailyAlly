declare namespace Auth {
  /** 返回的token和刷新token */
  interface Token {
    jwt: string;
    user: UserInfo;
  }
  /** 返回的用户信息 */
  type UserInfo = {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  };
}
