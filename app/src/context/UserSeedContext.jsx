import { createContext } from "react"
import { adjectives, animals } from "unique-names-generator"

export const seedConfig = () => {
	const randomNameConfig = {
		dictionaries: [adjectives, animals],
		separator: " ",
		seed: userSeed || 123,
	}
	return context
}
