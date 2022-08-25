const express = require("express");
const bodyParser = require("body-parser");
const dataBase = require(__dirname + "/data-base.js");
const app = express();
const ejs = require("ejs");
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const myArray = ["hello", "it is", "me"];

app.get("/", async (req, res) => {
  const myArray = await dataBase.getAllTasks();
  res.render("main", { tasks: myArray });
});

app.post("/", (req, res) => {
  const taskName = req.body.taskName;
  dataBase.addTask(taskName);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
