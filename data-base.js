const mongoose = require("mongoose");
module.exports = {
  addTask,
  getAllTasks,
  getAllTaskType,
  deleteTask,
  updateTask,
  updateTaskName,
  getCurrentDate,
};

mongoose.connect(
  "mongodb://127.0.0.1:27017/shopDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.1",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const taskSchema = new mongoose.Schema({
  name: String,
  taskType: String,
  compleated: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

function addTask(taskName, taskTypeName) {
  const taskOne = new Task({
    name: taskName,
    taskType: taskTypeName,
    compleated: false,
  });

  taskOne.save();
}

async function getAllTasks(taskTypeName) {
  let myTasks = await Task.find({ taskType: taskTypeName })
    .exec()
    .then((elem) => {
      return elem;
    });

  return myTasks;
}

async function getAllTaskType() {
  const myTaskType = await Task.find().distinct("taskType");
  return myTaskType;
}

function deleteTask(taskId) {
  Task.deleteOne({ _id: taskId }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully deleted");
    }
  });
}

function updateTask(taskId, condition) {
  Task.updateOne({ _id: taskId }, { compleated: condition }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully updated");
    }
  });
}

function updateTaskName(taskId, taskName) {
  Task.updateOne({ _id: taskId }, { name: taskName }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully updated");
    }
  });
}

function getCurrentDate() {
  const today = new Date();
  const weekday = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  );

  const months = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  );

  const currentWeekday = weekday[today.getDay()];
  const currentDayOfMonth = today.getDate();
  const currentMonth = months[today.getMonth()];

  return `${currentWeekday}, ${currentMonth} ${currentDayOfMonth}`;
}
