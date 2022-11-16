const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("서버");
});

app.listen(3000, () => {
  console.log(`3000번 서버 포트로 대중..`);
});
