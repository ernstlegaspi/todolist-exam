import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
	isDeleted: Boolean,
	isDone: Boolean,
	title: String,
}, { timestamps: true })

export default mongoose.model('Task', taskSchema)
