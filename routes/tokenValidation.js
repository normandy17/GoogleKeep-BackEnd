const jwt = require("jsonwebtoken");

const tokenValidation = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // console.log(authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token)
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = user;
     console.log(user);
    next();
  });
};

module.exports = { tokenValidation };
