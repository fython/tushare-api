import 'dotenv/config';
import { writeFile } from 'fs/promises';

import { getStockBasic } from '../../src/api';
import { TushareClient } from '../../src/client';

const client = new TushareClient(process.env.TUSHARE_TOKEN!);

async function writeJSONToFile(filename: string, data: unknown): Promise<void> {
  const jsonData = JSON.stringify(data, null, 2);
  await writeFile(filename, jsonData);
  console.log(`Data written to ${filename}`);
}

writeJSONToFile('tmp/test.json', {});

getStockBasic(client, {})
  .then((data) => {
    console.log('getStockBasic result:', data);
    return writeJSONToFile('tmp/stock_basic.json', data);
  })
  .catch((error) => {
    console.error('Error fetching stock basic data:', error);
  });
