import { Component } from "react"
import ChatAvatar from "./ChatAvatar"
import ChatMessage from "./ChatMessage"
import ChatTime from "./ChatTime"

class MessageContainer extends Component {
	render() {
		return (
			<div className="bg-slate-300 flex p-2 items-center">
				<ChatAvatar />
				<div className="flex flex-col w-full">
					<div className="flex">
						<span className="mr-2">Lia</span>
						<ChatTime />
					</div>
					<ChatMessage />
				</div>
			</div>
		)
	}
}

export default MessageContainer
