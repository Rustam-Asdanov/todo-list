const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("main");
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
