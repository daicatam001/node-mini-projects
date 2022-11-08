import * as fs from "fs";
import * as request from "request";
import * as path from "path";
import { environment } from "./environments/environment";
import { setTimeout } from "timers/promises";

const download = function (uri, filename) {
  const dir = path.join(__dirname, "assets", "currency-flags");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
      if (err) {
        return reject(err);
      }
      request(uri)
        .pipe(fs.createWriteStream(path.join(dir, filename)))
        .on("close", resolve)
        .on("error", reject);
    });
  });
};

const downloadFlags = async () => {
  for (let i = 0; i < environment.currencyCodes.length; i++) {
    try {
      const currency = environment.currencyCodes[i].toLowerCase();
      await download(
        `https://wise.com/public-resources/assets/flags/rectangle/${currency}.png`,
        `${currency.toUpperCase()}.png`
      );
      await setTimeout(5000);
      console.log(
        `Done: ${currency}. ${i + 1}/${environment.currencyCodes.length}`
      );
    } catch (e) {
      console.log("download image error ", e);
    }
  }
  console.log("Completed");
};

// download(
//   "https://wise.com/public-resources/assets/flags/rectangle/usd.png",
//   path.join(__dirname, "assets", ""),
//   function () {
//     console.log("done");
//   }
// );

downloadFlags();
