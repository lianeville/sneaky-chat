// import * as React from "react"
// import * as ReactDOM from "react-dom/client"
import "./App.css"
import MessageFeed from "./components/Chat/MessageFeed"
import SessionBoard from "./components/Chat/SessionBoard"
import { Routes, Route } from "react-router-dom"

export default function App() {
	return (
		<div>
			<Routes>
				<Route path="/">
					<Route index element={<SessionBoard />} />
					<Route path="session/:session_id" element={<MessageFeed />} />
				</Route>
			</Routes>
		</div>
	)
}
