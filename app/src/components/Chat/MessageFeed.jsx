import { Component } from "react"
import MessageContainer from "./MessageContainer"
import SendMessageContainer from "./SendMessageContainer"

class MessageFeed extends Component {
	componentDidMount() {
		console.log("hiiii")
		fetch("http://localhost:8000/")
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then(data => {
				// Handle the data here (e.g., update the component state)
				console.log(data)
			})
			.catch(error => {
				console.error("Error fetching data:", error)
			})
	}

	render() {
		return (
			<div className="w-full absolute inset-0 flex flex-col-reverse">
				<SendMessageContainer />
				<div className=" ">
					<MessageContainer />
				</div>
			</div>
		)
	}
}

export default MessageFeed
