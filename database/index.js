require("dotenv").config();
const { Pool, Client } = require("pg");
const connectionLocation = `postgres://${process.env.PGUSER}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
// const connectionLocation = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const db = new Pool({
  connectionString: connectionLocation
});

db.connect()
.then(() => {
  console.log(`we're now connected to the database ...`)
});

module.exports = db;