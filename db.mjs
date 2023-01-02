import axios from "axios";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import { getWujinList, sleep } from "./common.mjs";

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db.json");

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
const { wujin } = db.data;
const lastPage = wujin.lastPage;
const lastTime = wujin.lastTime;

async function firstTimeFetch(startPage = 1) {
  for (let i = startPage; i < 941; i++) {
    console.log(
      `---------------${i} start ${new Date().toLocaleTimeString()}---------------`
    );
    const result = await getWujinList(i);
    // console.log(result);
    result.filter(item => item).forEach(item => {
        const {name, href, type, lastUpdateTime} = item;
        wujin.data[href] = {name, type, lastUpdateTime};
    })
    wujin.lastPage = i;
    await db.write();
    console.log(
      `---------------${i} end ${new Date().toLocaleTimeString()}---------------`
    );
    await sleep(4);
  }
}

firstTimeFetch(lastPage);
