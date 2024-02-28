const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const recruiterRouter = require("./routes/recruiter");
const applicantRouter = require("./routes/applicant");
const { JWT_SECRET } = require("./middleware/config");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(cors());
app.use("/recruiter", recruiterRouter);
app.use("/applicant", applicantRouter);
app.get("/auth", (req, res) => {
  const authorization = req.headers.authorization;
  const preToken = authorization.split(" ");
  const token = preToken[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    if (verified) {
      res.status(200).json({ Auth: verified, msg: "It's authenticated" });
    }
  } catch (error) {
    auth = { status: false };
    res.status(403).json({ Auth: "Forbidden", error: error.message });
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
