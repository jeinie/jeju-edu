const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("클라이언트");
});

app.listen(3100, () => {
  console.log(`3000번 클라이언트 포트로 대중..`);
});
