import { Router } from "express";
import Task from "../models/task_schema.js";
import protectApi from "../utils/protection.js";

const taskRoutes = Router();

//Create a post
taskRoutes.post("/task/create", protectApi, async (req, res) => {
  try {
    const action = await Task.create(req.body);
    return res.json(
      action ? { result: true, task: action } : { result: false }
    );
  } catch (error) {
    res.status(401).json({ error });
  }
});

//Read all post
taskRoutes.get("/task/get-tasks/:email", protectApi, async (req, res) => {
  try {
    let email = req.params.email;
    const tasks = await Task.find({ email });
    console.log(tasks);
    return res.json({ tasks });
  } catch (error) {
    res.status(404).json({ error });
    console.log(error);
  }
});

//delete a post
taskRoutes.delete("/task/delete/:id", protectApi, async (req, res) => {
  try {
    let id = req.params.id;
    const action = await Task.findByIdAndDelete(id);
    return res.json(action ? { result: true } : { result: false });
  } catch (error) {
    res.status(401).json({ error });
  }
});

//update a post
taskRoutes.put("/task/update/:id", protectApi, async (req, res) => {
  try {
    let id = req.params.id;
    console.log(id);
    let update = req.body;
    const action = await Task.findByIdAndUpdate(id, update);
    return res.json(action ? { result: true } : { result: false });
  } catch (error) {
    res.status(401).json({ error });
  }
});

export default taskRoutes;
