const mongoose = require("mongoose");
module.exports = { addTask, getAllTasks, deleteTask, updateTask };

mongoose.connect(
  "mongodb://127.0.0.1:27017/shopDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.1",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const taskSchema = new mongoose.Schema({
  name: String,
  compleated: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

function addTask(taskName) {
  const taskOne = new Task({
    name: taskName,
    compleated: false,
  });

  taskOne.save();
}

async function getAllTasks() {
  let myTasks = await Task.find({})
    .exec()
    .then((elem) => {
      return elem;
    });

  return myTasks;
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
