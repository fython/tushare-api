import { InferModelType, defineModel } from '@/model';

import { defineApi } from './common';

const StockDailyModel = defineModel({
  ts_code: String,
  trade_date: String,
  open: Number,
  high: Number,
  low: Number,
  close: Number,
  pre_close: Number,
  change: Number,
  pct_chg: Number,
  vol: Number,
  amount: Number,
});

/**
 * 股票日线行情数据
 * @link https://tushare.pro/document/2?doc_id=27
 */
export type StockDailyType = InferModelType<typeof StockDailyModel>;

/**
 * 股票日线行情数据查询参数
 * @link https://tushare.pro/document/2?doc_id=27
 */
export interface GetStockDailyParams {
  ts_code: string;
  trade_date?: string;
  start_date?: string;
  end_date?: string;
}

/**
 * 获取股票日线行情数据
 * @link https://tushare.pro/document/2?doc_id=27
 * @param client Tushare API 客户端实例
 * @param params 查询参数
 * @returns 股票日线行情数据
 */
export const getStockDaily = defineApi<GetStockDailyParams, typeof StockDailyModel>(
  'daily',
  StockDailyModel
);
