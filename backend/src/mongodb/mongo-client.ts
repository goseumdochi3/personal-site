import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.ATLAS_URI || ''
const database = process.env.DATABASE || 'testing'

const mongoClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
})

try {
    await mongoClient.connect()
} catch (err) {
    console.error(err)
}

let db = mongoClient.db(database)

export default db
