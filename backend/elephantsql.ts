import { Pool } from 'pg';

const connectionString = "postgres://bhqbaqpt:2WbvlNpZb6V6BupIHAV8G7eUlTASlxQh@kashin.db.elephantsql.com/bhqbaqpt";

const pool = new Pool({
  connectionString: connectionString

});

export default pool;
