const mongoose = require("mongose");

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

export function addTask(taskName) {
  const taskOne = new Task({
    name: taskName,
  });

  taskOne.save();
}
