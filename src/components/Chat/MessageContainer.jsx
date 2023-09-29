import { Component } from "react"
import ChatAvatar from "./ChatAvatar"
import ChatMessage from "./ChatMessage"
import ChatTime from "./ChatTime"

class MessageContainer extends Component {
	render() {
		return (
			<div className="bg-slate-300 w-full">
				<ChatAvatar />
				<ChatMessage />
				<ChatTime />
			</div>
		)
	}
}

export default MessageContainer
