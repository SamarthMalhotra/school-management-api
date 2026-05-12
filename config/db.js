import mysql from "mysql2";
//I am using Railway to store data on cloud, but you can use your local MySQL database by changing the connection parameters in the .env file
import dotenv from "dotenv";
dotenv.config();
const connection = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

export default connection;
