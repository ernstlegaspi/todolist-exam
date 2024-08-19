import { useEffect, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { IoClose, IoCheckmark } from "react-icons/io5"

import { addTask, getTasks } from "../api/api"
import ListCard from "../components/ListCard"

export default function AuthenticatedHome({ id, name }) {
	const [loading, setLoading] = useState(false)
	const [isAddingTask, setIsAddingTask] = useState(false)
	const [tasks, setTasks] = useState([])
	const [title, setTitle] = useState('')
	const [disabled, setDisabled] = useState(false)

	useEffect(() => {
		(async () => {
			try {
				setLoading(true)
				const { data } = await getTasks(id)
				setTasks(data)
			}
			catch(e) {
				setTasks([])
			}
			finally {
				setLoading(false)
			}
		})()
	}, [])

	const handleCancel = () => {
		if(disabled) return
		setIsAddingTask(false)
		setTitle('')
	}

	const handleAddTask = async () => {
		if(disabled) return

		try {
			setDisabled(true)
			const { data } = await addTask({ title, userId: id })
			setTasks(data)
			setTitle('')
		}
		catch(e) {

		}
		finally {
			setDisabled(false)
		}
	}

	const handleLogout = () => {
		localStorage.clear()
		window.location.reload()
	}

	return <div className="relative size-full flex flex-col justify-center items-center">
		<div className="w-[18%] mx-auto flex items-center justify-between mb-4">
			<h1 className="font-bold text-[22px]">Your Todos</h1>
			<button className="border border-dark rounded cursor-pointer transition-all text-dark hover:text-white hover:bg-dark px-4 py-2" onClick={handleLogout}>Logout</button>
		</div>
		<div className="bg-white rounded-[5px] black-shadow w-[400px] h-[70%]">
			{
				isAddingTask ? <div className="flex px-4">
					<input disabled={disabled} value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder="New task" className="flex-1 outline-none border-b border-dark py-2 px-1" />
					<div className="flex items-center ml-4 mt-[10px]">
						<IoClose onClick={handleCancel} size={22} className="text-red-500 mr-2 cursor-pointer" />
						<IoCheckmark onClick={handleAddTask} size={22} className="text-green-500 cursor-pointer" />
					</div>
				</div>
				: <div className="w-full flex justify-end">
					<div onClick={() => { setIsAddingTask(true) }} className="flex items-center mt-4 mr-4 cursor-pointer transition-all rounded-[5px] p-2 pr-3 border border-dark text-dark w-max hover:bg-dark hover:text-white">
						<IoMdAdd size={22} className="mr-2" />
						<p>Add Task</p>
					</div>
				</div>
			}
			{
				loading ? <p className="mt-4 ml-4">Loading..</p>
				: !loading && tasks.length < 1 ? <p className="mt-4 ml-4">You have currently no tasks.</p>
				: <div className="p-4">
					{tasks.map((task, idx) => <ListCard key={idx} idx={idx} tasksLength={tasks.length} task={task} userId={id} />)}
				</div>
			}
		</div>
	</div>
}
