import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authLogout, authUserSelector } from "../../slices/auth/auth";
import { ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const dispatch = useDispatch();
  const { data } = useSelector(authUserSelector);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(authLogout());
  };

  const isActive = (path) => {
    return location.pathname === path ? "text-primary-600 font-semibold" : "text-gray-600 hover:text-primary-600";
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-secondary-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
              Simply Sensible
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1 items-center bg-secondary-50/50 p-1 rounded-full border border-secondary-100">
            <Link to="/" className={`${isActive("/")} px-6 py-2 rounded-full text-sm font-medium transition-all duration-300`}>
              Home
            </Link>
            <Link to="/shop" className={`${isActive("/shop")} px-6 py-2 rounded-full text-sm font-medium transition-all duration-300`}>
              Shop
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/shop/cart" className="relative group p-3 rounded-full hover:bg-secondary-50 transition-all duration-300">
              <ShoppingBagIcon className="h-6 w-6 text-secondary-600 group-hover:text-primary-600 transition-colors" />
              {/* Optional: Add badge here if needed */}
            </Link>

            {data?.token ? (
              <div className="flex items-center gap-4 pl-4 border-l border-secondary-200">
                <Link to="/user/profile" className="flex items-center gap-3 text-sm font-medium text-secondary-700 hover:text-primary-600 transition-colors group">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-primary-700 shadow-sm group-hover:shadow-md transition-all">
                    {data?.result?.name?.[0]?.toUpperCase() || <UserIcon className="h-5 w-5" />}
                  </div>
                  <span className="hidden sm:block group-hover:translate-x-0.5 transition-transform">{data?.result?.name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-secondary-400 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
