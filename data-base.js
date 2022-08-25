const mongoose = require("mongoose");
module.exports = { addTask, getAllTasks };

mongoose.connect(
  "mongodb://127.0.0.1:27017/shopDB?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.1",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const taskSchema = new mongoose.Schema({
  name: String,
});

const Task = mongoose.model("Task", taskSchema);

function addTask(taskName) {
  const taskOne = new Task({
    name: taskName,
  });

  taskOne.save();
}

async function getAllTasks() {
  // let myTasks = Task.find((err, task) => {
  //   if (err) {
  //     return err;
  //   } else {
  //     return task;
  //   }
  // }).exec();

  let myTasks = await Task.find({})
    .exec()
    .then((elem) => {
      return elem;
    });

  console.log(myTasks);
  return myTasks;
}
