const { MongoClient, ObjectId } = require("mongodb")
const uri =
	"mongodb+srv://lianeville5:u9xKoDoJ0fuPqm89@chat-app.kczrold.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri)

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

		sessionMessages
			.toArray()
			.then(messages => {
				// Iterate through the messages and log each one
				messages.forEach(message => {
					console.log(message)
				})
				client.close()
			})
			.catch(error => {
				console.error("An error occurred:", error)
				client.close()
			})
	} catch (error) {
		console.error("Error connecting to MongoDB:", error)
	}
}

connectToMongo()
