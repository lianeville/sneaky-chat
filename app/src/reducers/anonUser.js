import { createSlice } from "@reduxjs/toolkit"
import {
	uniqueNamesGenerator,
	adjectives,
	animals,
} from "unique-names-generator"

const initialState = {
	seed: 0,
	name: "aaa",
	randomNameConfig: {
		dictionaries: [adjectives, animals],
		separator: " ",
		seed: 0,
		style: "capital",
	},
}

export const anonUser = createSlice({
	name: "anonUser",
	initialState,
	reducers: {
		updateName: state => {
			let seed = localStorage.getItem("userSeed")
			if (!seed) {
				seed = generateRandomSeed(12)
				localStorage.setItem("userSeed", seed)
			}
			state.seed = seed
			state.randomNameConfig.seed = state.seed
			state.name = uniqueNamesGenerator(state.randomNameConfig)

			// }
		},
	},
})

function generateRandomSeed(length) {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	let seed = ""

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length)
		seed += characters.charAt(randomIndex)
	}

	return seed
}

export const { updateName } = anonUser.actions

export default anonUser.reducer
