const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // Allows us to get data in req.body
app.use(cors()); // Enable CORS for all routes

// Define Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

// Simple root route for testing
app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
