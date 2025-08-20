import { useState } from "react";
import { format } from "date-fns";
import { Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [currentDate] = useState(new Date());
  return (
    <>
      <header className="bg-bg-light dark:bg-gray-800  dark:text-bg-light sticky top-0 z-10 w-[90%] mx-auto mt-3 rounded-2xl">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center ">
              <div className="ml-4 hidden lg:block ">
                <h1 className="text-lg font-semibold dark:text-bg-light text-gray-900">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  {format(currentDate, "dd MMMM yyyy")}
                </p>
              </div>
            </div>
            <div className="relative w-[85%]">
              <input
                type="text"
                placeholder="Search assessment..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-teal-light focus:border-transparent"
              />
              <Search className="absolute left-3 top-4 h-6 w-6 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/notifications">
                <button className="relative p-2 text-gray-400 hover:text-gray-500">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                </button>
              </Link>

              {/* <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="h-8 w-8">
                    <Avatar.Root>
                      <Avatar.Image
                        className="h-8 w-8 rounded-full"
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="User"
                      />
                      <Avatar.Fallback className="h-8 w-8 rounded-full bg-gray-200" />
                    </Avatar.Root>
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="bg-white rounded-lg shadow-lg p-2 min-w-[200px] mt-7 ">
                    <DropdownMenu.Item className="flex items-center space-x-2 p-2 hover:bg-violet-50 rounded cursor-pointer">
                      <User size={16} />
                      <span>Profile</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="flex items-center space-x-2 p-2 hover:bg-violet-50 rounded cursor-pointer">
                      <Settings size={16} />
                      <span>Settings</span>
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator className="h-px bg-gray-200 my-2" />
                    <DropdownMenu.Item className="flex items-center space-x-2 p-2 hover:bg-violet-50 rounded cursor-pointer text-red-600">
                      <LogOut size={16} />
                      <span>Logout</span>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
