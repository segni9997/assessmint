import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Mail, Lock, AlertCircle, Info, EyeOff, Eye } from "lucide-react";
import { login } from "../../action/Auth";
import { connect } from "react-redux";
import { Badge } from "@/components/ui/badge";

const ForgotPassword = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
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
    <div className="border-0   font-display">
      <h1 className="text-5xl font-bold mb-2 text-center text-[#215035] absolute top-52">Forgot Password</h1>
      <p className="text-start font-display absolute top-[275px] ">Enter an email ID associated with your account</p>

      <form onSubmit={handleSubmit} className="space-y-8 mt-10">
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-700 mb-1  dark:bg-gray-900 dark:text-white"
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

     
      
   

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-btn-primary hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}`}
        >
          {isSubmitting ? "Reseting..." : "Reset password"}
        </button>
      </form>
    {/* <Badge className=" mx-auto flex justify-center mt-8">
                    {" "}
                    <Info />
                    you will shortly recieve an email with further instructions
                    </Badge> */}
      {/* Or Continue With */}
      <div className="mt-6">
        <p className="mt-6 text-center text-sm text-gray-600">
         Back to login?{" "}
          <Link
            to="/login"
            className="font-medium text-btn-primary  hover:text-emerald-800 transition duration-200"
          >
          Login
          </Link>
        </p>
          </div>
             
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

// export default connect(mapStateToProps, { forgotpassword })(ForgotPassword);
export default ForgotPassword
