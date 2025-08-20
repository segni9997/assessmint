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
import ThemeToggle from '../components/ThemeToggle';

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
    <div className="min-h-screen bg-bg-light dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/src/assets/logo.svg" alt="Logo" className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Mizan</span>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link to="/login" className="btn bg-btn-primary text-white hover:bg-accent-teal-dark">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-btn-primary">Mizan</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            The comprehensive assessment platform for modern education and recruitment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn bg-btn-primary text-white hover:bg-accent-teal-dark px-8 py-3">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline border-btn-primary text-btn-primary hover:bg-btn-primary hover:text-white px-8 py-3">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}