import { Component } from "react"
import { SocketProvider } from "/src/context/SocketContext.jsx"

const baseURL = "http://localhost:8000"

class SendMessageContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			message: "", // State variable to store the input value
		}
	}

	// Event handler to update the message state
	handleMessageChange = e => {
		this.setState({ message: e.target.value })
	}

	// Event handler to handle form submission
	handleSubmit = async e => {
		e.preventDefault()

		let message = { user_id: 0, text_content: this.state.message }
		message = JSON.stringify(message)

		try {
			const response = await fetch(
				baseURL + window.location.pathname + "/send",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: message,
				}
			)

			// Handle the response as needed
			if (response.ok) {
				const responseData = await response.json()
				console.log("Message sent successfully", responseData)

				// Optionally, clear the input field after submission
				this.setState({ message: "" })
			} else {
				console.error("Error sending message")
			}
		} catch (error) {
			// Handle any errors
			console.error("Error sending message", error)
		}
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
