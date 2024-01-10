import { Component } from "react"
import { connect } from "react-redux"
import { anonUser } from "../reducers/anonUser"
import ChatAvatar from "./Chat/ChatAvatar"

class RandomUserSettings extends Component {
	constructor(props) {
		super(props)
		this.state = {
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

	handleClick = async () => {
		localStorage.removeItem("userSeed")
		await this.props.updateName()
		this.setState({
			anonSeed: this.props.anonSeed,
			anonName: this.props.anonName,
		})
	}

	render() {
		return (
			<div className="w-full mt-auto bg-slate-800 p-3 flex justify-center">
				<div className="w-full max-w-xl flex justify-between">
					<div className="flex items-center">
						<ChatAvatar seed={this.state.anonSeed} checkForUpdates />
						<span>{this.state.anonName}</span>
					</div>
					<button onClick={this.handleClick}>Randomize</button>
				</div>
			</div>
		)
	}
}

// Redux State Management
const mapStateToProps = state => ({
	anonUser: state.anonUser,
	anonName: state.anonUser.name,
	anonSeed: state.anonUser.seed,
})
const mapDispatchToProps = {
	updateName: anonUser.actions.updateName,
}
const ConnectedRandomUserSettings = connect(
	mapStateToProps,
	mapDispatchToProps
)(RandomUserSettings)

export default ConnectedRandomUserSettings
