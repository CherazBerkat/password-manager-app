import express from "express";
import cors from "cors";
import router from "./Routes/routes.mjs";
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(router);
app.get("/", (req, res) => {
  res.send("Password Manager App");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
