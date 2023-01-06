const typeList = {
  movie1Ids: [
    { type_id: 1, type_pid: 0, type_name: "电影片" },
    { type_id: 6, type_pid: 1, type_name: "动作片" },
    { type_id: 7, type_pid: 1, type_name: "喜剧片" },
  ],
  movie2Ids: [
    { type_id: 11, type_pid: 1, type_name: "剧情片" },
    { type_id: 12, type_pid: 1, type_name: "战争片" },
  ],
  movie3Ids: [
    { type_id: 8, type_pid: 1, type_name: "爱情片" },
    { type_id: 9, type_pid: 1, type_name: "科幻片" },
    { type_id: 10, type_pid: 1, type_name: "恐怖片" },
  ],
  soap1Ids: [
    { type_id: 2, type_pid: 0, type_name: "连续剧" },
    { type_id: 13, type_pid: 2, type_name: "国产剧" },
  ],
  soap2Ids: [
    { type_id: 16, type_pid: 2, type_name: "欧美剧" },
    { type_id: 21, type_pid: 2, type_name: "台湾剧" },
    { type_id: 23, type_pid: 2, type_name: "海外剧" },
    { type_id: 24, type_pid: 2, type_name: "泰国剧" },
  ],
  soap3Ids: [
    { type_id: 22, type_pid: 2, type_name: "日本剧" },
    { type_id: 14, type_pid: 2, type_name: "香港剧" },
    { type_id: 15, type_pid: 2, type_name: "韩国剧" },
  ],
  zongYiIds: [
    { type_id: 3, type_pid: 0, type_name: "综艺片" },
    { type_id: 25, type_pid: 3, type_name: "大陆综艺" },
    { type_id: 26, type_pid: 3, type_name: "港台综艺" },
    { type_id: 27, type_pid: 3, type_name: "日韩综艺" },
    { type_id: 28, type_pid: 3, type_name: "欧美综艺" },
  ],
  animationIds: [
    { type_id: 4, type_pid: 0, type_name: "动漫片" },
    { type_id: 29, type_pid: 4, type_name: "国产动漫" },
    { type_id: 30, type_pid: 4, type_name: "日韩动漫" },
    { type_id: 31, type_pid: 4, type_name: "欧美动漫" },
    { type_id: 32, type_pid: 4, type_name: "港台动漫" },
    { type_id: 33, type_pid: 4, type_name: "海外动漫" },
  ],
  gameIds: [
    { type_id: 36, type_pid: 0, type_name: "体育" },
    { type_id: 20, type_pid: 1, type_name: "记录片" },
  ],
  specIds: [{ type_id: 34, type_pid: 1, type_name: "伦理片" }],
};

export const movie1Ids = typeList.movie1Ids.map(item => item.type_id);
export const movie2Ids = typeList.movie2Ids.map(item => item.type_id);
export const movie3Ids = typeList.movie3Ids.map(item => item.type_id);
export const soap1Ids = typeList.soap1Ids.map(item => item.type_id);
export const soap2Ids = typeList.soap2Ids.map(item => item.type_id);
export const soap3Ids = typeList.soap3Ids.map(item => item.type_id);
export const zongYiIds = typeList.zongYiIds.map(item => item.type_id);
export const animationIds = typeList.animationIds.map(item => item.type_id);
export const gameIds = typeList.gameIds.map(item => item.type_id);
export const specIds = typeList.specIds.map(item => item.type_id);

export const typeIds = [
  ...movie1Ids,
  ...movie2Ids,
  ...movie3Ids,
  ...soap1Ids,
  ...soap2Ids,
  ...soap3Ids,
  ...zongYiIds,
  ...animationIds,
  ...gameIds,
  ...specIds,
];
