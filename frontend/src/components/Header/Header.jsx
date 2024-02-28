import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className=" font-sans shadow sticky z-50 top-0">
      <nav className="flex justify-between align-middle bg-indigo-50 px-4 lg:px-6 py-2.5">
        <div className="text-gray-700 flex justify-between align-middle text-2xl font-bold hover:text-gray-500">
          <Link to="/">Job Portal</Link>
        </div>
        <div className="flex items-center lg:order-2">
          <NavLink
            to="/signin"
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            Sign in
          </NavLink>
          <NavLink
            to="/signup"
            className="text-gray-700 text-lg font-semibold px-3 hover:text-gray-500"
          >
            Get started
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
