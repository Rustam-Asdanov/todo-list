const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const URL = require(__dirname + "/private-url.js");

module.exports = {
  addTask,
  getListArray,
  deleteTask,
  updateTask,
  updateTaskName,
  getCurrentDate,
  addNewList,
  dropList,
  editListName,
};

mongoose.connect(URL.mongodbAtlassConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
      name: "Today",
      items: [new Task({ name: "Wash car" }), new Task({ name: "Do sport" })],
    });

    await myList.save();
    list = await List.find()
      .exec()
      .then((array) => {
        return array;
      });
  }

  return list;
}

async function addNewList(listName) {
  const list = new List({
    name: listName,
    items: [],
  });

  await list.save();
}

async function editListName(listName, newListName) {
  await List.findOneAndUpdate({ name: listName }, { name: newListName });
}

async function dropList(listName) {
  await List.deleteOne({ name: listName });
}

async function addTask(taskName, taskList) {
  const taskOne = new Task({
    name: taskName,
    compleated: false,
  });

  const myList = await List.findOne({ name: taskList });
  myList.items.push(taskOne);
  await myList.save();

  // List.findOne({ name: taskList }, async (err, foundList) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     foundList.items.push(taskOne);
  //     await foundList.save();
  //   }
  // });
}

// delete Task from database
function deleteTask(taskId, taskList) {
  List.findOneAndUpdate(
    { name: taskList },
    { $pull: { items: { _id: taskId } } },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// update task in database
function updateTask(taskId, condition) {
  List.updateOne(
    { "items._id": ObjectId(taskId) },
    { $set: { "items.$.compleated": condition } },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success");
      }
    }
  );
}

// update task name
function updateTaskName(taskId, taskName) {
  List.updateOne(
    {
      "items._id": ObjectId(taskId),
    },
    {
      $set: { "items.$.name": taskName },
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Success");
      }
    }
  );
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
