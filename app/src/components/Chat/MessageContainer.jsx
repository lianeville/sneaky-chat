import { Component } from "react"
import ChatAvatar from "./ChatAvatar"
// import ChatMessage from "./ChatMessage"
import ChatTime from "./ChatTime"
import PropTypes from "prop-types" // Import PropTypes

class MessageContainer extends Component {
	render() {
		const { message } = this.props
		const nameStyling = message.user._id ? "" : "italic"
		return (
			<div className="bg-slate-700 flex p-2 my-2 items-center">
				<ChatAvatar />
				<div className="flex flex-col w-full">
					<div className="flex">
						<span className={`mr-2 ${nameStyling}`}>
							{message.user.name}
						</span>
						<ChatTime time={message.created_at} />
					</div>
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
