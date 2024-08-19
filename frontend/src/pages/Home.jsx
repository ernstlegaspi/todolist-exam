import { lazy, Suspense, useState } from "react"
import { handleUser } from "../api/api"

const AuthenticatedHome = lazy(() => import("./AuthenticatedHome"))

export default function Home() {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	const isLoggedIn = JSON.parse(localStorage.getItem("user"))

	const handleSubmit = async e => {
		e.preventDefault()

		try {
			setLoading(true)
			const { data } = await handleUser({ name })
			localStorage.setItem("user", JSON.stringify({ "id": data._id, "name": data.name }))
			window.location.reload()
		}
		catch(e) {
			console.log(e)
		}
		finally {
			setLoading(false)
		}
	}

	if(isLoggedIn) {
		return <Suspense fallback={<></>}>
			<AuthenticatedHome id={isLoggedIn.id} name={isLoggedIn.name} />
		</Suspense>
	}

	return <div className="size-full flex flex-col items-center justify-center">
		<h1 className="text-dark text-[40px] font-extrabold">Welcome your list!</h1>
		<p className="text-light-black">Enter your name to proceed.</p>
		<form onSubmit={handleSubmit} className="mt-5">
			<input disabled={loading} value={name} onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Name" className="border-0 border-b p-2 outline-none" />
			<button disabled={loading} type="submit" className="ml-2 p-2 cursor-pointer transition-all rounded-[3px] bg-light-black text-white hover:bg-dark">Continue</button>
		</form>
	</div>
}