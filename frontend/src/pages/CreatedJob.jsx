import { useEffect, useState } from "react";
import axios from "axios";
// import { Update } from "../components/Card";
import CreatedJobCard from "../components/CreatedJobCard";
import UpdateModal from "./UpdateModal";

export default function CreatedJob() {
  const [popup, setPopup] = useState(false);
  const [id, setId] = useState("");
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const respond = await axios.get(
          "http://localhost:3000/recruiter/jobs",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Authorization"),
            },
          }
        );
        setJobs(respond.data.createdJobs);
      } catch (e) {
        console.log("Error in fetching created jobs", e);
      }
    };
    fetchJobs();
  }, []);
  return (
    <div className="h-screen py-10 bg-slate-100 flex justify-center">
      <div className="w-1/2 h-full bg-white p-2">
        {jobs.map((job) => {
          return (
            <div>
              <CreatedJobCard
                title={job.title}
                description={job.description}
                qualification={job.qualification}
                vacancy={job.vacancy}
                company={job.company}
                id={job._id}
                onOpen={() => setPopup(true)}
                onId={() => {
                  setId(job._id);
                }}
              />
            </div>
          );
        })}
      </div>
      {popup && (
        <UpdateModal
          jobId={id}
          onClose={() => {
            setPopup(false);
          }}
        />
      )}
    </div>
  );
}
