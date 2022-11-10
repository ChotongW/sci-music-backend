// middleware/users.js
const jwt = require("jsonwebtoken");
const queryDB = require("../config/db");

module.exports = {
  validateRegister: (req, res, next) => {
    // username min length 3
    // if (!req.body.username || req.body.username.length < 3) {
    //   return res.status(400).send({
    //     msg: 'Please enter a username with min. 3 chars'
    //   });
    // }

    // password min 6 chars
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).send({
        msg: "Please enter a password with min. 6 chars",
      });
    }

    // password (repeat) does not match
    // if (
    //   !req.body.password_repeat ||
    //   req.body.password != req.body.password_repeat
    // ) {
    //   return res.status(400).send({
    //     msg: 'Both passwords must match'
    //   });
    // }

    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      //   console.log(token);
      //   console.log(decoded);
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },

  isAdmin: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      //   console.log(token);
      //console.log(decoded);
      var sql = "SELECT id_no FROM admin WHERE id_no = ?";
      try {
        var result = await queryDB(sql, decoded.id);
        if (result.length === 0) {
          return res.status(401).send({
            msg: "Restricted access denied",
          });
        } else {
          req.userData = decoded;
          next();
        }
      } catch (err) {
        return res.send(500, { message: err });
      }
    } catch (err) {
      return res.status(401).send({
        msg: "Your session is not valid!",
      });
    }
  },
};
