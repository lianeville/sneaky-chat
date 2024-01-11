import React, { useState } from "react"

const SessionButtons = () => {
	return (
		<div className="w-full flex justify-center h-16">
			<div className="w-full flex items-center max-w-md">
				<div className="flex w-full whitespace-nowrap ">
					<a
						href="/session/create"
						className="w-full p-2 mx-1 bg-gray-900 rounded-lg text-white hover:text-white hover:bg-gray-600"
					>
						New Session
					</a>
					<a
						href="/session/create"
						className="w-full p-2 mx-1 bg-gray-900 rounded-lg text-white hover:text-white hover:bg-gray-600"
					>
						Join Private
					</a>
				</div>
			</div>
		</div>
	)
}

export default SessionButtons
