"use client"

import { Search, Users, Award, Download, Mail } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useDispatch, useSelector } from "react-redux"
import { useLoadAssessment } from "@/hooks/useLoadMyAssessment"
import { fetch_results_by_assessment_Id, fetch_results_by_assessment_Id_for_examinee, load_my_inivitation } from "@/action/Auth"
import { usePagination } from "@/hooks/usePagination"
import Pagination from "@/components/Pagination"




const MyAssessment = () => {

 useLoadAssessment();
  const rawAssessment = useSelector((state) => state.assessment.Assessments);
  const [selectedAssessment, setSelectedAssessment] = useState(null)
  const [fetchedResults, setFetchedResults] = useState([])
  const [activeTab, setActiveTab] = useState("results")

   const user = JSON.parse(localStorage.getItem("user"));
  const isExaminee = user.roles.some((role) => role === "EXAMINEE");
  const isExaminer = user.roles.some((role) => role === "EXAMINER");
  const dispatch = useDispatch();
  const [AssessmentData, setAssessmentData] = useState([]);

const fetch_results = async () => {
    const response = await dispatch(
      fetch_results_by_assessment_Id(selectedAssessment)
    );
    if (response?.body) {
      setFetchedResults(response.body);
    } else {
      console.log("response", response);
    }
  };

  const fetchExamineeAssessment = async () => {
    const res = await dispatch(load_my_inivitation());
    if (res?.body) {
      setAssessmentData(res.body);
    }
  };

  const fetch_results_examinee = async () => {
    if (selectedAssessment) {
      const response = await dispatch(
        fetch_results_by_assessment_Id_for_examinee(selectedAssessment)
      );
      if (response?.body) {
        setFetchedResults(response.body);
      } else {
        console.log("response", response);
      }
    }
  };
  useEffect(() => {
    if (isExaminee) {
      fetchExamineeAssessment();
    }
    if (isExaminee) {
      fetch_results_examinee();
    }
    if (selectedAssessment && isExaminer) {
      fetch_results();
    }
  }, [selectedAssessment]);


  return (
    <div className="min-h-screen bg-gray-50  p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:text-bg-light">
      <div className="max-w-8xl mx-auto dark:bg-gray-800 dark:text-bg-light">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 dark:bg-gray-800 dark:text-bg-light">Assessment Results Overview</h1>
          {!isExaminee && (
            <p className="text-gray-600  dark:text-bg-light font-medium">
              View candidates ranked by their performance and select top performers
            </p>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full gap-10 ">
     {isExaminer &&      <TabsList className="grid w-[40%] mx-auto grid-cols-1 md:grid-cols-2 mb-6 gap-2 dark:bg-gray-800 dark:text-bg-light">
          <TabsTrigger
  value="results"
  className="flex items-center gap-2 rounded-md px-4 py-2 transition outline 
    data-[state=active]:bg-bg-secondary-light 
    data-[state=active]:text-white 
    dark:data-[state=active]:bg-accent-teal-dark 
    dark:data-[state=active]:text-bg-light"
>
  <Users className="w-4 h-4" />
  All Results
</TabsTrigger>

<TabsTrigger
  value="top-performers"
  className="flex items-center gap-2 rounded-md px-4 py-2 transition outline 
    data-[state=active]:bg-bg-secondary-light 
    data-[state=active]:text-white 
    dark:data-[state=active]:bg-accent-teal-light 
    dark:data-[state=active]:text-bg-light"
>
  <Award className="w-4 h-4" />
  Select Top Performers
</TabsTrigger>

          </TabsList>}

          <TabsContent value="results" className={`dark:bg-gray-800 dark:text-bg-light`}>
            <AssessmentTable
              data={fetchedResults}
              assessments={isExaminer ? rawAssessment?.body || AssessmentData : AssessmentData }
              selectedAssessment={selectedAssessment}
              onAssessmentChange={setSelectedAssessment}
              examiner={isExaminer}
              examinee={isExaminee}
            />
          </TabsContent>

          <TabsContent value="top-performers">
            <TopPerformersSelection
              data={fetchedResults}
              assessments={rawAssessment?.body || AssessmentData}
              selectedAssessment={selectedAssessment}
              onAssessmentChange={setSelectedAssessment}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Top Performers Selection Component
const TopPerformersSelection = ({ data, assessments, selectedAssessment, onAssessmentChange }) => {
  const [selectedCandidates, setSelectedCandidates] = useState([])
  const [performanceThreshold, setPerformanceThreshold] = useState(75)
  const [maxCandidates, setMaxCandidates] = useState(10)

  // Helper function to calculate success percentage
  const calculatePercentage = (success, failure, skipped) => {
    const total = success + failure + skipped
    if (total === 0) return 0
    return (success / total) * 100
  }

  // Group and process data
  const groupedData = React.useMemo(() => {
    const safeData = Array.isArray(data) ? data : []

    return safeData.reduce((acc, currentAttempt) => {
      const key = `${currentAttempt.examineeEmail}-${currentAttempt.assessmentId}`
      if (!acc[key]) {
        acc[key] = {
          examineeName: currentAttempt.examineeName,
          examineeEmail: currentAttempt.examineeEmail,
          assessmentId: currentAttempt.assessmentId,
          attempts: [],
          highestSuccessCount: 0,
          highestScoreAttempt: null,
        }
      }

      acc[key].attempts.push(currentAttempt)

      if (currentAttempt.successCount > acc[key].highestSuccessCount) {
        acc[key].highestSuccessCount = currentAttempt.successCount
        acc[key].highestScoreAttempt = currentAttempt
      }

      return acc
    }, {})
  }, [data])

  // Get top performers based on criteria
  const topPerformers = React.useMemo(() => {
    const candidates = Object.values(groupedData)
      .filter((group) => group.assessmentId === selectedAssessment)
      .map((group) => ({
        ...group,
        percentage: group.highestScoreAttempt
          ? calculatePercentage(
              group.highestScoreAttempt.successCount,
              group.highestScoreAttempt.failureCount,
              group.highestScoreAttempt.skippedCount,
            )
          : 0,
      }))
      .filter((candidate) => candidate.percentage >= performanceThreshold)
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, maxCandidates)

    return candidates
  }, [groupedData, selectedAssessment, performanceThreshold, maxCandidates])

  const handleCandidateToggle = (candidateEmail) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateEmail) ? prev.filter((email) => email !== candidateEmail) : [...prev, candidateEmail],
    )
  }

  const handleSelectAll = () => {
    if (selectedCandidates.length === topPerformers.length) {
      setSelectedCandidates([])
    } else {
      setSelectedCandidates(topPerformers.map((p) => p.examineeEmail))
    }
  }

  const handleExportSelected = () => {
    const selectedData = topPerformers.filter((p) => selectedCandidates.includes(p.examineeEmail))
  const exportData = selectedData.map(({ examineeName, examineeEmail, percentage }) => ({
    Name: examineeName,
    Email: examineeEmail,
    Score: `${percentage.toFixed(3)}%`,
  }))

  exportToCSV(exportData, `${selectedAssessmentData?.title} Assessment top Performers.csv`)
  }

  const handleSendInvitations = () => {
    const selectedData = topPerformers.filter((p) => selectedCandidates.includes(p.examineeEmail))

    // Mock invitation functionality
    console.log("Sending invitations to:", selectedData)
    alert(`Sending invitations to ${selectedData.length} selected candidates`)
  }

  const selectedAssessmentData = assessments.find((a) => a.id === selectedAssessment)

const exportToCSV = (data, filename = "export.csv") => {
  if (data.length === 0) return

  const headers = Object.keys(data[0]).join(",")
  const rows = data.map((row) =>
    Object.values(row)
      .map((val) => `"${val}"`) // Handle commas in values
      .join(",")
  )
  const csvContent = [headers, ...rows].join("\n")
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

  const link = document.createElement("a")
  link.href = URL.createObjectURL(blob)
  link.setAttribute("download", filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  }
  
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
  } = usePagination(topPerformers, 5);
  return (
    <div className="space-y-6 dark:bg-gray-800 dark:text-bg-light">

         {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card className={`bg-gradient-to-br from-bg-secondary-light via-accent-teal-light to-bg-light border-0`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="text-gray-200">
                <p className="text-sm font-medium ">Total Candidates</p>
                <p className="text-2xl font-bold">{topPerformers.length}</p>
              </div>
              <Users className="w-8 h-8 text-gray-700 bg-white rounded-full p-1" />
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br from-bg-secondary-light via-accent-teal-light to-bg-light border-0`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-200">Selected</p>
                <p className="text-2xl font-bold text-white">{selectedCandidates.length}</p>
              </div>
              <Award className="w-8 h-8 bg-white rounded-full p-1 text-gray-700" />
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-gradient-to-br from-bg-secondary-light via-accent-teal-light to-bg-light border-0`}>
          <CardContent className="p-6 ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-200">Avg Score</p>
                <p className="text-2xl font-bold text-white">
                  {topPerformers.length > 0
                    ? (topPerformers.reduce((sum, p) => sum + p.percentage, 0) / topPerformers.length).toFixed(1)
                    : 0}
                  %
                </p>
              </div>
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-bold">%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Controls */}
      <Card className={`border-0 shadow-none text-btn-primary dark:bg-gray-800 dark:text-bg-light`}>
        {/* <CardHeader>
          <CardTitle className="flex items-center gap-2  ">
            <Award className="w-5 h-5" />
            Top Performers Selection
          </CardTitle>
        </CardHeader> */}
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
            <div>
              <label className="block text-sm font-medium mb-2">Assessment</label>
              <Select value={selectedAssessment} onValueChange={onAssessmentChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={`bg-white `}>
                  {assessments.map((assessment) => (
                    <SelectItem key={assessment.id} value={assessment.id} className={`bg-`}>
                      {assessment.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Min Performance (%)</label>
              <Input
                type="number"
                value={performanceThreshold}
                onChange={(e) => setPerformanceThreshold(Number(e.target.value))}
                min="0"
                max="100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Max Candidates</label>
              <Input
                type="number"
                value={maxCandidates}
                onChange={(e) => setMaxCandidates(Number(e.target.value))}
                min="1"
                max="50"
              />
            </div>

            <div className="flex items-end">
              <Button onClick={handleSelectAll} variant="outline" className="w-full">
                {selectedCandidates.length === topPerformers.length ? "Deselect All" : "Select All"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

   

      {/* Top Performers List */}
      <Card className={`dark:bg-gray-800 dark:text-bg-light`}>
        <CardHeader>
          <div className="flex items-center justify-between ">
            <CardTitle className={`hidden md:block`}>Top Performers - {selectedAssessmentData?.title}</CardTitle>
            <div className="flex gap-2">
              <Button
                onClick={handleExportSelected}
                disabled={selectedCandidates.length === 0}
                className={`outline outline-btn-primary bg-none text-gray-700 hover:bg-accent-teal-light hover:text-bg-light`}
                size="sm"
                variant="outline"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Selected
              </Button>
              <Dialog >
                <DialogTrigger asChild>
                  <Button disabled={selectedCandidates.length === 0} size="sm" className={`bg-btn-primary text-bg-light hover:bg-accent-teal-light`}>
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitations
                  </Button>
                </DialogTrigger>
                <DialogContent className={`bg-white`}>
                  <DialogHeader>
                    <DialogTitle>Send Invitations</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 dark:bg-gray-800 dark:text-bg-light ">
                    <p>Send invitations to {selectedCandidates.length} selected candidates?</p>
                    <div className="space-y-2">
                      {topPerformers
                        .filter((p) => selectedCandidates.includes(p.examineeEmail))
                        .map((candidate) => (
                          <div
                            key={candidate.examineeEmail}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <span>{candidate.examineeName}</span>
                            <Badge className={`bg-accent-teal-light text-white`}>{candidate.percentage.toFixed(1)}%</Badge>
                          </div>
                        ))}
                    </div>
                    <Button onClick={handleSendInvitations} className="w-full bg-btn-primary text-white hover:bg-accent-teal-dark">
                      Confirm & Send
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No candidates meet the current criteria</div>
          ) : (
            <div className="space-y-3 dark:bg-gray-800 dark:text-bg-light">
              {currentItems.map((candidate, index) => (
                <div
                  key={candidate.examineeEmail}
                  className="flex items-center justify-between p-4 border rounded-lg light:hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center gap-4">
                    <Checkbox
                  className={`w-5 h-5 bg-white border border-gray-300 data-[state=checked]:bg-btn-primary data-[state=checked]:text-white`}
                      checked={selectedCandidates.includes(candidate.examineeEmail)}
                      onCheckedChange={() => handleCandidateToggle(candidate.examineeEmail)}
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-btn-primary font-bold text-md">{index+1 === 1  ? "🥇":index+1 === 2 ? "🥈": index+1 === 3 ? "🥉": "#" }{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium">{candidate.examineeName}</p>
                        <p className="text-sm text-gray-500">{candidate.examineeEmail}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold text-lg">{candidate.percentage.toFixed(1)}%</p>
                      <p className="text-sm text-gray-500">{candidate.highestSuccessCount} correct answers</p>
                    </div>
                    <Badge className={`dark:bg-gray-800 dark:text-bg-light`}
                      variant={
                        candidate.percentage >= 90 ? "default" : candidate.percentage >= 80 ? "secondary" : "outline"
                      }
                    >
                      {candidate.percentage >= 90 ? "Excellent" : candidate.percentage >= 80 ? "Good" : "Pass"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
       
                <div className="w-full mt-2">
                  {" "}
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
         
        </CardContent>
      </Card>
    </div>
  )
}


const AssessmentTable = ({ data, assessments, selectedAssessment, onAssessmentChange, examiner, examinee }) => {
  const [expandedRows, setExpandedRows] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState(null)
  const [sortDirection, setSortDirection] = useState("asc")
  const [passFailFilter, setPassFailFilter] = useState("all")
  
  const calculatePercentage = (success, failure, skipped) => {
    const total = success + failure + skipped
    if (total === 0) return 0
    return (success / total) * 100
  }

  const formatPercentage = (percentage) => {
    if (percentage === 0 && (isNaN(percentage) || !isFinite(percentage))) {
      return "N/A"
    }
    return percentage.toFixed(2) + "%"
  }

  const groupedData = React.useMemo(() => {
    const safeData = Array.isArray(data) ? data : []

    return safeData.reduce((acc, currentAttempt) => {
      const key = `${currentAttempt.examineeEmail}-${currentAttempt.assessmentId}`
      if (!acc[key]) {
        acc[key] = {
          examineeName: currentAttempt.examineeName,
          examineeEmail: currentAttempt.examineeEmail,
          assessmentId: currentAttempt.assessmentId,
          attempts: [],
          highestSuccessCount: 0,
          highestScoreAttempt: null,
        }
      }

      acc[key].attempts.push(currentAttempt)

      if (currentAttempt.successCount > acc[key].highestSuccessCount) {
        acc[key].highestSuccessCount = currentAttempt.successCount
        acc[key].highestScoreAttempt = currentAttempt
      }

      return acc
    }, {})
  }, [data])

  const processedData = React.useMemo(() => {
    let currentData = Object.values(groupedData)

    // Apply filters
    if (searchTerm) {
      currentData = currentData.filter((group) => group.examineeName.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (selectedAssessment) {
      currentData = currentData.filter((group) => group.assessmentId === selectedAssessment)
    }

    const passingScore = assessments.find((a) => a.id === selectedAssessment)?.settings?.passingScore || 70

    if (passFailFilter !== "all") {
      currentData = currentData.filter((group) => {
        const percentage = group.highestScoreAttempt
          ? calculatePercentage(
              group.highestScoreAttempt.successCount,
              group.highestScoreAttempt.failureCount,
              group.highestScoreAttempt.skippedCount,
            )
          : 0

        if (passFailFilter === "pass") {
          return percentage >= passingScore
        } else if (passFailFilter === "fail") {
          return percentage < passingScore
        }
        return true
      })
    }

    return currentData
  }, [groupedData, searchTerm, selectedAssessment, passFailFilter, assessments])

  const toggleRow = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const selectedAssessmentData = assessments.find((a) => a.id === selectedAssessment)
  const passingScore = selectedAssessmentData?.settings?.passingScore || 70
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
  } = usePagination(processedData, 7);
  return (
    <Card  className={`w-full border-0 dark:bg-gray-800 dark:text-bg-light`}>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>Assessment Results</CardTitle>

          <div className="flex flex-col md:flex-row gap-4">
            {examiner && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 focus:outline-accent-teal-light" />
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64 focus-visible:ring-1 border-accent-teal-light focus-visible:ring-accent"
                />
              </div>
            )}

            <Select value={selectedAssessment} onValueChange={onAssessmentChange} >
              <SelectTrigger className="w-full md:w-64  border border-accent-teal-light hover:bg-gray-200 focus:ring-2 focus:ring-accent ">
                <SelectValue placeholder="Select Assessment" />
              </SelectTrigger>
              <SelectContent>
                {assessments.map((assessment) => (
                  <SelectItem key={assessment.id} value={assessment.id} className={`bg-gray-100  hover:text-white hover:bg-bg-secondary-light  space-y-1`}>
                    {assessment.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {examiner && (
              <Select value={passFailFilter} onValueChange={setPassFailFilter}>
                <SelectTrigger className="w-full md:w-48 border-accent-teal-light hover:bg-gray-200 focus:ring-2 focus:ring-accent">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={` border border-accent-teal-light hover:bg-white focus:ring-2 focus:ring-accent`}>
                  <SelectItem value="all">All Results</SelectItem>
                  <SelectItem value="pass">Pass (≥{passingScore}%)</SelectItem>
                  <SelectItem value="fail">Fail (&lt;{passingScore}%)</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className={``}>
        <div className="overflow-x-auto ">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {examiner && (
                  <>
                    <th className="text-left p-4 font-medium">Examinee Name</th>
                    <th className="text-left p-4 font-medium hidden md:table-cell">Email</th>
                  </>
                )}
                <th className="text-left p-4 font-medium hidden md:table-cell">Highest Score</th>
                <th className="text-left p-4 font-medium">Percentage</th>
                {examiner && <th className="text-left p-4 font-medium">Status</th>}
                <th className="text-left p-4 font-medium">Attempts</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((group) => {
                  const groupKey = `${group.examineeEmail}-${group.assessmentId}`
                  const isExpanded = expandedRows[groupKey]

                  const highestScorePercentageValue = group.highestScoreAttempt
                    ? calculatePercentage(
                        group.highestScoreAttempt.successCount,
                        group.highestScoreAttempt.failureCount,
                        group.highestScoreAttempt.skippedCount,
                      )
                    : 0
                  const highestScorePercentageDisplay = formatPercentage(highestScorePercentageValue)

                  return (
                    <React.Fragment key={groupKey}>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer dark:hover:bg-gray-600  border-accent-teal-light" onClick={() => toggleRow(groupKey)}>
                        {examiner && (
                          <>
                            <td className="p-4 font-medium">{group.examineeName}</td>
                            <td className="p-4 light:text-gray-600 hidden md:table-cell">{group.examineeEmail}</td>
                          </>
                        )}
                        <td className="p-4 font-bold hidden md:table-cell">{group.highestSuccessCount} points</td>
                        <td className="p-4 font-bold">{highestScorePercentageDisplay}</td>
                        {examiner && (
                   <td className="p-4">
  <Badge
    className={
      Number.parseFloat(highestScorePercentageDisplay) >= passingScore
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }
  >
    {Number.parseFloat(highestScorePercentageDisplay) >= passingScore ? "Passed" : "Failed"}
  </Badge>
</td>
                        )}
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            {isExpanded ? "Hide" : "Show"} ({group.attempts.length})
                          </Button>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr>
                          <td colSpan="6" className="p-4 bg-gray-50">
                            <div className="space-y-4">
                              <h4 className="font-semibold">Individual Attempts</h4>
                              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {group.attempts.map((attempt, idx) => (
                                  <Card key={attempt.attemptId} className={`border border-accent`}>
                                    <CardContent className="p-4">
                                      <div className="mb-2">
                                        <Badge className={`bg-accent-teal-light text-white`}>Attempt {idx + 1}</Badge>
                                      </div>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-green-600">✓ Success:</span>
                                          <span>{attempt.successCount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-red-500">✗ Failure:</span>
                                          <span>{attempt.failureCount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-yellow-500">⏭ Skipped:</span>
                                          <span>{attempt.skippedCount}</span>
                                        </div>
                                        <div className="flex justify-between font-semibold pt-2 border-t">
                                          <span>Score:</span>
                                          <span>
                                            {formatPercentage(
                                              calculatePercentage(
                                                attempt.successCount,
                                                attempt.failureCount,
                                                attempt.skippedCount,
                                              ),
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No results found for the current filters.
                  </td>
                </tr>
              )}
            </tbody>
 <tfoot>
            <tr>
              <td colSpan={8}>
                <div className="w-full">
                  {" "}
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
      </CardContent>
    </Card>
  )
}

export default MyAssessment
