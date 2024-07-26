import express from "express";
import bodyParser from "body-parser";
import pool from "../DB/db.mjs";
import decrypt from "../utils/decrypt.mjs";
const router = express.Router();
router.use(bodyParser.json()); // JSON parser
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/viewPasswords", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT password AS pw, website AS platform, iv FROM Passwords"
    );
    connection.release(); // Release the connection back to the pool
    // Decrypt the passwords
    const decryptedData = rows.map((row) => {
      try {
        const decryptedPw = decrypt({ password: row.pw, iv: row.iv });
        return {
          pw: decryptedPw,
          platform: row.platform,
        };
      } catch (err) {
        console.error("Error decrypting password for row:", row, err);
        res.status(500).send("Internal server error");
      }
    });

    res.status(201).json(decryptedData); // Send the data as JSON
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal server error");
  }
});

export default router;
