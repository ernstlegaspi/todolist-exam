import axios from 'axios'

const api = axios.create({ baseURL: "http://localhost:3001" })

export const handleUser = name => api.post("/user", name)

export const addTask = data => api.post('/task', data)
export const deleteTask = (taskId, userId) => api.delete(`/task/${taskId}/${userId}`)
export const getTasks = userId => api.get(`/tasks/${userId}`)
export const updateTask = data => api.put(`/task`, data)
export const taskDone = data => api.put(`/task/done`, data)
