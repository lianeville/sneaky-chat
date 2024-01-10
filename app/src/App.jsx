import "./App.css"
import MessageFeed from "./components/Chat/MessageFeed"
import SessionBoard from "./components/Chat/SessionBoard"
import { Routes, Route } from "react-router-dom"
import { SocketProvider } from "./context/SocketContext.jsx"
import Header from "./components/Header.jsx"

export default function App() {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			<SocketProvider>
				<Routes>
					<Route path="/">
						<Route index element={<SessionBoard />} />
						<Route path="session/:session_id" element={<MessageFeed />} />
					</Route>
				</Routes>
			</SocketProvider>
		</div>
	)
}
