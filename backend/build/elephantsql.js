"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const isProduction = process.env.NODE_ENV === "production";
// const connectionString = "postgres://bhqbaqpt:2WbvlNpZb6V6BupIHAV8G7eUlTASlxQh@kashin.db.elephantsql.com/bhqbaqpt";
const connectionString = "postgres://postgres:123456@localhost/Software";
const pool = new pg_1.Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString
});
exports.default = pool;
