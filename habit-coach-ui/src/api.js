import axios from "axios";

const base = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";
const api = axios.create({ baseURL: base });

// ---- Habits ----
export const fetchHabits = (userId) => api.get(`/habits/${userId}`);
export const createHabit = (habit) => api.post("/habits", habit);
export const logHabit = (habitId, body) => api.post(`/habits/${habitId}/log`, body);
export const getStreak = (habitId, userId) =>
  api.get(`/habits/${habitId}/streak/${userId}`);

// AI
export const askAI = (prompt) => api.get("/ai/ask", { params: { prompt } });

// Users
export const registerUser = (payload) => api.post("/users/register", payload);
export const loginUser = (payload) => api.post("/users/login", payload);
export const getUser = (userId) => api.get(`/users/${userId}`);

export default api;
