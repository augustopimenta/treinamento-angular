const db = require("diskdb");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const port = 8080;

db.connect(
  "./database",
  ["users", "purchases"]
);

app.use(bodyParser.json());

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use("/v1", require("./routes"));

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});
