export const badRequest = res => res.status(400).json({ message: "bad request" })

export const internalServerError = res => res.status(500).json({ message: "internal server error" })

export const catchError = (callback, res) => {
	try {
		callback()
	}
	catch(e) {
		return internalServerError(res)
	}
}

export const pushUpdateModel = async (data, model, modelID) => {
	const updatedModel = await model.findByIdAndUpdate(modelID,
		{
			$set: { updatedAt: new Date() },
			$push: data
		},
		{ new: true }
	)

	return updatedModel
}
