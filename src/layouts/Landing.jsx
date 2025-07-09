"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Play,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Twitter,
  MessageSquare,
  Zap,
  Shield,
  Brain,
  Facebook,
} from "lucide-react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import logo from "../assets/logo.svg"
import hero from "../assets/hero.png"

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const floatingAnimation = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const pulseGlow = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(20, 184, 166, 0.3)",
      "0 0 30px rgba(20, 184, 166, 0.6)",
      "0 0 20px rgba(20, 184, 166, 0.3)",
    ],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        className="bg-bg-light  sticky top-0 z-50 backdrop-blur-sm "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="rounded flex items-center justify-center">
              <img src={logo} alt="logo" width={57} height={57} />
            </div>
          </motion.div>

          <motion.nav
            className="hidden md:flex items-center space-x-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              { to: "#features", text: "Features" },
              { to: "#about", text: "About" },
              { to: "#pricing", text: "Prices" },
              { to: "#contact", text: "Contact" },
            ].map((item, index) => (
              <motion.div key={item.to} variants={staggerItem}>
                <a href={item.to} className="text-gray-600 font-semibold text-xl  hover:text-teal-600 transition-colors relative group">
                  {item.text}
                  <motion.span
                    className="absolute -bottom-1  left-0 h-0.5 bg-teal-600"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.div>
            ))}
          </motion.nav>

          <motion.div
            className="flex items-center space-x-2 md:space-x-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={staggerItem} className="">
              <Link to="/login">
                  <Button variant="ghost" className="text-gray-600 text-sm md:text-xl px-2 md:px-4">
                Login
              </Button>
              </Link>
            </motion.div>
            <motion.div variants={staggerItem}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/signup">
                 <Button className="bg-teal-600 hover:bg-teal-700 text-white text-sm md:text-xl px-2 md:px-4">
                  Sign Up
                </Button></Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative bg-bg-light overflow-hidden">
        <div className="mx-auto px-4 md:px-6 py-8 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 items-center justify-around">
            <motion.div
              className="space-y-6 text-center lg:text-left"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              <div className="space-y-4">
                <motion.h1
                  className="text-3xl md:text-4xl lg:text-7xl font-bold leading-tight"
                  variants={staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  <motion.span className="text-teal-600" variants={staggerItem} transition={{ duration: 0.6 }}>
                    AI-Powered
                  </motion.span>{" "}
                  <motion.span
                    className="text-indigo-900"
                    variants={staggerItem}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    Smart
                  </motion.span>
                  <br />
                  <motion.span
                    className="text-indigo-900"
                    variants={staggerItem}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Exam Management
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="text-gray-600 text-base md:text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Mizan is an interesting platform that will
                  <br className="hidden md:block" />
                  put you in more an interactive way
                </motion.p>
              </div>
              <motion.div
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  variants={pulseGlow}
                  animate="animate"
                >
                    <Link to="/signup">
                        <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 w-full sm:w-auto">
                    Join for free
                  </Button>
                  </Link>

              
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="https://youtu.be/2Ee5BRkFW40" blank>
                    <Button variant="ghost" className="flex items-center space-x-2 text-teal-600 w-full sm:w-auto">
                    <Play className="w-4 h-4" />
                    <span>Watch how it works</span>
                  </Button>
                  </Link>
                
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              className="w-full lg:w-[40%] relative"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.2 }}
            >
              <div className="relative mt-0">
                <motion.img
                  src={hero}
                  alt="hero"
                  className="h-[400px] md:h-[500px] lg:h-[700px] mx-auto object-contain"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.4 }}
                />

                {/* Floating Notification Popup */}
                <motion.div
                  className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-xs"
                  variants={floatingAnimation}
                  animate="animate"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Congratulations</p>
                      <p className="text-xs text-gray-500">Your completed your exam</p>
                    </div>
                  </div>
                </motion.div>

                {/* Stats Badge */}
                <motion.div
                  className="absolute top-20 left-4 bg-white rounded-lg shadow-lg p-3"
                  variants={floatingAnimation}
                  animate="animate"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 }}
                  style={{ animationDelay: "1s" }}
                >
                  <div className="text-center">
                    <motion.div
                      className="text-2xl font-bold text-teal-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, delay: 1.2 }}
                    >
                      250k
                    </motion.div>
                    <div className="text-xs text-gray-500">Assessments</div>
                  </div>
                </motion.div>

                {/* Interview Notification */}
                <motion.div
                  className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs"
                  variants={floatingAnimation}
                  animate="animate"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  style={{ animationDelay: "2s" }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="text-sm">Your interview coming up</p>
                      <p className="text-xs text-gray-500">Today at 13:00 PM</p>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/signup">
                     <Button size="sm" className="mt-2 bg-pink-500 hover:bg-pink-600 text-white">
                      Join Now
                    </Button>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave decoration */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 w-full"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <svg viewBox="0 0 1200 120" className="w-full h-20 fill-teal-600" preserveAspectRatio="none">
            <motion.path
              d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1 }}
            />
          </svg>
        </motion.div>
      </section>

      {/* What is Mizan Section */}
      <motion.section
        className="py-8 md:py-16 bg-bg-light font-display relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4 text-center"
            {...fadeInUp}
            whileInView="animate"
            viewport={{ once: true }}
          >
            What is <span className="text-btn-primary">Mizan</span>
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-8 max-w-3xl mx-auto text-center"
            {...fadeInUp}
            whileInView="animate"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Mizan is an AI-powered exam management platform. For Examiners, it generates, delivers, and auto-grades
            exams instantly. For Examinees, it offers secure, accessible, and fair testing — anytime, anywhere.
          </motion.p>

          <motion.div
            className="w-14 h-14 bg-accent-teal-dark rounded-full absolute left-1/3"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.4 }}
          />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {[
                  {
                    icon: Brain,
                    title: "AI-Generated Exams",
                    description:
                      "Create comprehensive, balanced exams instantly with our advanced AI technology that understands curriculum requirements and learning objectives.",
                    gradient: "from-teal-500 to-blue-500",
                  },
                  {
                    icon: Shield,
                    title: "Secure Testing Environment",
                    description:
                      "Full-screen proctoring with advanced anti-cheating measures, ensuring academic integrity while maintaining a stress-free testing experience.",
                    gradient: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: Zap,
                    title: "Instant Auto-Grading",
                    description:
                      "Lightning-fast automatic grading with detailed analytics, performance insights, and personalized feedback for every student.",
                    gradient: "from-green-500 to-teal-500",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 group"
                    variants={staggerItem}
                    whileHover={{ x: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
                      whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                className="w-full h-[400px] md:h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 85%)",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="AI Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
              </motion.div>

              {/* Floating stats */}
              <motion.div
                className="absolute -top-12 right-0 bg-white rounded-2xl shadow-2xl p-6"
                variants={floatingAnimation}
                animate="animate"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="text-center">
                  <motion.div
                    className="text-3xl font-bold text-teal-600"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 500, delay: 0.8 }}
                  >
                    95%
                  </motion.div>
                  <div className="text-sm text-gray-500">Accuracy Rate</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        className="py-8 md:py-16 bg-bg-light font-display"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp} whileInView="animate" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
              Our <span className="text-btn-primary">Features</span>
            </h2>
            <p className="text-gray-600">This very extraordinary feature, can make examiner more efficient</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
            <motion.div className="relative" {...fadeInLeft} whileInView="animate" viewport={{ once: true }}>
              <motion.div
                className="w-full h-[300px] md:h-[400px] bg-gradient-to-br from-green-50 to-teal-50 overflow-hidden shadow-2xl"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 85%, 15% 100%, 0 100%)",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Accessibility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-teal-600/20"></div>
              </motion.div>
            </motion.div>

            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { color: "green", title: "Question Bank repository" },
                {
                  color: "blue",
                  title: "AI-Generated Exams, create comprehensive",
                  subtitle: "exams instantly with our AI technology",
                },
                {
                  color: "orange",
                  title: "Secure Testing Environment full screen mode",
                  subtitle: "with anti-cheating measures",
                },
                { color: "purple", title: "Instance Auto-Grading with detail Analysis" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-3"
                  variants={staggerItem}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`w-8 h-8 bg-${feature.color}-100 rounded flex items-center justify-center mt-1`}
                    whileHover={{ scale: 1.2, rotate: 180 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className={`w-4 h-4 bg-${feature.color}-600 rounded`}></div>
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{feature.title}</h4>
                    {feature.subtitle && <p className="text-gray-600 text-sm">{feature.subtitle}</p>}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Examiners Benefits */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-7 items-center mb-16">
            <motion.div
              className="space-y-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left"
              {...fadeInLeft}
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                Examiners and exams benefit
                <br />
                <span className="text-indigo-900">with Exam Automation</span>
              </h3>
              <motion.div
                className="space-y-3"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  "Saves examiners time and effort",
                  "Reduces errors and bias",
                  "Gives examinees faster, fairer results",
                  "Makes the process accessible and stress-free",
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-2"
                    variants={staggerItem}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-accent-teal-light rounded-full"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                    <span className="text-gray-600">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div className="relative" {...fadeInRight} whileInView="animate" viewport={{ once: true }}>
              <motion.div
                className="w-full h-[400px] md:h-[500px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0 85%)",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="AI Technology"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
              </motion.div>
            </motion.div>
          </div>

          {/* Accessibility Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div className="relative" {...fadeInLeft} whileInView="animate" viewport={{ once: true }}>
              <motion.div
                className="w-full h-[300px] md:h-[400px] bg-gradient-to-br from-green-50 to-teal-50 overflow-hidden shadow-2xl"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 85%, 15% 100%, 0 100%)",
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Accessibility"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-teal-600/20"></div>
              </motion.div>
            </motion.div>

            <motion.div className="space-y-8" {...fadeInRight} whileInView="animate" viewport={{ once: true }}>
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  All user <span className="text-teal-600">Accessibility</span>
                </h3>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Our platform is designed to be accessible to all users, including those with visual, we believe that
                  quality education should be available to everyone.
                </p>
              </div>
              <motion.div
                className="space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {["Full keyboard navigation support", "Screen reader optimization"].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    variants={staggerItem}
                    whileHover={{ x: 10 }}
                  >
                    <motion.div
                      className="w-6 h-6 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        id="pricing"
        className="py-12 md:py-20 bg-gradient-to-br bg-bg-light relative overflow-hidden font-display"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute z-10 inset-0 bg-gradient-to-r from-green-900/10 to-pink-600/5"
          style={{
            clipPath: "polygon(0 0, 100% 15%, 100% 100%, 0 85%)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-16" {...fadeInUp} whileInView="animate" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold text-indigo-900 mb-4">
              Simple <span className="text-btn-primary">Pricing</span>
            </h2>
            <motion.div
              className="text-center my-8 space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800">
                All-In-One Price, <span className="text-purple-600">Zero Hassle.</span>
              </h3>
              <h4 className="text-lg md:text-xl lg:text-2xl font-semibold text-indigo-900">
                Cancel Anytime. Let's Get Started!
              </h4>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {/* Basic Plan */}
            <motion.div
              variants={staggerItem}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="relative group bg-gray-700 backdrop-blur-sm border-0 flex flex-col justify-between h-full">
                <CardContent className="p-6 md:p-8 pt-8 flex-grow">
                  <div className="text-center mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-200 mb-2">Basic Plan</h3>
                    <p className="text-gray-300 mb-6 text-sm md:text-base">
                      Perfect for small schools and institutions
                    </p>
                    <div className="flex items-baseline justify-center">
                      <motion.span
                        className="text-3xl md:text-4xl font-bold text-gray-200"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                      >
                        2,500
                      </motion.span>
                      <span className="text-gray-300 ml-2">ETB/month</span>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    {[
                      "Up to 500 students",
                      "AI-powered question generation",
                      "Basic analytics dashboard",
                      "Email support",
                      "Standard security features",
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="text-gray-200 text-sm md:text-base">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 md:p-8 pt-0">
                  <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-slate-200 hover:bg-slate-300 text-gray-700">Get Started</Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Advanced Plan */}
            <motion.div
              variants={staggerItem}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="group bg-gradient-to-br from-purple-900 to-pink-600 text-white border-0 relative flex flex-col justify-between h-full">
                <motion.div
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
                >
                  <Badge className="bg-white text-purple-600 shadow-lg">Most Popular</Badge>
                </motion.div>
                <CardContent className="p-6 md:p-8 pt-8 flex-grow">
                  <div className="text-center mb-8">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Advanced Plan</h3>
                    <p className="text-purple-100 mb-6 text-sm md:text-base">
                      Enhanced features for growing institutions
                    </p>
                    <div className="flex items-baseline justify-center">
                      <motion.span
                        className="text-3xl md:text-4xl font-bold"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                      >
                        5,500
                      </motion.span>
                      <span className="text-purple-100 ml-2">ETB/month</span>
                    </div>
                  </div>
                  <div className="space-y-4 mb-8">
                    {[
                      "Up to 2,000 students",
                      "Advanced AI features",
                      "Real-time analytics",
                      "Priority support",
                      "Advanced security",
                      "Custom branding",
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Check className="w-5 h-5 text-white flex-shrink-0" />
                        <span className="text-sm md:text-base">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 md:p-8 pt-0">
                  <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-white text-purple-600 hover:bg-gray-100">Upgrade Now →</Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              variants={staggerItem}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="md:col-span-2 lg:col-span-1"
            >
              <Card className="group bg-gray-700 backdrop-blur-sm border-0 flex flex-col justify-between h-full">
                <CardContent className="p-6 md:p-8 flex-grow">
                  <div className="text-center mb-8">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-200 mb-2">Enterprise</h3>
                    <p className="text-gray-300 mb-6 text-sm md:text-base">Unlimited scale for large institutions</p>
                    <motion.div
                      className="text-xl md:text-2xl font-bold text-gray-200"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                    >
                      Custom Pricing
                    </motion.div>
                  </div>
                  <div className="space-y-4 mb-8">
                    {[
                      "Unlimited students",
                      "White-label solution",
                      "Dedicated support",
                      "Custom integrations",
                      "SLA guarantee",
                      "On-premise deployment",
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0" />
                        <span className="text-gray-200 text-sm md:text-base">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-6 md:p-8 pt-0">
                  <motion.div className="w-full" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="w-full bg-slate-200 hover:bg-slate-300 text-gray-700">Contact Sales</Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Us */}
      <motion.section
        id="contact"
        className="py-8 md:py-16 bg-bg-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" {...fadeInUp} whileInView="animate" viewport={{ once: true }}>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-600">Any question or remarks? Just write us a message!</p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <motion.div {...fadeInLeft} whileInView="animate" viewport={{ once: true }}>
                <Card className="bg-teal-700 text-white h-full">
                  <CardContent className="p-6 md:p-8">
                    <h3 className="text-lg md:text-xl font-semibold mb-2">Contact Information</h3>
                    <p className="text-teal-100 mb-8">Say something to us start a live chat!</p>
                    <motion.div
                      className="space-y-6"
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                    >
                      {[
                        { icon: Phone, text: "09567 789" },
                        { icon: Mail, text: "mizanapp@gmail.com" },
                        { icon: MapPin, text: "Addis Ababa, Ethiopia" },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-3"
                          variants={staggerItem}
                          whileHover={{ x: 10 }}
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span className={index === 1 ? "break-all" : ""}>{item.text}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                    <motion.div
                      className="flex space-x-4 mt-12"
                      variants={staggerContainer}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                    >
                      {[Linkedin, Instagram, Twitter].map((Icon, index) => (
                        <motion.div
                          key={index}
                          className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center cursor-pointer"
                          variants={staggerItem}
                          whileHover={{
                            scale: 1.2,
                            backgroundColor: "rgb(45, 212, 191)",
                            rotate: 360,
                          }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <Icon className="w-5 h-5" />
                        </motion.div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Form */}
              <motion.div {...fadeInRight} whileInView="animate" viewport={{ once: true }}>
                <Card className="h-full">
                  <CardContent className="p-6 md:p-8">
                    <form className="space-y-6">
                      <motion.div
                        className="grid md:grid-cols-2 gap-4"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                      >
                        {["First Name", "Last Name"].map((label, index) => (
                          <motion.div key={label} variants={staggerItem}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                            <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                              <Input placeholder="" />
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>

                      <motion.div
                        className="grid md:grid-cols-2 gap-4"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                      >
                        <motion.div variants={staggerItem}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Input type="email" placeholder="" />
                          </motion.div>
                        </motion.div>
                        <motion.div variants={staggerItem}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Input placeholder="+251 91" />
                          </motion.div>
                        </motion.div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Subject?</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {["General Inquiry", "Technology", "Subscription", "Support"].map((subject, index) => (
                            <motion.label
                              key={subject}
                              className="flex items-center cursor-pointer"
                              whileHover={{ x: 5 }}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <input type="radio" name="subject" className="mr-2" />
                              <span className="text-sm">{subject}</span>
                            </motion.label>
                          ))}
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                      >
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <motion.textarea
                          className="w-full p-3 border border-gray-300 rounded-md resize-none h-32 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Write your message.."
                          whileFocus={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                      </motion.div>

                      <motion.div
                        className="flex justify-end"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2">Send Message</Button>
                        </motion.div>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gradient-to-br from-teal-700 to-teal-800 text-white py-8 md:py-12 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-1"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-l from-transparent via-white/3 to-transparent transform skew-y-1"
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatDelay: 2, delay: 1 }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-8" {...fadeInUp} whileInView="animate" viewport={{ once: true }}>
            {/* Logo and brand section */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3 mb-6"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            >
              <motion.div
                className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{
                  scale: 1.1,
                  rotate: 360,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                }}
                transition={{ type: "spring", stiffness: 400, duration: 0.6 }}
              >
                <img
                  src={logo}
                  alt="Mizan-app logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              </motion.div>
              <div className="text-center sm:text-left">
                <h3 className="text-xl font-bold text-white">Mizan-app</h3>
                <p className="text-teal-100 text-sm">AI Power Exam Management Platform</p>
              </div>
            </motion.div>

            {/* Navigation links */}
            <motion.div
              className="flex justify-center flex-wrap gap-4 md:gap-6 text-sm mb-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { to: "/careers", text: "Careers" },
                { to: "/privacy", text: "Privacy Policy" },
                { to: "/terms", text: "Terms & Conditions" },
              ].map((link, index) => (
                <motion.div key={link.to} variants={staggerItem}>
                  <Link to={link.to} className="hover:text-teal-200 transition-all duration-300 relative group">
                    {link.text}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-teal-200"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced social media icons */}
            <motion.div
              className="flex gap-4 justify-center mb-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                { to: "https://facebook.com", Icon: Facebook, color: "blue-600", shadow: "blue-600/25" },
                { to: "https://twitter.com", Icon: Twitter, color: "sky-500", shadow: "sky-500/25" },
                {
                  to: "https://instagram.com",
                  Icon: Instagram,
                  color: "gradient-to-br from-purple-500 to-pink-500",
                  shadow: "pink-500/25",
                },
                { to: "https://linkedin.com", Icon: Linkedin, color: "blue-700", shadow: "blue-700/25" },
              ].map((social, index) => (
                <motion.div key={social.to} variants={staggerItem}>
                  <Link to={social.to} target="_blank" rel="noopener noreferrer" className="group relative">
                    <motion.div
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20"
                      whileHover={{
                        scale: 1.2,
                        backgroundColor: social.color.includes("gradient")
                          ? undefined
                          : `rgb(${social.color.split("-")[1] === "600" ? "37 99 235" : social.color.split("-")[1] === "500" ? "14 165 233" : "29 78 216"})`,
                        boxShadow: `0 10px 25px -3px rgba(${social.color.includes("blue-600") ? "37, 99, 235" : social.color.includes("sky") ? "14, 165, 233" : social.color.includes("pink") ? "236, 72, 153" : "29, 78, 216"}, 0.25)`,
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <social.Icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <motion.div
                      className={`absolute -inset-2 bg-${social.color.includes("gradient") ? "gradient-to-br from-purple-500/20 to-pink-500/20" : `${social.color}/20`} rounded-full opacity-0 blur-xl`}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Copyright section */}
          <motion.div
            className="border-t border-white/20 pt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-teal-100 text-sm">
              &copy; 2025 Mizan-app. All rights reserved. Transforming education through AI.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
