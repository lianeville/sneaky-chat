import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { FaRegMessage } from "react-icons/fa6"
import ChatTime from "./ChatTime"
import ChatAvatar from "./ChatAvatar"

const ChatSession = ({ session }) => {
	useEffect(() => {
		// console.log(session.created_at)
	}, [session])

	const url = "session/" + session._id

	const messageCount = (
		<span>
			{session.messageCount} message{session.messageCount == 1 ? "" : "s"}
		</span>
	)

	let latestMessage
	if (session.latestMessage) {
		latestMessage = (
			<div className="flex items-center">
				<ChatAvatar seed={session.latestMessage.user_seed} />
				<span>{session.latestMessage.text_content}</span>
			</div>
		)
	}

	return (
		<div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-1">
			<a
				href={url}
				className="w-full h-full bg-slate-300 flex flex-col p-2 hover:cursor-pointer"
			>
				<span>{session.session_name}</span>
				<div className="flex justify-between">
					<div className="flex items-center text-sm">
						<FaRegMessage className="mr-1" />
						{messageCount}
					</div>
					<ChatTime time={session.created_at} timeAgo={true} />
				</div>
				{latestMessage}
			</a>
		</div>
	)
}

export default ChatSession
