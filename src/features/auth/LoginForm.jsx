import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Mail, Lock, AlertCircle, Info, EyeOff, Eye } from "lucide-react";
import { login } from "../../action/Auth";
import { connect } from "react-redux";

const LoginForm = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const { email, password } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      login(email, password);
      setIsSubmitting(false);
    }
  };
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="border-0   ">
      <h1 className="text-3xl font-bold mb-2 text-center ">Welcome back!</h1>
      <p className="text-gray-600 mb-8 text-center alert bg-amber-100">
        {" "}
        <Info />
        Enter your credentials to access your account
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1  dark:bg-gray-900 dark:text-white"
          >
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Mail size={18} />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
         <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1  dark:bg-gray-900 dark:text-white"
          >
            Password
          </label>
        <div className="relative">
          
          <div className="absolute inset-y-1 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Lock size={18} />
          </div>
         
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className={`w-full pl-10 pr-10 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200 `}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle size={14} className="mr-1" />
            {errors.password}
          </p>
        )}
        <div className="relative justify-end flex">
            <Link to="/forgot-password" className="text-btn-primary text-sm text-right ms-auto">
        Forgot Password?
        </Link> 
</div>
        {/* Remember Me */}
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            checked={formData.remember}
            onChange={handleChange}
            className="h-5 w-5 text-btn-primary checkbox checkbox-accent focus:ring-emerald-500 border-gray-300 rounded transition duration-200"
          />
          <label
            htmlFor="remember"
            className="ml-2 block text-sm text-gray-700  dark:bg-gray-900 dark:text-gray-400"
          >
            Remember for 30 days
          </label>
        </div>
      
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-btn-primary hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      {/* Or Continue With */}
      <div className="mt-6">
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-btn-primary  hover:text-emerald-800 transition duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(LoginForm);
