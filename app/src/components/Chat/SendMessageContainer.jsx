import React, { useState, useEffect, useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { anonUser } from "../../reducers/anonUser"
import { FaPaperPlane, FaPlus } from "react-icons/fa6"
import ToggleComponent from "../ToggleComponent"
import { SocketContext } from "/src/context/SocketContext.jsx"
import { useNavigate } from "react-router-dom"

const baseURL = "http://localhost:8000"

const SendMessageContainer = props => {
	let creating = props.creating
	const dispatch = useDispatch()
	const anonUserState = useSelector(state => state.anonUser)
	const { name: anonName, seed: anonSeed } = anonUserState

	const [message, setMessage] = useState("")
	const [sessionName, setSessionName] = useState("")
	const [userSeed, setUserSeed] = useState("")
	const [anonNameState, setAnonNameState] = useState("")
	const [isPrivSession, setIsPrivSession] = useState(false)
	const [isError, setIsError] = useState(false)
	const seed = useSelector(state => state.anonUser.seed)

	const { socket } = useContext(SocketContext)
	const navigate = useNavigate()

	useEffect(() => {
		const fetchData = async () => {
			dispatch(anonUser.actions.updateName())
			setUserSeed(anonSeed)
			setAnonNameState(anonName)
		}

		fetchData()
	}, [dispatch, anonSeed, anonName])

	const handleMessageChange = e => {
		setMessage(e.target.value)
	}

	const handleSessionNameChange = e => {
		setSessionName(e.target.value)
	}

	const handlePrivToggle = () => {
		setIsPrivSession(!isPrivSession)
	}

	const handleSubmit = e => {
		e.preventDefault()

		if (creating) return handleCreate()

		let messageObj = { user_id: 0, text_content: message }
		socket.emit("message", {
			sessionId: window.location.pathname.split("/")[2],
			content: messageObj,
			userSeed,
		})

		setMessage("")
	}

	const handleCreate = async () => {
		if (!(sessionName.length, message.length)) return errorTimeOut()

		try {
			const response = await fetch(baseURL + "/session/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					sessionName: sessionName,
					private: isPrivSession,
					message: { text_content: message, user_seed: seed },
				}),
			})

			if (!response.ok) {
				throw new Error("Network response was not ok")
			}

			props.disableCreating()

			const newSessionId = await response.json()
			const url = window.location.protocol + "//" + window.location.host
			window.location.href = url + "/session/" + newSessionId
		} catch (error) {
			console.error("Error during POST request:", error)
		}
	}

	const errorTimeOut = () => {
		setIsError(true)

		const timeout = setTimeout(() => {
			setIsError(false)
		}, 4000)

		return () => clearTimeout(timeout)
	}

	const creatingForm = (
		<div className="flex flex-col">
			<div
				className={`w-full mb-2 flex justify-center transition-opacity ease-in-out ${
					isError ? "opacity-100" : "opacity-0"
				}`}
			>
				<div className="bg-red-200 bg-opacity-20 p-1 rounded-lg border-red-400 border">
					<span className="text-red-400">Fill out all fields.</span>
				</div>
			</div>
			<div className="flex">
				<input
					type="text"
					placeholder="Session Name"
					className="focus:outline-none p-2 mb-2 mr-2 w-full bg-slate-600 rounded-lg text-left"
					value={sessionName}
					onChange={handleSessionNameChange}
				/>
				<div className="translate-y-2">
					<ToggleComponent
						isChecked={isPrivSession}
						onToggle={handlePrivToggle}
						label="Private"
					/>
				</div>
			</div>
		</div>
	)

	return (
		<div className="flex items-center p-2 ">
			<form className="h-full w-full flex flex-col" onSubmit={handleSubmit}>
				{creating && creatingForm}
				<div className="flex">
					<input
						type="text"
						placeholder={`Send ${
							creating ? "the first" : "a"
						} message as ${anonNameState}`}
						className="focus:outline-none p-2 mr-2 w-full bg-slate-600 rounded-lg text-left"
						value={message}
						onChange={handleMessageChange}
					/>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 flex items-center text-white font-bold rounded-full"
					>
						{creating ? (
							<>
								<FaPlus className="mr-1 text-xl" /> Create
							</>
						) : (
							<>
								<FaPaperPlane className="mr-1 text-xl" />
								Send
							</>
						)}
					</button>
				</div>
			</form>
		</div>
	)
}

export default SendMessageContainer
