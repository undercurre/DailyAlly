/** 请求结果的适配器：用于接收适配器函数和请求结果 */
export function adapter<T extends Service.ServiceAdapter>(
  adapterFun: T,
  ...args: Service.MultiRequestResult<Parameters<T>>
): Service.RequestResult<ReturnType<T>> {
  let result: Service.RequestResult | undefined;

  const hasError = args.some(item => {
    const flag = Boolean(item.error);
    if (flag) {
      result = {
        error: item.error,
        data: null,
      };
    }
    return flag;
  });

  if (!hasError) {
    const adapterFunArgs = args.map(item => item.data);
    result = {
      error: null,
      data: adapterFun(...adapterFunArgs),
    };
  }

  return result!;
}

