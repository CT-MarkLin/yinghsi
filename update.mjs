import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { getWujinList, sleep } from "./common.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

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
    const result = await getWujinList(i);
    const tempArr = result.filter((item) => item);
    for (let i in tempArr) {
      const item = tempArr[i];
      const { name, href, type, lastUpdateTime } = item;
      const tempTimestamp = new Date(lastUpdateTime).valueOf();
      if (tempTimestamp < lastTime) {
        wujin.lastTime = nextTimestamp;
        console.log(
          `------break in ${name} ${lastUpdateTime}------`
        );
        isBreak = true;
        break;
      }
      wujin.data[href] = { name, type, lastUpdateTime };
    }

    await db.write();
    console.log(
      `---------------${i} end ${new Date().toLocaleTimeString()}---------------`
    );
    if (isBreak) {
        break;
    }
    await sleep(4);
  }
}

updateFetch();