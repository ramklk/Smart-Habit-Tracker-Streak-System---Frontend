export const getStreakColor = (streak) => {
  if (streak >= 10) return "text-green-500";
  if (streak >= 5) return "text-yellow-500";
  return "text-red-500";
};

export const getStreakMessage = (streak) => {
  if (streak >= 10) return "🔥 On Fire!";
  if (streak >= 5) return "💪 Keep Going!";
  return "🚀 Just Started!";
};
