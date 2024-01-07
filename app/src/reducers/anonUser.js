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
				const randomValue = Math.random()
				const seedString = randomValue.toString().substring(2)
				seed = parseInt(seedString, 10).toString()
				localStorage.setItem("userSeed", seed)
				console.log("new seed", seed)
			}
			state.seed = seed
			state.randomNameConfig.seed = state.seed
			state.name = uniqueNamesGenerator(state.randomNameConfig)
			console.log("new name", state.name)

			// }
		},
	},
})

export const { updateName } = anonUser.actions

export default anonUser.reducer
