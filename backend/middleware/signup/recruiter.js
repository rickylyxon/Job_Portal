const {
  mySchemaEmail,
  mySchemaFirstName,
  mySchemaLastName,
  mySchemaPhone,
  mySchemaPassword,
} = require("./zod");
const { recruiter } = require("../../db/db");

async function recruiterSignupMiddleware(req, res, next) {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const phone = req.body.phone;

  const first = mySchemaFirstName.safeParse(firstName);
  const last = mySchemaLastName.safeParse(lastName);
  const number = mySchemaPhone.safeParse(phone);
  const mail = mySchemaEmail.safeParse(email);
  const pass = mySchemaPassword.safeParse(password);

  try {
    if (
      !first.success ||
      !last.success ||
      !number.success ||
      !mail.success ||
      !pass.success
    ) {
      return res
        .status(400)
        .json({ msg: "Username, email, or password is invalid" });
    }

    const existingRecruiter = await recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(409).json({ msg: "Recruiter already exists" });
    }

    req.first = firstName;
    req.last = lastName;
    req.phone = phone;
    req.email = email;
    req.password = password;
    next();
  } catch (error) {
    console.error("Error in recruiterSignupMiddleware:", error);
    res.status(500).json({ msg: "Something went wrong with our server" });
  }
}

module.exports = recruiterSignupMiddleware;
