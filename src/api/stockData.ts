import { InferModelType, defineModel } from '@/model';

import { defineApi } from './common';

const StockBasicModel = defineModel({
  ts_code: String,
  symbol: String,
  name: String,
  area: String,
  industry: String,
  fullname: String,
  enname: String,
  cnspell: String,
  market: String,
  exchange: String,
  curr_type: String,
  list_status: String,
  list_date: String,
  delist_date: String,
  is_hs: String,
  act_name: String,
  act_ent_type: String,
});

/**
 * 股票列表基础信息
 * @link https://tushare.pro/document/2?doc_id=25
 */
export type StockBasicType = InferModelType<typeof StockBasicModel>;

/**
 * 股票列表基础信息查询参数
 * @link https://tushare.pro/document/2?doc_id=25
 */
export interface GetStoryBasicParams {
  ts_code?: string;
  name?: string;
  market?: string;
  list_status?: string;
  exchange?: string;
  is_hs?: string;
}

/**
 * 获取股票列表基础信息
 * @link https://tushare.pro/document/2?doc_id=25
 * @param client Tushare API 客户端实例
 * @param params 查询参数
 * @returns 股票列表基础信息
 */
export const getStockBasic = defineApi<GetStoryBasicParams, typeof StockBasicModel>(
  'stock_basic',
  StockBasicModel
);

const StockCompanyModel = defineModel({
  ts_code: String,
  exchange: String,
  com_name: String,
  province: String,
  city: String,
  introduction: String,
});

export type StockCompanyType = InferModelType<typeof StockCompanyModel>;

export interface GetStockCompanyParams {
  ts_code: string;
  exchange?: string;
}

export const getStockCompany = defineApi<GetStockCompanyParams, typeof StockCompanyModel>(
  'stock_company',
  StockCompanyModel
);
