import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import QuestionAccordion from "../../components/QuestionAccordion";
import {
  ClipboardList,
  Container,
  FileType,
  HelpCircle,
  Lightbulb,
  Plus,
  PlusCircle,
  Save,
  Settings,
  X,
} from "lucide-react";
import Button from "../../components/Button";
import QuestionPreview from "../../components/QuestionPreview";
import QuestionModal from "../../components/QuestionModal";
import AssessmentSettings from "./AssessmentSetting";
import MultipleChoiceBuilder from "../questionTypes/MCQquestions";
import TrueFalseBuilder from "../questionTypes/TFquestions";
import ShortAnswerBuilder from "../questionTypes/ShortAnswer";
import {
  createquestion,
  createSection,
  load_my_questions,
  load_my_section,
  load_question_type,
} from "../../action/Auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Step from "../../components/Step";
import { createAssessment } from "../../action/Auth";
import NoElements from "../../components/NoElements";

import { useLoadAssessment } from "../../hooks/useLoadMyAssessment";

const SetupAssessment = ({
  createAssessment,
  createSection,
  isAuthenticated,
  createquestion,
}) => {
  const { assessmentId, assessmentTitle } = useParams();
  const assessmentT = decodeURIComponent(assessmentTitle);
  const initialState = {
    selectedSectionID: null,
    selectedQuestionType: null,
    isModalOpen: false,
    isSettingModalOpen: false,
    isMCQOpen: false,
    isAssessmentSubmitting: false,
    isAssessmentCreated: false,
    isGuidanceModalOpen: false,
    title: "",
    description: "",
    type: "",
    wordCount: 0,
    hoveredItem: null,
    selectedId: assessmentId || null,
    selectedTitle: null,
    sectionCreated: "",
    fetchedSettings: {},
  };
  const [state, Dispatch] = useReducer(reducer, initialState);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const handleSectionSelect = (questions) => {
    setSelectedQuestions(questions);
  };
  const [selectedSectionID, setSelectedSectionID] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionCreated, setsectioncreated] = useState("");
  const [FetchedSection, setFetchedSection] = useState([]);
  const dispatch = useDispatch();

  function reducer(state, action) {
    return { ...state, [action.type]: action.payload };
  }

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    Dispatch({ type: "description", payload: text });
    Dispatch({
      type: "wordCount",
      payload: text.trim() === "" ? 0 : text.trim().split(/\s+/).length,
    });
  };
  const sectionCache = useRef({});

  const handleCreateSection = async () => {
    createSection(state.selectedId, state.title, state.description, state.type);
    
    Dispatch({ type: "description", payload: "" });
    Dispatch({ type: "title", payload: "" });
    if (sectionCache.current[state.selectedId]) {
      delete sectionCache.current[state.selectedId];
    }
    await new Promise((resolve) => setTimeout(resolve, 300));

    await fetchSection();
  };

  useLoadAssessment();
  const rawQuestionType = useSelector(
    (state) => state.assessment.QuestionType.body
  );
  const rawFetchedQuestions = useSelector(
    (state) => state.assessment.SectionsQuestions?.body
  );

  const Questiontype = useMemo(() => rawQuestionType, [rawQuestionType]);
  const loading = useSelector((state) => state.assessment.loading);

  const fetchSection = async () => {
    const res = await dispatch(load_my_section(state.selectedId));
    if (res?.body) {
      sectionCache.current[state.selectedId] = res.body;
      setFetchedSection(res.body);
    }
  };
  useEffect(() => {
    // fetch question type
    const fetchquestionType = async () => {
      await dispatch(load_question_type());
    };

    // fetch questions of a given sections
    const fetchquestions = async () => {
      await dispatch(load_my_questions(selectedSectionID));
    };
    // fetch Sections

    if (state.selectedId || isModalOpen == false) {
      fetchSection();
    }
    if (state.isModalOpen) {
      fetchquestionType();
    }

    const storedID = localStorage.getItem("selectedSectionID");
    if (storedID) {
      setSelectedSectionID(storedID);
    }
    if (selectedSectionID || storedID) {
      fetchquestions();
    }
  }, [state.isModalOpen, state.selectedId, selectedSectionID]);

  return (
    <>
      <div className="flex  flex-col md:flex-row md:justify-between items-center gap-4 last:ms-auto mr-4">
        <h1 className="font-bold w-[90%] md:text-3xl text-md p-7">
          Configure Assessment for {assessmentT}
        </h1>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {/* Row of buttons (Assessment list) */}
          <div className="flex flex-row justify-start  items-start w-full md:w-fit gap-2 overflow-x-scroll scrollbar-hide ">
            <Button
              icon={<Settings className="w-5 h-5" />}
              label="Assesment Setting"
              text="bg-btn-primary"
              bg="border-2 rounded border-accent-teal-light"
              onClick={() => {
                Dispatch({ type: "isSettingModalOpen", payload: true });
              }}
            />
            <Button
              icon={<HelpCircle />}
              label="Guidance"
              text="bg-btn-primary"
              bg="border-2 rounded border-accent-teal-light"
              onClick={() => {
                Dispatch({ type: "isGuidanceModalOpen", payload: true });
              }}
            />
            {state.selectedQuestionType != null ? (
              <>
                {" "}
                <Button
                  icon={<PlusCircle />}
                  label="Add Question"
                  text="bg-btn-primary"
                  bg="border-2 rounded border-accent-teal-light"
                  onClick={() => {
                    Dispatch({ type: "isMCQOpen", payload: true });
                  }}
                />
                <Link
                  to={`/add-from-bank/${state.selectedQuestionType}/${selectedSectionID}`}
                >
                  <Button
                    icon={<Container />}
                    label="Add From Bank"
                    text="bg-btn-primary"
                    bg="border-2 rounded border-accent-teal-light"
                  />
                </Link>
              </>
            ) : (
              ""
            )}

          </div>
      
        </div>
      </div>

      <div className="md:w-[95%] w-full flex flex-col md:flex-row lg:justify-center  mx-auto lg:mt-5  gap-2 bg-bg-light dark:bg-gray-800 dark:text-bg-light overflow-y-scroll scrollbar-hide p-1 h-[80vh]">
        {/* left */}

        <div className="w-full  lg:w-1/2 dark:bg-gray-800 dark:text-bg-light bg-white shadow-lg border border-btn-primary rounded-xl shadow-btn-primary-light md:overflow-auto md:scrollbar-hide   ">
          {FetchedSection.length === 0 && (
            <NoElements
              core_item="Section"
              type={assessmentT}
              icon={
                <FileType className="w-24 h-24 text-accent-teal-light animate-pulse" />
              }
            />
          )}
          <div className="flex mt-10 ">
            {state.selectedId && (
              <Button
                icon={<PlusCircle />}
                label="Add Section"
                text="white"
                bg="bg-btn-primary"
                onClick={() => {
                  setIsModalOpen(true);
                  Dispatch({ type: "isModalOpen", payload: true });
                }}
              />
            )}
          </div>
          <div className="w-[90%] rounded-xl   p-2 flex flex-col mx-auto">
            {FetchedSection.length !== 0 && (
              <QuestionAccordion
                items={FetchedSection}
                onSectionSelect={handleSectionSelect}
                selectedID={(id) => {
                  setSelectedSectionID(id);
                  localStorage.setItem("selectedSectionID", id);
                }}
                selected_type={(types) =>
                  Dispatch({ type: "selectedQuestionType", payload: types })
                }
                count={rawFetchedQuestions?.length}
              />
            )}
            {/* <QuestionAccordion items={testquestions} onSectionSelect={handleSectionSelect}/> */}
          </div>
        </div>

        {/* right */}
        <div className="w-full lg:w-1/2 bg-button-primary  rounded-xl">
          <QuestionPreview
            questions={rawFetchedQuestions || selectedQuestions}
          />
        </div>

        {/* Create  Section */}
        <QuestionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            Dispatch({ type: "isModalOpen", payload: false });
            Dispatch({ type: "title", payload: "" });
            Dispatch({ type: "description", payload: "" });
          }}
        >
          <h1 className="text-center flex text-3xl font-semibold justify-center">
            {" "}
            Add New Section for {assessmentT}
          </h1>

          <div className="space-y-4">
            <fieldset className="fieldset border border-base-300 rounded-lg p-4">
              <legend className="fieldset-legend px-2 text-sm font-medium">
                Enter Title <sup className="text-red-400">*</sup>
              </legend>
              <input
                type="text"
                required
                className="input border-none  w-full outline outline-accent-teal-light focus:outline-accent-teal-dark"
                placeholder="Type here"
                value={state.title}
                onChange={(e) => {
                  // setTitle(e.target.value)
                  Dispatch({ type: "title", payload: e.target.value });
                }}
              />
            </fieldset>
            <fieldset className="fieldset border border-base-300 rounded-lg p-4">
              <legend className="fieldset-legend px-2 text-sm font-medium">
                Enter Description/ <sup className="text-red-400">*</sup>
              </legend>
              <div className="relative">
                <textarea
                  required
                  placeholder="Enter Description more less than 30 words"
                  className="textarea textarea-accent w-full h-32 resize-none"
                  value={state.description}
                  onChange={handleDescriptionChange}
                />
                <span className="absolute bottom-2 right-4 text-sm text-gray-500">
                  {state.wordCount} words
                </span>
              </div>
            </fieldset>

            <div className="form-control flex flex-col space-y-2">
              <label className="label">
                <span className="label-text">Select Type:</span>
              </label>
              <select
                required
                className="select select-accent outline outline-accent-teal-dark  w-full  text-btn-primary text-base sm:text-sm md:text-base "
                value={state.type}
                onChange={(e) => {
                  Dispatch({ type: "type", payload: e.target.value });
                }}
              >
                <option disabled value="">
                  Select Type
                </option>
                {Questiontype?.map((qType) => (
                  <option key={qType} value={qType} className="">
                    {qType
                      .replaceAll("_", " ")
                      .toLowerCase()
                      .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            <Button
              icon={<PlusCircle />}
              label={
                sectionCreated.length != 0 ? sectionCreated : "Add Section"
              }
              text="white"
              bg="bg-btn-primary"
              onClick={() => {
                handleCreateSection();
                // setsectioncreated("Section created");
                // Dispatch({ type: "isMCQOpen", payload: true });

                Dispatch({ type: "isModalOpen", payload: false });
              }}
            />

           
          </div>
        </QuestionModal>
        {/* setting */}
        <QuestionModal
          isOpen={state.isSettingModalOpen}
          onClose={() =>
            Dispatch({ type: "isSettingModalOpen", payload: false })
          }
        >
          <AssessmentSettings
            assessmentID={state.selectedId}
            assessmentTitle={assessmentT}
            assessment_setting_data={state.fetchedSettings}
          />
        </QuestionModal>
        {/* Guidance */}
        <QuestionModal
          isOpen={state.isGuidanceModalOpen}
          onClose={() =>
            Dispatch({ type: "isGuidanceModalOpen", payload: false })
          }
        >
          <div className="p-6 max-w-4xl mx-auto dark:bg-gray-700 dark:text-bg-light bg-white rounded-2xl shadow-md space-y-6">
            <h1 className="md:text-3xl  text-xl font-bold light:text-gray-800">
              How to Create an Assessment
            </h1>

            <div className="space-y-4 light:text-gray-700">
              <Step
                icon={<ClipboardList className="text-blue-600" />}
                title="Step 1: Click 'Add Assessment Button'"
                description=" click the 'Add Assessment' button to begin. Add Assessment Will be visible"
              />
              <Step
                icon={<Plus className="text-green-600" />}
                title="Step 2: Click 'Add Section'"
                description=" click 'Add Section' to create a new part of your assessment. modal will be visible once you clicked it"
              />
              <Step
                icon={<Lightbulb className="text-yellow-500" />}
                title="Step 3: Fill Out Section Details"
                description="Provide a title for the section. Then add questions to this section will be appeared."
              />
              <Step
                icon={<Save className="text-purple-600" />}
                title="Step 4: Save the It All"
                description="Save the It All in all your steps"
              />
            </div>
          </div>
        </QuestionModal>
{/* Builder */}
        <QuestionModal
          isOpen={state.isMCQOpen}
          onClose={() => {
            Dispatch({ type: "isMCQOpen", payload: false });
          }}
        >
          {state.selectedQuestionType === "MULTIPLE_CHOICE" ? (
            <MultipleChoiceBuilder
              sectionID={selectedSectionID}
              sectionType={state.selectedQuestionType}
            />
          ) : state.selectedQuestionType === "TRUE_OR_FALSE" ? (
            <TrueFalseBuilder
              sectionID={selectedSectionID}
              sectionType={state.selectedQuestionType}
            />
          ) : state.selectedQuestionType === "ESSAY" ? (
            <ShortAnswerBuilder />
          ) : (
            ""
          )}
        </QuestionModal>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  createAssessment,
  createSection,
  createquestion,
})(SetupAssessment);
