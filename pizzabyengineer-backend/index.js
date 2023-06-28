require("dotenv").config();
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const parser = require("cookie-parser");

const connectToDatabase = require("./db");
app.use(express.json({ extended: false }));
app.use(parser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
const setupRoutes = require("./setupRoutes");

setupRoutes(app);

connectToDatabase();

app.get("/", (req, res) => {
  res.send("HELLO WORLD");
});

app.listen(port, () => {
  console.log(` Pizza by Engineer listening on port ${port}`);
});
