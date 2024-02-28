const {
  mySchemaEmail,
  mySchemaFirstName,
  mySchemaLastName,
  mySchemaPhone,
  mySchemaPassword,
  mySchemaAdhaar,
} = require("./zod");
const { applicant } = require("../../db/db");

async function applicantSignupMiddleware(req, res, next) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const adhaar = req.body.adhaar;
  const phone = req.body.phone;

  const first = mySchemaFirstName.safeParse(firstName);
  const last = mySchemaLastName.safeParse(lastName);
  const legalId = mySchemaAdhaar.safeParse(adhaar);
  const number = mySchemaPhone.safeParse(phone);
  const mail = mySchemaEmail.safeParse(email);
  const pass = mySchemaPassword.safeParse(password);
  try {
    if (
      !pass.success ||
      !first.success ||
      !last.success ||
      !legalId.success ||
      !number.success ||
      !mail.success
    ) {
      res.status(400).json({ msg: "username or password or email is invalid" });
      return;
    }
    const users = await applicant.findOne({ email });
    if (users) {
      return res.status(409).json({ msg: "applicant already exist" });
    }
    req.first = firstName;
    req.last = lastName;
    req.adhaar = adhaar;
    req.phone = phone;
    req.email = email;
    req.password = password;
    next();
  } catch (e) {
    res.status(404).json({ msg: "Something is wrong with our server" });
  }
}

module.exports = applicantSignupMiddleware;
