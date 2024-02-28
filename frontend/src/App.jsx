import React, { useState, useEffect } from "react";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Landing from "./main/Landing.jsx";
import Signin from "./pages/Signin.jsx";
import Signup from "./pages/Signup.jsx";
import { Home } from "./pages/Home.jsx";
import ApplyJob from "./pages/ApplyJob.jsx";
import AppliedJobs from "./pages/JobApplied.jsx";
import Recruiter from "./main/Recruiter.jsx";
import CreateJob from "./pages/Create.jsx";
import CreatedJob from "./pages/CreatedJob.jsx";
import Applicant from "./main/Applicant.jsx";
import axios from "axios";
import Error from "./pages/Error.jsx";
import RecruiterProfile from "./pages/RecruiterProfile.jsx";
import ApplicantProfile from "./pages/ApplicantProfile.jsx";

const App = () => {
  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    const AuthStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
          },
        });
        setAuthStatus(response.data);
      } catch (error) {
        console.error("Error fetching authentication status:", error);
        setAuthStatus(null);
      }
    };
    AuthStatus();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      !authStatus ? (
        <Route path="/" element={<Landing />}>
          <Route path="" element={<Home />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Error />} />
        </Route>
      ) : authStatus.Auth.role == "applicant" ? (
        <Route path="/" element={<Applicant />}>
          <Route path="" element={<Home />} />
          <Route path="applyjob" element={<ApplyJob />} />
          <Route path="appliedjob" element={<AppliedJobs />} />
          <Route path="profile" element={<ApplicantProfile />} />
          <Route path="*" element={<Error />} />
        </Route>
      ) : (
        <Route path="/" element={<Recruiter />}>
          <Route path="" element={<Home />} />
          <Route path="createjob" element={<CreateJob />} />
          <Route path="createdjob" element={<CreatedJob />} />
          <Route path="profile" element={<RecruiterProfile />} />
          <Route path="*" element={<Error />} />
        </Route>
      )
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
