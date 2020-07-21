// require - ✓
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// port - ✓
const PORT = process.env.PORT || 3000;

// express app - ✓
const app = express();

// middleware - ✓
app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose connect - ✓
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost/budget`,
  { useNewUrlParser: true }
);

// routes - ✓
app.use(require("./routes/api.js"));

// listening - ✓
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}!`);
});