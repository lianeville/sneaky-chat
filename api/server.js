const express = require("express")
const cors = require("cors") // Import the cors middleware

const app = express()
const port = 8000

const { MongoClient, ObjectId } = require("mongodb")
const uri =
	"mongodb+srv://lianeville5:u9xKoDoJ0fuPqm89@chat-app.kczrold.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri)

app.use(cors())

async function connectToMongo() {
	try {
		await client.connect()
		console.log("Connected to MongoDB")

		const db = client.db("Chat-App")
		const sourceCollection = db.collection("Messages")
		const sessionId = new ObjectId("65182b51e8c3908380a5c36b")

		let sessionMessages = sourceCollection.find({
			session_id: sessionId,
		})

		let messages = await sessionMessages.toArray()
		return messages
	} catch (error) {
		console.error("Error connecting to MongoDB:", error)
	}
}

app.get("/", async (req, res) => {
	const messages = await connectToMongo()
	res.json(messages)
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
