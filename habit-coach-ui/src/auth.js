export const getUser = () => {
  const raw = localStorage.getItem("hc_user");
  return raw ? JSON.parse(raw) : null;
};

export const setUser = (user) => {
  localStorage.setItem("hc_user", JSON.stringify(user));
};

export const clearUser = () => {
  localStorage.removeItem("hc_user");
};
