// ToggleComponent.jsx
import React from "react"

const ToggleComponent = props => {
	return (
		<div className="flex items-center">
			<input
				type="checkbox"
				id="toggle"
				className="hidden"
				checked={props.isChecked}
				onChange={props.onToggle}
			/>
			<label htmlFor="toggle" className="cursor-pointer flex">
				<div className="w-10 h-6 bg-gray-400 rounded-full p-1 flex items-center">
					<div
						id="indicator"
						className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform"
						style={{
							transform: props.isChecked
								? "translateX(100%)"
								: "translateX(0%)",
							transition: "transform 0.3s ease",
						}}
					></div>
				</div>
				<span className="ml-2 text-gray-200">{props.label}</span>
			</label>
		</div>
	)
}

export default ToggleComponent
