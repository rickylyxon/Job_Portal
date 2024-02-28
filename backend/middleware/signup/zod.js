const z = require("zod");

const mySchemaFirstName = z.string();
const mySchemaLastName = z.string();
const mySchemaEmail = z.string().email();
const mySchemaPassword = z.string().min(8);
const mySchemaTitle = z.string();
const mySchemaDescription = z.string();
const mySchemaCompany = z.string();
const mySchemaQualification = z.string();
const mySchemaVacancy = z.number();
const mySchemaPhone = z.string().min(10).max(10);
const mySchemaAdhaar = z.string().min(12).max(12);

module.exports = {
  mySchemaEmail,
  mySchemaFirstName,
  mySchemaLastName,
  mySchemaPassword,
  mySchemaDescription,
  mySchemaTitle,
  mySchemaCompany,
  mySchemaQualification,
  mySchemaVacancy,
  mySchemaPhone,
  mySchemaAdhaar,
};
