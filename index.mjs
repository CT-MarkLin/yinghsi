import axios from "axios";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { JSDOM } from "jsdom";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const initData = {
  wujin: {
    data: [],
    lastPage: 1,
    lastTime: "",
  },
};

export function sleep(time) {
  return new Promise((res) => setTimeout(() => res(), time * 1000));
}

export async function getWujinList(page = 1) {
  const html = await axios.get(
    `https://www.wujinzy.com/index.php/index/index/page/${page}.html`
  );
  // console.log(html.data);
  const { document } = new JSDOM(html.data).window;
  const dataList = document.querySelectorAll(".xing_vb ul");
  return Array.from(dataList).map((item) => {
    const data1 = item.querySelector(".xing_vb4 a");
    const data2 = item.querySelector(".xing_vb5");
    const data3 = item.querySelector(".xing_vb7");
    if (!data1) {
      return;
    }
    const result = {
      name: data1.textContent.replace(/\s/g, ""),
      href: data1.href,
      type: data2.textContent,
      lastUpdateTime: data3.textContent,
    };
    return result;
  });
  // console.log(data.href);
  // console.log(data.textContent);
}

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

// const result = await getWujinList();
// wujin.data.push("hello world");

// await db.write();
