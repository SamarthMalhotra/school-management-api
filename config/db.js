import mysql from "mysql2";
//I am using Railway to store data on cloud, but you can use your local MySQL database by changing the connection parameters in the .env file
import dotenv from "dotenv";
dotenv.config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

export default connection;
