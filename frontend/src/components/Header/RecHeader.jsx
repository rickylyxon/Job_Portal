import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function RecHeader() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="flex justify-between bg-white  px-4 lg:px-6 py-2.5">
        <div>
          <Link
            to="/"
            className="text-gray-700 text-2xl font-bold px-3 hover:text-gray-500"
          >
            Job Portal
          </Link>
        </div>
        <div className="flex items-center lg:order-2">
          <NavLink
            to="createjob"
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            Create Job
          </NavLink>
          <NavLink
            to="createdjob"
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            Created Job
          </NavLink>
          <NavLink
            to="profile"
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            Profile
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
