import { Component } from "react"
import PropTypes from "prop-types"

class ChatSession extends Component {
	render() {
		const { session } = this.props
		const url = "session/" + session._id

		return (
			<a
				href={url}
				className="bg-slate-300 flex p-2 my-2 items-center hover:cursor-pointer"
			>
				<p>{session.session_name}</p>
			</a>
		)
	}
}

ChatSession.propTypes = {
	session: PropTypes.shape({
		created_at: PropTypes.string,
		session_name: PropTypes.string,
		users: PropTypes.array,
		_id: PropTypes.string,
	}),
}

export default ChatSession
