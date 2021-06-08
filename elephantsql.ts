import { Pool } from 'pg';

const isProduction = process.env.NODE_ENV === "production";

// const connectionString = "postgres://bhqbaqpt:2WbvlNpZb6V6BupIHAV8G7eUlTASlxQh@kashin.db.elephantsql.com/bhqbaqpt";
const connectionString = "postgres://postgres:123456@localhost/Software";

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString

});

export default pool;
