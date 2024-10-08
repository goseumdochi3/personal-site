import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

const client = new pg.Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
})

await client.connect()

const db = drizzle(client)

export { db, client }
