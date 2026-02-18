import React from "react";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
        Welcome Back 👋
      </h1>

      <ThemeToggle />
    </div>
  );
};

export default Navbar;
