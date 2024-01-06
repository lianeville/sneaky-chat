import { createContext, useContext, useEffect } from "react"
import io from "socket.io-client"

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
	const socket = io("http://localhost:8000")

	useEffect(() => {
		// Connect to the Socket.io server when the component mounts
		socket.connect()

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
