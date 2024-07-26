import { createConnection } from "mysql2/promise";

async function createDatabase() {
  // Create a connection to the MySQL server
  const connection = await createConnection({
    host: "localhost", // Replace with your MySQL host
    user: "root", // Replace with your MySQL username
    password: "ICU2DoU?yu", // Replace with your MySQL password
  });

  try {
    // Create a new database
    await connection.query("CREATE DATABASE IF NOT EXISTS PASSWORD_MANAGER");
    console.log("Database created or already exists.");

    // Select the newly created database
    await connection.query("USE PASSWORD_MANAGER");

    // Create a new table with the specified schema, including the 'iv' column
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS Passwords (
        id INT AUTO_INCREMENT PRIMARY KEY,
        password VARCHAR(255) NOT NULL,
        website VARCHAR(255) NOT NULL,
        iv VARCHAR(32) NOT NULL
      );
    `;

    await connection.query(createTableQuery);
    console.log('Table "Passwords" created or already exists.');
  } catch (err) {
    console.error("Error creating database or table:", err);
  } finally {
    // Close the connection
    await connection.end();
  }
}

createDatabase();
