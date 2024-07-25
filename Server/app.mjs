import express from "express";
import mysql from "mysql2/promise"; // Import mysql2 with promise support
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost", // Replace with your MySQL host
  user: "root", // Replace with your MySQL username
  password: "ICU2DoU?yu", // Replace with your MySQL password
  database: "PASSWORD_MANAGER", // Replace with your MySQL database name
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0,
});

// Middleware to use connection pool in route handlers
app.use(async (req, res, next) => {
  req.db = pool;
  next();
});

app.get("/", (req, res) => {
  res.send("Password Manager App");
});

app.post("/addPassword", async (req, res) => {
  const { pw, Platform } = req.body;

  if (!pw || !Platform) {
    return res.status(400).send("Password and Platform are required.");
  }

  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO Passwords (password, website) VALUES (?, ?)",
      [pw, Platform]
    );
    connection.release(); // Release the connection back to the pool

    res.status(201).send("Password added");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Internal server error");
  }
});

app.get("/viewPasswords", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT password AS pw, website as platform FROM Passwords"
    );
    connection.release(); // Release the connection back to the pool

    res.json(rows).status(201); // Send the data as JSON
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal server error");
  }
});

app.post("/updatePassword", async (req, res) => {
  const data = req.body;

  // Validate input
  if (!Array.isArray(data) || data.length === 0) {
    return res
      .status(400)
      .send("Passwords data is required and should be an array of objects.");
  }

  try {
    const connection = await pool.getConnection();

    // Start a transaction
    await connection.beginTransaction();

    try {
      // Delete all existing records
      await connection.query("DELETE FROM Passwords");

      // Prepare and execute insert statements
      const insertPromises = data.map((data) =>
        connection.query(
          "INSERT INTO Passwords (password, website) VALUES (?, ?)",
          [data.pw, data.platform]
        )
      );
      await Promise.all(insertPromises);

      // Commit the transaction
      await connection.commit();

      res.send("Passwords updated successfully.");
    } catch (err) {
      // Rollback transaction on error
      await connection.rollback();
      throw err;
    } finally {
      connection.release(); // Release the connection back to the pool
    }
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
