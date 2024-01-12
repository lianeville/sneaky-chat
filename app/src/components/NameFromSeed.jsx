import {
	uniqueNamesGenerator,
	adjectives,
	animals,
} from "unique-names-generator"

const NameFromSeed = seed => {
	let randomNameConfig = {
		dictionaries: [adjectives, animals],
		separator: " ",
		style: "capital",
		seed: seed,
	}

	return <span>{uniqueNamesGenerator(randomNameConfig)}</span>
}

export default NameFromSeed
