import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:W43UiNQVJdDm@ep-proud-leaf-a56t0nbi.us-east-2.aws.neon.tech/neondb?sslmode=require'

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

export async function initDb() {
  const client = await pool.connect()
  try {
    // Create visitors table
    await client.query(`
      CREATE TABLE IF NOT EXISTS visitors (
        id SERIAL PRIMARY KEY,
        ip_address TEXT NOT NULL,
        country TEXT,
        user_agent TEXT,
        timestamp TIMESTAMP NOT NULL,
        visit_count INTEGER NOT NULL DEFAULT 1,
        last_visit TIMESTAMP NOT NULL,
        UNIQUE(ip_address)
      )
    `)

    // Create submissions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id SERIAL PRIMARY KEY,
        nickname TEXT NOT NULL,
        email TEXT NOT NULL,
        description TEXT NOT NULL,
        github TEXT,
        youtube TEXT,
        submission_number INTEGER NOT NULL,
        ip_address TEXT,
        user_agent TEXT,
        timestamp TIMESTAMP NOT NULL
      )
    `)
  } finally {
    client.release()
  }
}

export async function query(text: string, params?: (string | number | boolean | null)[]) {
  return pool.query(text, params)
}

export async function getClient() {
  return pool.connect()
}

export default pool
