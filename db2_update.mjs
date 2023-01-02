import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { getWujinListFromAPI, sleep, propertyList } from "./common.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db2.json");

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
const { wujin } = db.data;
const lastTime = wujin.lastTime;

async function updateFetch(startPage = 1) {
  const nextTimestamp = new Date().valueOf();
  let isBreak = false;
  for (let i = startPage; i < 100; i++) {
    console.log(
      `---------------${i} start ${new Date().toLocaleTimeString()}---------------`
    );
    const result = await getWujinListFromAPI(i);
    const tempArr = result.list || [];
    for (let i in tempArr) {
      const item = tempArr[i];
      const { vod_time, vod_name, vod_id } = item;
      const tempTimestamp = new Date(vod_time).valueOf();
      if (tempTimestamp < lastTime) {
        wujin.lastTime = nextTimestamp;
        console.log(
          `------break in ${vod_name} ${vod_time}------`
        );
        isBreak = true;
        break;
      }
      const temp = propertyList.map(key => item[key]);
      wujin.data[item.vod_id] = (JSON.stringify(temp));
    }

    await db.write();
    console.log(
      `---------------${i} end ${new Date().toLocaleTimeString()}---------------`
    );
    if (isBreak) {
        break;
    }
    await sleep(1);
  }
}

updateFetch();