import 'dotenv/config'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import { db, client } from './src/db'

await migrate(db, { migrationsFolder: './drizzle' })
await client.end()

console.log('Migrations applied')
