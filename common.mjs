import axios from "axios";

import { JSDOM } from "jsdom";

const initData = {
  wujin: {
    data: {},
    lastPage: 1,
    lastTime: "",
    propertyList: []
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


export async function getWujinListFromAPI(page = 1) {
  const res = await axios.get(
    `https://api.wujinapi.me/api.php/provide/vod/from/wjm3u8/?ac=detail&pg=${page}`
  );
  return res.data;
  // console.log(data.href);
  // console.log(data.textContent);
}

export async function getShandianListFromAPI(page = 1) {
  const res = await axios.get(
    `https://sdzyapi.com/api.php/provide/vod/?ac=detail&pg=${page}`
  );
  return res.data;
}

export async function getLiangZiListFromAPI(page = 1) {
  const res = await axios.get(
    `https://cj.lziapi.com/api.php/provide/vod/?ac=detail&pg=${page}`
  );
  return res.data;
}

export const propertyList = [
  "vod_id",
  "vod_name",
  "type_name",
  "vod_area",
  "group_id",
  "type_id",
  "type_id_1",
  "vod_actor",
  "vod_author",
  "vod_behind",
  "vod_blurb",
  "vod_class",
  "vod_color",
  "vod_content",
  "vod_copyright",
  "vod_director",
  "vod_douban_id",
  "vod_douban_score",
  "vod_down",
  "vod_down_from",
  "vod_down_note",
  "vod_down_server",
  "vod_down_url",
  "vod_duration",
  "vod_en",
  "vod_hits",
  "vod_hits_day",
  "vod_hits_month",
  "vod_hits_week",
  "vod_isend",
  "vod_jumpurl",
  "vod_lang",
  "vod_letter",
  "vod_level",
  "vod_lock",
  "vod_pic",
  "vod_pic_screenshot",
  "vod_pic_slide",
  "vod_pic_thumb",
  "vod_play_from",
  "vod_play_note",
  "vod_play_server",
  "vod_play_url",
  "vod_plot",
  "vod_plot_detail",
  "vod_plot_name",
  "vod_points",
  "vod_points_down",
  "vod_points_play",
  "vod_pubdate",
  "vod_pwd",
  "vod_pwd_down",
  "vod_pwd_down_url",
  "vod_pwd_play",
  "vod_pwd_play_url",
  "vod_pwd_url",
  "vod_rel_art",
  "vod_rel_vod",
  "vod_remarks",
  "vod_reurl",
  "vod_score",
  "vod_score_all",
  "vod_score_num",
  "vod_serial",
  "vod_state",
  "vod_status",
  "vod_sub",
  "vod_tag",
  "vod_time",
  "vod_time_add",
  "vod_time_hits",
  "vod_time_make",
  "vod_total",
  "vod_tpl",
  "vod_tpl_down",
  "vod_tpl_play",
  "vod_trysee",
  "vod_tv",
  "vod_up",
  "vod_version",
  "vod_weekday",
  "vod_writer",
  "vod_year",
];

const typeList = [
  { "type_id": 1, "type_name": "??????" },
  { "type_id": 2, "type_name": "?????????" },
  { "type_id": 3, "type_name": "??????" },
  { "type_id": 4, "type_name": "??????" },
  { "type_id": 5, "type_name": "??????" },
  { "type_id": 6, "type_name": "?????????" },
  { "type_id": 7, "type_name": "?????????" },
  { "type_id": 8, "type_name": "?????????" },
  { "type_id": 9, "type_name": "?????????" },
  { "type_id": 10, "type_name": "?????????" },
  { "type_id": 11, "type_name": "?????????" },
  { "type_id": 12, "type_name": "?????????" },
  { "type_id": 13, "type_name": "?????????" },
  { "type_id": 14, "type_name": "?????????" },
  { "type_id": 15, "type_name": "?????????" },
  { "type_id": 16, "type_name": "?????????" },
  { "type_id": 17, "type_name": "??????" },
  { "type_id": 18, "type_name": "??????" },
  { "type_id": 20, "type_name": "?????????" },
  { "type_id": 21, "type_name": "?????????" },
  { "type_id": 22, "type_name": "?????????" },
  { "type_id": 23, "type_name": "?????????" },
  { "type_id": 24, "type_name": "?????????" },
  { "type_id": 25, "type_name": "????????????" },
  { "type_id": 26, "type_name": "????????????" },
  { "type_id": 27, "type_name": "????????????" },
  { "type_id": 28, "type_name": "????????????" },
  { "type_id": 29, "type_name": "????????????" },
  { "type_id": 30, "type_name": "????????????" },
  { "type_id": 31, "type_name": "????????????" },
  { "type_id": 32, "type_name": "?????????" },
  { "type_id": 33, "type_name": "?????????" },
  { "type_id": 34, "type_name": "?????????" },
  { "type_id": 35, "type_name": "?????????" },
  { "type_id": 36, "type_name": "????????????" },
  { "type_id": 37, "type_name": "??????" },
  { "type_id": 38, "type_name": "????????????" },
  { "type_id": 39, "type_name": "????????????" }
]


// ????????? https://github.com/imfht/maccms/blob/master/%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E%E6%96%87%E6%A1%A3/API%E6%8E%A5%E5%8F%A3%E8%AF%B4%E6%98%8E.txt
// ?????????????????????
// ac=videolist ????????????
// ?????? ids=??????ID?????????ID???????????????
//      t=??????ID
//      pg=??????
//      h=?????????????????????


// ?????????????????????
// ac=list
// t=??????ID
// pg=??????
// wd=???????????????
// h=?????????????????????
// ????????? api.php?ac=list&t=1&pg=5   ??????ID???1??????????????????5???

