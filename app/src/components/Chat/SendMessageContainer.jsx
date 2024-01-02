import { Component } from "react"
import { SocketContext } from "/src/context/SocketContext.jsx"

class SendMessageContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			message: "", // State variable to store the input value
			userSeed: localStorage.getItem("userSeed"),
		}
	}

	componentDidMount() {
		if (!this.state.userSeed) {
			const randomValue = Math.random()
			const seedString = randomValue.toString().substring(2)
			const seed = parseInt(seedString, 10)

			localStorage.setItem("userSeed", seed)
			this.setState({ userSeed: seed })
		}
	}

	static contextType = SocketContext

	// Event handler to update the message state
	handleMessageChange = e => {
		this.setState({ message: e.target.value })
	}

	// Event handler to handle form submission
	handleSubmit = async e => {
		e.preventDefault()

		const { socket } = this.context
		let message = { user_id: 0, text_content: this.state.message }
		socket.emit("message", {
			sessionId: window.location.pathname.split("/")[2], // fix this pls
			content: message,
			userSeed: this.state.userSeed,
		})
		this.setState({ message: "" })
	}

	render() {
		return (
			<div className="flex items-center p-2">
				<form className="w-full flex" onSubmit={this.handleSubmit}>
					<input
						type="text"
						placeholder={"Send a message as " + this.state.userSeed}
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
