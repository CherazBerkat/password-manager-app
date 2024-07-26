import express from "express";
import bodyParser from "body-parser";
import pool from "../DB/db.mjs";
import encrypt from "../utils/encrypt.mjs";
const router = express.Router();
router.use(bodyParser.json()); // JSON parser
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/addPassword", async (req, res) => {
  let { pw, Platform } = req.body;

  if (!pw || !Platform) {
    return res.status(400).send("Password and Platform are required.");
  }
  let encrypted = encrypt(pw);
  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO Passwords (password, website,iv) VALUES (?, ?, ?)",
      [encrypted.password, Platform, encrypted.iv]
    );
    connection.release();

    res.status(201).send("Password added");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Internal server error");
  }
});

export default router;
