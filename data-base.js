const mongoose = require("mongoose");
module.exports = {
  addTask,
  getListArray,
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

// Models
const taskSchema = new mongoose.Schema({
  name: String,
  compleated: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

const listSchema = new mongoose.Schema({
  name: String,
  items: [taskSchema],
});

const List = mongoose.model("List", listSchema);

async function getListArray() {
  let list = await List.find()
    .exec()
    .then((array) => {
      return array;
    });

  if (list == "") {
    const myList = new List({
      name: "Work",
    });

    myList.save();
    list = await List.find()
      .exec()
      .then((array) => {
        return array;
      });
  }

  return list;
}

function addTask(taskName, taskList) {
  const taskOne = new Task({
    name: taskName,
    compleated: false,
  });

  List.findOne({ name: taskList }, (err, foundList) => {
    if (err) {
      console.log(err);
    } else {
      foundList.items.push(taskOne);
      foundList.save();
    }
  });
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

// for getting current Date
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
