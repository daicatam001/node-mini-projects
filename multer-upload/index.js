const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: "./upload/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({
  storage: diskStorage,
  fileFilter(req, file, cb) {
    console.log(file);
    cb(null, true);
  },
});
const memoryStorage = multer.memoryStorage();
const memoryUpload = multer({
  storage: memoryStorage,
  fileFilter(req, file, cb) {
    console.log("filter");
    cb(null);
  },
});
app.listen(5000, () => {
  console.log("Server on running");
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "views", "index.html"));
});

app.post("/profile", upload.single("avatar"), (req, res) => {
  console.log(req.file);
  res.sendFile(path.resolve(__dirname, "views", "index.html"));
});
app.post("/profile/memory", memoryUpload.single("avatar"), (req, res) => {
  console.log(req.file);
  res.sendFile(path.resolve(__dirname, "views", "index.html"));
});
