import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	name: {
		required: true,
		type: String
	},
	tasks: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Task'
	}]
}, { timestamps: true })

export default mongoose.model('User', userSchema)
