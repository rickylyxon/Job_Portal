const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rickylaikhuram:O44bPKp55w4y6Z2e@cluster0.svkfdlr.mongodb.net/jobPortal"
);

const RecruiterSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  password: String,
  jobCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
    },
  ],
});
const ApplicantSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  phone: Number,
  adhaar: Number,
  password: String,
  jobApplied: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
    },
  ],
});
const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  qualification: String,
  vacancy: Number,
  company: String,
  jobApplicant: [
    {
      applicant: { type: mongoose.Schema.Types.ObjectId, ref: "applicant" },
      status: { type: Boolean, default: null },
    },
  ],
});

const recruiter = mongoose.model("recruiter", RecruiterSchema);
const applicant = mongoose.model("applicant", ApplicantSchema);
const jobs = mongoose.model("jobs", JobSchema);

module.exports = {
  recruiter,
  applicant,
  jobs,
};
