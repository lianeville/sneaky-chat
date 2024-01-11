import { useSelector } from "react-redux" // Import the useSelector hook
import { createContext, useContext, useEffect } from "react"
import io from "socket.io-client"
import currentSession from "../reducers/currentSession"

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
	const socket = io("http://localhost:8000")

	const currentSessionValue = useSelector(state => state.currentSession)

	useEffect(() => {
		// Connect to the Socket.io server when the component mounts
		socket.connect()

		socket.emit("setSession", currentSessionValue)

		// Clean up the Socket.io connection when the component unmounts
		return () => {
			socket.disconnect()
		}
	})

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	)
}
