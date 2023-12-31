import { Component } from "react"
import MessageContainer from "./MessageContainer"
import SendMessageContainer from "./SendMessageContainer"
// const socket = new WebSocket("ws://localhost:8000")

const baseURL = "http://localhost:8000"

class MessageFeed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			messages: [], // Initialize data as an empty array
		}
	}

	componentDidMount() {
		fetch(baseURL + window.location.pathname)
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then(messages => {
				console.log("messages", messages)
				// Handle the data here (e.g., update the component state)
				this.setState({ messages })
			})
			.catch(error => {
				console.error("Error fetching data:", error)
			})
	}

	render() {
		const { messages } = this.state

		return (
			<div className="w-full absolute inset-0 flex flex-col-reverse">
				<SendMessageContainer />
				<div className="h-full overflow-y-scroll">
					{messages.map((message, index) => (
						<MessageContainer key={index} message={message} />
					))}
				</div>
			</div>
		)
	}
}

export default MessageFeed
