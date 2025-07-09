
import { useState } from "react"
import { Calendar, Clock, Eye, EyeOff, Award, CheckCircle } from "lucide-react"
import { connect } from "react-redux"
import { CreateSetting_for_assessment } from "../../action/Auth"

const AssessmentSettings = ({ assessmentID, assessmentTitle, CreateSetting_for_assessment, assessment_setting_data }) => {
  const today = new Date();
  const formattedToday = today.toISOString().slice(0, 16).replace("T", " ");
  
  const defaultEndDate = new Date(today);
  defaultEndDate.setDate(today.getDate() + 2);
  const formattedEndDate = defaultEndDate.toISOString().slice(0, 16).replace("T", " ");
  const [settings, setSettings] = useState({
    title: assessmentTitle || "Assessment Title",
    timeLimit: parseInt(assessment_setting_data?.duration) || 30,
    enableTimeLimit: true,
    difficulty: "medium",
    showAnswersImmediately: true,
    passingScore: assessment_setting_data?.passingScore || 50,
    attemptsAllowed: assessment_setting_data?.maxAttempts || 1,
    enableRandomization: true,
    showProgressBar: true,
    notifyInstructor: false,
    startDateTime: assessment_setting_data?.startDateTime || today.getUTCDate(),
    endDateTime: assessment_setting_data?.endDateTIme || defaultEndDate.getUTCDate() ,
    isPublic: assessment_setting_data?.isPublic || true,
  })

  const [dateErrors, setDateErrors] = useState({
    startDateTime: "",
    endDateTime: "",
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value
    const newSettings = { ...settings }

    // Handle date validation
    if (name === "startDateTime") {
      const startDate = new Date(value)
      const endDate = new Date(settings.endDateTime)
      const currentDate = new Date()

      // Reset error first
      setDateErrors((prev) => ({ ...prev, startDateTime: "" }))

      // Check if start date is before current date
      if (startDate < currentDate && startDate.toDateString() !== currentDate.toDateString()) {
        setDateErrors((prev) => ({
          ...prev,
          startDateTime: "Start date cannot be in the past",
        }))
        return 
      }

      // If end date is now before start date, update end date
      if (endDate < startDate) {
        // Set end date to start date + 1 hour
        const newEndDate = new Date(startDate)
        newEndDate.setHours(newEndDate.getHours() + 1)
        newSettings.endDateTime = newEndDate.toISOString().slice(0, 16)
      }
    }

    if (name === "endDateTime") {
      const startDate = new Date(settings.startDateTime)
      const endDate = new Date(value)

      // Reset error first
      setDateErrors((prev) => ({ ...prev, endDateTime: "" }))

      // Check if end date is before start date
      if (endDate < startDate) {
        setDateErrors((prev) => ({
          ...prev,
          endDateTime: "End date must be after start date",
        }))
        return // Don't update state with invalid date
      }
    }

    // Update the settings with the new value
    newSettings[name] = newValue
    setSettings(newSettings)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate dates before submitting
    const startDate = new Date(settings.startDateTime)
    const endDate = new Date(settings.endDateTime)
    const currentDate = new Date()

    let hasErrors = false
    const newDateErrors = { startDateTime: "", endDateTime: "" }

    if (startDate < currentDate && startDate.toDateString() !== currentDate.toDateString()) {
      newDateErrors.startDateTime = "Start date cannot be in the past"
      hasErrors = true
    }

    if (endDate < startDate) {
      newDateErrors.endDateTime = "End date must be after start date"
      hasErrors = true
    }

    setDateErrors(newDateErrors)

    if (hasErrors) {
      return 
    }
    CreateSetting_for_assessment(assessmentID,settings.startDateTime.replace("T", " "),settings.endDateTime.replace("T", " "),settings.timeLimit,settings.attemptsAllowed,settings.passingScore, settings.isPublic )

  }

  return (
    <div className="max-h-fit bg-base-200 p-4 md:p-2 dark:bg-gray-700 dark:text-bg-light">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          {/* Header */}
          <div className="card-body bg-btn-primary text-primary-content rounded-t-box">
            <h1 className="card-title text-2xl md:text-3xl font-bold">Assessment Settings</h1>
            <p className="opacity-90">Configure your assessment parameters</p>
          </div>

          {/* Main Content */}
          <form onSubmit={handleSubmit} className="card-body pt-2 ">
            <div className="flex flex-col  gap-6 overflow-y-auto scrollbar-hide h-[500px]">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Assessment Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Assessment Title</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="title"
                      disabled
                      value={settings.title}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    />
                    <span className="badge bg-accent-teal-light text-white">Locked</span>
                  </div>
                </div>

                {/* Time Settings */}
                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Time Settings
                    </h2>
                    {/* time limit */}
                    {/* <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-4">
                        <input
                          type="checkbox"
                          name="enableTimeLimit"
                          checked={settings.enableTimeLimit}
                          onChange={handleChange}
                          className="checkbox checkbox-accent"
                        />
                        <span className="label-text">Enable time limit</span>
                      </label>
                    </div> */}

                    {/* {settings.enableTimeLimit && ( */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Time limit (minutes)</span>
                      </label>
                      <div className="join mx-4">
                        <button
                          type="button"
                          className="btn join-item"
                          onClick={() => {
                            if (settings.timeLimit > 1) {
                              setSettings({ ...settings, timeLimit: settings.timeLimit - 5 })
                            }
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          name="timeLimit"
                          value={settings.timeLimit}
                          onChange={handleChange}
                          min="1"
                          max="180"
                          className="input outline outline-accent join-item w-full text-center"
                        />
                        <button
                          type="button"
                          className="btn join-item"
                          onClick={() => {
                            if (settings.timeLimit < 180) {
                              setSettings({ ...settings, timeLimit: settings.timeLimit + 5 })
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="mt-2">
                        <div className="badge badge-outline">{settings.timeLimit} minutes</div>
                      </div>
                    </div>
                    {/* )} */}
                  </div>
                </div>

                {/* Difficulty Level */}
                {/* <div className="card bg-base-100 border border-gray-200">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg">Difficulty Level</h2>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Select difficulty</span>
                      </label>
                      <select
                        name="difficulty"
                        value={settings.difficulty}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                        <option value="adaptive">Adaptive</option>
                      </select>
                    </div>
                  </div>
                </div> */}

                {/* Schedule Settings */}
                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Schedule Settings
                    </h2>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Start Date & Time</span>
                      </label>
                      <div className="input-group">
                        <span className="bg-primary text-primary-content">
                          <Calendar className="h-4 w-4" />
                        </span>
                        <input
                          type="datetime-local"
                          name="startDateTime"
                          value={settings.startDateTime}
                          onChange={handleChange}
                          min={formattedToday}
                          className={`input input-bordered w-full ${dateErrors.startDateTime ? "input-error" : ""}`}
                        />
                      </div>
                      {dateErrors.startDateTime && (
                        <div className="label">
                          <span className="label-text-alt text-error">{dateErrors.startDateTime}</span>
                        </div>
                      )}
                    </div>

                    <div className="form-control mt-2">
                      <label className="label">
                        <span className="label-text">End Date & Time</span>
                      </label>
                      <div className="input-group">
                        <span className="bg-primary text-primary-content">
                          <Calendar className="h-4 w-4" />
                        </span>
                        <input
                          type="datetime-local"
                          name="endDateTime"
                          value={settings.endDateTime}
                          onChange={handleChange}
                          min={settings.startDateTime}
                          className={`input input-bordered w-full ${dateErrors.endDateTime ? "input-error" : ""}`}
                        />
                      </div>
                      {dateErrors.endDateTime && (
                        <div className="label">
                          <span className="label-text-alt text-error">{dateErrors.endDateTime}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-2">
                      <div className="badge bg-btn-primary text-white">
                        Duration: {calculateDuration(settings.startDateTime, settings.endDateTime)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Visibility Settings */}
                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg flex items-center gap-2">
                      {settings.isPublic ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                      Visibility Settings
                    </h2>

                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-4">
                        <input
                          type="checkbox"
                          name="isPublic"
                          checked={settings.isPublic}
                          onChange={handleChange}
                          className="toggle text-btn-primary"
                        />
                        <span className="label-text font-medium">Make assessment public</span>
                      </label>
                      <div className="label">
                        <span className="label-text-alt">Public assessments are visible to all users</span>
                      </div>
                    </div>

                    <div className="mt-2 p-3 bg-base-200 rounded-box">
                      <div className="flex items-center gap-2">
                        <div className={`badge ${settings.isPublic ? "badge bg-accent-teal-light text-white" : "badge-warning"}`}>
                          {settings.isPublic ? "Public" : "Private"}
                        </div>
                        <span className="text-sm">
                          {settings.isPublic
                            ? "Anyone can access this assessment"
                            : "Only invited users can access this assessment"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feedback Settings */}
                {/* <div className="card bg-base-100 border border-gray-200">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg">Feedback Settings</h2>

                    <div className="form-control">
                      <label className="label cursor-pointer justify-start gap-4">
                        <input
                          type="checkbox"
                          name="showAnswersImmediately"
                          checked={settings.showAnswersImmediately}
                          onChange={handleChange}
                          className="checkbox checkbox-accent"
                        />
                        <span className="label-text">Show answers immediately</span>
                      </label>
                      <p className="text-xs text-gray-500 ml-10">
                        Students will see correct answers right after submitting
                      </p>
                    </div>
                  </div>
                </div> */}

                {/* Scoring Settings */}
                <div className="card bg-base-100 border border-base-300">
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Scoring Settings
                    </h2>

                    {/* <div className="form-control">
                      <label className="label">
                        <span className="label-text">Passing score (%)</span>
                      </label>
                      <input
                        type="number"
                        name="passingScore"
                        value={settings.passingScore}
                        onChange={handleChange}
                        min="0"
                        max="100"
                        className="input input-bordered w-full"
                      />
                    </div> */}

                    {/* pasing Score */}

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Passing score (%)</span>
                      </label>
                      <div className="join mx-5">
                        <button
                          type="button"
                          className="btn join-item"
                          onClick={() => {
                            if (settings.passingScore > 0) {
                              setSettings({ ...settings, passingScore: settings.passingScore - 5 })
                            }
                          }}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          name="passingScore"
                          value={settings.passingScore}
                          onChange={handleChange}
                          min="0"
                          max="100"
                          className="input outline outline-accent join-item w-full text-center"
                        />
                        <button
                          type="button"
                          className="btn join-item"
                          onClick={() => {
                            if (settings.passingScore < 100) {
                              setSettings({ ...settings, passingScore: settings.passingScore + 1 })
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                      <div className="mt-2">
                        <progress
                          className="progress progress-success w-full"
                          value={settings.passingScore}
                          max="100"
                        ></progress>
                        <div className="text-center text-sm mt-1">{settings.passingScore}% to pass</div>
                      </div>
                    </div>

                    <div className="form-control mt-4">
                      <label className="label">
                        <span className="label-text">Attempts allowed</span>
                      </label>
                      <select
                        name="attemptsAllowed"
                        value={settings.attemptsAllowed}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                      >
                        <option value="1">1 attempt</option>
                        <option value="2">2 attempts</option>
                        <option value="3">3 attempts</option>
                        <option value="0">Unlimited</option>
                      </select>
                      <div className="mt-2">
                        <div className="badge badge-outline">
                          {settings.attemptsAllowed === "0"
                            ? "Unlimited attempts"
                            : `${settings.attemptsAllowed} attempt${settings.attemptsAllowed > 1 ? "s" : ""}`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                {/* <div className="card bg-base-100 border border-gray-200" aria-disabled>
                  <div className="card-body p-4">
                    <h2 className="card-title text-lg">Additional Options</h2>

                    <div className="space-y-2">
                      <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-4">
                          <input
                            type="checkbox"
                            name="enableRandomization"
                            checked={settings.enableRandomization}
                            onChange={handleChange}
                            className="checkbox checkbox-accent "
                          />
                          <span className="label-text">Randomize questions</span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-4">
                          <input
                            type="checkbox"
                            name="showProgressBar"
                            checked={settings.showProgressBar}
                            onChange={handleChange}
                            className="checkbox checkbox-accent"
                          />
                          <span className="label-text">Show progress bar</span>
                        </label>
                      </div>

                      <div className="form-control">
                        <label className="label cursor-pointer justify-start gap-4">
                          <input
                            type="checkbox"
                            name="notifyInstructor"
                            checked={settings.notifyInstructor}
                            onChange={handleChange}
                            className="checkbox checkbox-accent"
                          />
                          <span className="label-text">Notify instructor on completion</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-8">
              {/* <button type="button" className="btn btn-outline">
                Cancel
              </button> */}
              <button type="submit" className="btn bg-btn-primary text-white gap-2">
                <CheckCircle className="h-5 w-5" />
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
     
    </div>
  )
}

// Helper function to calculate duration between two dates
function calculateDuration(startDateTime, endDateTime) {
  const start = new Date(startDateTime)
  const end = new Date(endDateTime)

  const durationMs = end - start
  const days = Math.floor(durationMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((durationMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  let result = ""
  if (days > 0) {
    result += `${days} day${days > 1 ? "s" : ""} `
  }
  if (hours > 0 || days === 0) {
    result += `${hours} hour${hours !== 1 ? "s" : ""}`
  }

  return result.trim()
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {CreateSetting_for_assessment})(AssessmentSettings)
