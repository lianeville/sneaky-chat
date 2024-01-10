import React, { Component } from "react"
import MessageContainer from "./MessageContainer"
import SendMessageContainer from "./SendMessageContainer"
import { SocketContext } from "/src/context/SocketContext"
import {
	uniqueNamesGenerator,
	adjectives,
	animals,
} from "unique-names-generator"
import { connect } from "react-redux"
import { anonUser } from "../../reducers/anonUser"
import debounce from "lodash.debounce"

const baseURL = "http://localhost:8000"

class MessageFeed extends Component {
	static contextType = SocketContext

	constructor(props) {
		super(props)
		this.state = {
			messages: [],
			randomName: "",
			loadedloadedAllMessages: false,
		}
		this.messagesEndRef = React.createRef()
		this.messageFeedRef = React.createRef()
		this.firstMessageRef = React.createRef()
		this.observer = null
	}

	componentDidMount() {
		const { socket } = this.context

		const randomNameConfig = {
			dictionaries: [adjectives, animals],
			separator: " ",
			seed: 123,
			style: "capital",
		}

		this.fetchMessages()

		socket.on("message", newMessage => {
			const userSeed = newMessage.userSeed

			randomNameConfig.seed = userSeed || 123
			const randomName = uniqueNamesGenerator(randomNameConfig)

			newMessage = newMessage.content
			if (!newMessage.user) {
				newMessage.user = { name: randomName, _id: 0 }
			}
			this.setState(
				prevState => ({
					messages: [...prevState.messages, newMessage],
				}),
				this.scrollToBottom
			)
		})
	}

	debouncedFetchMessages = debounce(this.fetchMessages, 500)

	handleFetchMessages(lastId) {
		this.debouncedFetchMessages(lastId)
	}

	fetchMessages(lastId = "") {
		if (this.state.loadedAllMessages) return

		fetch(baseURL + window.location.pathname + "/" + lastId)
			.then(response => {
				if (!response.ok) {
					throw new Error("Network response was not ok")
				}
				return response.json()
			})
			.then(messages => {
				if (lastId !== "") {
					if (messages.length === 0) {
						this.setState({ loadedAllMessages: true })
						return
					}

					const feed = this.messageFeedRef.current
					const scrollPositionBeforeLoad =
						feed.scrollHeight - feed.clientHeight - feed.scrollTop

					const loadedAllMessages = messages.concat(this.state.messages)
					this.setState({ messages: loadedAllMessages }, () => {
						this.messageFeedRef.current.scrollTop =
							feed.scrollHeight -
							feed.clientHeight -
							scrollPositionBeforeLoad
					})
				} else {
					this.setState({ messages }, () => {
						this.scrollToBottom(true)
					})
				}
				this.initializeObserver()
			})
			.catch(error => {
				console.error("Error fetching data:", error)
			})
	}

	scrollToBottom = alwaysScroll => {
		const feed = this.messageFeedRef.current
		let scrolledFromBottom =
			feed.scrollHeight - feed.clientHeight - feed.scrollTop

		if (scrolledFromBottom < 200 || alwaysScroll) {
			this.messagesEndRef.current.scrollIntoView()
		}
	}

	componentWillUnmount() {
		const { socket } = this.context

		// Remove the socket event listener when the component unmounts
		socket.off("message")

		if (this.cleanupObserver) {
			this.cleanupObserver()
		}
	}

	componentDidUpdate() {
		if (this.firstMessageRef.current) {
			this.initializeObserver()
		} else {
			return
		}

		// Check if firstMessageRef has changed
		if (this.firstMessageRef.current) {
			if (this.firstMessageRef.current !== this.observer.target) {
				// Disconnect the existing observer
				if (this.observer) {
					this.observer.disconnect()
				}
			}
		}
	}

	initializeObserver() {
		this.observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					this.handleFetchMessages(this.state.messages[0]._id)
				}
			})
		})

		if (this.firstMessageRef.current) {
			this.observer.observe(this.firstMessageRef.current)
		}
	}

	render() {
		const { messages } = this.state

		return (
			<div className="h-full flex flex-col overflow-y-hidden justify-between">
				<div
					ref={this.messageFeedRef}
					className="h-full flex flex-col overflow-y-auto"
				>
					{messages.map((message, index) => {
						const isFirstMessage = index === 0
						const isFollowUp =
							!isFirstMessage &&
							messages[index - 1]?.user_seed === message.user_seed
						const isFollowed =
							messages[index + 1]?.user_seed === message.user_seed

						return (
							<div
								key={index}
								ref={isFirstMessage ? this.firstMessageRef : null}
							>
								<MessageContainer
									message={message}
									followUp={isFollowUp}
									followed={isFollowed}
								/>
							</div>
						)
					})}{" "}
					<div ref={this.messagesEndRef} />
				</div>
				<SendMessageContainer />
			</div>
		)
	}
}

// Redux State Management
const mapStateToProps = state => ({
	anonUser: state,
})
const mapDispatchToProps = {
	updateName: anonUser.actions.updateName,
}
const ConnectedMessageFeed = connect(
	mapStateToProps,
	mapDispatchToProps
)(MessageFeed)

export default ConnectedMessageFeed
