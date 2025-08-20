import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  UserCog,
  LibraryBig,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  FileQuestion,
  FolderTree,
  PlusCircle,
  Bot,
} from "lucide-react";
import { logout } from "../action/Auth";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";

// import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
const Menus = ({ roles, logout, isAuthenticated }) => {
  const location = useLocation();
  function handlelogout() {
    logout();
  }
  // menu Items
  const menuItems = [
    {
      title: "TASKS",
      visble: ["EXAMINER", "ADMIN", "EXAMINEE"],

      items: [
        {
          icon: <LayoutDashboard />,
          label: "Dashboard",
          href: "/dashboard",
          visible: ["EXAMINER", "ADMIN", "EXAMINEE"],
        },
        {
          icon: <UserCog />,
          label: "User Management",
          href: "/user-management",
          visible: ["ADMIN"],
        },
        {
          icon: <LibraryBig />,
          label: "Manage Assessment",
          href: "/manage-assessment",
          visible: ["EXAMINER"],
        },
        {
          icon: <FileText />,
          label: "Assessments Results",
          href: "/assessment",
          visible: ["EXAMINER", "EXAMINEE"],
        },
        {
          icon: <MessageSquare />,
          label: "Notification",
          href: "/notifications",
          visible: ["EXAMINER", "ADMIN"],
        },
      ],
    },
    {
      title: "QUESTION BANK",
      visble: ["EXAMINER", "ADMIN"],
      items: [
        {
          icon: <FileQuestion />,
          label: "All Repositories",
          href: "/question-bank",
          visible: ["EXAMINER"],
        },
        {
          icon: <Bot />,
          label: "AI",
          href: "/ai",
          visible: ["EXAMINER"],
        },
        {
          icon: <FolderTree />,
          label: "Categories",
          href: "/categories",
          visible: ["EXAMINER", "ADMIN"],
        },
      ],
    },
    {
      title: "ACTIONS",
      visble: ["EXAMINER", "ADMIN", "EXAMINEE"],

      items: [
        {
          icon: <Settings />,
          label: "Setting",
          href: "/settings",
          visible: ["EXAMINER", "ADMIN", "EXAMINEE"],
        },
        {
          icon: <ThemeToggleButton variant="icon" />,
          label: "Theme",
          href: "#",
          visible: ["EXAMINER", "ADMIN", "EXAMINEE"],
          isThemeToggle: true,
        },
        {
          icon: <LogOut />,
          label: "Logout",
          href: "/",
          visible: ["EXAMINER", "ADMIN", "EXAMINEE"],
        },
      ],
    },
  ];

  return (
    <div
      className="mt-4 text-sm h-[100vh] overflow-y-auto scrollbar-hide font-display"
      aria-label="Side Bar with Menus"
    >
      {menuItems.map((item) => (
        <div
          className="flex flex-col gap-2"
          key={item.title}
          aria-label={item.title}
        >
          {item.visble.includes(roles) ? (
            <span className="hidden lg:block text-gray-200 font-light my-4">
              {item.title}
            </span>
          ) : null}

          {item.items.map((subItems) => {
            if (subItems.visible.includes(roles)) {
              return (
                subItems.isThemeToggle ? (
                  <div
                    key={subItems.label}
                    className="flex items-center justify-center lg:justify-start gap-2 text-white py-2 md:px-2 rounded-md w-full"
                  >
                    <span className="lg:hidden">
                      <ThemeToggleButton variant="toggle" />
                    </span>
                    <span className="hidden lg:flex items-center gap-2">
                      <ThemeToggleButton variant="toggle" />
                      <span className="p-1">{subItems.label}</span>
                    </span>
                  </div>
                ) : (
                <Link
                  to={
                    subItems.label !== "Logout" ? subItems.href : subItems.href
                  }
                  key={subItems.label}
                  onClick={subItems.label === "Logout" ? handlelogout : null}
                  className={`flex items-center justify-center lg:justify-start gap-2 text-white py-2 md:px-2 rounded-md w-full  hover:bg-accent-teal-dark ${
                    location.pathname === subItems.href ? "bg-accent-teal-dark" : ""
                  }`}
                  aria-label={`${subItems.label}`}
                >
                  <span>{subItems.icon}</span>
                  <span className="hidden lg:block p-1">{subItems.label}</span>
                </Link>
                )
              );
            }
          })}
        </div>
      ))}

      {roles === "EXAMINER" && (
        <Link
          to="/manage-assessment"
          className=" fixed bottom-6 flex items-center justify-center lg:justify-start gap-2 text-white py-2 md:px-2  lg:py-6 lg:w-[10%] rounded-md w-[10%]  bg-[#8380FE] "
        >
          <span className="">
            {" "}
            <PlusCircle className="" />
          </span>{" "}
          <span className="hidden lg:block p-1">Create Assessment</span>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(Menus);
