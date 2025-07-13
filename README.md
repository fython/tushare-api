# tushare-api

A third-party [Tushare](https://tushare.pro/) API client for Node.js with TypeScript support.

Based on the official Tushare API ([通过HTTP获取数据](https://tushare.pro/document/1?doc_id=130))

If you have any questions or issues, please feel free to open an issue or discuss in the [Discussions](https://github.com/fython/tushare-api/discussions).

## Installation

```bash
npm install @siubeng/tushare-api
```

## Usage

Creates a Tushare Client instance with your token and use it to call API methods.

```typescript
import { TushareClient } from '@siubeng/tushare-api';

const client = new TushareClient('<YOUR_TOKEN_HERE>');
```

Functions declared as a `TushareApi` type in type declartion files are API methods that can be called with the client instance. The first parameter is the client instance, and the second parameter is an object containing query parameters.

```typescript
import { getStockBasic } from '@siubeng/tushare-api';

getStockBasic(client, { ts_code: '000001.SH' })
  .then((res) => console.log('data': res))
  .then((err) => console.error(err));
```

More examples can be found in the [examples](./examples) directory.

## Contributing

Learn more about how to contribute to this project in the [CONTRIBUTING](CONTRIBUTING.md) file.

## References

- [Tushare 数据获取方式](https://tushare.pro/document/1?doc_id=129)
- [Tushare 数据接口](https://tushare.pro/document/2)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Siubeng
