import React, { useEffect, useMemo, useState } from 'react';
import { CalendarIcon, Clock, Clock10Icon, List } from 'lucide-react';
import UpcomingAssignment from '../components/UpcomingAssessment';
import ActivityItem from '../components/ActivityItem';
import BarChartCard from '../components/BarChartCard';
import AreaChartCard from '../components/AreaChartCard';
import SubscribersCard from '../components/SubscribersCard';
import WelcomeCard from '../components/WelcomeCard';
import StateCard from '../components/StateCard';
import {  Folder, User, Users } from '../components/Icons';
import {  motion } from 'framer-motion'
import { fetch_results_for_admin, fetchAllUsers, load_my_inivitation } from '../action/Auth';
import { Calendar } from "lucide-react";
import useSWR from 'swr';
import { useDispatch } from 'react-redux';
import NoDataAvailable from '../components/NoDataAvailable';
import { Link } from 'react-router-dom';
// framer motion const
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}


const ExaminerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"))
    const isExaminer = user.roles.some(role => role === "EXAMINER");
  const isExaminee = user.roles.some(role => role === "EXAMINEE");
  const isAdmin = user.roles.some(role => role === "ADMIN");
  const currentuser = user.roles.filter(role => role !== "USER")[0]
  const ONE_DAY = 1000 * 60 * 60 * 24; 
  const shouldFetch = isAdmin ? "all_users_list" : null;

const { data: users } = useSWR(
  shouldFetch,
  fetchAllUsers,
  {
    dedupingInterval: ONE_DAY,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 2,
  }
  );
  

const { data, error, isLoading } = useSWR(
  isAdmin ? "all_user_info" : null,
  fetch_results_for_admin,
  {
    dedupingInterval: ONE_DAY,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    errorRetryCount: 2,
  }
);
  const [assignments, setAssessmentData] = useState([]);
  const [dataCounts, setdataCounts] = useState({
    ExamineePendingCount: 0,
    TakenCount: 0,
    userscount: 0,
    totalrepos: 0,
    totalassessment: 0,
    examinercount:0

   });
  const dispatch = useDispatch()
const fetchExamineeAssessment = async () => {
    const res = await dispatch(load_my_inivitation());
    if (res?.body) {
      setAssessmentData(res.body);
    }
  };


const getAssignmentStatus = (itemSettings) => {
  const now = new Date();
  const startDateTime = new Date(itemSettings.startDateTime);
  // Make sure to use the correct property name, assuming it might be endDateTime
  const endDateTime = new Date(itemSettings.endDateTime || itemSettings.endDateTIme); // Handle potential typo

  if (now < startDateTime) {
    return "Pending";
  } else if (now >= startDateTime && now <= endDateTime) {
    return "Active";
  } else {
    return "Expired";
  }
  };
   const [activeFilter, setActiveFilter] = useState('Active'); // 'All', 'Active', 'Pending', 'Expired'

  const filteredAssignments = useMemo(() => {
    if (activeFilter === 'All') {
      return assignments;
    }
    return assignments.filter(item => getAssignmentStatus(item.settings) === activeFilter);
  }, [assignments, activeFilter]);
 const pendingAssignmentsCount = useMemo(() => {
    if (!assignments || assignments.length === 0) return 0;
    return assignments.filter(item => getAssignmentStatus(item.settings) === 'Pending').length;
 }, [assignments]);
   const TakenAssignmentsCount = useMemo(() => {
    if (!assignments || assignments.length === 0) return 0;
    return assignments.filter(item => getAssignmentStatus(item.settings) === 'Expired').length;
 }, [assignments]);
    useEffect(() => {
      fetchExamineeAssessment()
      
      
      if (pendingAssignmentsCount || TakenAssignmentsCount) {
    setdataCounts({
    ExamineePendingCount: pendingAssignmentsCount,
    TakenCount: TakenAssignmentsCount,
   

  });
      }
      

  if (data?.body && isAdmin) {
    setdataCounts(prev => ({
      ...prev,
      userscount: data.body.totalUsers ?? 0,
      totalassessment: data.body.totalAssessments ?? 0,
      totalrepos: data.body.totalBanks ?? 0,
      examinercount:data.body.totalExaminers ?? 0
    }));
  }
},[pendingAssignmentsCount,TakenAssignmentsCount,data])
  const filterButtons = [
    { label: 'All', value: 'All' },
    { label: 'Active', value: 'Active' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Expired', value: 'Expired' },
  ];
    const statusStyles = {
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100',
    Active: 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100',
    Expired: 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100',
  };

  const stats = [
    {
      title: "Total Assessment",
      value: 5,
      icon: (
        <svg width="44" height="36" viewBox="0 0 44 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" strokeWidth="3"  strokeLinecap="round"/>
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" strokeOpacity="0.21" strokeWidth="3"  strokeLinecap="round"/>
<path d="M2 34C2 34 4.87074 -4.48536 12.0571 13.3418C19.2435 31.1689 22.1143 30.3501 24.8571 16.5823C28.2477 -0.436459 40.7465 14.2172 42 2" stroke="black" strokeWidth="3"  strokeLinecap="round"/>
</svg>

      ),
      visible: ["EXAMINER"],
      // bg:"bg-[#746EF1B5]"
      
    },
    {
      title: "Pending Evaluation",
      value: 8,
      subtitle: "assignments for evaluation",
      icon: <CalendarIcon className="h-8 w-8" />,
      visible : ["EXAMINER"]

    },
    {
      title: "Scheduled Assignment",
      value: 2,
      subtitle: "Next 7 days",
      icon: <Clock className="h-8 w-8" />,
      visible : ["EXAMINER"]

    },
      {
      title: "Taken Assessment",
      value: dataCounts?.TakenCount || 0,
      subtitle: "",
        icon: <Clock10Icon className="h-8 w-8" />,
        visible: ["EXAMINEE"],
        color:"warning",
      // bg:"bg-[#746EF1]"

            

    },  {
      title: "Pending Assessment ",
      value: dataCounts?.ExamineePendingCount || 0,
      subtitle: "Next 7 days",
        icon: <Clock className="h-8 w-8" />,
            visible : ["EXAMINEE"]

    },
  ];

const upcomingExams = [
  {
    id: 1,
    title: "Mathematics Final Exam",
    date: "2025-06-10T09:00:00",
    duration: "90 mins",
    instructions: "Please make sure to have a stable internet connection.",
  },
  {
    id: 2,
    title: "Physics Chapter Test",
    date: "2025-06-12T14:30:00",
    duration: "60 mins",
    instructions: "Use scientific calculator only. No notes allowed.",
  },
];
  const upcomingAssignments = [
    { title: 'Front End Interview', date: 'may 5,2025', time: '10:00AM-12:00PM', candidates: 2 },
    { title: 'Front End Interview', date: 'may 5,2025', time: '10:00AM-12:00PM', candidates: 2 },
    { title: 'Front End Interview', date: 'may 5,2025', time: '10:00AM-12:00PM', candidates: 2 }
  ];

  const activities = [
    { 
      type: 'created assignment',
      description: 'created assessment',
      details: 'Frontend Developer Skills',
      time: '2 minutes ago' 
    },
    { 
      type: 'evaluation',
      description: 'evaluation new assessment',
      details: 'Python Programming Basics',
      time: '45 minutes ago' 
    },
    { 
      type: 'invitation',
      description: 'invited 3 candidates',
      details: 'Data Science Interview',
      time: '2 hours ago' 
    },
    { 
      type: 'update',
      description: 'modified assessment',
      details: 'UX Design Challenge',
      time: '3 hours ago' 
    },
    { 
      type: 'Add question',
      description: 'added new question bank',
      details: 'JavaScript Algorithms',
      time: '5 hours ago' 
    },
  ];

  return (
    <div className="min-h-screen bg-bg-light dark:bg-gray-800 dark:text-bg-light">
      <div className="container mx-auto px-4 py-6">
        {/* <Header userName="Examiner user" /> */}

        {/* Stats Cards */}
        <motion.div  variants={fadeInUp} className="flex flex-col md:flex-row gap-6 mb-8" >
          {stats.map((stat, index) => {
            if (stat.visible.includes(currentuser)) {
              return (
                 <StateCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
                  subtitle={stat.subtitle}
                  color={stat.color}
                  bg={stat.bg}
                />
                
                
              )
            }
          })}
        </motion.div >

        {/* Main Content */}

         {isExaminee && (
          <>
             <div className="mb-6 flex flex-wrap gap-2 justify-start">
        {filterButtons.map(filter => (
          <button
            tabIndex={0}
            aria-label={`hovered ${filter.label} `}
            aria-selected={`you select ${filter.label} and you have ${filteredAssignments.length} ${filter.label} items `}
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${activeFilter === filter.value
                ? 'bg-btn-primary text-white dark:bg-accent-teal-light dark:text-gray-900'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

            <div className="flex flex-wrap gap-4 dark:bg-gray-800 dark:text-bg-light justify-start">
            {filteredAssignments.length > 0 ? (
          <>
            {filteredAssignments?.map((items) => {
              const status = getAssignmentStatus(items.settings);
              const statusBadgeClass = statusStyles[status] || 'bg-gray-100 text-gray-800';

              // Ensure dates are valid before trying to format
              const isValidStartDate = items.settings?.startDateTime && !isNaN(new Date(items.settings.startDateTime).getTime());
              const isValidEndDate = (items.settings?.endDateTime || items.settings?.endDateTIme) && !isNaN(new Date(items.settings.endDateTime || items.settings.endDateTIme).getTime());


              const startDateString = isValidStartDate ?
                new Date(items.settings.startDateTime).toLocaleString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                  hour: "numeric", minute: "2-digit", hour12: true,
                }) : "N/A";

              const endDateString = isValidEndDate ?
                new Date(items.settings.endDateTime || items.settings.endDateTIme).toLocaleString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                  hour: "numeric", minute: "2-digit", hour12: true,
                }) : "N/A";


              return (
                <div
                  className="w-full max-w-md bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden dark:bg-gray-700 dark:text-bg-light"
                  key={items.id}
                >
                  {/* Card Header */}
                  <div
                    className="bg-gradient-to-r from-btn-primary to-accent-teal-light text-white p-6 rounded-t-lg h-auto min-h-[8rem]" 
                    aria-label="Assessment Card header"
                  >
                    <div
                      className="flex justify-between items-start"
                      aria-label="Assessment Title"
                    >
                      <h2
                        tabIndex={0}
                        className="text-xl font-bold"
                        aria-label={`${items.title} card `}
                      >
                        {items.title}
                      </h2>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium hidden md:block border border-white/30 ${statusBadgeClass} `} tabIndex={0} aria-label={`this assessment is ${status}`}>
                        {status}
                      </span>
                    </div>
                    <p
                      className="text-blue-100 mt-2 text-sm"
                      tabIndex={0}
                      aria-label={`Assessment description says : ${items.description}`}
                    >
                      {items.description?.slice(0, 70) || 'No description available.'}...
                    </p>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 dark:bg-gray-600">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900">
                          <Clock className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 dark:font-semibold" tabIndex={0} aria-label='Duration'>
                            Duration
                          </p>
                          <p className="font-medium dark:text-gray-100" tabIndex={0}>{items.settings?.duration || 'N/A'} minutes</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900">
                          <Calendar className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 dark:font-semibold"  tabIndex={0}>Available</p>
                          <p className="font-display text-sm dark:text-gray-100"  tabIndex={0} aria-label={`available from ${startDateString} to ${endDateString}`}>
                             {startDateString} to {endDateString}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 ">
                        <div className="bg-blue-100 p-2 rounded-full dark:bg-blue-900">
                          <Users className="h-5 w-5 text-blue-700 dark:text-blue-300" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 dark:font-semibold"  >Attempts</p>
                          <p className="font-medium dark:text-gray-100"  tabIndex={0}>Maximum {items.settings?.maxAttempts || 'N/A'} attempts</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="bg-gray-50 border-t px-6 py-4 dark:bg-gray-700 dark:border-gray-600">
                    <div className="w-full flex justify-between items-center">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-400 dark:bg-blue-300"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-300 dark:bg-blue-200"></div>
                      </div>
                      {/*
                        Make sure the Link component and its `to` prop are correct
                        for your routing setup.
                      */}
                      <Link
                        to={`/assessment/${items.id}`} // Changed to href for Next.js Link
                        className="rounded-xl bg-gradient-to-r from-bg-dark to-bg-secondary-light text-white p-3 hover:opacity-90 transition-opacity"
                        aria-label={`Take assessment Button for ${items.title}`}
                      >
                        Take Assessment
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        ) : (
                  <div className="w-full">
                    <NoDataAvailable
            message={activeFilter === 'All' ? "No Assessments are Available" : `No ${activeFilter.toLowerCase()} assessments found.`}
            emoji="🙅"
          />
          </div>
        )}
          </div>
        </>
      )}

        {
          isExaminer  ? <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Upcoming Assignments */}
          <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-700 dark:text-bg-light ">
            <h2 className="text-lg font-semibold mb-1">Upcoming assignments</h2>
            <p className="text-sm text-gray-500 mb-4">scheduled assignments for the next 7 days</p>
            <div className="divide-y divide-gray-100 space-y-3 p-2">
              {upcomingAssignments.map((assignment, index) => (
                <UpcomingAssignment
                  key={index}
                  title={assignment.title}
                  date={assignment.date}
                  time={assignment.time}
                  candidates={assignment.candidates}
                />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 dark:bg-gray-700 dark:text-bg-light">
            <h2 className="text-lg font-semibold mb-1">Recent Submission</h2>
            <p className="text-sm text-gray-500 mb-4">4 assignment waiting for review and evaluation</p>
            <div>
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  type={activity.type}
                  description={activity.description}
                  details={activity.details}
                  time={activity.time}
                />
              ))}
            </div>
          </div>
          </div> :null
              
        }
{/* ADmin  Dashboard */}
        {isAdmin && <>
          
      <div className="container px-4 mx-auto bg-bg-light dark:bg-gray-800 dark:text-bg-light">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.div variants={fadeInUp}>
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, Admin. Here's what's happening.</p>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[{
            title: "Total User", value: dataCounts.userscount, Icon: Users, color: "primary"
          }, {
            title: "Total Examiner", value: dataCounts.examinercount, Icon: User, color: "secondary"
          }, {
            title: "Repository", value: dataCounts.totalrepos, Icon: Folder, color: "success"
          }, {
            title: "Assignment created", value: dataCounts.totalassessment, Icon: List, color: "info"
          }].map((card, index) => (
            <motion.div key={card.title} variants={fadeInUp} custom={index + 1}>
              <StateCard
                title={card.title}
                value={card.value}
                Icon={card.Icon}
                color={card.color}
                delay={(index + 1) * 40}
              />
            </motion.div>
          ))}
        </div>

        {/* Middle Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 w-full">
          <motion.div variants={fadeInUp} custom={1} className="w-full md:w-[40%]">
            <WelcomeCard />
          </motion.div>

          <motion.div
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            className="w-full md:w-[60%] flex flex-col lg:flex-row justify-between gap-4"
          >
            <motion.div variants={fadeInUp} className="lg:w-1/2 w-full">
              <SubscribersCard
                count="23.62K Birr"
                title="Today's Subscription Earning"
                type="money"
                from="from-transparent"
                to="to-teal-500"
              />
            </motion.div>
            <motion.div variants={fadeInUp} className="lg:w-1/2 w-full">
              <SubscribersCard
                count= {dataCounts.userscount}
                title="Subscribers"
                from="from-[#2C3E50]"
                to="to-[#4CA1AF]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          <motion.div variants={fadeInUp} className="lg:col-span-2 ">
            <AreaChartCard title="Created Assessment" subtitle="(+5) more in 2024" />
          </motion.div>
          <motion.div variants={fadeInUp}>
            <BarChartCard title="Active Users" subtitle="(+23) than last week" noOfusers= {dataCounts.userscount}  users_info={users?.body} repos={dataCounts.totalrepos} assessments={dataCounts.totalassessment}/>
          </motion.div>
        </div>
      </motion.div>
    </div>
        </>}
        
      </div>
    </div>
  );
};

export default ExaminerDashboard;