import React, { useState } from "react";
import { createHabit } from "../api";
import { getUser } from "../auth";

export default function HabitForm({ onClose, refresh }) {
  const user = getUser();
  const [form, setForm] = useState({
    name: "",
    description: "",
    scheduleDays: [],
  });
  const [loading, setLoading] = useState(false);

  const toggleDay = (day) => {
    setForm((prev) => {
      const hasDay = prev.scheduleDays.includes(day);
      return {
        ...prev,
        scheduleDays: hasDay
          ? prev.scheduleDays.filter((d) => d !== day)
          : [...prev.scheduleDays, day],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createHabit({ ...form, userId: user.userId });
      refresh();
      onClose();
    } catch (err) {
      console.error("Failed to create habit", err);
    } finally {
      setLoading(false);
    }
  };

  const weekDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">New Habit</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Habit name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded px-3 py-2"
          />

          <div className="flex flex-wrap gap-2 text-sm">
            {weekDays.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-2 py-1 rounded border ${
                  form.scheduleDays.includes(day)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded border hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
