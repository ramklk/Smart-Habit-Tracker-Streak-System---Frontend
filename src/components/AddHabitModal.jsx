import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import API from "../services/api";

const AddHabitModal = ({ isOpen, onClose, onHabitAdded }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Habit title required");
      return;
    }

    try {
      await API.post("/habits", { title });
      toast.success("Habit created successfully");
      setTitle("");
      onHabitAdded();
      onClose();
    } catch (err) {
      toast.error("Error creating habit");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
              <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-white">
                Create New Habit
              </h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Habit title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 mb-4 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                />

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Add
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AddHabitModal;
