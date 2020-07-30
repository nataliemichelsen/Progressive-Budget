// require - ✓
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

// port - ✓
// added process.env
const PORT = process.env.PORT || 3001;

// express app - ✓
const app = express();

// middleware - ✓
app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose connect - ✓
// rearranged a few items & added URI
mongoose.connect(
  process.env.MONGODB_URI || `mongodb://localhost/budget`,
  { useNewUrlParser: true }
);

// routes - ✓
app.use(require("./routes/api.js"));

// listening - ✓
// added url
app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}!`);
});