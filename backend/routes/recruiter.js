const { Router } = require("express");
const router = Router();
const {
  recruiterMiddleware,
  recruiterFirstMiddleware,
} = require("../middleware/signin/recruiter");
const recruiterSignupMiddleware = require("../middleware/signup/recruiter");
const jobsMiddleware = require("../middleware/signin/jobs");
const { recruiter, jobs, applicant } = require("../db/db");
const { JWT_SECRET } = require("../middleware/config");
const jwt = require("jsonwebtoken");

router.post("/signup", recruiterSignupMiddleware, async (req, res) => {
  const firstName = req.first;
  const lastName = req.last;
  const phone = req.phone;
  const email = req.email;
  const password = req.password;
  try {
    await recruiter.create({
      email,
      firstName,
      lastName,
      phone,
      password,
    });
    const recruiterToken = {
      email: email,
      status: true,
      role: "recruiter",
    };
    const token = jwt.sign(recruiterToken, JWT_SECRET);
    res.status(200).json({ token: token, msg: "signup successfull" });
  } catch (error) {
    res.status(404).json({ msg: "something is wrong in our server" });
  }
});

router.post("/signin", recruiterFirstMiddleware, (req, res) => {
  const user = req.user;
  const recruiter = {
    email: user.email,
    status: true,
    role: "recruiter",
  };
  const token = jwt.sign(recruiter, JWT_SECRET);
  res.status(200).json({ token: token, msg: "sigin successful" });
});

router.post(
  "/createjob",
  recruiterMiddleware,
  jobsMiddleware,
  async (req, res) => {
    const title = req.title;
    const description = req.description;
    const qualification = req.qualification;
    const vacancy = req.vacancy;
    const company = req.company;
    const email = req.email;
    try {
      const job = await jobs.create({
        title,
        description,
        qualification,
        vacancy,
        company,
      });
      await recruiter.updateOne({ email }, { $push: { jobCreated: job._id } });
      res.status(200).json({ msg: "Job created successfully" });
    } catch (error) {
      res.status(404).json({ msg: "Something is wrong in our server" });
    }
  }
);

router.get("/jobs", recruiterMiddleware, async (req, res) => {
  try {
    const email = req.email;
    const users = await recruiter.findOne({ email });
    const jobPromises = users.jobCreated.map(async (jobId) => {
      return await jobs.findOne({ _id: jobId });
    });
    const jobCreated = await Promise.all(jobPromises);
    res.status(200).json({ createdJobs: jobCreated });
  } catch (error) {
    res.status(404).json({ msg: "Something is wrong in our server" });
  }
});

router.get("/jobs/:jobId", recruiterMiddleware, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const jobDetails = await jobs.findOne({ _id: jobId });
    if (!jobDetails) {
      return res.status(404).json({ msg: "Job not found" });
    }
    const userId = jobDetails.jobApplicant.map((users) => {
      return { userApp: users.applicant, ObjectId: users._id };
    });
    const userDetails = await Promise.all(
      userId.map(async (users) => {
        const userDetails = await applicant.findOne({ _id: users.userApp });
        return { user: userDetails, ObjectId: users.ObjectId };
      })
    );
    res.status(200).json({ jobApplicant: userDetails, jobId: jobId });
  } catch (e) {
    res.status(404).json({ msg: "something is wrong with our server" });
  }
});

router.put("/jobs/:jobId/:updateId", recruiterMiddleware, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const updateId = req.params.updateId;
    const updateBool = req.body.status;
    const jobDetails = await jobs.findOne({ _id: jobId });
    if (!jobDetails) {
      return res.status(404).json({ msg: "Job not found" });
    }
    await jobs.updateOne(
      { _id: jobId, "jobApplicant._id": updateId },
      { $set: { "jobApplicant.$.status": updateBool } }
    );
    res
      .status(200)
      .json({ msg: " the job status of the applicant is updated" });
  } catch (e) {
    res.status(404).json({ msg: "something is wrong with our server" });
  }
});

router.get("/profile", recruiterMiddleware, async (req, res) => {
  try {
    const email = req.email;
    const user = await recruiter.findOne({ email: email });
    res.status(200).json({ user: user });
  } catch (e) {
    res.status(404).json({ msg: "Something is wrong in our server :", e });
  }
});
module.exports = router;
