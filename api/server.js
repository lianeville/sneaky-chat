const express = require("express")
const cors = require("cors") // Import the cors middleware

const app = express()
const port = 8000

const { MongoClient, ObjectId } = require("mongodb")
const uri =
	"mongodb+srv://lianeville5:u9xKoDoJ0fuPqm89@chat-app.kczrold.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri)

app.use(cors())

async function getMessages() {
	try {
		await client.connect()
		console.log("Connected to MongoDB")

		const db = client.db("Chat-App")
		const messageCollection = db.collection("Messages")
		const usersCollection = db.collection("Users")
		const sessionId = new ObjectId("65182b51e8c3908380a5c36b")

		let sessionMessages = messageCollection.find({
			session_id: sessionId,
		})
		let messages = await sessionMessages.toArray()

		messages = await getUsers(messages, usersCollection)
		return messages
	} catch (error) {
		console.error("Error connecting to MongoDB:", error)
	}
}

async function getUsers(messages, usersCollection) {
	let sessionUsers = {}
	for (const message of messages) {
		if (sessionUsers.hasOwnProperty(message.user_id)) {
			message.user = sessionUsers[message.user_id]
		} else {
			const user = await usersCollection.findOne({ _id: message.user_id })
			sessionUsers[message.user_id] = user
			message.user = user
		}
	}
	return messages
}

app.get("/", async (req, res) => {
	const messages = await getMessages()
	res.json(messages)
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
