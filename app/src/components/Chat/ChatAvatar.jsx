import { Component } from "react"

function stringToColor(seed) {
	if (!seed) {
		seed = "123abc"
	}
	seed = seed.toString()
	let hash = 0
	seed.split("").forEach(char => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash)
	})
	let colour = "#"
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff
		colour += value.toString(16).padStart(2, "0")
	}
	return colour
}

class ChatAvatar extends Component {
	componentDidUpdate(prevProps) {
		if (!this.props.checkForUpdates) return
		// Check if the seed prop has changed
		if (this.props.seed !== prevProps.seed) {
			// Update the backgroundColor with the new seed
			const newColor = stringToColor(this.props.seed)
			this.avatarDiv.style.backgroundColor = newColor
		}
	}

	render() {
		const { seed } = this.props
		const { hidden } = this.props

		return (
			<div>
				{hidden ? (
					<div className="px-5 mr-2"></div>
				) : (
					<div
						ref={div => (this.avatarDiv = div)}
						style={{
							backgroundColor: stringToColor(seed),
							// padding: this.props.size || "5px",
						}}
						className={`p-${
							this.props.size || 5
						} mr-2 bg-slate-800 rounded-full`}
					></div>
				)}
			</div>
		)
	}
}

export default ChatAvatar
