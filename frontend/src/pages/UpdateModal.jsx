import { Update } from "../components/Card";
import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateModal({ onClose, jobId }) {
  const [applicant, setApplicant] = useState([]);
  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const respond = await axios.get(
          "http://localhost:3000/recruiter/jobs/" + jobId,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Authorization"),
            },
          }
        );
        setApplicant(respond.data.jobApplicant);
      } catch (e) {
        console.log("Error in fetching created jobs", e);
      }
    };
    fetchApplicant();
  }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center py-16">
      <div className="w-1/2 h-full bg-slate-100 flex flex-col gap-1 rounded p-4">
        <button onClick={onClose} className="place-self-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        {applicant ? (
          applicant.map((users) => {
            return (
              <div key={users.user._id}>
                <Update
                  firstName={users.user.firstName}
                  lastName={users.user.lastName}
                  adhaar={users.user.adhaar}
                  phone={users.user.phone}
                  email={users.user.email}
                  id={users.ObjectId}
                  jobID={jobId}
                />
              </div>
            );
          })
        ) : (
          <div>No One applied</div>
        )}
      </div>
    </div>
  );
}

export default UpdateModal;
