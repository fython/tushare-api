import { CommonResp, TushareRawTable } from '@/model';

/**
 * Tushare API 客户端自定义配置
 */
export interface TushareClientOptions {
  /**
   * 自定义 fetch 函数，默认为全局的 fetch（Node.js 版本推荐使用 v18 以上）
   * 用于在旧版本 Node.js 环境中使用 node-fetch 或其他库
   */
  customFetch?: typeof fetch;
  /**
   * 自定义 API 主机地址，默认为 Tushare 官方 API 地址
   * 用于在测试或私有部署环境中使用
   */
  customApiHost?: string;
}

/**
 * Tushare API 默认主机地址
 */
export const DEFAULT_API_HOST = 'https://api.tushare.pro';

/**
 * Tushare API 客户端
 * 用于发送请求和处理响应
 */
export class TushareClient {
  private readonly token: string;
  private readonly customFetch: typeof fetch | undefined;
  private readonly customApiHost: string | undefined;

  /**
   * 创建 Tushare API 客户端实例
   *
   * @param token Tushare API Token
   * @param options 可选配置项
   */
  constructor(token: string, options?: TushareClientOptions) {
    this.token = token;
    this.customFetch = options?.customFetch;
    this.customApiHost = options?.customApiHost;
  }

  /**
   * 执行原始 API 请求，API 响应中可能包含错误码和错误信息
   *
   * @param apiName API 名称
   * @param params 请求参数
   * @param fields 响应请求字段，默认为 '*'（请求所有字段）
   * @returns API 响应结果
   */
  async rawRequest<P, R>(apiName: string, params: P, fields = '*'): Promise<CommonResp<number, R>> {
    const fetchFn = this.customFetch || fetch;
    const apiHost = this.customApiHost || DEFAULT_API_HOST;

    const rsp = await fetchFn(apiHost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_name: apiName,
        token: this.token,
        params,
        fields,
      }),
    });
    if (!rsp.ok) {
      throw new Error(`Tushare API request failed: ${rsp.status} ${rsp.statusText}`);
    }
    return (await rsp.json()) as CommonResp<number, R>;
  }

  /**
   * 发送 API 请求并解析响应结果，
   *
   * @param apiName API 名称
   * @param params 请求参数
   * @param fields 响应请求字段，默认为 '*'（请求所有字段）
   * @returns API 响应结果
   */
  async request<P>(apiName: string, params: P, fields = '*'): Promise<TushareRawTable> {
    const rsp = await this.rawRequest<P, TushareRawTable>(apiName, params, fields);
    if (rsp.code !== 0) {
      throw new Error(`Tushare API error: ${rsp.msg}`);
    }
    if (!rsp.data) {
      throw new Error(`Tushare API response data is null for ${apiName}`);
    }
    return rsp.data as TushareRawTable;
  }
}
