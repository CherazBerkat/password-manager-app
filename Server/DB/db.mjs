import mysql from "mysql2/promise";

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "PASSWORD", // Replace with your MySQL password
  database: "PASSWORD_MANAGER", // Replace with your MySQL database name
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
});

export default pool;
