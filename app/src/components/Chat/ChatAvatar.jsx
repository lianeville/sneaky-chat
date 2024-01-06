import { Component } from "react"

function getRandomColor(seed) {
	if (!seed) {
		seed = 123
	}

	const generateRandomValue = () => (Math.sin(seed++) + 1) / 2 // Simple function to generate a value between 0 and 1

	// Generate random values for red, green, and blue components
	const red = generateRandomValue() * 255
	const green = generateRandomValue() * 255
	const blue = generateRandomValue() * 255

	// Create and return the color string in the format "rgb(r, g, b)"
	return `rgb(${red.toFixed(0)}, ${green.toFixed(0)}, ${blue.toFixed(0)})`
}

class ChatAvatar extends Component {
	render() {
		const { seed } = this.props
		const { hidden } = this.props

		return (
			<div>
				{hidden ? (
					<div className="px-5 mr-2"></div>
				) : (
					<div
						style={{ backgroundColor: getRandomColor(seed) }}
						className="p-5 mr-2 bg-slate-800 rounded-full"
					></div>
				)}
			</div>
		)
	}
}

export default ChatAvatar
