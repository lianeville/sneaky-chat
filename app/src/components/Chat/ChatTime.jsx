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

const formatTimeAgo = dateString => {
	const date = new Date(dateString)
	const now = new Date()
	const timeDifference = now - date

	const seconds = Math.floor(timeDifference / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)
	const months = Math.floor(days / 30)
	const years = Math.floor(months / 12)

	if (seconds < 60) {
		return `a few seconds ago`
	} else if (minutes < 60) {
		return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`
	} else if (hours < 24) {
		return `${hours} ${hours === 1 ? "hour" : "hours"} ago`
	} else if (days < 30) {
		return `${days} ${days === 1 ? "day" : "days"} ago`
	} else if (months < 12) {
		return `${months} ${months === 1 ? "month" : "months"} ago`
	} else {
		return `${years} ${years === 1 ? "year" : "years"} ago`
	}
}

class ChatTime extends Component {
	render() {
		let time
		if (this.props.timeAgo) {
			time = formatTimeAgo(this.props.time)
		} else {
			time = formatDate(this.props.time)
		}

		return (
			<div className="text-xs text-slate-400 whitespace-nowrap">{time}</div>
		)
	}
}

ChatTime.propTypes = {
	time: PropTypes.string,
}

export default ChatTime
