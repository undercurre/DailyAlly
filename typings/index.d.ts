declare namespace Service {
  type BackConfig<T> = {
    code: number;
    msg: string;
    data: T;
  };
}
