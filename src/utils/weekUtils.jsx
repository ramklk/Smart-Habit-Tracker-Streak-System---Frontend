export const getCurrentWeek = () => {
  const today = new Date();
  const dayIndex = today.getDay();

  const monday = new Date(today);
  monday.setDate(today.getDate() - ((dayIndex + 6) % 7));

  const week = [];

  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    week.push(day);
  }

  return week;
};

export const getDayName = (date) => {
  return date.toLocaleDateString("en-US", { weekday: "short" });
};
