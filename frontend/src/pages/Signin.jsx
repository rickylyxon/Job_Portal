import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { Input } from "../components/Input";
import React, { useState } from "react";
import axios from "axios";

export default function Signin() {
  const [userType, setUserType] = useState("recruiter");

  const handleUserTypeChange = (event) => {
    setUserType(event.target.id);
  };
  return (
    <div className="h-full  flex justify-center items-center bg-neutral-200 py-10">
      <div className="bg-stone-100 rounded-lg w-1/4 px-10 py-3 ">
        <Heading heading={"Sign In"} />
        <div className="flex justify-around">
          <label for="recruiter">
            <input
              type="radio"
              name="userType"
              id="recruiter"
              checked={userType === "recruiter"}
              onChange={handleUserTypeChange}
            />
            Recruiter
          </label>
          <label for="applicant">
            <input
              type="radio"
              name="userType"
              id="applicant"
              checked={userType === "applicant"}
              onChange={handleUserTypeChange}
            />
            Applicant
          </label>
        </div>
        {userType === "recruiter" ? <RecruiterSignIn /> : <ApplicantSignIn />}
      </div>
    </div>
  );
  function RecruiterSignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div>
        <Input
          label={"Email"}
          placeholder={"example@gmail.com"}
          type={"email"}
          id={"email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          label={"Password"}
          placeholder={"password"}
          type={"password"}
          id={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          label={"Sign In"}
          onClick={async () => {
            try {
              const respond = await axios.post(
                "http://localhost:3000/recruiter/signin",
                {
                  email,
                  password,
                }
              );
              localStorage.setItem("Authorization", respond.data.token);
            } catch (e) {
              console.log("Recruiter sign in error: ", e);
            }
            window.location.href = "/";
          }}
        />
      </div>
    );
  }
  function ApplicantSignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div>
        <Input
          label={"Email"}
          placeholder={"example@gmail.com"}
          type={"email"}
          id={"email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          label={"Password"}
          placeholder={"password"}
          type={"password"}
          id={"password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          label={"Sign In"}
          onClick={async () => {
            try {
              const respond = await axios.post(
                "http://localhost:3000/applicant/signin",
                {
                  email,
                  password,
                }
              );
              localStorage.setItem("Authorization", respond.data.token);
            } catch (e) {
              console.log("Applicant sign in error: ", e);
            }
            window.location.href = "/";
          }}
        />
      </div>
    );
  }
}
