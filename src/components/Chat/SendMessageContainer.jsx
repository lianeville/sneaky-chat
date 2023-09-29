import { Component } from "react"

class SendMessageContainer extends Component {
	render() {
		return (
			<div className="flex items-center p-2">
				<div className="p-2 mr-2 w-full bg-slate-100 rounded-lg text-left">
					<p className="text-gray-500">Message User</p>
				</div>
				<div className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-5 rounded-full"></div>
			</div>
		)
	}
}

export default SendMessageContainer
