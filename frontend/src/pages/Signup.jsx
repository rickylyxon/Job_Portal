import { Heading } from "../components/Heading";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userType, setUserType] = useState("recruiter");

  const handleUserTypeChange = (event) => {
    setUserType(event.target.id);
  };
  return (
    <div className="h-full  flex justify-center items-center bg-neutral-200 py-10">
      <div className="bg-stone-100 rounded-lg w-1/4 px-10 py-3 ">
        <Heading heading={"Sign Up"} />
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
        {userType === "recruiter" ? <RecruiterSignUp /> : <ApplicantSignUp />}
      </div>
    </div>
  );

  function RecruiterSignUp() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    return (
      <div>
        <Input
          label={"First Name"}
          placeholder={"Joey"}
          type={"text"}
          id={"firstName"}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <Input
          label={"Last Name"}
          placeholder={"Hamilton"}
          type={"text"}
          id={"lastName"}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
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
          label={"Phone Number"}
          placeholder={"Number"}
          type={"Number"}
          id={"Number"}
          onChange={(e) => {
            setPhone(e.target.value);
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
          label={"Sign Up"}
          onClick={async () => {
            try {
              const respond = await axios.post(
                "http://localhost:3000/recruiter/signup",
                {
                  firstName,
                  lastName,
                  email,
                  phone,
                  password,
                }
              );
              localStorage.setItem("Authorization", respond.data.token);
            } catch (e) {
              console.log("Recruiter sign up error: ", e);
            }
            window.location.href = "/";
          }}
        />
      </div>
    );
  }
  function ApplicantSignUp() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adhaar, setAdhaar] = useState("");
    const [phone, setPhone] = useState("");
    return (
      <div>
        <Input
          label={"First Name"}
          placeholder={"Joey"}
          type={"text"}
          id={"firstName"}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <Input
          label={"Last Name"}
          placeholder={"Hamilton"}
          type={"text"}
          id={"lastName"}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <Input
          label={"Phone Number"}
          placeholder={"Number"}
          type={"Number"}
          id={"Number"}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
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
          label={"Adhaar"}
          placeholder={"adhaar number"}
          type={"Number"}
          id={"adhaar"}
          onChange={(e) => {
            setAdhaar(e.target.value);
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
          label={"Sign Up"}
          onClick={async () => {
            try {
              const respond = await axios.post(
                "http://localhost:3000/applicant/signup",
                {
                  firstName,
                  lastName,
                  email,
                  phone,
                  adhaar,
                  password,
                }
              );
              localStorage.setItem("Authorization", respond.data.token);
            } catch (e) {
              console.log("Applicant sign up error: ", e);
            }
            window.location.href = "/";
          }}
        />
      </div>
    );
  }
}
