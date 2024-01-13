import { Component } from "react"
import { connect } from "react-redux"
import { anonUser } from "../reducers/anonUser"
import ChatAvatar from "./Chat/ChatAvatar"
import { FaDice } from "react-icons/fa6"
import NameFromSeed from "./NameFromSeed"

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
						<NameFromSeed seed={this.state.anonSeed} />
					</div>
					<button className="flex items-center" onClick={this.handleClick}>
						<FaDice className="mr-1 text-xl" />
						Randomize
					</button>
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
