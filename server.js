const express = require("express");
const bodyParser = require("body-parser");
const dataBase = require(__dirname + "/data-base.js");
const app = express();
const ejs = require("ejs");
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const myArray = await dataBase.getAllTasks();
  res.render("main", { date: dataBase.getCurrentDate(), tasks: myArray });
});

app.post("/", (req, res) => {
  const taskName = req.body.taskName;
  dataBase.addTask(taskName);
  res.redirect("/");
});

app.get("/delete/:ID", (req, res) => {
  const deleteId = req.params.ID;
  console.log(deleteId);
  dataBase.deleteTask(deleteId);
  res.redirect("/");
});

app.get("/update/:condition/:ID", (req, res) => {
  const taskId = req.params.ID;
  const condition = req.params.condition;
  dataBase.updateTask(taskId, condition);
  res.redirect("/");
});

app.post("/updateTask", (req, res) => {
  const taskId = req.body.button;
  const taskName = req.body.task;
  dataBase.updateTaskName(taskId, taskName);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
