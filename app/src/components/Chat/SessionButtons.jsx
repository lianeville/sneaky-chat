import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const baseURL = "http://localhost:8000"

const SessionButtons = () => {
	const [creatingSession, setCreatingSession] = useState(false)
	const [joiningPrivSession, setJoiningPrivSession] = useState(false)
	const [isPrivSession, setIsPrivSession] = useState(false)
	const [sessionName, setSessionName] = useState("")
	const [sessionPass, setSessionPass] = useState("")

	const navigate = useNavigate()

	const handleCreating = () => {
		setCreatingSession(true)
	}

	const handleToggle = () => {
		setIsPrivSession(prevIsPrivSession => !prevIsPrivSession)
	}

	const handleCreate = async () => {
		console.log(sessionName, sessionPass)
		try {
			const response = await fetch(baseURL + "/session/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					sessionName: sessionName,
					password: sessionPass,
				}),
			})

			if (!response.ok) {
				throw new Error("Network response was not ok")
			}

			const newSessionId = await response.json()

			navigate("/session/" + newSessionId)

			console.log(newSessionId)
		} catch (error) {
			console.error("Error during POST request:", error)
		}
	}

	const handleCancel = () => {
		setCreatingSession(false)
		setJoiningPrivSession(false)
		setIsPrivSession(false)
	}

	const handleNameInput = e => {
		setSessionName(e.target.value)
	}

	const handlePassInput = e => {
		setSessionPass(e.target.value)
	}

	return (
		<div className="w-full flex justify-center">
			<div className="w-full max-w-md">
				{creatingSession && (
					<div className="flex flex-col w-full p-1">
						<div className="flex flex-col w-full">
							<div className="w-full flex flex-col pb-2 mr-1">
								<label className="w-full">
									Session Name
									<input
										type="text"
										placeholder="Session Name"
										value={sessionName}
										onChange={handleNameInput}
										className="block w-full appearance-none bg-slate-300 text-gray-900 p-1 rounded"
									/>
								</label>
							</div>
							<div className="flex justify-between items-center">
								<label
									className="w-full mr-3"
									style={{
										visibility: isPrivSession ? "visible" : "hidden",
									}}
								>
									Password
									<input
										type="text"
										placeholder="Password"
										value={sessionPass}
										onChange={handlePassInput}
										className="block w-full appearance-none bg-slate-300 text-gray-900 p-1 rounded"
									/>
								</label>
								<label className="h-full ml-auto whitespace-nowrap">
									Private Session
									<input
										type="checkbox"
										checked={isPrivSession}
										onChange={handleToggle}
										className="mx-1"
									/>
								</label>
							</div>
						</div>

						<div className="w-full flex justify-center mt-3">
							<div className="flex ml-auto">
								<button className="w-full mr-1" onClick={handleCancel}>
									Cancel
								</button>
								<button className="w-full ml-1" onClick={handleCreate}>
									Create
								</button>
							</div>
						</div>
					</div>
				)}
				{!creatingSession && !joiningPrivSession && (
					<div className="flex w-full">
						<button className="w-full mx-1" onClick={handleCreating}>
							Create Session
						</button>
						<button className="w-full mx-1">Join Private Session</button>
					</div>
				)}
			</div>
		</div>
	)
}

export default SessionButtons
