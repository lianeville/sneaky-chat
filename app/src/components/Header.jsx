// Header.js
import React from "react"
import SessionButtons from "./SessionButtons"

const Header = () => {
	return (
		<header className="top-0 left-0 w-full bg-gray-800 text-white p-2 flex justify-between">
			<div className="mx-2">
				<SessionButtons />
			</div>
			<h1 className="text-2xl font-bold mx-2">Your App Name</h1>
			{/* Add other header content as needed */}
		</header>
	)
}

export default Header
