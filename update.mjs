import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { JSDOM } from "jsdom";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { getWujinList } from "./index.mjs";

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
  for (let i = startPage; i < 100; i++) {
    console.log(
      `---------------${i} start ${new Date().toLocaleTimeString()}---------------`
    );
    const result = await getWujinList(i);

    for (item in result.filter((item) => item)) {
      const { name, href, type, lastUpdateTime } = item;
      const tempTimestamp = new Date(lastUpdateTime).valueOf();
      if (tempTimestamp < lastTime) {
        wujin.lastTime = nextTimestamp;
        console.log(
          `------break in ${name} ${lastUpdateTime}------`
        );
        break;
      }
      wujin.data[href] = { name, type, lastUpdateTime };
    }

    await db.write();
    console.log(
      `---------------${i} end ${new Date().toLocaleTimeString()}---------------`
    );
    await sleep(4);
  }
}

updateFetch();