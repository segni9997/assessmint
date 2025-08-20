import { useEffect, useState } from "react";
import Header from "../components/Header";
import Avatar from "@mui/material/Avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Bot, LogOut, PlusCircle, Settings, User } from "lucide-react";
import Menus from "../components/Menu";
import { Outlet, useLocation } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../components/ThemeToggle";
const Dashboard = () => {
  // consts
  const location = useLocation();
  const showHeader =
    location.pathname === "/assessment" ||
    location.pathname === "/manage-assessment";
  const user = JSON.parse(localStorage.getItem("user"));
  const [manageprofile, setvisibleManageProfile] = useState(false);
  const imgSrc = "";
  const formattedName = user?.firstName
    ? user.firstName.charAt(0).toUpperCase() +
      user.firstName.slice(1).toLowerCase()
    : "";
  const formattedLastName = user?.lastName
    ? user.lastName.charAt(0).toUpperCase() +
      user.lastName.slice(1).toLowerCase()
    : "";

  return (
    <div className="h-full top-0 flex ">
      {/* left */}
      <div className="w-[16%] md:w-[10%] lg:w-[14%] p-3 bg-bg-secondary-light dark:bg-gray-900 max-h-[100vh] overflow-y-auto scrollbar-hide  justify-between ">
        <div
          className="cursor-pointer flex space-x-2 ml-4 items-center align-middle justify-center md:justify-start text-primary-blue-light font-semibold"
          onClick={() => setvisibleManageProfile(!manageprofile)}
        >
          <Avatar
            id="image"
            alt={user?.firstName}
            className="border-2 border-amber-400 text-sm "
            sx={{ bgcolor: "#8380FE", width: 50, height: 50 }}
          >
            {!imgSrc &&
              user.firstName.charAt(0).toUpperCase() +
                user.lastName.charAt(0).toUpperCase()}
          </Avatar>
          <span id="name" className="hidden lg:block">
            {formattedName} {formattedLastName}
          </span>
        </div>

        {/* Theme Toggle in Sidebar */}
        <div className="mt-4 flex justify-center lg:justify-start">
          <ThemeToggle />
        </div>
        <Menus
          roles={(user.roles = user.roles.filter((role) => role !== "USER")[0])}
        />
      </div>

      {/* right */}
      <div className="w-[84%] md:w-[90%] lg:w-[88%] bg-bg-light dark:bg-gray-800 h-[100vh] overflow-auto scrollbar-hide relative">
        <AnimatePresence>
          {/* Conditionally render the motion.div based on the showHeader state */}
          {showHeader && (
            <motion.div
              initial={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              exit={{ opacity: 0, y: -50 }}
            >
              <Header />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-h-[100vh] flex flex-col lg:flex-row w-full dark:bg-gray-800">
          {/* Main Content */}
          <div
            className={`w-full h-full transition-all duration-300 overflow-auto dark:bg-gray-800 dark:text-bg-light`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
