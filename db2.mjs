import axios from "axios";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { getWujinListFromAPI, sleep, propertyList } from "./common.mjs";


// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db2.json");

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
const { wujin } = db.data;
const lastPage = wujin.lastPage;
wujin.propertyList = propertyList;

async function firstTimeFetch(startPage = 1) {
  for (let i = startPage; i < 2353; i++) {
    console.log(
      `---------------${i} start ${new Date().toLocaleTimeString()}---------------`
    );
    const result = await getWujinListFromAPI(i);
    // console.log(result.list);
    (result.list || []).forEach((item) => {
      const temp = propertyList.map(key => item[key]);
      wujin.data[item.vod_id] = (JSON.stringify(temp));
    });
    wujin.lastPage = i;
    await db.write();
    console.log(
      `---------------${i} ${(i/2353*100).toFixed(3)}% end ${new Date().toLocaleTimeString()} ${
        result.list.length
      }---------------`
    );
    await sleep(1);
  }
}

firstTimeFetch(lastPage);
