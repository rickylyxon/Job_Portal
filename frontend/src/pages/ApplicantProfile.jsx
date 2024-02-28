import React, { useEffect, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";

function ApplicantProfile() {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      const respond = await axios.get(
        "http://localhost:3000/applicant/profile",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization"),
          },
        }
      );
      setProfile(respond.data.user);
    };
    fetchProfile();
  }, []);
  return (
    <div className="min-h-full bg-slate-500 flex justify-center items-center ">
      <Button
        label={"Log Out"}
        onClick={() => {
          localStorage.removeItem("Authorization");
          window.location.href = "/";
        }}
      />
    </div>
  );
}

export default ApplicantProfile;
