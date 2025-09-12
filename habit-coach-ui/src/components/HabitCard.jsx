import React, { useEffect, useState } from "react";
import { logHabit, getStreak } from "../api";
import { getUser } from "../auth";

export default function HabitCard({ habit, refresh }) {
  const user = getUser();
  const [streak, setStreak] = useState(0);
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const res = await getStreak(habit.id, user.userId);
        setStreak(res.data.currentStreakDays);
      } catch (err) {
        console.error("Streak fetch failed", err);
      }
    };
    fetchStreak();
  }, [habit.id, user.userId]);

  const handleLog = async () => {
    setLogging(true);
    try {
      await logHabit(habit.id, { userId: user.userId });
      refresh();
    } catch (err) {
      console.error("Failed to log habit", err);
    } finally {
      setLogging(false);
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex flex-col">
      <h3 className="font-semibold text-lg">{habit.name}</h3>
      <p className="text-sm text-gray-600">{habit.description}</p>
      <p className="text-xs text-gray-500 mt-1">
        Days: {habit.scheduleDays?.join(", ")}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm">🔥 Streak: {streak} days</span>
        <button
          onClick={handleLog}
          disabled={logging}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {logging ? "Logging..." : "Mark Done"}
        </button>
      </div>
    </div>
  );
}
