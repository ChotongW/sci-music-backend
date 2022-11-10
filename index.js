const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./routes/user");

var morgan = require("morgan");
// create "morgan middleware"
app.use(morgan("common"));

app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/user", user);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
