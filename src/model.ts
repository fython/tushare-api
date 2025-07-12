/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Tushare API 响应通用格式
 * 当 code 为 0 时，表示请求成功，msg 为 null，data 为实际数据
 * 当 code 非 0 时，表示请求失败，msg 为错误信息，data 为 null
 */
export type CommonResp<C extends number, T = any> = C extends 0
  ? { code: 0; msg: null; data: T }
  : { code: C; msg: string; data: null };

/**
 * Tushare 原始表格数据格式
 * 包含字段名和数据项
 */
export interface TushareRawTable {
  fields: string[];
  items: unknown[][];
}

/**
 * 表示 Tushare 模型中字段类型的函数类型
 * 参照 Vue.js 的 PropType 定义，可以接受如 String, Number, Boolean 等值
 */
export type PropType<T> = () => T;

/**
 * Tushare 模型预定义，字段类型为值类型的 PropType 映射
 */
export interface ModelDefinition {
  [fieldName: string]: PropType<unknown>;
}

/**
 * 从 ModelDefinition 中推断出实际的数据结构类型
 */
type InferModelInnerType<T extends ModelDefinition> = {
  [K in keyof T]: T[K] extends PropType<infer U> ? U | null : unknown;
};

/**
 * 从 TushareModel 中推断出实际的数据结构类型
 */
export type InferModelType<T extends TushareModel<ModelDefinition>> =
  T extends TushareModel<infer U> ? InferModelInnerType<U> : never;

/**
 * Tushare 模型类，用于定义和处理 Tushare API 响应数据
 *
 * 非库内部使用者通常不需要直接实例化此类，而是通过 `defineModel` 辅助函数来创建模型。
 */
export class TushareModel<T extends ModelDefinition> {
  constructor(private readonly definition: T) {}

  /**
   * 反序列化 Tushare 原始响应中的表格型数据到模型数据数组
   *
   * @param rawResponse Tushare 原始响应中的表格型数据
   * @returns 解析后的模型数据数组
   */
  deserialize(rawResponse: TushareRawTable): InferModelInnerType<T>[] {
    const { fields, items } = rawResponse;

    return items.map((row) => {
      const result = {} as InferModelInnerType<T>;

      for (const [fieldName] of Object.entries(this.definition)) {
        const columnIndex = fields.indexOf(fieldName);

        if (columnIndex === -1) {
          (result as any)[fieldName] = null;
          continue;
        }

        (result as any)[fieldName] = row[columnIndex] ?? null;
      }

      return result;
    });
  }

  getFields(): string[] {
    return Object.keys(this.definition);
  }
}

/**
 * 定义 Tushare 模型的辅助函数
 *
 * 用法：
 * ```typescript
 * const MyModel = defineModel({
 *   field1: String,
 *   field2: Number,
 * });
 * ```
 *
 * @param definition Tushare 模型定义
 * @returns TushareModel 实例
 */
export function defineModel<T extends ModelDefinition>(definition: T): TushareModel<T> {
  return new TushareModel(definition);
}
