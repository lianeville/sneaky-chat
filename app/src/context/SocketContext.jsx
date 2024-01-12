import { useSelector } from "react-redux" // Import the useSelector hook
import { createContext, useContext, useEffect } from "react"
import io from "socket.io-client"

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
	const sessionId = window.location.pathname.split("/")[2]
	const userSeed = localStorage.getItem("userSeed")

	const socket = io("http://localhost:8000", {
		query: { sessionId: sessionId, userSeed: userSeed }, // Pass userSeed as a query parameter
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
