const { applicant } = require("../../db/db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

function applicantMiddleware(req, res, next) {
  const authorization = req.headers.authorization;
  const preToken = authorization.split(" ");
  const token = preToken[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    if (verified.email) {
      req.email = verified.email;
      next();
    }
  } catch {
    res.status(403).json({ message: "Forbidden" });
  }
}

async function applicantFirstMiddleware(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const users = await applicant.findOne({ email });
    if (users.password === password) {
      req.user = users;
      req.email = users.email;
      next();
    } else {
      res.status(400).json({ msg: "Your password is wrong" });
    }
  } catch {
    res.status(403).json({ message: "Applicant Doesn't Exist" });
  }
}
module.exports = { applicantMiddleware, applicantFirstMiddleware };
