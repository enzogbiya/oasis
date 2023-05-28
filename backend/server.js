const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const client = new Client({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
});

client.connect();

app.get("/", (req, res) => {
	client
		.query(
			'CREATE TABLE IF NOT EXISTS "oasis_records" ("id" SERIAL PRIMARY KEY, "fio" VARCHAR(100) NOT NULL, "date" TIMESTAMP WITHOUT TIME ZONE NOT NULL, "info" VARCHAR(250))'
		)
		.then((result) => {
			console.log("Query result:", result.rows);
		})
		.catch((err) => {
			console.error("Error executing query", err);
		});
	res.status(200).send({ res: "test" });
});

app.get("/getAllRecords", async (req, res) => {
	client
		.query("SELECT * FROM oasis_records")
		.then((result) => {
			console.log("Query result:", result.rows);
			res.status(200).send({ statusCode: 200, values: result.rows });
		})
		.catch((err) => {
			console.error("Error executing query", err);
			res.status(500).send({ statusCode: 500, error: "Internal Server Error" });
		});
});

app.delete("/deleteRecord/:id", async (req, res) => {
	const { id } = req.params;

	client
		.query("DELETE FROM oasis_records WHERE id = $1", [id])
		.then(() => {
			res.status(200).send({ statusCode: 200, message: "Record deleted successfully" });
		})
		.catch((err) => {
			console.error("Error executing query", err);
			res.status(500).send({ statusCode: 500, error: "Internal Server Error" });
		});
});

app.put("/editRecord", async (req, res) => {
	const { fio, date, additionalInfo, id } = req.body;

	const parts = date.split(" ");
	const time = parts[0];
	const dateString = parts[1];

	const [day, month, year] = dateString.split("-");

	const formattedDate = `${year}-${month}-${day}`;

	const fullDate = `${formattedDate} ${time}`;

	client
		.query("UPDATE oasis_records SET fio = $1, date = $2::timestamp, info = $3 WHERE id = $4", [
			fio,
			fullDate,
			additionalInfo,
			id,
		])
		.then((result) => {
			console.log("Query result:", result.rows);
			res.status(200).send({
				statusCode: 200,
			});
		})
		.catch((err) => {
			console.error("Error executing query", err);
			res.status(500).send({ statusCode: 500, error: "Internal Server Error" });
		});
});

app.post("/addRecord", async (req, res) => {
	const { fio, date, additionalInfo } = req.body;

	const parts = date.split(" ");
	const time = parts[0];
	const dateString = parts[1];

	const [day, month, year] = dateString.split("-");

	const formattedDate = `${year}-${month}-${day}`;

	const fullDate = `${formattedDate} ${time}`;

	client
		.query("INSERT INTO oasis_records (fio, date, info) VALUES ($1, $2::timestamp, $3) RETURNING *", [
			fio,
			fullDate,
			additionalInfo,
		])
		.then((result) => {
			console.log("Query result:", result.rows);
			const addedEntry = result.rows[0];
			res.status(200).send({
				statusCode: 200,
				entry: addedEntry,
			});
		})
		.catch((err) => {
			console.error("Error executing query", err);
			res.status(500).send({ statusCode: 500, error: "Internal Server Error" });
		});
});

app.listen(3001, () => {
	console.log("Server started!!");
});
