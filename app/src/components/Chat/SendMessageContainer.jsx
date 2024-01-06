import { Component } from "react"
import { SocketContext } from "/src/context/SocketContext.jsx"
import { connect } from "react-redux"
import { anonUser } from "../../reducers/anonUser"

class SendMessageContainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			message: "", // State variable to store the input value
			anonSeed: localStorage.getItem("userSeed"),
			anonName: "",
		}
	}

	async componentDidMount() {
		await this.props.updateName()
		this.setState({
			userSeed: this.props.anonSeed,
			anonName: this.props.anonName,
		})
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
			userSeed: this.state.anonSeed,
		})
		this.setState({ message: "" })
	}

	render() {
		return (
			<div className="flex items-center p-2">
				<form className="w-full flex" onSubmit={this.handleSubmit}>
					<input
						type="text"
						placeholder={"Send a message as " + this.state.anonName}
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

const mapStateToProps = state => ({
	anonUser: state.anonUser,
	anonName: state.anonUser.name,
	anonSeed: state.anonUser.seed,
})

const mapDispatchToProps = {
	updateName: anonUser.actions.updateName,
}

const ConnectedSendMessageContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(SendMessageContainer)

export default ConnectedSendMessageContainer
