import axios from "axios";
import { Button } from "./Button";

export function JobCardApply({
  title,
  description,
  qualification,
  vacancy,
  company,
  id,
}) {
  return (
    <div className="w-full rounded-md border-zinc flex justify-between text-bold mb-2 p-3 border-2 shadow-md">
      <div className="flex flex-col">
        <h4>
          <b>Title:</b> {title}
        </h4>
        <h4>
          <b>Description:</b> {description}
        </h4>
        <h4>
          <b>Qualification:</b> {qualification}
        </h4>
        <h4>
          <b>Vacancy:</b> {vacancy}
        </h4>
        <h4>
          <b>Company:</b> {company}
        </h4>
      </div>
      <div>
        <Button label={"Apply"} onClick={clickHandler} />
      </div>
    </div>
  );
  async function clickHandler() {
    try {
      const respond = await axios.put(
        "http://localhost:3000/applicant/jobs/" + id,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
          },
        }
      );
      console.log(respond.data);
    } catch (error) {
      console.log("Error applying :", error);
    }
  }
}

export function JobCardApplied({
  title,
  description,
  qualification,
  vacancy,
  company,
  status,
}) {
  return (
    <div className="w-full rounded-md border-zinc flex justify-between text-bold shadow-md mb-2 p-2 border-2">
      <div className="flex flex-col">
        <h4>
          <b>Title:</b> {title}
        </h4>
        <h4>
          <b>Description:</b> {description}
        </h4>
        <h4>
          <b>Qualification:</b> {qualification}
        </h4>
        <h4>
          <b>Vacancy:</b> {vacancy}
        </h4>
        <h4>
          <b>Company:</b> {company}
        </h4>
      </div>
      <div>
        <SubUpdate status={status} />
      </div>
    </div>
  );
}

export function Update({
  firstName,
  lastName,
  adhaar,
  email,
  phone,
  id,
  jobID,
}) {
  console.log(id, jobID);
  return (
    <div className="w-full rounded-md border-zinc flex justify-between text-bold bg-slate-100 border-2 shadow-md p-2 mb-2">
      <div>
        <h4>
          <b>First Name:</b> {firstName}
        </h4>
        <h4>
          <b>Last Name:</b> {lastName}
        </h4>
        <h4>
          <b>Email:</b> {email}
        </h4>
        <h4>
          <b>Phone:</b> +91 {phone}
        </h4>
        <h4>
          <b>Adhaar:</b> {adhaar}
        </h4>
      </div>
      <div>
        <Button
          label={"Approve"}
          onClick={async () => {
            try {
              const respond = await axios.put(
                "http://localhost:3000/recruiter/jobs/" + jobID + "/" + id,
                { status: true },
                {
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("Authorization"),
                  },
                }
              );
              console.log(respond.data);
            } catch (error) {
              console.log("Error applying :", error);
            }
          }}
        />
        <Button
          label={"Reject"}
          onClick={async () => {
            try {
              const respond = await axios.put(
                "http://localhost:3000/recruiter/jobs/" + jobID + "/" + id,
                { status: false },
                {
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("Authorization"),
                  },
                }
              );
              console.log(respond.data);
            } catch (error) {
              console.log("Error applying :", error);
            }
          }}
        />
      </div>
    </div>
  );
}

function SubUpdate({ status }) {
  return (
    <div className="p-3 ">
      <div className="text-xl font-semibold ">
        {status == null
          ? "Submitted"
          : status == true
          ? "Approved"
          : "Rejected"}
      </div>
    </div>
  );
}
