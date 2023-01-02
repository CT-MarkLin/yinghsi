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
const file = join(__dirname, "db2.json");

// Configure lowdb to write to JSONFile
const adapter = new JSONFile(file);
const db = new Low(adapter);

await db.read();
const {
  wujin: { data, propertyList, lastTime },
} = db.data;

const movieIds = [1, 6, 7, 8, 9, 10, 11, 12, 21, 32, 33, 34, 35, 36];
const soapIds = [2, 13, 14, 15, 16, 22, 23, 24, 37];
const zongYiIds = [3, 25, 26, 27, 28];
const animationIds = [4, 29, 30, 31];
const gameIds = [5, 17, 18, 38, 39];
const specIds = [20];

const movieData = {};
const soapData = {};
const zongYiData = {};
const animationData = {};
const gameData = {};
const specData = {};

Object.keys(data).forEach((key) => {
  const restoreData = JSON.parse(data[key]);
  const typeId = restoreData[5];
  switch (true) {
    case movieIds.includes(typeId):
        movieData[key] = data[key];
        break;
    case soapIds.includes(typeId):
        soapData[key] = data[key];
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
    await writeFile(`static/movie.json`, JSON.stringify({data: movieData, propertyList, lastTime}));
    await writeFile(`static/soap.json`, JSON.stringify({data: soapData, propertyList, lastTime}));
    await writeFile(`static/zongYi.json`, JSON.stringify({data: zongYiData, propertyList, lastTime}));
    await writeFile(`static/animation.json`, JSON.stringify({data: animationData, propertyList, lastTime}));
    await writeFile(`static/game.json`, JSON.stringify({data: gameData, propertyList, lastTime}));
    await writeFile(`static/spec.json`, JSON.stringify({data: specData, propertyList, lastTime}));
}

splitFiles();