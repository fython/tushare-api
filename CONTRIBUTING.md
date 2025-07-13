# Contributing

欢迎提出 Issues 或 Pull Requests 来改进这个项目！以下是一些贡献指南：

## 如何添加新接口

1. **阅读官方接口文档**: 在 [Tushare 数据接口](https://tushare.pro/document/2) 中找到你要添加的接口文档；
2. **创建模型**: 根据接口分类，在 `src/api` 目录下创建或复用对应英文名的 TypeScript 文件，命名通常为接口的上一级分类，例如 `股票数据/基础数据/股票列表` 对应文件名为 `stockData.ts`；`股票数据/行情数据/历史日线` 对应文件名为 `stockQuotes.ts`；
3. **定义数据模型**: 根据接口会返回的数据结构，使用 `@/model` 中的 `defineModel` 函数定义数据模型，通常命名为 `<接口名>Model`，例如 `getStockBasic` 接口对应的模型为 `StockBasicModel`；
4. **定义查询参数类型**: 根据接口文档中的查询参数，定义一个查询参数类型，通常命名为 `Get<接口名>Params`，例如 `getStockBasic` 接口对应的查询参数类型为 `GetStockBasicParams`；
5. **定义 API 函数**: 使用 `defineApi` 函数定义 API 函数，通常命名为 `<接口名>`，例如 `getStockBasic` 接口对应的函数为 `getStockBasic`；
6. **添加文档注释**: 在模型、查询参数类型和 API 函数上添加 JSDoc 注释，描述其功能和用法；
7. **添加测试**: TODO
