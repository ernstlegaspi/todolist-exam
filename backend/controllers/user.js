import Task from '../models/task.js'
import User from '../models/user.js'

import { badRequest, catchError, pushUpdateModel } from '../utils/utils.js'

export const handleUser = async (req, res) => {
	catchError(async () => {
		let { name } = req.body

		if(name === "" || !/^[a-zA-Z\s]+$/.test(name)) {
			return badRequest(res)
		}
	
		name = name.toLowerCase().trim()
	
		const findUser = await User.findOne({ name })
	
		if(!findUser) {
			const user = await new User({ name }).save()
			return res.status(201).json(user)
		}
	
		return res.status(200).json(findUser)
	}, res)
}

export const addTask = async (req, res) => {
	catchError(async () => {
		const { title, userId } = req.body

		const newTask = await new Task({
			isDeleted: false,
			isDone: false,
			title
		}).save()

		await pushUpdateModel({ tasks: newTask._id }, User, userId)

		const tasks = await User.findById(userId).populate("tasks").exec()
		
		return res.status(201).json(tasks.tasks.reverse())
	}, res)
}

export const getTasks = async (req, res) => {
	catchError(async () => {
		const { userId } = req.params

		if(!userId) return badRequest(res)

		const tasks = await User.findById(userId).populate("tasks").exec()

		if(!tasks) return res.status(200).json({ message: "no tasks found" })

		return res.status(200).json(tasks.tasks.reverse())
	}, res)
}

export const deleteTask = async (req, res) => {
	catchError(async () => {
		const { taskId, userId } = req.params

		if(!taskId || !userId) return badRequest(res)

		await Task.findByIdAndUpdate(taskId,
			{ isDeleted: true },
			{ new: true }
		)

		await User.findByIdAndUpdate(userId,
			{ $pull: { tasks: taskId } },
			{ new: true },
		)

		return res.status(200).json({ message: "task deleted" })
	}, res)
}

export const editTask = async (req, res) => {
	catchError(async () => {
		const { taskId, title } = req.body

		if(!taskId || !title) return badRequest(res)

		await Task.findByIdAndUpdate(taskId,
			{ $set: { title } },
			{ new: true }
		)

		return res.status(200).json({ message: "task updated" })
	}, res)
}

export const taskDone = async (req, res) => {
	catchError(async () => {
		const { taskId } = req.body

		if(!taskId) return badRequest(res)

		await Task.findByIdAndUpdate(taskId,
			{ $set: { isDone: true } },
			{ new: true }
		)

		return res.status(200).json({ message: "task updated" })
	}, res)
}
