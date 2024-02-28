import { useEffect, useState } from "react";
import { JobCardApplied } from "../components/Card";
import axios from "axios";

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const respond = await axios.get(
        "http://localhost:3000/applicant/jobsApplied",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
          },
        }
      );
      setJobs(respond.data.jobsApplied);
    };
    fetchAppliedJobs();
  }, []);
  return (
    <div className="h-full p-10 bg-slate-100 flex justify-center">
      <div className="w-1/2 h-full bg-white p-2">
        {!jobs ? (
          <div>You didn't applied any job</div>
        ) : (
          jobs.map((job) => {
            return (
              <div>
                <JobCardApplied
                  title={job[0].title}
                  description={job[0].description}
                  qualification={job[0].qualification}
                  vacancy={job[0].vacancy}
                  company={job[0].company}
                  status={job[0].jobApplicant.status}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
