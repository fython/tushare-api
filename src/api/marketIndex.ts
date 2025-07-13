import { InferModelType, defineModel } from '@/model';

import { defineApi } from './common';

const IndexDailyModel = defineModel({
  ts_code: String,
  trade_date: String,
  close: Number,
  open: Number,
  high: Number,
  low: Number,
  pre_close: Number,
  change: Number,
  pct_chg: Number,
  vol: Number,
  amount: Number,
});

/**
 * 指数日线行情数据
 * @link https://tushare.pro/document/2?doc_id=95
 */
export type IndexDailyType = InferModelType<typeof IndexDailyModel>;

/**
 * 指数日线行情数据查询参数
 * @link https://tushare.pro/document/2?doc_id=95
 */
export interface GetIndexDailyParams {
  ts_code: string;
  trade_date?: string;
  start_date?: string;
  end_date?: string;
}

/**
 * 获取指数日线行情数据
 * @link https://tushare.pro/document/2?doc_id=95
 * @param client Tushare API 客户端实例
 * @param params 查询参数
 * @returns 指数日线行情数据
 */
export const getIndexDaily = defineApi<GetIndexDailyParams, typeof IndexDailyModel>(
  'index_daily',
  IndexDailyModel
);
