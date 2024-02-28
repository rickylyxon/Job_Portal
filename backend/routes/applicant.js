const { Router } = require("express");
const mongoose = require("mongoose");

const router = Router();
const {
  applicantMiddleware,
  applicantFirstMiddleware,
} = require("../middleware/signin/applicant");
const applicantSignupMiddleware = require("../middleware/signup/applicant");
const { applicant, jobs } = require("../db/db");
const { JWT_SECRET } = require("../middleware/config");
const jwt = require("jsonwebtoken");

router.post("/signup", applicantSignupMiddleware, async (req, res) => {
  const firstName = req.first;
  const lastName = req.last;
  const email = req.email;
  const password = req.password;
  const adhaar = req.adhaar;
  const phone = req.phone;
  try {
    await applicant.create({
      email,
      firstName,
      lastName,
      phone,
      adhaar,
      password,
    });
    const applicantToken = {
      email: email,
      status: true,
      role: "applicant",
    };
    const token = jwt.sign(applicantToken, JWT_SECRET);
    res.status(200).json({ token: token, msg: "signup successful" });
  } catch (error) {
    res.status(404).json({ msg: "something is wrong in our server: ", error });
  }
});

router.post("/signin", applicantFirstMiddleware, async (req, res) => {
  const email = req.email;
  const applicant = {
    email: email,
    status: true,
    role: "applicant",
  };
  const token = jwt.sign(applicant, JWT_SECRET);
  res.status(200).json({ token: token, msg: "sigin successful" });
});

router.get("/jobsApplied", applicantMiddleware, async (req, res) => {
  try {
    const email = req.email;
    const users = await applicant.findOne({ email });
    const jobPromises = users.jobApplied.map(async (jobId) => {
      try {
        const jobInfo = await jobs.aggregate([
          { $match: { _id: new mongoose.Types.ObjectId(jobId) } },
          { $unwind: "$jobApplicant" },
          {
            $match: {
              "jobApplicant.applicant": new mongoose.Types.ObjectId(users._id),
            },
          },
          {
            $project: {
              title: 1,
              description: 1,
              qualification: 1,
              company: 1,
              vacancy: 1,
              "jobApplicant.status": 1,
            },
          },
        ]);
        return jobInfo;
      } catch (error) {
        console.error("Error in aggregation:", error);
        throw error; 
      }
    });
    const jobsApplied = await Promise.all(jobPromises);
    res.status(200).json({ jobsApplied: jobsApplied });
  } catch (error) {
    console.error("Error in fetching jobsApplied:", error);
    res.status(500).json({ msg: "Something went wrong in our server" });
  }
});

router.put("/jobs/:jobId", applicantMiddleware, async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const email = req.email;
    const users = await applicant.findOne({ email });
    await jobs.findOne({ _id: jobId });
    const jobExists = users.jobApplied.some((job) => job.toString() === jobId);
    if (jobExists) {
      res.status(404).json({ msg: "You've already applied" });
      return;
    }
    await applicant.updateOne({ email }, { $push: { jobApplied: jobId } });
    await jobs.findOneAndUpdate(
      { _id: jobId },
      { $push: { jobApplicant: { applicant: users._id, status: null } } },
      { new: true }
    );
    res.status(200).json({ msg: "Job Applied successfully" });
  } catch (error) {
    res
      .status(404)
      .json({ msg: "Something is wrong with our server: ", error });
  }
});

router.get("/jobs", applicantMiddleware, async (req, res) => {
  try {
    const job = await jobs.find({});
    res.status(200).json({ Jobs: job });
  } catch (error) {
    res.status(404).json({ msg: "Something is wrong in our server: ", error });
  }
});

router.get("/profile", applicantMiddleware, async (req, res) => {
  try {
    const email = req.email;
    const user = await applicant.findOne({ email });
    res.status(200).json({ user: user });
  } catch (e) {
    res.status(404).json({ msg: "Something is wrong in our server :", e });
  }
});

module.exports = router;
