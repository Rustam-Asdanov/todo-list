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

  if (taskList == undefined || taskList === "none") {
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
app.post("/", async (req, res) => {
  const taskName = req.body.taskName;
  const taskList = req.body.taskList;
  await dataBase.addTask(taskName, taskList);
  res.redirect("/?taskList=" + taskList);
});

// delete element
app.get("/delete/:taskList/:ID", (req, res) => {
  const taskList = req.params.taskList;
  const deleteId = req.params.ID;
  dataBase.deleteTask(deleteId, taskList);
  res.redirect("/?taskList=" + taskList);
});

// update task complete or not
app.get("/update/:condition/:taskList/:ID", (req, res) => {
  const taskId = req.params.ID;
  const taskList = req.params.taskList;
  const condition = req.params.condition;
  dataBase.updateTask(taskId, condition);
  res.redirect("/?taskList=" + taskList);
});

app.post("/updateTask", (req, res) => {
  const taskId = req.body.button;
  const taskName = req.body.task;
  const taskList = req.body.taskList;
  dataBase.updateTaskName(taskId, taskName);
  res.redirect("/?taskList=" + taskList);
});

app.get("/newList/:listName", async (req, res) => {
  const listName = req.params.listName;
  await dataBase.addNewList(listName);
  res.redirect("/?taskList=" + listName);
});

app.get("/editListName/:listName/:newListName", async (req, res) => {
  const listName = req.params.listName;
  let newListName = req.params.newListName;
  if (listName !== "Today") {
    await dataBase.editListName(listName, newListName);
  } else {
    newListName = listName;
  }

  res.redirect("/?taskList=" + newListName);
});

app.get("/dropList/:listName", async (req, res) => {
  const listName = req.params.listName;
  if (listName !== "Today") {
    await dataBase.dropList(listName);
  }
  res.redirect("/?taskList=" + "Today");
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
