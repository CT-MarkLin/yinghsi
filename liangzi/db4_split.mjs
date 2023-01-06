import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import {
  movie1Ids,
  movie2Ids,
  movie3Ids,
  soap1Ids,
  soap2Ids,
  soap3Ids,
  zongYiIds,
  animationIds,
  gameIds,
  specIds,
} from "./constant.mjs";

function writeFile(fileName, content) {
  if (fs.existsSync(fileName)) {
    fs.rmSync(fileName);
  }
  return new Promise((res, rej) => {
    fs.writeFile(fileName, content, (err) => {
      if (err) {
        console.log(err);
        rej(err);
      }
      console.log(fileName, " done");
      res(true);
    });
  });
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, "db4.json");

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
const {
  wujin: { data, propertyList, lastTime },
} = db.data;

const movie1Data = {};
const movie2Data = {};
const movie3Data = {};
const soap1Data = {};
const soap2Data = {};
const soap3Data = {};
const zongYiData = {};
const animationData = {};
const gameData = {};
const specData = {};

Object.keys(data).forEach((key) => {
  const restoreData = JSON.parse(data[key]);
  const typeId = restoreData[5];
  switch (true) {
    case movie1Ids.includes(typeId):
      movie1Data[key] = data[key];
      break;
    case movie2Ids.includes(typeId):
      movie2Data[key] = data[key];
      break;
    case movie3Ids.includes(typeId):
      movie3Data[key] = data[key];
      break;
    case soap1Ids.includes(typeId):
      soap1Data[key] = data[key];
      break;
    case soap2Ids.includes(typeId):
      soap2Data[key] = data[key];
      break;
    case soap3Ids.includes(typeId):
      soap3Data[key] = data[key];
      break;
    case zongYiIds.includes(typeId):
      zongYiData[key] = data[key];
      break;
    case animationIds.includes(typeId):
      animationData[key] = data[key];
      break;
    case specIds.includes(typeId):
      specData[key] = data[key];
      break;
    default:
      gameData[key] = data[key];
      break;
  }
});

async function splitFiles() {
  [
    { key: "movie1", data: movie1Data },
    { key: "movie2", data: movie2Data },
    { key: "movie3", data: movie3Data },
    { key: "soap1", data: soap1Data },
    { key: "soap2", data: soap2Data },
    { key: "soap3", data: soap3Data },
    { key: "zongYi", data: zongYiData },
    { key: "animation", data: animationData },
    { key: "game", data: gameData },
    { key: "spec", data: specData },
  ].forEach(async (item) => {
    await writeFile(
      `static/${item.key}.json`,
      JSON.stringify({ data: item.data, propertyList, lastTime })
    );
  });
}

splitFiles();
