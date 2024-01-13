import {
	uniqueNamesGenerator,
	adjectives,
	animals,
} from "unique-names-generator"

const NameFromSeed = props => {
	let randomNameConfig = {
		dictionaries: [adjectives, animals],
		separator: " ",
		style: "capital",
		seed: props.seed,
	}

	return <span>{uniqueNamesGenerator(randomNameConfig)}</span>
}

export default NameFromSeed
