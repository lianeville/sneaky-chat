// Header.js
import React, { useEffect, useState } from "react"
import SessionButtons from "./SessionButtons"
import { FaArrowLeftLong } from "react-icons/fa6"

const Header = () => {
	const location = window.location.pathname.split("/")[1]
	const [inSession, setInSession] = useState(location == "session")

	useEffect(() => {
		console.log(location)
	})

	return (
		<header className="h-16 max-h-16 top-0 left-0 w-full bg-gray-800 text-white p-2 flex justify-between items-center">
			{inSession ? (
				<div className="hover:bg-slate-600 rounded-full">
					<a href="/" className="text-white hover:text-white ">
						<div className="p-2">
							<FaArrowLeftLong className="text-3xl" />
						</div>
					</a>
				</div>
			) : (
				<div className="mx-2">
					<SessionButtons />
				</div>
			)}
			<h1 className="text-2xl font-bold mx-2">silly chat</h1>
		</header>
	)
}

export default Header
