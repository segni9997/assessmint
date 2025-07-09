import { useEffect, useState } from "react";
import {
  PlusCircle,
  FolderKanban,
  ShieldMinus,
  Settings,
  Hourglass,
  Repeat2,
  Trophy,
  EarthLock,
  Timer,
  Rss,
  UserCheck,
  Delete,
  MoreHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  load_my_assesment,
  load_my_inivitation,
  PublishAssessment,
  createAssessment,
} from "../../action/Auth";
import { connect, useDispatch } from "react-redux";
import QuestionModal from "../../components/QuestionModal";
import AssessmentSettings from "./AssessmentSetting";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { usePagination } from "../../hooks/usePagination";
import Pagination from "../../components/Pagination";

const AssessmentManagement = ({ PublishAssessment, createAssessment }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isExaminee = user.roles.some((role) => role === "EXAMINEE");
  const isExaminer = user.roles.some((role) => role === "EXAMINER");
  const dispatch = useDispatch();
  const [publishingId, setPublishingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [assignments, setAssessmentData] = useState([]);
  const [settings, setsettings] = useState({
    id: null,
    title: null,
    settings: {},
  });
  const [state, setState] = useState({
    title: "",
    description: "",
    wordCount: 0,
    isAssessmentSubmitting: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
      wordCount:
        name === "description"
          ? value.trim().split(/\s+/).length
          : prev.wordCount,
    }));
  };

  const handleDescriptionChange = (e) => {
    const { value } = e.target;
    setState((prev) => ({
      ...prev,
      description: value,
      wordCount: value.trim().split(/\s+/).length,
    }));
  };
  const handleCreateAssessment = async () => {
    setState((prev) => ({ ...prev, isAssessmentSubmitting: true }));

    try {
      const res = await createAssessment(state.title, state.description);

      setIsModalOpen(false);
      setTimeout(() => {
        if (isExaminer) fetchAssessment();
        if (isExaminee) fetchExamineeAssessment();
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    } finally {
      setState((prev) => ({ ...prev, isAssessmentSubmitting: false }));
    }
  };

  const handleDeleteAssessment = async (id) => {
    setState((prev) => ({ ...prev, isAssessmentSubmitting: true }));

    try {
      setTimeout(() => {
        if (isExaminer) fetchAssessment();
        if (isExaminee) fetchExamineeAssessment();
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    } finally {
      setState((prev) => ({ ...prev, isAssessmentSubmitting: false }));
    }
  };

  const handlePublishassessment = async (assessmentID) => {
    if (!assessmentID) {
      alert("Please select an assessment to publish");
      return;
    }

    try {
      setPublishingId(assessmentID);
      await PublishAssessment(assessmentID);
      setTimeout(() => {
        if (isExaminer) fetchAssessment();
        if (isExaminee) fetchExamineeAssessment();
      }, 2000);
    } catch (err) {
      console.error("Publish failed", err);
    } finally {
      setPublishingId(null);
    }
  };

  const fetchAssessment = async () => {
    const res = await dispatch(load_my_assesment());
    if (res?.body) {
      setAssessmentData(res.body);
    }
  };
  const fetchExamineeAssessment = async () => {
    const res = await dispatch(load_my_inivitation());
    if (res?.body) {
      setAssessmentData(res.body);
    }
  };
  const handleSelect = (Title, ID, Settings) => {
    setsettings((prev) => ({
      ...prev,
      id: ID,
      title: Title,
      settings: Settings,
    }));

    setIsSettingModalOpen(true);
  };

  useEffect(() => {
    if (isExaminer) {
      fetchAssessment();
    }

    if (isExaminee) {
      fetchExamineeAssessment();
    }
  }, []);

  const {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
    currentItems,
    handlePageChange,
    handleItemsPerPageChange,
  } = usePagination(assignments, 5);
  return (
    <>
      {/* if not Examines */}
      {isExaminer && (
        <div className="w-full bg-bg-light rounded-lg p-6 h-full font-display dark:bg-gray-800 dark:text-bg-light">
          <div className="flex flex-col space-y-7 md:flex-row justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">Assessment Management</h1>
              <p className="text-base-content/70">
                Create and manage assessments and question banks
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn bg-bg-secondary-light text-white w-full md:w-fit"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Assessment
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="Search assessments..."
                  className="input input-bordered join-item w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <select
              className="select select-bordered w-full md:w-[180px]"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All Types">All Types</option>
              <option value="Published">Published</option>
              <option value="UnPublished">UnPublished</option>
            </select>
           <select
  className="select select-bordered select-accent w-full md:w-[180px] hover:bg-blue-100 transition-colors duration-200"
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="All Status">All Status</option>
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
  <option value="Draft">Draft</option>
</select>

          </div>

          <div className="overflow-x-auto h-fit">
            <table className="table bg-white table-sm table-zebra dark:bg-gray-700 dark:text-bg-light  ">
              <thead>
                <tr>
                  <th>Assessment</th>
                  <th className="hidden md:table-cell">
                    <span className="flex  gap-2 items-center text-start">
                      Duration <Hourglass size={16} strokeWidth={1.75} />
                    </span>
                  </th>
                  <th className="hidden md:table-cell ">
                    <span className="flex  gap-2 items-center text-start">
                      Attempt Allowed <Repeat2 size={20} strokeWidth={1.75} />
                    </span>
                  </th>
                  <th className="hidden md:table-cell">
                    <span className="flex  gap-2 items-center text-start">
                      Passing Score <Trophy size={16} strokeWidth={1.75} />
                    </span>
                  </th>
                  <th className="hidden md:table-cell">
                    <span className="flex  gap-2 items-center text-start">
                      Access <EarthLock size={16} strokeWidth={1.75} />{" "}
                    </span>
                  </th>

                  <th className="hidden md:table-cell">
                    <span className="flex  gap-2 items-center text-start">
                      Created
                      <Timer size={16} strokeWidth={1.75} />{" "}
                    </span>
                  </th>
                  <th>
                    <span className="flex  gap-2 items-center text-start">
                      Published
                      <Rss size={16} strokeWidth={1.75} />
                    </span>
                  </th>
                  <th>
                    {" "}
                    <span className="flex  gap-2 items-center text-start">
                      Invite Candidates <UserCheck size={20} strokeWidth={1.75} />{" "}
                    </span>
                  </th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((assignment) => (
                    <tr key={assignment.id} className="hover">
                      <td className="font-medium">{assignment.title}</td>
                      {/* <td>{assignment.questions || "-"}</td> */}
                      <td className="hidden md:table-cell">
                        {assignment.settings.duration || (
                          <span className="bg-amber-500 p-1 text-white rounded-full text-sm">
                            {" "}
                            Not Set
                          </span>
                        )}
                      </td>
                      <td className="hidden md:table-cell ">
                        {assignment.settings.maxAttempts}
                      </td>
                      <td className="hidden md:table-cell">
                        <span> {assignment.settings.passingScore}</span>
                      </td>
                      <td className="hidden md:table-cell">
                        {assignment.settings.isPublic == true
                          ? "Public"
                          : "Private"}
                      </td>

                      <td className="hidden md:table-cell">
                        {new Date(assignment.createdAt).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          }
                        ) || "-"}
                      </td>
                      <td
                        onClick={() => handlePublishassessment(assignment.id)}
                      >
                        <button
                          className={`p-2  dark:text-bg-light dark:hover:bg-btn-primary rounded-xl outline outline-btn-primary ${assignment.isPublished ? "outline-btn-primary" : "bg-btn-primary text-white font-semibold  hover:outline-accent-teal-light hover:bg-btn-primary cursor-pointer hover:text-white"} text-gray-800 flex items-center gap-2`}
                          disabled={assignment.isPublished}
                        >
                          {publishingId === assignment.id ? (
                            <>
                              <Loader2 className="animate-spin h-4 w-4" />
                              Publishing...
                            </>
                          ) : assignment.isPublished ? (
                            "Published"
                          ) : (
                            "Unpublished"
                          )}
                        </button>
                      </td>
                      <td>
                        <Link
                          className=""
                          to={`/invitiation/${encodeURIComponent(assignment.title)}/${assignment.id}`}
                        >
                          <button className="outline outline-accent-teal-light text-center p-2 rounded-xl w-20  font-semibold hover:bg-accent-teal-light hover:text-white">
                            Invite 
                          </button>
                        </Link>
                      </td>

                      <td className="text-right ">
                        <td className="text-right">
                          {/* DaisyUI Dropdown */}
                          <div className="flex items-center">
                                 <Link
                            className="relative group cursor-pointer"
                            to={`/setup-assessment/${encodeURIComponent(assignment.title)}/${assignment.id}`}
                          >
                            <PlusCircle
                              size={28}
                              className="text-btn-primary font-bold"
                              strokeWidth={2.25}
                              absoluteStrokeWidth
                            />
                            
                          </Link>

                          <div className="dropdown dropdown-left">
                            <div
                              tabIndex={0}
                              role="button"
                              className="btn btn-ghost btn-circle"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </div>
                            <ul
                              tabIndex={0}
                              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-[1] flex"
                            >
                              <li onClick={() =>
                                      handleSelect(
                                        assignment.title,
                                        assignment.id,
                                        assignment.settings
                                      )
                                    }
                                  
                                >
                                <a>
                                  {" "}
                                  <Settings
                                    className="font-bold text-accent w-5 h-5"
                                    strokeWidth={2.25}
                                    absoluteStrokeWidth
                                   
                                  /> Settings
                                </a>
                              </li>
                              <li>
                                <a>
                                  {" "}
                                  <Delete
                                    size={28}
                                    className="font-bold text-[#DC143C] w-5 h-5"
                                    strokeWidth={2.25}
                                    absoluteStrokeWidth
                                  /> Delete
                                </a>
                              </li>
                              <li>
                              </li>
                            </ul>
                          </div>
                      </div>
                        </td>
                        {/* Remove Icon */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-6">
                      No assignments found
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={9}>
                    <div className="w-full">
                      <Pagination
                        totalItems={totalItems}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        itemsPerPage={itemsPerPage}
                        handleItemsPerPageChange={handleItemsPerPageChange}
                        handlePageChange={handlePageChange}
                        indexOfFirstItem={indexOfFirstItem}
                        indexOfLastItem={indexOfLastItem}
                      />
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <QuestionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <h1 className="text-center text-3xl font-semibold dark:text-bg-light">
              Add New Assessment
            </h1>

            <div className="space-y-4 mt-4">
              {/* Title Field */}
              <fieldset className="border border-base-300 rounded-lg p-4">
                <legend className="px-2 text-sm font-medium">
                  Enter Title <sup className="text-red-400">*</sup>
                </legend>
                <input
                  type="text"
                  name="title"
                  className="input border-none w-full outline outline-accent-teal-light focus:outline-accent-teal-dark"
                  placeholder="Type here"
                  value={state.title}
                  onChange={handleInputChange}
                />
              </fieldset>

              {/* Description Field */}
              <fieldset className="border border-base-300 rounded-lg p-4">
                <legend className="px-2 text-sm font-medium">
                  Enter Description <sup className="text-red-400">*</sup>
                </legend>
                <div className="relative">
                  <textarea
                    name="description"
                    placeholder="Enter Description less than 30 words"
                    className="textarea textarea-accent w-full h-32 resize-none"
                    value={state.description}
                    onChange={handleDescriptionChange}
                  />
                  <span className="absolute bottom-2 right-4 text-sm text-gray-500">
                    {state.wordCount} words
                  </span>
                </div>
              </fieldset>

              {/* Submit Button */}
              <button
                type="button"
                disabled={state.isAssessmentSubmitting}
                onClick={handleCreateAssessment}
                className={`w-full flex justify-center items-center gap-2 py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-btn-primary hover:bg-accent-teal-light focus:outline-none transition duration-200 ${
                  state.isAssessmentSubmitting
                    ? "opacity-75 cursor-not-allowed"
                    : ""
                }`}
              >
                {state.isAssessmentSubmitting && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                )}
                {state.isAssessmentSubmitting
                  ? "Creating Assessment..."
                  : "Add Assessment"}
              </button>
            </div>
          </QuestionModal>
          <QuestionModal
            isOpen={isSettingModalOpen}
            onClose={() => setIsSettingModalOpen(false)}
          >
            <AssessmentSettings
              assessmentID={settings.id}
              assessmentTitle={settings.title}
              assessment_setting_data={settings.settings}
            />
          </QuestionModal>
        </div>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  PublishAssessment,
  createAssessment,
})(AssessmentManagement);
