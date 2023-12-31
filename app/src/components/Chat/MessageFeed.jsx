import React, { Component } from "react"
import MessageContainer from "./MessageContainer"
import SendMessageContainer from "./SendMessageContainer"
import { SocketContext } from "/src/context/SocketContext"

const baseURL = "http://localhost:8000"

class MessageFeed extends Component {
	static contextType = SocketContext

	constructor(props) {
		super(props)
		this.state = {
			messages: [], // Initialize data as an empty array
		}
		this.messagesEndRef = React.createRef()
		this.messageFeedRef = React.createRef()
	}

	componentDidMount() {
		const { socket } = this.context

		fetch(baseURL + window.location.pathname)
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then(messages => {
				console.log("messages", messages)
				// Handle the data here (e.g., update the component state)
				this.setState({ messages })
				this.scrollToBottom(true)
			})
			.catch(error => {
				console.error("Error fetching data:", error)
			})

		socket.on("message", newMessage => {
			newMessage = newMessage.content
			if (!newMessage.user) {
				newMessage.user = { name: "Anonymous", _id: 0 }
			}
			this.setState(
				prevState => ({
					messages: [...prevState.messages, newMessage],
				}),
				this.scrollToBottom
			)
		})
	}

	scrollToBottom = alwaysScroll => {
		const feed = this.messageFeedRef.current
		let scrolledFromBottom =
			feed.scrollHeight - feed.clientHeight - feed.scrollTop

		if (scrolledFromBottom < 200 || alwaysScroll) {
			this.messagesEndRef.current.scrollIntoView({ behavior: "instant" })
		}
	}

	componentWillUnmount() {
		const { socket } = this.context

		// Remove the socket event listener when the component unmounts
		socket.off("message")
	}

	render() {
		const { messages } = this.state

		return (
			<div className="w-full absolute inset-0 flex flex-col-reverse">
				<SendMessageContainer />
				<div ref={this.messageFeedRef} className="h-full overflow-y-scroll">
					{messages.map((message, index) => (
						<MessageContainer key={index} message={message} />
					))}
					<div ref={this.messagesEndRef} />
				</div>
			</div>
		)
	}
}

export default MessageFeed
