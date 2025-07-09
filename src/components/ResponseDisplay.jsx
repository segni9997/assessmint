import React, { useState } from "react";
import { Edit, Trash2, Save, X, PlusIcon } from "lucide-react";
import SelectCategoryandRepo from "./SelectCategory";
import SearchAutocomplete from "./AutoCompleteSearch";
import { connect } from "react-redux";
import { createquestion_for_question_bank } from "../action/Auth";

const ResponseDisplay = ({
  tfQuestions = [],
  mcqQuestions = [],
  onDeleteTF,
  onEditTF,
  onDeleteMCQ,
  onEditMCQ,
  createquestion_for_question_bank,
}) => {
  const [editingTFId, setEditingTFId] = useState(null);
  const [editingMCQId, setEditingMCQId] = useState(null);
  const [editedTFQuestion, setEditedTFQuestion] = useState(null);
  const [editedMCQQuestion, setEditedMCQQuestion] = useState(null);
  const [Submitquestion, setSubmitquestion] = useState(false);
  const [isAddButtonActive, setIsAddButtonActive] = useState(false);
  const [selectedRepoId, setSelectedRepoId] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [progress, setProgress] = React.useState({ current: 0, total: 0 });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleRepoSelect = (repoId) => {
    setSelectedRepoId(repoId);
    setIsAddButtonActive(!!repoId); // Activate only if repoId is truthy
  };
  const handleStartEditTF = (id, question) => {
    setEditingTFId(id);
    setEditedTFQuestion({ ...question });
  };

  const handleAddQuestions = async ({ type }) => {
    let questions = [];
    if (type === "tf") {
      questions = tfQuestions;
    } else if (type === "mcq") {
      questions = mcqQuestions;
    } else {
      console.log("Something went wrong with adding questions");
      return;
    }

    // Show modal
    setProgress({ current: 0, total: questions.length });
    setShowModal(true);

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      console.log(`Submitting ${type.toUpperCase()} question`, i + 1);

      await createquestion_for_question_bank(
        selectedRepoId,
        type === "tf" ? "TRUE_OR_FALSE" : "MULTIPLE_CHOICE",
        question.questionText,
        type === "tf" ? null : question.options,
        type === "tf" ? question.answer : question.answers
      );

      setProgress({ current: i + 1, total: questions.length });
      await sleep(150);
    }

    console.log(`${type.toUpperCase()} Questions Sent`);
    setSubmitquestion(true);
    setShowModal(false);
  };

  const handleStartEditMCQ = (id, question) => {
    setEditingMCQId(id);
    setEditedMCQQuestion({ ...question });
  };

  const handleSaveTF = (id) => {
    if (editedTFQuestion && onEditTF) {
      onEditTF(id, editedTFQuestion);
    }
    setEditingTFId(null);
    setEditedTFQuestion(null);
  };

  const handleSaveMCQ = (id) => {
    if (editedMCQQuestion && onEditMCQ) {
      onEditMCQ(id, editedMCQQuestion);
    }
    setEditingMCQId(null);
    setEditedMCQQuestion(null);
  };

  const handleCancelEdit = () => {
    setEditingTFId(null);
    setEditingMCQId(null);
    setEditedTFQuestion(null);
    setEditedMCQQuestion(null);
  };

  if (tfQuestions.length > 0) {
    return (
      <div className="space-y-6 animate-slide-in">
        <div className="overflow-x-auto">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="p-5 border-b flex-col space-y-4 border-gray-200 dark:border-gray-700 flex justify-between">
              <div className="">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  True/False Questions
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Response contains {tfQuestions.length} true/false questions
                </p>
              </div>

              <div className="flex flex-col md:flex-row space-y-12 gap-3">
                <SearchAutocomplete
                  onRepoSelect={handleRepoSelect}
                  currentType="TRUE_OR_FALSE"
                />{" "}
                <button
                  onClick={() => {
                    handleAddQuestions({ type: "tf" });
                  }}
                  disabled={!isAddButtonActive}
                  className={`px-4 py-2 rounded ${
                    isAddButtonActive
                      ? "bg-btn-primary text-white"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }  h-10`}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="text-left p-4 text-gray-500 dark:text-gray-400 font-medium">
                      Question
                    </th>
                    <th className="p-4 text-gray-500 dark:text-gray-400 font-medium w-24 text-center">
                      Answer
                    </th>
                    <th className="p-4 text-gray-500 dark:text-gray-400 font-medium w-24 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tfQuestions.map((question, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150"
                    >
                      <td className="p-4 text-gray-800 dark:text-gray-200">
                        {editingTFId === index ? (
                          <textarea
                            value={editedTFQuestion?.questionText}
                            onChange={(e) =>
                              setEditedTFQuestion({
                                ...editedTFQuestion,
                                questionText: e.target.value,
                              })
                            }
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            rows={2}
                          />
                        ) : (
                          question.questionText
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {editingTFId === index ? (
                          <select
                            value={editedTFQuestion?.answer ? "true" : "false"}
                            onChange={(e) =>
                              setEditedTFQuestion({
                                ...editedTFQuestion,
                                answer: e.target.value === "true",
                              })
                            }
                            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          >
                            <option value="true">True</option>
                            <option value="false">False</option>
                          </select>
                        ) : (
                          <span
                            className={
                              question.answer
                                ? "text-green-600 dark:text-green-400 font-medium"
                                : "text-red-600 dark:text-red-400 font-medium"
                            }
                          >
                            {question.answer ? "True" : "False"}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center space-x-2">
                          {editingTFId === index ? (
                            <>
                              <button
                                onClick={() => handleSaveTF(index)}
                                className="p-1.5 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-150"
                                aria-label="Save"
                              >
                                <Save className="h-4 w-4" />
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="p-1.5 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-150"
                                aria-label="Cancel"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  handleStartEditTF(index, question)
                                }
                                className="p-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
                                aria-label="Edit"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => onDeleteTF && onDeleteTF(index)}
                                className="p-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150"
                                aria-label="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

           
          </div>
        </div>
        {showModal && (
          <dialog id="submit_modal" className="modal modal-open">
            <div className="modal-box text-center">
              <h3 className="font-bold text-lg mb-4">Submitting Questions</h3>
              <p>{`${progress.current}/${progress.total} Submitted`}</p>
              <progress
                className="progress progress-accent w-full mt-4"
                value={progress.current}
                max={progress.total}
              ></progress>
            </div>
          </dialog>
        )}
      </div>
    );
  }

  if (mcqQuestions.length > 0) {
    return (
      <div className="space-y-6 animate-slide-in">
        <div className="scrollbar-hide ">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="p-5 border-b flex  flex-col justify-between gap-6 border-gray-200 dark:border-gray-700 z-10 sticky">
              <div className="d">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Multiple Choice Questions
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Response contains {mcqQuestions.length} multiple choice
                  questions
                </p>
              </div>
              <div className="flex flex-col md:flex-row space-y-12 gap-3 ">
                <SearchAutocomplete
                  onRepoSelect={handleRepoSelect}
                  currentType="MULTIPLE_CHOICE"
                />{" "}
                <button
                  onClick={() => {
                    handleAddQuestions({ type: "mcq" });
                  }}
                  disabled={!isAddButtonActive}
                  className={`px-4 py-2 rounded ${
                    isAddButtonActive
                      ? "bg-btn-primary text-white "
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }  h-10`}
                >
                  Add
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {mcqQuestions.map((question, index) => (
                <div
                  key={index}
                  className="p-5 dark:hover:bg-gray-700 dark:hover:bg-gray-750 transition-colors duration-150"
                >
                  <div className="flex justify-between items-start">
                    {editingMCQId === index ? (
                      <textarea
                        value={editedMCQQuestion?.questionText}
                        onChange={(e) =>
                          setEditedMCQQuestion({
                            ...editedMCQQuestion,
                            questionText: e.target.value,
                          })
                        }
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 mb-3"
                        rows={2}
                      />
                    ) : (
                      <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                        {question.questionText}
                      </h3>
                    )}

                    <div className="flex space-x-2 ml-4">
                      {editingMCQId === index ? (
                        <>
                          <button
                            onClick={() => handleSaveMCQ(index)}
                            className="p-1.5 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-150"
                            aria-label="Save"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-1.5 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 transition-colors duration-150"
                            aria-label="Cancel"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartEditMCQ(index, question)}
                            className="p-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-150"
                            aria-label="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onDeleteMCQ && onDeleteMCQ(index)}
                            className="p-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150"
                            aria-label="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {editingMCQId === index ? (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Options:
                      </p>
                      {editedMCQQuestion?.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...editedMCQQuestion.options];
                              newOptions[optIndex] = e.target.value;
                              setEditedMCQQuestion({
                                ...editedMCQQuestion,
                                options: newOptions,
                              });
                            }}
                            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                          <input
                            type="checkbox"
                            checked={editedMCQQuestion.answers.includes(option)}
                            onChange={(e) => {
                              let newAnswers = [...editedMCQQuestion.answers];
                              if (e.target.checked) {
                                newAnswers.push(option);
                              } else {
                                newAnswers = newAnswers.filter(
                                  (a) => a !== option
                                );
                              }
                              setEditedMCQQuestion({
                                ...editedMCQQuestion,
                                answers: newAnswers,
                              });
                            }}
                            className="checkbox checkbox-primary"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 space-y-2">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={question.answers.includes(option)}
                            readOnly
                            className="checkbox checkbox-primary"
                            disabled
                          />
                          <span
                            className={`text-sm ${
                              question.answers.includes(option)
                                ? "text-primary-700 dark:text-primary-400 font-medium"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {option}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">
                  Press ESC key or click on ✕ button to close
                </p>
              </div>
            </dialog>

        
          </div>
        </div>
        {/* {Submitquestion && <SelectCategoryandRepo/>} */}
        {showModal && (
          <dialog id="submit_modal" className="modal modal-open">
            <div className="modal-box text-center">
              <h3 className="font-bold text-lg mb-4">Submitting Questions</h3>
              <p>{`${progress.current}/${progress.total} Submitted`}</p>
              <progress
                className="progress progress-accent w-full mt-4"
                value={progress.current}
                max={progress.total}
              ></progress>
            </div>
          </dialog>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center p-8 max-w-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          No questions generated yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Go to the Chat tab and ask the AI to generate some true/false or
          multiple choice questions.
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { createquestion_for_question_bank })(
  ResponseDisplay
);
