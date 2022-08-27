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
  let taskList = req.query.taskList;

  if (taskList == undefined) {
    taskList = "Today";
  }

  const myList = await dataBase.getListArray();

  const myTasks = myList.filter((x) => x.name == taskList);

  res.render("main", {
    date: dataBase.getCurrentDate(),
    tasks: myTasks[0].items,
    taskListArray: myList,
    taskListName: taskList,
  });
});

// add new task
app.post("/", (req, res) => {
  const taskName = req.body.taskName;
  const taskList = req.body.taskList;
  dataBase.addTask(taskName, taskList);
  res.redirect("/?taskList=" + taskList);
});

// delete element
app.get("/delete/:taskList/:ID", (req, res) => {
  const taskList = req.params.taskList;
  const deleteId = req.params.ID;
  dataBase.deleteTask(deleteId);
  res.redirect("/?taskList=" + taskList);
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
  const taskList = req.body.taskList;
  dataBase.updateTaskName(taskId, taskName);
  res.redirect("/?taskList=" + taskList);
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
