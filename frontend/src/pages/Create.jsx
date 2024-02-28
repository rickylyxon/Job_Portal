import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import axios from "axios";

export default function CreateJob() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [qualification, setQualification] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [company, setCompany] = useState("");
  return (
    <div className="h-full py-10  bg-slate-100 flex justify-center">
      <div className="w-1/3 h-full bg-white shadow-md p-4 flex flex-col rounded-md border-2">
        <Heading heading={"Create A Job"} />
        <Input
          label={"Title :"}
          placeholder={"Add a Title"}
          type={"text"}
          id={"title"}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Input
          label={"Description :"}
          placeholder={"Description"}
          type={"text"}
          id={"Description"}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Input
          label={"Qualification :"}
          placeholder={"Qualification"}
          type={"text"}
          id={"Qualification"}
          onChange={(e) => {
            setQualification(e.target.value);
          }}
        />
        <Input
          label={"Vacancy :"}
          placeholder={"Vacancy"}
          type={"Number"}
          id={"Vacancy"}
          onChange={(e) => {
            setVacancy(e.target.value);
          }}
        />
        <Input
          label={"Company :"}
          placeholder={"company"}
          type={"text"}
          id={"company"}
          onChange={(e) => {
            setCompany(e.target.value);
          }}
        />

        <Button
          label={"Add Job"}
          onClick={async () => {
            try {
              await axios.post(
                "http://localhost:3000/recruiter/createjob",
                {
                  title,
                  description,
                  qualification,
                  vacancy,
                  company,
                },
                {
                  headers: {
                    Authorization:
                      "Bearer " + localStorage.getItem("Authorization"),
                  },
                }
              );
            } catch (e) {
              console.log("Error in fetching jobs: ", e);
            }
          }}
        />
      </div>
    </div>
  );
}
