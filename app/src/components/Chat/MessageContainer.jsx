import { Component } from "react"
import ChatAvatar from "./ChatAvatar"
// import ChatMessage from "./ChatMessage"
import ChatTime from "./ChatTime"
import PropTypes from "prop-types" // Import PropTypes

class MessageContainer extends Component {
	render() {
		const { message } = this.props
		const { followed } = this.props
		const { followUp } = this.props

		let containerStyle = {
			marginTop: 0,
			marginBottom: ".25rem",
			paddingTop: ".5rem",
			paddingBottom: ".5rem",
		}
		if (followed) {
			// containerStyle.marginBottom = 0
			containerStyle.paddingBottom = ".25rem"
		}
		if (followUp) {
			containerStyle.marginTop = 0
			containerStyle.paddingTop = ".25rem"
		}
		// console.log(index)
		// console.log(followUp)
		const nameStyling = message.user._id ? "" : "italic"
		return (
			<div
				style={containerStyle}
				className="bg-slate-700 px-2 flex items-center hover:bg-slate-600"
			>
				<ChatAvatar seed={message.user_seed} hidden={followUp} />
				<div className="flex flex-col w-full">
					{followUp ? (
						<></>
					) : (
						<div className="flex">
							<span className={`mr-2 ${nameStyling}`}>
								{message.user.name}
							</span>
							<ChatTime time={message.created_at} />
						</div>
					)}
					<span>{message.text_content}</span>
				</div>
			</div>
		)
	}
}

MessageContainer.propTypes = {
	message: PropTypes.shape({
		created_at: PropTypes.string,
		session_id: PropTypes.string,
		text_content: PropTypes.string,
		user: PropTypes.object,
		_id: PropTypes.string,
	}),
}

export default MessageContainer
