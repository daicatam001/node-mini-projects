const { exec } = require("child_process");
const path = require("path");
const inputPath = path.resolve(__dirname, "files", "sample2.pdf");
const outputPath = path.resolve(__dirname, "files", "sample.pdf.png");

exec(
  `magick convert ${inputPath}[0] -quality 100 ${outputPath}`,
  (err, stdout, stderr) => {
    if (err) {
      console.log(err);
    } else {
      console.log("success");
    }
  }
);
