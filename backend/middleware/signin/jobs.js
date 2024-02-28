const {
  mySchemaTitle,
  mySchemaDescription,
  mySchemaCompany,
  mySchemaQualification,
  mySchemaVacancy,
} = require("../signup/zod");

function jobMiddleware(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const qualification = req.body.qualification;
  const vacancy = req.body.vacancy;
  const company = req.body.company;

  const titleCheck = mySchemaTitle.safeParse(title);
  const descriptionCheck = mySchemaDescription.safeParse(description);
  const qualificationCheck = mySchemaQualification.safeParse(qualification);
  const vacancyCheck = mySchemaVacancy.safeParse(vacancy);
  const companyCheck = mySchemaCompany.safeParse(company);

  try {
    if (
      !titleCheck.success ||
      !descriptionCheck.success ||
      !qualificationCheck ||
      !vacancyCheck ||
      !companyCheck
    ) {
      res.status(400).json({ msg: "tittle or description is invalid" });
      return;
    }
    req.title = title;
    req.description = description;
    req.qualification = qualification;
    req.vacancy = vacancy;
    req.company = company;
    next();
  } catch (e) {
    res.status(404).json({ msg: "Something is wrong with our server" });
  }
}

module.exports = jobMiddleware;
