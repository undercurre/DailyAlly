declare namespace Auth {
  type LoginParams = {
    username: string;
    password: string;
  };

  type LoginRes = Service.BackConfig<{
    access_token: string;
  }>;
}
