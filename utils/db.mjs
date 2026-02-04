// Create PostgreSQL Connection Pool here !
import "dotenv/config";
import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;
