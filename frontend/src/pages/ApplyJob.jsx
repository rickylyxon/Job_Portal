import { useEffect, useState } from "react";
import { JobCardApply } from "../components/Card";
import axios from "axios";

export default function ApplyJob() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJob = async () => {
      const respond = await axios.get("http://localhost:3000/applicant/jobs", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Authorization"),
        },
      });
      setJobs(respond.data.Jobs);
    };
    fetchJob();
  }, []);
  return (
    <div className="h-full py-10 bg-slate-100 flex justify-center rounded">
      <div className="w-1/2 h-full bg-white p-2">
        {jobs.map((job) => {
          return (
            <div key={job._id}>
              <JobCardApply
                title={job.title}
                description={job.description}
                qualification={job.qualification}
                vacancy={job.vacancy}
                company={job.company}
                id={job._id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
