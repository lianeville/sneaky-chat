// Header.js
import React, { useEffect, useState } from "react"
import SessionButtons from "./SessionButtons"
import { FaArrowLeftLong } from "react-icons/fa6"

const Header = () => {
	const location = window.location.pathname.split("/")[1]
	const [inSession, setInSession] = useState(location == "session")

	useEffect(() => {})

	return (
		<header className="top-0 left-0 w-full bg-gray-800 text-white p-2 flex justify-between items-center">
			{inSession ? (
				<div className="hover:bg-slate-600 rounded-full p-[1px]">
					<a href="/" className="text-white hover:text-white ">
						<div className="p-2">
							<FaArrowLeftLong className="text-3xl" />
						</div>
					</a>
				</div>
			) : (
				<div className="mx-2 my-1">
					<SessionButtons />
				</div>
			)}
			<a href="/">
				<h1 className="text-2xl font-bold mx-2 text-white hover:text-white">
					silly chat
				</h1>
			</a>
		</header>
	)
}

export default Header
