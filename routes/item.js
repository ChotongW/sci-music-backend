const express = require("express");
const bodyParser = require("body-parser");
const queryDB = require("../config/db");
const userMiddleware = require("../middlewares/roles");
var uuid = require("uuid");

router = express.Router();
router.use(express.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/", async (req, res) => {
  var sql = "SELECT * FROM user";
  try {
    var result = await queryDB(sql);
    if (result[0] === undefined) {
      res.send(
        {
          message: "No user found.",
        },
        400
      );
      return;
    }
  } catch (err) {
    console.log(err);
    res.send(500, { message: err });
    return;
  }
});

module.exports = router;
