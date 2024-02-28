const { recruiter } = require("../../db/db");
const { JWT_SECRET } = require("../config");
const jwt = require("jsonwebtoken");

function recruiterMiddleware(req, res, next) {
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
    res.status(403).json({ message: "Recruiter Doesn't Exist" });
  }
}

async function recruiterFirstMiddleware(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const users = await recruiter.findOne({ email });
    if (users.password === password) {
      req.user = users;
      req.email = users.email;
      next();
    }
  } catch {
    res.status(403).json({ message: "Applicant Doesn't Exist" });
  }
}

module.exports = { recruiterMiddleware, recruiterFirstMiddleware };
