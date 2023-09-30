const { MongoClient } = require("mongodb")
const uri =
	"mongodb+srv://lianeville5:u9xKoDoJ0fuPqm89@chat-app.kczrold.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri)

async function connectToMongo() {
	try {
		await client.connect()
		console.log("Connected to MongoDB")
	} catch (error) {
		console.error("Error connecting to MongoDB:", error)
	}
}

connectToMongo()
