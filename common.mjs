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


// 参考： https://github.com/imfht/maccms/blob/master/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3/API%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E.txt
// 内容接收参数：
// ac=videolist 采集数据
// 参数 ids=数据ID，多个ID逗号分割。
//      t=类型ID
//      pg=页码
//      h=几小时内的数据


// 列表接收参数：
// ac=list
// t=类别ID
// pg=页码
// wd=搜索关键字
// h=几小时内的数据
// 例如： api.php?ac=list&t=1&pg=5   分类ID为1的列表数据第5页

