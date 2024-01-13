import { useSelector } from "react-redux" // Import the useSelector hook
import { createContext, useContext, useEffect } from "react"
import io from "socket.io-client"
const dbHost = import.meta.env.VITE_DB_HOST

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
	const sessionId = window.location.pathname.split("/")[2]
	const userSeed = localStorage.getItem("userSeed")

	const socket = io(dbHost, {
		path: "/socket.io",
		transports: ["websocket"],
		secure: true,
		query: { sessionId: sessionId, userSeed: userSeed },
	})

	useEffect(() => {
		// Connect to the Socket.io server when the component mounts
		socket.connect()

		// Clean up the Socket.io connection when the component unmounts
		return () => {
			socket.disconnect()
		}
	}, [socket, sessionId, userSeed])

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	)
}
