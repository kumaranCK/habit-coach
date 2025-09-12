import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, clearUser } from "../auth";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();

  const logout = () => {
    clearUser();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <Link to={user ? `/u/${user.userId}` : "/"} className="font-bold text-lg">
            🔥 Habit Coach
          </Link>
          <span className="text-sm text-gray-500 hidden md:inline">Small daily wins</span>
        </div>

        <nav className="flex items-center gap-4 text-sm">
          {user && (
            <>
              <Link
                to={`/u/${user.userId}`}
                className={location.pathname.startsWith("/u") ? "text-blue-600" : "text-gray-700"}
              >
                Home
              </Link>
              <Link
                to="/coach"
                className={location.pathname === "/coach" ? "text-blue-600" : "text-gray-700"}
              >
                AI Coach
              </Link>
              <Link
                to="/analytics"
                className={location.pathname === "/analytics" ? "text-blue-600" : "text-gray-700"}
              >
                Analytics
              </Link>
              <Link
  to="/profile"
  className={location.pathname === "/profile" ? "text-blue-600" : "text-gray-700"}
>
  Profile
</Link>
            </>
          )}

          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-gray-600">Hi, {user.username}</span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded border text-sm hover:bg-gray-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-3 py-1 rounded border hover:bg-gray-50">
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 rounded border hover:bg-gray-50 hidden sm:inline"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
