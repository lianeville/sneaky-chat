import { Component } from "react"
import { SocketContext } from "/src/context/SocketContext.jsx"

class SendMessageContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			message: "", // State variable to store the input value
		}
	}

	static contextType = SocketContext

	// Event handler to update the message state
	handleMessageChange = e => {
		this.setState({ message: e.target.value })
	}

	// Event handler to handle form submission
	handleSubmit = async e => {
		const { socket } = this.context

		e.preventDefault()

		let message = { user_id: 0, text_content: this.state.message }

		socket.emit("message", {
			sessionId: window.location.pathname.split("/")[2], // fix this pls
			content: message,
		})
		this.setState({ message: "" })
	}

	render() {
		return (
			<div className="flex items-center p-2">
				<form className="w-full flex" onSubmit={this.handleSubmit}>
					<input
						type="text"
						placeholder="Start a new message"
						className="p-2 mr-2 w-full bg-slate-600 rounded-lg text-left"
						value={this.state.message} // Bind input value to the state
						onChange={this.handleMessageChange} // Update state on input change
					></input>
					<button
						type="submit"
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full"
					>
						Send
					</button>
				</form>
			</div>
		)
	}
}

export default SendMessageContainer
