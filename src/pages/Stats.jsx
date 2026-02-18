import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Stats = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await API.get("/habits/stats");
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <div className="text-gray-800 dark:text-white">
        Loading stats...
      </div>
    );
  }

  const chartData = {
    labels: ["Weekly", "Monthly"],
    datasets: [
      {
        label: "Completions",
        data: [stats.weeklyCompletions, stats.monthlyCompletions],
        backgroundColor: ["#6366f1", "#22c55e"],
      },
    ],
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">
        Your Statistics 📊
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow"
        >
          <p className="text-gray-500 dark:text-gray-400">Total Habits</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {stats.totalHabits}
          </h3>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow"
        >
          <p className="text-gray-500 dark:text-gray-400">Weekly</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {stats.weeklyCompletions}
          </h3>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow"
        >
          <p className="text-gray-500 dark:text-gray-400">Monthly</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {stats.monthlyCompletions}
          </h3>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow"
        >
          <p className="text-gray-500 dark:text-gray-400">Success Rate</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            {stats.successRate}%
          </h3>
        </motion.div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow"
      >
        <Bar data={chartData} />
      </motion.div>
    </div>
  );
};

export default Stats;
