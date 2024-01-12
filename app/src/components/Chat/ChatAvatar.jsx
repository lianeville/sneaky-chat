import { Component } from "react"

function stringToColorWithOutline(seed) {
	if (!seed) {
		seed = "123abc"
	}
	seed = seed.toString()
	let hash = 0
	seed.split("").forEach(char => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash)
	})
	let color = "#"
	let darkerColor = "#"
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff

		color += value.toString(16).padStart(2, "0")

		const darkerValue = Math.max(0, value - 25)
		darkerColor += darkerValue.toString(16).padStart(2, "0")
	}
	return [color, darkerColor]
}

class ChatAvatar extends Component {
	componentDidUpdate(prevProps) {
		if (!this.props.checkForUpdates) return
		// Check if the seed prop has changed
		if (this.props.seed !== prevProps.seed) {
			// Update the backgroundColor with the new seed
			const newColors = stringToColorWithOutline(this.props.seed)
			this.avatarDiv.style.backgroundColor = newColors[0]
		}
	}

	render() {
		const { seed } = this.props
		const { size = 1.25 } = this.props

		const colors = stringToColorWithOutline(seed)

		return (
			<div
				ref={div => (this.avatarDiv = div)}
				style={{
					backgroundImage: `linear-gradient(${colors[0]}, ${colors[1]})`,
					padding: size + "em",
				}}
				className="mr-2 bg-slate-800 rounded-full"
			></div>
		)
	}
}

export default ChatAvatar
