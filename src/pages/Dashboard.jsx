import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import API from "../services/api";
import AddHabitModal from "../components/AddHabitModal";
import { getCurrentWeek, getDayName } from "../utils/weekUtils";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchHabits = async () => {
    try {
      const res = await API.get("/habits");
      setHabits(res.data);
    } catch (err) {
      toast.error("Failed to fetch habits");
    }
  };

  const markDone = async (id) => {
    try {
      await API.post(`/habits/${id}/checkin`);
      toast.success("Habit marked done 🔥");
      fetchHabits();
    } catch (err) {
      toast.error("Already marked today ❌");
    }
  };

  const deleteHabit = async (id) => {
    try {
      await API.delete(`/habits/${id}`);
      toast.success("Habit deleted");
      fetchHabits();
    } catch (err) {
      toast.error("Error deleting habit");
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const week = getCurrentWeek();

  return (
    <div className="max-w-6xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your habits and build streaks 🔥
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 
                     bg-indigo-600 text-white rounded-xl 
                     hover:bg-indigo-700 transition"
        >
          <Plus size={18} />
          Add Habit
        </button>
      </div>

      {/* EMPTY STATE */}
      {habits.length === 0 && (
        <div className="text-center mt-16 text-gray-500 dark:text-gray-400">
          <p className="text-lg font-medium">
            No habits yet
          </p>
          <p className="text-sm">
            Click "Add Habit" to start building streaks 🔥
          </p>
        </div>
      )}

      {/* HABIT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {habits.map((habit) => (
          <motion.div
            key={habit._id}
            whileHover={{ y: -5 }}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md 
                       border border-gray-200 dark:border-gray-700 
                       transition-all duration-300 space-y-5"
          >
            {/* TITLE + BADGE */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {habit.title}
              </h3>

              <span className="text-sm px-3 py-1 rounded-full 
                               bg-indigo-100 dark:bg-indigo-900 
                               text-indigo-600 dark:text-indigo-300">
                🔥 {habit.currentStreak}
              </span>
            </div>

            {/* STREAK INFO */}
            <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
              <p>Current Streak: {habit.currentStreak} days</p>
              <p>Longest Streak: {habit.longestStreak} days</p>
            </div>

            {/* WEEKLY VIEW (COLORED SQUARES) */}
            <div className="flex justify-between text-xs">
              {week.map((day, index) => {
                const formatted = new Date(day).toDateString();

                const completed = habit.completedDates?.some(
                  (d) => new Date(d).toDateString() === formatted
                );

                const isFuture = day > new Date();

                let bgColor = "bg-gray-300 dark:bg-gray-600";
                if (completed) bgColor = "bg-green-500";
                else if (!isFuture) bgColor = "bg-red-400";

                return (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-gray-400">
                      {getDayName(day)}
                    </span>

                    <div
                      className={`w-5 h-5 rounded-md mt-1 ${bgColor}`}
                      title={day.toDateString()}
                    />
                  </div>
                );
              })}
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 pt-3">
              <button
                onClick={() => markDone(habit._id)}
                className="flex-1 py-2 text-sm font-medium 
                           bg-green-500 text-white rounded-lg 
                           hover:bg-green-600 transition"
              >
                Mark Done
              </button>

              <button
                onClick={() => deleteHabit(habit._id)}
                className="flex-1 py-2 text-sm font-medium 
                           bg-red-500 text-white rounded-lg 
                           hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHabitAdded={fetchHabits}
      />
    </div>
  );
};

export default Dashboard;
