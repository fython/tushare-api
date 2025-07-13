import 'dotenv/config';

import { getIndexDaily } from '../../src/api';
import { TushareClient } from '../../src/client';

const client = new TushareClient(process.env.TUSHARE_TOKEN!);

getIndexDaily(client, {
  ts_code: '000001.SH',
  start_date: '20250101',
  end_date: '20250711',
})
  .then((data) => {
    console.log('getIndexDaily result:', data);
  })
  .catch((error) => {
    console.error('Error fetching index daily data:', error);
  });
