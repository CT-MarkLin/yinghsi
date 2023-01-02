import axios from "axios";

import { JSDOM } from "jsdom";

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
      href: data1.href && data1.href.match(/id\/(\d+)\./)[1],
      type: data2.textContent,
      lastUpdateTime: data3.textContent,
    };
    return result;
  });
  // console.log(data.href);
  // console.log(data.textContent);
}

export async function getWujindetail(id = "") {
  const html = await axios.get(
    `https://www.wujinzy.com/index.php/vod/detail/id/${id}.html`
  );
  // console.log(html.data);
  // const { document } = new JSDOM(html.data).window;
  const regLink = /\/>.+?\$https.+?</g;
  const result = html.data.match(regLink) || [];
  return result
    .filter((item) => !item.includes(".m3u8"))
    .map((item) => item.replace("/>", "").replace("<", "").split("$"));
}
