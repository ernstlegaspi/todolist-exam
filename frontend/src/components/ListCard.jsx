import { useEffect, useState } from "react"
import { FaTrash } from "react-icons/fa6"
import { IoClose, IoCheckmark } from "react-icons/io5"
import { MdEdit } from "react-icons/md"

import { deleteTask, taskDone, updateTask } from "../api/api"

export default function ListCard({ idx, tasksLength, task, userId }) {
	const [isDeleted, setIsDeleted] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [editTask, setEditTask] = useState(task.title)
	const [hasEdited, setHasEdited] = useState(false)
	const [editedValue, setEditedValue] = useState('')
	const [isTaskDone, setIsTaskDone] = useState(false)

	useEffect(() => {
		(async () => {
			setIsTaskDone(task.isDone)
		})()
	}, [])

	const handleDelete = async () => {
		try {
			setIsDeleted(true)
			await deleteTask(task._id, userId)
		}
		catch(e) {
			setIsDeleted(false)
		}
	}

	const handleCancel = () => {
		setIsEditing(false)
		setEditTask('')
	}

	const handleEdit = async () => {
		try {
			setIsEditing(false)
			setEditedValue(editTask)
			setHasEdited(true)
			await updateTask({ taskId: task._id, title: editTask })
		}
		catch(e) {
			setIsEditing(false)
			setHasEdited(false)
			setEditedValue('')
		}
	}

	const handleDone = async () => {
		try {
			setIsTaskDone(true)
			await taskDone({ taskId: task._id })
		}
		catch(e) {
			setIsTaskDone(false)
		}
	}

	if(isDeleted) {
		return null
	}

	return <div className={`
		${idx < tasksLength-1 ? 'border-b border-dark' : ''}
		mb-4 pb-2 flex items-center justify-between relative
	`}>
		{
			isEditing ? <input className="text-gray-500 outline-none w-full mr-4" type="text" placeholder="Edit Task" value={editTask} onChange={e => setEditTask(e.target.value)} />
			: <p>{hasEdited ? editedValue : task.title}</p>
		}
		{
			isEditing ? <div className="flex items-center">
				<IoClose onClick={handleCancel} size={22} className="text-red-500 mr-2 cursor-pointer" />
				<IoCheckmark onClick={handleEdit} size={22} className="text-green-500 cursor-pointer" />
			</div>
			: <div className="flex items-center">
				<MdEdit onClick={() => { setIsEditing(true) }} size={18} className="text-dark cursor-pointer" />
				<FaTrash onClick={handleDelete} size={18} className="mx-3 text-red-500 cursor-pointer" />
				<IoCheckmark onClick={handleDone} size={22} className="text-green-500 cursor-pointer" />
			</div>
		}
		{
			isTaskDone ? <div className="absolute size-full flex items-center justify-center">
				<div className="w-full h-[2px] bg-green-500"></div>
			</div> : null
		}
	</div>
}
