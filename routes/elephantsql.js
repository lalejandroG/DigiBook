

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = "postgres://bhqbaqpt:2WbvlNpZb6V6BupIHAV8G7eUlTASlxQh@kashin.db.elephantsql.com/bhqbaqpt";

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString

});

module.exports = { pool };












