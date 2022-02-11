import pg from 'pg'

const pool = new pg.Pool({
	user: "rulxswgc",
	password: "kAjfNiZbQVlKp_L1skLVQ5R1Z3yQjnkb",
	database: "rulxswgc",
	port: process.env.PG_PORT,
	host: "john.db.elephantsql.com"
})


async function model (query, ...params) {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(query, params.length ? params : null)
		return rows
	} catch(error) {
		throw error
	} finally {
		client.release()
	}
}

export default model