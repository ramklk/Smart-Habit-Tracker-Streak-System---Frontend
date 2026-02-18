import React from "react";
import { LayoutDashboard, BarChart3, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 min-h-screen bg-white dark:bg-gray-800 shadow-lg p-6"
    >
      <h2 className="mb-8 text-xl font-bold text-gray-800 dark:text-white">
        Habit Tracker 🔥
      </h2>

      <nav className="space-y-4">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/stats"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <BarChart3 size={18} />
          Stats
        </NavLink>

        <button className="flex items-center gap-3 p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-800 transition w-full text-left">
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </motion.div>
  );
};

export default Sidebar;
