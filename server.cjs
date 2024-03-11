const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.use("/*", (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get("/", (req, res) => {
  res.status(200);
  res.send("Suuuuuu!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});