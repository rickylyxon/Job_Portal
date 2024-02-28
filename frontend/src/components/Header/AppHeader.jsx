import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function AppHeader() {
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="flex justify-between bg-indigo-50  px-4 lg:px-6 py-2.5">
        <div>
          <Link
            to="/"
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            Job Portal
          </Link>
        </div>
        <div className="flex items-center lg:order-2">
          <NavLink
            to="/applyjob"
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            Apply
          </NavLink>
          <NavLink
            to="appliedjob"
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            Applied
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
