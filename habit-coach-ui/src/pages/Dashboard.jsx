import React, { useEffect, useState } from "react";
import { fetchHabits } from "../api";
import { getUser } from "../auth";
import HabitCard from "../components/HabitCard";
import HabitForm from "../components/HabitForm";

export default function Dashboard() {
  const user = getUser();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const loadHabits = async () => {
    setLoading(true);
    try {
      const res = await fetchHabits(user.userId);
      setHabits(res.data);
    } catch (err) {
      console.error("Failed to fetch habits", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">My Habits</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Habit
        </button>
      </div>

      {loading ? (
        <p>Loading habits...</p>
      ) : habits.length === 0 ? (
        <p className="text-gray-500">No habits yet. Add your first habit!</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} refresh={loadHabits} />
          ))}
        </div>
      )}

      {showForm && (
        <HabitForm onClose={() => setShowForm(false)} refresh={loadHabits} />
      )}
    </div>
  );
}
