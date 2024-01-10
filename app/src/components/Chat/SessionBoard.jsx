import { Component } from "react"
import ChatSession from "./ChatSession"
import RandomUserSettings from "../randomUserSettings"
import SessionButtons from "../SessionButtons"

const baseURL = "http://localhost:8000"

class SessionBoard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			sessions: [], // Initialize data as an empty array
		}
	}

	fetchSessions = async () => {
		fetch(baseURL + "/sessions")
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then(sessions => {
				console.log("sessions", sessions)
				// Handle the data here (e.g., update the component state)
				this.setState({ sessions })
			})
			.catch(error => {
				console.error("Error fetching data:", error)
			})
	}

	componentDidMount() {
		this.fetchSessions()
	}

	render() {
		const { sessions } = this.state

		return (
			<div className="w-full h-full inset-0 flex flex-col">
				<div className="h-full flex flex-wrap">
					{sessions.map((session, index) => (
						<ChatSession key={index} session={session} />
					))}
				</div>
				{/* <SessionButtons /> */}
				<RandomUserSettings />
			</div>
		)
	}
}

export default SessionBoard
