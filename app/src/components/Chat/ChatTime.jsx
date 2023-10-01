import { Component } from "react"
import Moment from "react-moment"
import "moment-timezone"
import PropTypes from "prop-types"

const formatDate = dateString => {
	const date = new Date(dateString)
	const today = new Date()
	const yesterday = new Date(today)
	yesterday.setDate(today.getDate() - 1)

	if (date.toDateString() === today.toDateString()) {
		return <Moment format="[Today at] h:mm A">{date}</Moment>
	} else if (date.toDateString() === yesterday.toDateString()) {
		return <Moment format="[Yesterday at] h:mm A">{date}</Moment>
	} else {
		return <Moment format="M/DD/YYYY [at] h:mm A">{date}</Moment>
	}
}

class ChatTime extends Component {
	render() {
		const { time } = this.props

		// return <Moment className="text-gray-500">{time}</Moment>
		// return <Moment>{time}</Moment>
		return <div>{formatDate(time)}</div>
		// return <div>{formatDate(time)}</div>
	}
}

ChatTime.propTypes = {
	time: PropTypes.string,
}

export default ChatTime
