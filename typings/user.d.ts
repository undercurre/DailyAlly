declare namespace User {
  /** 用户信息 */
  interface UserInfo {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
  }
}
