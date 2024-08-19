import express from 'express'

import { addTask, deleteTask, editTask, getTasks, handleUser, taskDone } from '../controllers/user.js'

const router = express.Router()

router.get("/tasks/:userId", getTasks)

router.post("/task", addTask)
router.post("/user", handleUser)

router.delete("/task/:taskId/:userId", deleteTask)
router.put("/task", editTask)
router.put("/task/done", taskDone)

export default router
