import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa6";
import { NavLink, Link } from "react-router-dom";
import { Input } from "../Input";
import { Button } from "../Button";
function Footer() {
  return (
    <footer className="bg-slate-100 p-4 w-full self-baseline border-slate-300 border-t-2 shadow-sm">
      <div className="flex justify-around items-center">
        <div className="flex flex-col justify-center">
          <Link
            to="/"
            className="text-gray-700 text-2xl font-bold  hover:text-gray-500 self-center"
          >
            Job Portal
          </Link>
          <div className="flex gap-4 mt-5 text-2xl">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <NavLink
            to={"/"}
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            Home
          </NavLink>
          <NavLink
            to={"/"}
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            About
          </NavLink>
          <NavLink
            to={"/"}
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            Contact Us
          </NavLink>
        </div>
        <div>
          <Input
            label={"Email"}
            placeholder={"example@gmail.com"}
            type={"text"}
            id={"Email"}
          />
          <Button label={"Subscribe"} />
        </div>
      </div>
      <div className="flex justify-center items-center mt-3 border-t-2">
        Copyright © 2024 XYZ Company . All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
