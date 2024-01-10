import React, { useEffect } from "react"
import PropTypes from "prop-types"

const ChatSession = ({ session }) => {
	useEffect(() => {
		console.log(session)
	}, [session])

	const url = "session/" + session._id

	return (
		<div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-1">
			<a
				href={url}
				className="w-full bg-slate-300 flex p-2 items-center hover:cursor-pointer"
			>
				<p>{session.session_name}</p>
			</a>
		</div>
	)
}

export default ChatSession
