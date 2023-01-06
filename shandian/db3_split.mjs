import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs";

import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

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
const file = join(__dirname, "db3.json");

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
const {
  wujin: { data, propertyList, lastTime },
} = db.data;

const movie1Ids = [1, 7, 8, 9, 10];
const movie2Ids = [6, 21, 22, 38, 40, 43, 12, 11];
const soap1Ids = [22, 13];
const soap2Ids = [16, 17, 18, 19, 23, 15, 14];
const zongYiIds = [3, 25, 26, 27, 28];
const animationIds = [4, 29, 30, 31, 39, 44, 45];
const gameIds = [20, 47, 48, 49, 50, 51, 52];
const specIds = [46];

const movie1Data = {};
const movie2Data = {};
const soap1Data = {};
const soap2Data = {};
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
    case soap1Ids.includes(typeId):
      soap1Data[key] = data[key];
      break;
    case soap2Ids.includes(typeId):
      soap2Data[key] = data[key];
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
  await writeFile(
    `static/movie1.json`,
    JSON.stringify({ data: movie1Data, propertyList, lastTime })
  );
  await writeFile(
    `static/movie2.json`,
    JSON.stringify({ data: movie2Data, propertyList, lastTime })
  );
  await writeFile(
    `static/soap1.json`,
    JSON.stringify({ data: soap1Data, propertyList, lastTime })
  );
  await writeFile(
    `static/soap2.json`,
    JSON.stringify({ data: soap2Data, propertyList, lastTime })
  );
  await writeFile(
    `static/zongYi.json`,
    JSON.stringify({ data: zongYiData, propertyList, lastTime })
  );
  await writeFile(
    `static/animation.json`,
    JSON.stringify({ data: animationData, propertyList, lastTime })
  );
  await writeFile(
    `static/game.json`,
    JSON.stringify({ data: gameData, propertyList, lastTime })
  );
  await writeFile(
    `static/spec.json`,
    JSON.stringify({ data: specData, propertyList, lastTime })
  );
}

splitFiles();
