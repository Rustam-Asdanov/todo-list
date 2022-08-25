const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
const port = 3000;

import { addTask as createTask } from "./data-base";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const myArray = ["hello", "it is", "me"];

app.get("/", (req, res) => {
  res.render("main", { tasks: myArray });
});

app.post("/", (req, res) => {
  const taskName = req.body.taskName;
  console.log(taskName);
  myArray.push(taskName);
  createTask(taskName);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
