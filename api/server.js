const express = require("express")
const cors = require("cors")
const port = 8000

const app = express()
const server = app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
	},
})

const { MongoClient, ObjectId } = require("mongodb")

const dotenv = require("dotenv")
const config = dotenv.config({ path: "../.env" })
const uri = config.parsed.mongoURI

const client = new MongoClient(uri)
const db = client.db("Chat-App")
const sessionCollection = db.collection("Sessions")
const messageCollection = db.collection("Messages")
const usersCollection = db.collection("Users")

const {
	uniqueNamesGenerator,
	adjectives,
	colors,
	animals,
} = require("unique-names-generator")

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

async function getMessages(sessionId, beforeMessageId, limit = 30) {
	console.log(beforeMessageId)
	try {
		await client.connect()
		sessionId = new ObjectId(sessionId)

		let query = { session_id: sessionId }
		if (beforeMessageId) {
			const beforeMessage = await messageCollection.findOne({
				_id: new ObjectId(beforeMessageId),
			})
			if (beforeMessage) {
				query.created_at = {
					$lt: new Date(beforeMessage.created_at),
					$gte: new Date(0), // Adjust this date based on your minimum valid date
				}
			}
		}

		let sessionMessages = messageCollection
			.find(query)
			.sort({ created_at: -1 })
			.limit(limit)

		let messages = await sessionMessages.toArray()
		messages = await getUsers(messages, usersCollection)

		return messages.reverse()
	} catch (error) {
		console.error("Error connecting to MongoDB:", error)
		// Handle the error as needed
	}
}

async function getUsers(messages, usersCollection) {
	let sessionUsers = {}
	for (const message of messages) {
		if (!message.user_id) {
			const randomNameConfig = {
				dictionaries: [adjectives, animals],
				separator: " ",
				seed: message.user_seed || 123,
				style: "capital",
			}
			const randomName = uniqueNamesGenerator(randomNameConfig)
			message.user = { name: randomName, _id: 0 }
		} else if (sessionUsers.hasOwnProperty(message.user_id)) {
			message.user = sessionUsers[message.user_id]
		} else {
			let user = await usersCollection.findOne({ _id: message.user_id })
			user = { _id: user._id, name: user.name }
			sessionUsers[message.user_id] = user
			message.user = user
		}
	}
	return messages
}

async function getSessions() {
	try {
		await client.connect()
		let sessions = sessionCollection.find({})
		sessions = await sessions.toArray()

		return sessions
	} catch (error) {
		console.error("Error connecting to MongoDB:", error)
	}
}

app.get("/session/:sessionId/:lastMessage?", async (req, res) => {
	// console.log(req.params)
	const messages = await getMessages(
		req.params.sessionId,
		req.params.lastMessage
	)
	res.json(messages)
})

app.get("/sessions", async (req, res) => {
	const sessions = await getSessions()
	res.json(sessions)
})

// Socket.io integration
io.on("connection", socket => {
	// Handle incoming messages
	socket.on("message", async data => {
		console.log("Message received:", data)

		let sessionId = data.sessionId
		sessionId = new ObjectId(sessionId)

		let message = data.content
		message.session_id = sessionId
		message.created_at = new Date()
		message.user_seed = data.userSeed

		if (!message.user_id) {
			message.user_id = null
		}

		try {
			await client.connect()

			const result = await messageCollection.insertOne(message)
			if (result.acknowledged) {
				console.log("Message Sent")
			} else {
				console.error("Message Failed to Send")
			}
		} catch (error) {
			console.error("Error connecting to MongoDB:", error)
			throw error // Re-throw the error
		}

		// Broadcast the message to all connected clients
		io.emit("message", data)
	})

	// Handle disconnect
	socket.on("disconnect", () => {})
})
