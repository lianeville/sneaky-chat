import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { FaRegMessage } from "react-icons/fa6"
import ChatTime from "./ChatTime"
import ChatAvatar from "./ChatAvatar"
import { FaArrowTurnUp } from "react-icons/fa6"
import NameFromSeed from "../NameFromSeed"

const ChatSession = ({ session }) => {
	useEffect(() => {
		// console.log(session.created_at)
	}, [session])

	const url = "session/" + session._id

	const messageCount = (
		<span className="text-xs">
			{session.messageCount} message{session.messageCount == 1 ? "" : "s"}
		</span>
	)

	let latestMessage
	if (session.latestMessage) {
		latestMessage = (
			<div className="flex w-full">
				<div className="rotate-90 w-fit mr-2 -ml-1">
					<FaArrowTurnUp className="text-lg" />
				</div>
				<div className="w-full flex items-center overflow-hidden">
					<ChatAvatar size="3" seed={session.latestMessage.user_seed} />
					<span className="text-sm -ml-1 truncate">
						<span className="mr-1 italic">
							<NameFromSeed seed={session.latestMessage.user_seed} />:
						</span>
						{session.latestMessage.text_content}
					</span>
				</div>
			</div>
		)
	}

	return (
		<div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">
			<a
				href={url}
				className="w-full h-full bg-slate-600 flex flex-col p-3 hover:cursor-pointer text-white hover:text-white rounded-xl"
			>
				<div className="flex flex-col justify-between">
					<div className="w-full mb-1 flex justify-between items-center text-sm">
						<span className="font-bold text-lg truncate mr-1">
							{session.session_name}
						</span>
						<ChatTime time={session.created_at} timeAgo={true} />
					</div>
					<div className="flex items-center text-gray-300 my-1 mb-2">
						<FaRegMessage className="mr-1" />
						{messageCount}
					</div>
					<div className="flex text-gray-300">{latestMessage}</div>
				</div>
			</a>
		</div>
	)
}

export default ChatSession
