const express = require("express");
const cors = require("cors");
const app = express();

// require("dotenv").config()
// ;
app.use(cors({
  origin: "https://shopping-j1sh.vercel.app",
  // origin: "http://localhost:3001",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"]
}));


const PORT = 3000 || 4000;
app.use(express.json());
const connect = require("./config/database");
connect();



const user = require("./Routes/route");
app.use("/api/v1", user);

app.listen(3000, () => {
  console.log("server run at", 3000);
})

app.get("/", (req, res) => {
  res.send("<h1>backend</h1>")
})