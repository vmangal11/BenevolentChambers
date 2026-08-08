const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const path = require("path");
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

// -------- Serve React frontend in production --------
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "client", "build");
  app.use(express.static(frontendPath));

  // Catch-all: send index.html for any non-API route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(frontendPath, "index.html"));
  });
}
// -----------------------------------------------------

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
