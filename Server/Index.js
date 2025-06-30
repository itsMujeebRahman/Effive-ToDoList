const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Model/Todo");

const app = express();
app.use(cors());
app.use(express.json());

//for fetching parent Task
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// for ftching specific parent details
app.get("/get/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findById(id)

    .then((result) => res.json(result))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// for creating parent task
app.post("/add", (req, res) => {
  console.log("taskName");
  const Task = req.body.taskName;
  TodoModel.create({
    taskName: Task,
  })
    .then(async () => {
      return TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.json(err));
});

// for updating task details
app.put("/add/:id", async (req, res) => {
  const { id } = req.params;
  const { taskName, taskComment } = req.body;
  try {
    await TodoModel.findByIdAndUpdate(id, {
      taskName,
      taskComment,
    });

    const result = await TodoModel.find();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// for updating task done or not
app.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const task = await TodoModel.findById(id);
  task.taskDone = !task.taskDone;
  await task
    .save()
    .then(async () => {
      return TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.json(err));
});

//for delting task
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then(async () => {
      return TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.json(err));
});

// for adding subTasks
app.post("/add/:id", (req, res) => {
  const { id } = req.params;
  const { newSubTask } = req.body;
  TodoModel.findByIdAndUpdate(id, { $push: { subTasks: newSubTask } })
    .then(async () => {
      return TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.json(err));
});

//for chcking and unchecking sub Task subTask
app.post("/add/:id/:subId", async (req, res) => {
  const { id, subId } = req.params;

  const task = await TodoModel.findById(id);
  const subTask = task.subTasks.id(subId);

  subTask.subTaskDone = !subTask.subTaskDone;

  await task
    .save()
    .then(async () => {
      return TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.json(err));
});

app.delete("/delete/:id/:subId", async (req, res) => {
  const { id, subId } = req.params;

  const task = await TodoModel.findById(id);
  task.subTasks.pull({ _id: subId });
  await task
    .save()

    .then(async () => {
      return TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.json(err));
});

app.put("/update/:id/:subId", async (req, res) => {
  const { id, subId } = req.params;
  const { newSubTask } = req.body;
  const task = await TodoModel.findById(id);
  const subTask = task.subTasks.id(subId);

  subTask.subTaskName = newSubTask;
  await task
    .save()
    .then(async () => {
      return TodoModel.find()
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }));
    })
    .catch((err) => res.json(err));
});

mongoose.connect("mongodb://localhost:27017/CheckList");

app.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
