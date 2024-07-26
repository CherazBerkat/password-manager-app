import express from "express";
import bodyParser from "body-parser";
import pool from "../DB/db.mjs";
import encrypt from "../utils/encrypt.mjs";
const router = express.Router();
router.use(bodyParser.json()); // JSON parser
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/updatePassword", async (req, res) => {
  const data = req.body;

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
          "INSERT INTO Passwords (password, website,iv) VALUES (?, ?, ?)",
          [encrypt(data.pw).password, data.platform, encrypt(data.pw).iv]
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

export default router;
