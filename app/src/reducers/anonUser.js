import { createSlice } from "@reduxjs/toolkit"
import {
	uniqueNamesGenerator,
	adjectives,
	animals,
} from "unique-names-generator"

const initialState = {
	seed: 0,
	name: "",
	randomNameConfig: {
		dictionaries: [adjectives, animals],
		separator: " ",
		seed: 0,
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
				seed = parseInt(seedString, 10)
				localStorage.setItem("userSeed", seed)
			}
			state.seed = seed
			state.randomNameConfig.seed = state.seed
			if (state.name == "") {
				state.name = uniqueNamesGenerator(state.randomNameConfig)
			}
		},
	},
})

export const { updateName } = anonUser.actions

export default anonUser.reducer
