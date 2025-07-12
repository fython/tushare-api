import { TushareClient } from '@/client';
import { InferModelType, ModelDefinition, TushareModel } from '@/model';

/**
 * Tushare API 请求函数定义
 */
export type TushareApi<Params, M extends TushareModel<ModelDefinition>> = (
  client: TushareClient,
  params: Params
) => Promise<InferModelType<M>[]>;

/**
 * 创建 Tushare API 请求函数
 *
 * @param apiName API 名称
 * @param model Tushare 模型实例
 * @returns Tushare API 请求函数
 */
export function defineApi<Params, M extends TushareModel<ModelDefinition>>(
  apiName: string,
  model: M
): TushareApi<Params, M> {
  return async (client: TushareClient, params: Params): Promise<InferModelType<M>[]> => {
    const fields = model.getFields();
    const rawResponse = await client.request<Params>(apiName, params, fields.join(','));
    return model.deserialize(rawResponse) as InferModelType<M>[];
  };
}
