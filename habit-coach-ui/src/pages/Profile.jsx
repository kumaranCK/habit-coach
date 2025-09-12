import React, { useEffect, useState } from "react";
import { getUser } from "../auth";
import { fetchHabits } from "../api";

export default function Profile() {
  const user = getUser();
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      try {
        const res = await fetchHabits(user.userId);
        console.log("Fetched habits:", res.data);
        setHabits(res.data);
      } catch (err) {
        console.error("Failed to load habits", err);
      }
    };
    load();
  }, [user?.userId]);

  if (!user) return <p className="text-center">Please log in to view profile.</p>;

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Your Habits</h3>
        {habits.length === 0 ? (
          <p>No habits yet. Create one from your dashboard!</p>
        ) : (
          <ul className="list-disc pl-5">
            {habits.map((h) => (
              <li key={h.id}>
                {h.name} – <span className="text-gray-500">{h.scheduleDays.join(", ")}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
