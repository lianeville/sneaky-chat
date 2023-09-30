import { Component } from "react"
import MessageContainer from "./MessageContainer"
import SendMessageContainer from "./SendMessageContainer"

class MessageFeed extends Component {
	render() {
		return (
			<div className="w-full absolute inset-0 flex flex-col-reverse">
				<SendMessageContainer />
				<div className=" ">
					<MessageContainer />
				</div>
			</div>
		)
	}
}

export default MessageFeed
