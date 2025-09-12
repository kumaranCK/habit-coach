import React, { useEffect, useState } from "react";
import { fetchHabits, getStreak } from "../api";
import { getUser } from "../auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function Analytics() {
  const user = getUser();
  const [data, setData] = useState([]);

  useEffect(() => {
  if (!user) return;

  const fetchData = async () => {
    try {
      const habits = await fetchHabits(user.userId); // return .data in api.js
      const streaks = await Promise.all(
        habits.data.map(async (habit) => {
          const res = await getStreak(habit.id, user.userId);
          return { name: habit.description, streak: res.data.currentStreakDays};
        })
      );
      setData(streaks);
    } catch (err) {
      console.error("Failed to load analytics", err);
    }
  };

  fetchData();
}, [user?.userId]); // ✅ stable dependency

  if (!user)
    return <p className="text-center">Please log in to view analytics.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📊 Your Habit Analytics</h2>
      {data.length === 0 ? (
        <p>No habits or streaks yet. Start building habits!</p>
      ) : (
        <div className="w-full h-80">
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="streak" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
